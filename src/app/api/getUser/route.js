import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request) {
    // Returns all applications for student
    const body = await request.json()
    const applications = await prisma.user.findUnique({
        select: {
            studentID: true,
            postID: true,
            rejected: true,
            accepted: true,
            submitted: true,
        },
        where: {
            studentID: body.studentId
            
        }
    })
    return NextResponse.json(applications)
}