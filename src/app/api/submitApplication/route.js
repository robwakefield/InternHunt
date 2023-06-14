import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const { postID, studentID} = await request.json()
    await prisma.application.update({
      where: {
        postID_studentID: { postID: postID, studentID: studentID }
      },
      data: {
        submitted: true
      }
    });
    return NextResponse.json({});
  }