import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const imageDir = path.resolve('./public/images/lobby');
const imageList = fs.readdirSync(imageDir).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));

export const GET: APIRoute = () => {
  if (imageList.length === 0) {
    return new Response('No images available', { status: 404 });
  } else {
    return new Response(JSON.stringify(imageList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
