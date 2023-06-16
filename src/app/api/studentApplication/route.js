import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { postID, studentID } = await request.json()
  const student = await prisma.application.findFirst({
    where: {
      postID: postID,
      studentID: studentID
    },
    select: {
      cv: true,
      submitted: true,
      extractedCV: true,
      evidences: {
        select: {
          requirementID: true,
          requirement: {
            select: {
              requirementText: true
            }
          },
          evidenceText: true
        }
      },
      post: {
        select: {
          name: true,
          description: true
        }
      }
    }
  });

  return NextResponse.json(student);
}

export async function PUT(request) {
  const { postID, studentID, requirementID, evidenceText } = await request.json()
  await prisma.evidence.update({
    where: {
      postID_requirementID_studentID: { postID: postID, requirementID: requirementID, studentID: studentID }
    },
    data: {
      evidenceText: evidenceText
    }
  });
  return NextResponse.json({});
}