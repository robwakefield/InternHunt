import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Returns all applications for student
    const { userType, id } = await request.json();
    let client = null;
    if (userType === "Student") {
        client = prisma.student
    } else if (userType === "Recruiter"){
        client = prisma.recruiter
    }
        const user = await client.findUnique({
            select: {
                name: true
            },
            where: {
                id: id
                
            }
        })
        return NextResponse.json(user)
    }
    