import PostCard from '@/components/PostCard';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
  const p = await prisma.post.findUnique({ where: { id: params.id } });
  if (!p) return notFound();
 
  return <PostCard post={{ ...p, createdAt: p.createdAt.toISOString() }} />;
}
