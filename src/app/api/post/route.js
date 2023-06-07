import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const post = await prisma.post.findFirst({
    select: {
      name: true,
      applications: {
        select: {
          student: {
            select: {
              name: true
            }
          },
          evidences: {
            select: {
              evidenceText: true,
              rating: true,
              requirement: {
                select: {
                  requirementText: true
                }
              }
            }
          }
        }
      },
    }
  });
  return NextResponse.json(post);
}
