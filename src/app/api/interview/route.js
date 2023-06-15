import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const body = await request.json()
    // Create or update the interview
    const interview = await prisma.application.update({
        data: {
            interview: {
                upsert: {
                    create: {
                        date: body.date,
                        description: body.description,
                        location: body.location
                    },
                    update: {
                        date: body.date,
                        description: body.description,
                        location: body.location
                    }
                },
            }
        },
        where: {
            postID_studentID: {
                postID: body.postID,
                studentID: body.studentID
            }
        }
    })
    return NextResponse.json(interview);
}