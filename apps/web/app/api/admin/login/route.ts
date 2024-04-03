import { NextResponse } from 'next/server';
import {ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET} from "@repo/common/src";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(ADMIN_USERNAME)
        if(data.username == ADMIN_USERNAME){
            if(data.password == ADMIN_PASSWORD){
                const username = data.username
                const token = jwt.sign({username} , JWT_SECRET || 'SERCRET')
                return NextResponse.json({
                    message: "Login Successfull",
                    token: token
                }, {status: 200})
            }
            else{
                return NextResponse.json({
                    message: "Make sure to have right password"
                },{status: 404})
            }
        }
        else {
            return NextResponse.json({
                message: "Make sure to have right username"
            }, {status: 404})
        }

    } catch (error) {
        console.error('Error during Login:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
