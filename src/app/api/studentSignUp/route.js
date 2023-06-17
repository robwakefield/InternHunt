import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, email, password } = await request.json();
    const student = await prisma.student.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
    return NextResponse.json(student);
}