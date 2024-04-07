import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const questions = await prisma.questions.findMany({
            include: {
                driverCode: true,
                userCode: true,
                solution: true
            }
        })
        if(!questions){
            return NextResponse.json({
                message: "Not able to fetch questions"
            })
        }
        return NextResponse.json({
            message: "Questions fetched successfully",
            questions: questions
        })
    } catch (error) {
        console.error('Error during fetching problems:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
