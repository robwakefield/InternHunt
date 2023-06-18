import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const {  email } = await request.json();
    const student = await prisma.student.findFirst({
        where: {
            email: email,
          },
          select: {
            id: true,
            password: true
          }
    })
    return NextResponse.json(student);
}