import { consumeStream, convertToModelMessages, streamText, UIMessage, tool } from 'ai';
import { z } from 'zod';
import { mockListings, type Listing } from '@/lib/types/listings';
import { verticals, type VerticalType } from '@/lib/verticals';

export const maxDuration = 30;

// Simple search function for mock data
function searchListings(query: string, vertical?: VerticalType, filters?: Record<string, unknown>): Listing[] {
  let results = [...mockListings];
  
  // Filter by vertical if specified
  if (vertical) {
    results = results.filter(l => l.vertical === vertical);
  }
  
  // Simple text search
  const queryLower = query.toLowerCase();
  results = results.filter(l => 
    l.title.toLowerCase().includes(queryLower) ||
    l.description.toLowerCase().includes(queryLower) ||
    l.category.toLowerCase().includes(queryLower) ||
    l.location.city.toLowerCase().includes(queryLower)
  );
  
  // Apply price filters
  if (filters?.minPrice) {
    results = results.filter(l => l.price && l.price >= (filters.minPrice as number));
  }
  if (filters?.maxPrice) {
    results = results.filter(l => l.price && l.price <= (filters.maxPrice as number));
  }
  
  return results;
}

export async function POST(req: Request) {
  const { messages, vertical }: { messages: UIMessage[]; vertical?: VerticalType } = await req.json();
  
  const verticalContext = vertical 
    ? `The user is currently browsing the "${verticals[vertical].name}" section. Focus your responses on ${verticals[vertical].name.toLowerCase()} listings.`
    : 'The user is searching across all categories.';

  const result = streamText({
    model: 'openai/gpt-5-mini',
    system: `You are a helpful AI assistant for GetLocalAds, a local classifieds platform. 
    
${verticalContext}

Your job is to help users find what they're looking for by:
1. Understanding their natural language queries
2. Searching for relevant listings
3. Providing helpful, concise responses with the most relevant results

When users ask about listings:
- Use the searchListings tool to find relevant results
- Summarize the key findings
- Highlight the best matches based on their criteria
- Suggest refinements if needed

Be friendly, helpful, and concise. Focus on actionable information.`,
    messages: await convertToModelMessages(messages),
    tools: {
      searchListings: tool({
        description: 'Search for listings based on user criteria. Use this when users ask about finding items, properties, jobs, etc.',
        inputSchema: z.object({
          query: z.string().describe('The search query based on user intent'),
          vertical: z.enum(['homes', 'apartments', 'rentals', 'jobs', 'cars', 'hotels', 'restaurants', 'schools', 'events']).nullable().describe('The category to search in'),
          minPrice: z.number().nullable().describe('Minimum price filter'),
          maxPrice: z.number().nullable().describe('Maximum price filter'),
        }),
        execute: async ({ query, vertical: searchVertical, minPrice, maxPrice }) => {
          const results = searchListings(
            query, 
            (searchVertical || vertical) as VerticalType | undefined,
            { minPrice, maxPrice }
          );
          
          return {
            count: results.length,
            listings: results.slice(0, 5).map(l => ({
              id: l.id,
              title: l.title,
              price: l.price,
              priceType: l.priceType,
              location: `${l.location.city}, ${l.location.state}`,
              category: l.category,
              vertical: l.vertical,
              featured: l.featured,
              verified: l.verified,
            })),
            hasMore: results.length > 5,
          };
        },
      }),
      getVerticalInfo: tool({
        description: 'Get information about a specific vertical/category',
        inputSchema: z.object({
          vertical: z.enum(['homes', 'apartments', 'rentals', 'jobs', 'cars', 'hotels', 'restaurants', 'schools', 'events']),
        }),
        execute: async ({ vertical: v }) => {
          const info = verticals[v];
          return {
            name: info.name,
            tagline: info.tagline,
            description: info.description,
            categories: info.categories,
            sampleLocations: info.sampleLocations,
            stats: info.stats,
          };
        },
      }),
    },
    maxSteps: 5,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  });
}
