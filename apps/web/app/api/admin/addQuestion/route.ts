import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/common/src";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        jwt.verify(data.token, JWT_SECRET || "", (err: any) => {
            if(err){
                return NextResponse.json({
                    message: "Login to add new Problem"
                }, {status: 401})
            }
        })
        const question = await prisma.questions.create({
            data: {
                name: data.name,
                difficulty: data.difficulty,
                description: data.description,
                topics: data.topics,
                arguments: data.arguments,
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
        console.error('Error during adding problem:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
