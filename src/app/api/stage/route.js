import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

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