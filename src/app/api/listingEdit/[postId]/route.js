import { prisma } from '../../../db/client'
import { NextResponse } from 'next/server';

export async function GET(request, {params,}) {
  const listingId = parseInt(params.postId)
  const listings = await prisma.post.findUnique({
    where: {
      id: listingId
    },
    select: {
      id: true,
      name: true,
      totalPlaces: true,
      description: true,
      deadline: true,
      requirements: {
        select: {
          id: true,
          requirementText: true
        }
      }
    }
  })
  return NextResponse.json(listings)
}