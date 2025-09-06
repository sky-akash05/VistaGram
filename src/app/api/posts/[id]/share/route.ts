import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const updated = await prisma.post.update({
    where: { id: params.id },
    data: { shares: { increment: 1 } }
  });

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/p/${updated.id}`;
  return NextResponse.json({ post: updated, shareUrl });
}
