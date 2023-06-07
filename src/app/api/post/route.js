import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const post = await prisma.post.findFirst({
    select: {
      id: true,
      name: true,
      rating1Text: true,
      rating2Text: true,
      rating3Text: true,
      rating4Text: true,
      rating5Text: true,
      applications: {
        select: {
          student: {
            select: {
              id: true,
              name: true
            }
          },
          evidences: {
            select: {
              evidenceText: true,
              rating: true,
              requirement: {
                select: {
                  id: true,
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
