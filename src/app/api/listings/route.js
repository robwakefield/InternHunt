import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
    const listings = await prisma.post.findMany()
    return NextResponse.json(listings)
}
