import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const question = await prisma.questions.findFirst({
            where: {
                id: parseInt(data.id)
            },
            include: {
                driverCode: true,
                userCode: true
            }
        })
        if(!question){
            return NextResponse.json({
                message: "No question with this id found"
            })
        }
        return NextResponse.json({
            message: "Question fetched successfully",
            question: question
        })
    } catch (error) {
        console.error('Error during fetching problem:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
