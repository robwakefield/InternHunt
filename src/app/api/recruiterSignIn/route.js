import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const {  email } = await request.json();
    const recruiter = await prisma.recruiter.findFirst({
        where: {
            email: email,
          },
          select: {
            id: true,
            password: true
          }
    })
    return NextResponse.json(recruiter);
}