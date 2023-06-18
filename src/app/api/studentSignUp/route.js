import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, email, password } = await request.json();
    let student = await prisma.student.findFirst({
        where: {
            email: email,
          },
          select: {
            id: true,
            password: true
          }
    })
    if (student) {
        return NextResponse.json(null);
    }
    student = await prisma.student.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
    return NextResponse.json(student);
}