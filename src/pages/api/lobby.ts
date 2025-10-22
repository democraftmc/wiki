import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const IMAGE_DIR = path.resolve('./public/images/lobby');

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

export const GET: APIRoute = () => {
  let files: string[] = [];

  try {
    // Read directory at request-time to avoid build-time file system access
    const all = fs.readdirSync(IMAGE_DIR);
    files = all.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
  } catch (err) {
    return new Response('No images available', { status: 404 });
  }

  if (files.length === 0) {
    return new Response('No images available', { status: 404 });
  }

  const randomImage = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(IMAGE_DIR, randomImage);

  try {
    const file = fs.readFileSync(filePath);
    const ext = path.extname(randomImage).toLowerCase();

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    return new Response('Error loading image', { status: 500 });
  }
};
