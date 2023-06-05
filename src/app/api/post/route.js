import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const post = await prisma.post.findFirst();
  return NextResponse.json(post);
}
