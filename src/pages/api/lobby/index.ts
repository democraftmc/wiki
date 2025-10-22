import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const imageDir = path.resolve('./public/images/lobby');
const imageList = fs.readdirSync(imageDir).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));

export const GET: APIRoute = () => {
  if (imageList.length === 0) {
    return new Response('No images available', { status: 404 });
  }

  const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

  const filePath = path.resolve(`./public/images/lobby/${randomImage}`);

  try {
    const file = fs.readFileSync(filePath);
    const ext = path.extname(randomImage).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };

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
