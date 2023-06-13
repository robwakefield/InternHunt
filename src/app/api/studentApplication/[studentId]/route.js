import { prisma } from '../../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request, {params,}) {
    // Returns all applications for student
    const studentId = parseInt(params.studentId)
    const applications = await prisma.application.findMany({
        select: {
            studentID: true,
            submitted: true,
            post: {
                select: {
                    id: true,
                    name: true,
                    deadline: true
                }
            }
        },
        where: {
            studentID: studentId
        }
    })
    return NextResponse.json(applications)
}