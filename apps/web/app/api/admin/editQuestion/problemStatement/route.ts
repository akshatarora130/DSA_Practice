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
                name: data.name,
                description: data.description,
                difficulty: data.difficulty
            },
        })
        if(!question){
            return NextResponse.json({
                message: "Question not updated"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "Question Updated in database",
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
