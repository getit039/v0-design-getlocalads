import { notFound } from 'next/navigation';
import { isValidVertical, verticalList, getVertical, type VerticalType } from '@/lib/verticals';
import { PostPageClient } from './client';

interface PostPageProps {
  params: Promise<{ vertical: string }>;
}

export async function generateStaticParams() {
  return verticalList.map((v) => ({ vertical: v.id }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { vertical: verticalId } = await params;
  const vertical = getVertical(verticalId);
  
  if (!vertical) {
    return { title: 'Not Found' };
  }

  return {
    title: `Post a ${vertical.name.slice(0, -1)} Listing | GetLocalAds`,
    description: `Create your ${vertical.name.toLowerCase()} listing with AI-powered descriptions.`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { vertical: verticalId } = await params;
  
  if (!isValidVertical(verticalId)) {
    notFound();
  }

  return (
    <PostPageClient verticalId={verticalId as VerticalType} />
  );
}
