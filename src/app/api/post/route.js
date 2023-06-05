import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const post = await prisma.post.findFirst();
  post.applications = await prisma.application.findMany({
    where: {
      postID: post.id
    },
    include: {
      student: {
        select: {
          name: true
        }
      }
    }
  });
  return NextResponse.json(post);
}
