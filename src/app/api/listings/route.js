import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findMany({
    select: {
      id: true,
      recruiterID: true,
      name: true,
      status: true,
      description: true,
      deadline: true,
      applications: {
        select: {
          postID: true,
          studentID: true,
          submitted: true
        }
      }
    }
  })
  return NextResponse.json(listings)
}

export async function POST(request) {
  const body = await request.json();
  await prisma.post.create({
    data: {
      name: body.name,
      status: "Draft",
      description: "",
      recruiterID: body.recruiterId
    }
  });
  return NextResponse.json({});
}