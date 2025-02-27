import { NextResponse } from 'next/server';
import { searchAnimeByImage } from '@/lib/trace-moe';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const results = await searchAnimeByImage(buffer);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in search API route:', error);
    return NextResponse.json({ error: 'Failed to search anime: ' + error.message }, { status: 500 });
  }
}