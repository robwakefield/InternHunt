import { prisma } from '../../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request, {params,}) {
    // Returns all applications for student
    const studentId = parseInt(params.studentId)
    const applications = await prisma.application.findMany({
        select: {
            studentID: true,
            postID: true,
            rejected: true,
            accepted: true,
            submitted: true,
            post: {
                select: {
                    id: true,
                    name: true,
                    deadline: true
                }
            },
            stages: {
                select: {
                    stageText: true,
                    date: true,
                    completed: true,
                    id: true
                }
            },
            interview: {
                select: {
                    date: true,
                    description: true,
                    location: true,
                    completed: true
                }
            }
        },
        where: {
            studentID: studentId
        }
    })
    return NextResponse.json(applications)
}