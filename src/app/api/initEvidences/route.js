import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request, { params, }) {
    const { postID, studentID, requirementID } = await request.json();
    const post = await prisma.evidence.create({
        data: {
            postID: postID,
            studentID: studentID,
            requirementID: requirementID
        }

    });
    return NextResponse.json(post);
  }