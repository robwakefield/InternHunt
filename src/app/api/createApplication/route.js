import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

const stages = [
  "Started Application",
  "Upload CV",
  "Submit Application",
  "Application Viewed",
  "Interview"
];

export async function POST(request) {
  const { postID, studentID } = await request.json();

  const application = await prisma.application.create({
    data: {
      postID: postID,
      studentID: studentID
    }
  });

  const post = await prisma.post.findFirst({
    where: {
      id: postID
    },
    select: {
      requirements: {
        select: {
          id: true
        }
      }
    }
  });

  post.requirements.forEach(async (requirement) => {
    await prisma.evidence.create({
      data: {
        postID: postID,
        studentID: studentID,
        requirementID: requirement.id
      }
    });
  });

  stages.forEach(async (stage, i) => {
    await prisma.stage.create({
      data: {
        postID: postID,
        studentID: studentID,
        id: i,
        stageText: stage
      }
    });
  })
  return NextResponse.json(application);
}
