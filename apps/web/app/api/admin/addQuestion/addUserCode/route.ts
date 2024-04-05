import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userCode = await prisma.userCode.create({
            data: {
                language: data.language,
                code: data.code,
                questionsId: parseInt(data.questionId),
            },
        })
        if(!userCode){
            return NextResponse.json({
                message: "User code not added"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "User code added",
            userCode: userCode
        }, {status: 200})
    } catch (error) {
        console.error('Error during adding User code:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
