import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request, { params, }) {
    const { postID, studentID } = await request.json();
    const application = await prisma.application.create({
        data: {
            postID: postID,
            studentID: studentID       
        }

    });
    return NextResponse.json(application);
  }