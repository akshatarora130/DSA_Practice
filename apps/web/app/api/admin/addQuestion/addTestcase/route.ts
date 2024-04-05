import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const question = await prisma.questions.update({
            where: {
                id: parseInt(data.id)
            },
            data: {
                testcases: data.testcases
            },
        })
        if(!question){
            return NextResponse.json({
                message: "Testcase not added"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "Testcase added",
            question: question
        }, {status: 200})
    } catch (error) {
        console.error('Error during adding Testcase:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
