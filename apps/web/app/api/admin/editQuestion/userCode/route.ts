import { NextResponse } from 'next/server';
import {prisma} from "@repo/database";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const question = await prisma.userCode.update({
            where: {
                id: data.id
            },
            data: {
                code: data.code
            },
        })
        if(!question){
            return NextResponse.json({
                message: "DriverCode not updated"
            }, {status: 401})
        }
        return NextResponse.json({
            message: "DroverCode Updated in database",
            question: question
        }, {status: 200})
    } catch (error) {
        console.error('Error during updating DriverCode:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
