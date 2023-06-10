import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json()
  const student = await prisma.application.findFirst({
    where: {
      postID: body.postID,
      studentID: body.studentID
    },
    select: {
      evidences: {
        select: {
          requirement: {
            select: {
              requirementText: true
            }
          },
          evidenceText: true
        }
      }
    }
  });

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