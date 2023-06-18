import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findFirst({
    where: {
      status: "Draft"
    },
    select: {
      id: true,
      name: true,
      description: true,
      requirements: {
        select: {
          id: true,
          requirementText: true
        }
      }
    }
  })
  return NextResponse.json(listings)
}

export async function POST(request) {
  const body = await request.json();
  await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      status: "Applications Open"
    }
  });
  return NextResponse.json({});
}

export async function PUT(request) {
  const body = await request.json();
  const deadlineDateTime = new Date(body.deadline);
  
  const updateData = {
    name: body.name,
    description: body.description,
    deadline: deadlineDateTime
  };

  // if (body.totalPlaces) {
  //   updateData.totalPlaces = parseInt(body.totalPlaces);
  // }
  
  await prisma.post.update({
    where: {
      id: body.id
    },
    data: updateData
  });
  return NextResponse.json({});
}