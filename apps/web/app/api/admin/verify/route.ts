import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/common/src";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        jwt.verify(data.token, JWT_SECRET || "", (err: any) => {
            if(err){
                return NextResponse.json({
                    message: "Login to verify"
                }, {status: 401})
            }
        })
        return NextResponse.json({
            message: "User is verified",
            verified: true
        }, {status: 200})
    } catch (error) {
        console.error('Error while verifying :', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
