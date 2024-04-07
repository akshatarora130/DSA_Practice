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
                Publishable: true
            },
        })
        if(!question){
            return NextResponse.json({
                message: "Question not published"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "Question Published",
            question: question
        }, {status: 200})
    } catch (error) {
        console.error('Error during updating problem:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
