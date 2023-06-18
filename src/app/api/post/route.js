import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const post = await prisma.post.findFirst({
    select: {
      id: true,
      name: true,
      recruiterID: true,
      description: true,
      rating1Text: true,
      rating2Text: true,
      rating3Text: true,
      rating4Text: true,
      rating5Text: true,
      applications: {
        select: {
          cv: true,
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
      requirements: {
        select: {
          id: true,
          requirementText: true
        }
      }
    }
  });
  console.log(post);
  return NextResponse.json(post);
}
