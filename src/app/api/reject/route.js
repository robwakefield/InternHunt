import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request) {
    const body = await request.json()
    const student = await prisma.application.findFirst({
        where: {
            postID_studentID: {
                postID: body.postID,
                studentID: body.studentID
            }
        }
    })
    return NextResponse.json(student);
}

export async function PUT(request) {
    const body = await request.json()
    const student = await prisma.application.update({
        data: {
            rejected: true,
            accepted: false
        },
        where: {
            postID_studentID: {
                postID: body.postID,
                studentID: body.studentID
            }
        }
    })
    return NextResponse.json(student);
}