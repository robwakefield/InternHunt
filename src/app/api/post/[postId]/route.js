import { prisma } from '../../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request, {params,}) {
  const postId = parseInt(params.postId)
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    select: {
      id: true,
      name: true,
      description: true,
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
              notes: true,
              requirement: {
                select: {
                  id: true,
                  requirementText: true
                }
              }
            }
          },
          accepted: true,
          rejected: true,
          submitted: true
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
  return NextResponse.json(post);
}
