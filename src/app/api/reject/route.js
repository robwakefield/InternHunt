import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request, {params,}) {
    const searchParams = new URL(request.url).searchParams
    const studentId = parseInt(searchParams.get('studentId'))
    const postId = parseInt(searchParams.get('postId'))
    const student = await prisma.application.findFirst({
        where: {
            postID: postId,
            studentID: studentId
        }
    })
    return NextResponse.json(student);
}