import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const student = await prisma.student.findFirst();
  return NextResponse.json(student);
}

export async function PUT(request) {
  const { language, maths } = await request.json();
  await prisma.student.update({
    where: {
      id: 1
    },
    data: {
      language: language,
      maths: maths
    }
  });
  return NextResponse.json({});
}