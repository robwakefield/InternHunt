import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const student = await prisma.student.findFirst();
    return NextResponse.json(student);
}