import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, email, password } = await request.json();
    let recruiter = await prisma.recruiter.findFirst({
        where: {
            email: email,
          },
          select: {
            id: true,
            password: true
          }
    })
    if (recruiter) {
        return NextResponse.json(null);
    }
    recruiter = await prisma.recruiter.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
    return NextResponse.json(recruiter);
}