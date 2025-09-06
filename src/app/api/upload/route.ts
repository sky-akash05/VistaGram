import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { saveFile } from '@/lib/upload';

export const runtime = 'nodejs'; // we use fs, so keep Node runtime

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 👇 match your <input name="..."> fields from UploadForm
    const file = formData.get('image');
    const username = formData.get('username');
    const caption = formData.get('caption');

    // Basic validation + ensure we actually got a File object
    if (!file || typeof file === 'string' || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Save the image to /public/uploads and get the public path
    const imageUrl = await saveFile(file);

    // Persist the post
    const created = await prisma.post.create({
      data: {
        username: username.slice(0, 24),
        caption: typeof caption === 'string' ? caption.slice(0, 280) : '',
        imageUrl,
      },
    });

    return NextResponse.json({ post: created }, { status: 201 });
  } catch (err: any) {
    console.error('Upload failed:', err);
    return NextResponse.json(
      { error: err?.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
