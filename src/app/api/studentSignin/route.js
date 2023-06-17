import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const {  email, password } = await request.json();
    const student = await prisma.student.findUnique({
        where: {
            email: email,
            password: password
          },
          select: {
            id: true,
          }
    })
    return NextResponse.json({...student, error: student==null});
}