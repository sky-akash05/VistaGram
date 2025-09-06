import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Body: { op: 'like' | 'unlike' }
 * Increments/decrements like count and returns updated post
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { op } = await req.json();
  if (!['like', 'unlike'].includes(op)) {
    return NextResponse.json({ error: 'Invalid op' }, { status: 400 });
  }

  const delta = op === 'like' ? 1 : -1;

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: { likes: { increment: delta } }
  });

  return NextResponse.json({ post: updated });
}
