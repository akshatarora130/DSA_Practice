import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const driverCode = await prisma.solution.create({
            data: {
                language: data.language,
                code: data.code,
                questionsId: parseInt(data.questionId),
            },
        })
        if(!driverCode){
            return NextResponse.json({
                message: "Solution not added"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "Solution added",
            driverCode: driverCode
        }, {status: 200})
    } catch (error) {
        console.error('Error during adding Solution:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
