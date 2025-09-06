/**
 * Seed older posts. If OPENAI_API_KEY is set, we call OpenAI to generate
 * short POI-style captions; otherwise use static captions.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_USERS = [
  'mira', 'arjun', 'sofia', 'liam', 'aisha', 'kenji', 'lena', 'omar'
];

const PLACEHOLDERS = [
  'https://picsum.photos/seed/poi1/800/600',
  'https://picsum.photos/seed/poi2/800/600',
  'https://picsum.photos/seed/poi3/800/600',
  'https://picsum.photos/seed/poi4/800/600',
  'https://picsum.photos/seed/poi5/800/600',
  'https://picsum.photos/seed/poi6/800/600',
  'https://picsum.photos/seed/poi7/800/600',
  'https://picsum.photos/seed/poi8/800/600'
];

async function aiCaption(prompt: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You write short, vivid photo captions (max 14 words). No hashtags.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 40
      })
    });
    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null;
  }
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

const OFFLINE_CAPTIONS = [
  'Golden hour over the old fort',
  'Rain-kissed lanes beside the river',
  'Quiet courtyard outside the museum',
  'Street art near the market square',
  'Sunlit steps to the lighthouse',
  'Fog rolling past the hill shrine',
  'Bridge lights after the drizzle',
  'Morning chai by the harbor'
];

async function main() {
  console.log('Seeding Vistagram…');
  await prisma.post.deleteMany();

  const posts: any[] = [];
  for (let i = 0; i < 8; i++) {
    const username = SEED_USERS[i % SEED_USERS.length];
    const imageUrl = PLACEHOLDERS[i % PLACEHOLDERS.length];
    const prompt = `Write a short, lively caption for a tourist photo at a point of interest. Keep it under 14 words.`;
    const ai = await aiCaption(prompt);
    const caption = ai || OFFLINE_CAPTIONS[i % OFFLINE_CAPTIONS.length];

    posts.push({
      username,
      imageUrl,
      caption,
      createdAt: daysAgo(2 * (8 - i)),
      likes: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 5)
    });
  }

  await prisma.post.createMany({ data: posts });
  console.log('Seed complete.');
}

main().finally(async () => prisma.$disconnect());
