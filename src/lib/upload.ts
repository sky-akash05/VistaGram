import fs from 'fs';
import path from 'path';

export const ensureUploadsDir = () => {
  const dir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

export const saveFile = async (file: File) => {
  const uploadDir = ensureUploadsDir();
  const ext = path.extname(file.name) || '.jpg';
  const name = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
  const dest = path.join(uploadDir, name);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(dest, buffer);

  return `/uploads/${name}`;
};
