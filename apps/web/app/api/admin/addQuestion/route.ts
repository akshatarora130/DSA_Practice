import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const question = await prisma.questions.create({
            data: {
                name: data.name,
                tag: data.tag,
                description: data.description,
                topics: data.topics,
                arguments: data.arguments,
                testcases: data.testcases,
                driverArgument: "",
            }
        })
        if(!question){
            return NextResponse.json({
                message: "Question not added to database"
            }, {status: 404})
        }
        return NextResponse.json({
            message: "Question added to database",
            question: question
        }, {status: 200})
    } catch (error) {
        console.error('Error during Login:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
