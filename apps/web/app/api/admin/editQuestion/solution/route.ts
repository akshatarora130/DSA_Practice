import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const question = await prisma.solution.update({
            where: {
                id: data.id
            },
            data: {
                code: data.code
            },
        })
        if(!question){
            return NextResponse.json({
                message: "Solution not updated"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "Solution Updated in database",
            question: question
        }, {status: 200})
    } catch (error) {
        console.error('Error during updating Solution:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
