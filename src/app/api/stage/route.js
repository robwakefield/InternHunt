import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.application.findMany({
    select: {
      postID: true,
      studentID: true,
      stages: {
        id: true,
        stageText: true
      }
    }
  })
  return NextResponse.json(listings)
}

// Completes and dates  a stage
export async function PUT(request) {
    const body = await request.json()
    // body = {postID, studentID, stageID, completed, date}
    const alreadyCompleted = await prisma.stage.findUnique({
        select: {
            completed: true
        },
        where: {
            postID_studentID_id: {
                postID: body.postID,
                studentID: body.studentID,
                id: body.stageID
            }
        }
    })
    if (body.override || !alreadyCompleted.completed) {
        const stage = await prisma.stage.update({
            data: {
                completed: body.completed,
                date: body.date
            },
            where: {
                postID_studentID_id: {
                    postID: body.postID,
                    studentID: body.studentID,
                    id: body.stageID
                }
            }
        })
        return NextResponse.json(stage);
    } else {
        return NextResponse.json(alreadyCompleted);
    }
}

export async function POST(request) {
    const body = await request.json();
    await prisma.stage.create({
      data: {
        post: {
          connect: {
            id: body.postID
          }
        }
      }
    });
    return NextResponse.json({});
  }