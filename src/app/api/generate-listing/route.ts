import { generateText, Output } from 'ai';
import { z } from 'zod';
import { verticals, type VerticalType } from '@/lib/verticals';

export const maxDuration = 30;

const listingDescriptionSchema = z.object({
  title: z.string().describe('A compelling, SEO-friendly title for the listing (max 80 characters)'),
  description: z.string().describe('A detailed, engaging description (150-300 words)'),
  highlights: z.array(z.string()).describe('3-5 key highlights/features as bullet points'),
  tags: z.array(z.string()).describe('5-8 relevant tags for searchability'),
});

export async function POST(req: Request) {
  const {
    vertical,
    keyPoints,
    tone = 'professional',
    location,
    price,
    category,
  }: {
    vertical: VerticalType;
    keyPoints: string[];
    tone: 'professional' | 'casual' | 'urgent';
    location?: string;
    price?: number;
    category?: string;
  } = await req.json();

  const verticalInfo = verticals[vertical];

  const toneInstructions = {
    professional: 'Write in a professional, trustworthy tone. Use complete sentences and proper grammar.',
    casual: 'Write in a friendly, conversational tone. Be approachable and relatable.',
    urgent: 'Create a sense of urgency. Emphasize limited availability, great value, or time-sensitive nature.',
  };

  const result = await generateText({
    model: 'openai/gpt-5-mini',
    prompt: `You are an expert copywriter for classified ads specializing in ${verticalInfo.name.toLowerCase()}.

Generate a compelling listing based on the following information:

Category: ${verticalInfo.name}
${category ? `Subcategory: ${category}` : ''}
${location ? `Location: ${location}` : ''}
${price ? `Price: $${price.toLocaleString()}` : ''}

Key Points:
${keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Tone: ${toneInstructions[tone]}

Guidelines:
- Title should be catchy and include the most important detail (location, price, or key feature)
- Description should paint a picture and address buyer concerns
- Highlights should be scannable and focus on unique selling points
- Tags should include relevant keywords for search discoverability
- Be specific and avoid generic phrases like "great opportunity" without context

Generate the listing content now.`,
    output: Output.object({ schema: listingDescriptionSchema }),
  });

  return Response.json({
    success: true,
    data: result.object,
  });
}
