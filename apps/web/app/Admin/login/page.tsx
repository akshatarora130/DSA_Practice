"use client"

import {useState} from "react";
import {ADMIN_PASSWORD, ADMIN_USERNAME} from "@repo/common/src";
import {useRouter} from "next/navigation";
import Button from "@repo/ui/button"
import InputBox from "@repo/ui/inputBox";
import Box from "@repo/ui/box"

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = () => {
        if(username == "akshatarora130"){
            if(password == "123456"){
                router.push("/Admin/addQuestion")
            }
            else{
                setPassword("");
                alert("Wrong Password")
            }
        }
        else {
            setUsername("");
            setPassword("");
            alert("Enter valid username")
        }
    }

    return (
        <>
            <div className="bg-black w-screen min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl mb-12 font-extrabold tracking-wide">DSA Practice</h1>
                <Box heading={"Admin Login"}>
                    <InputBox type={"text"} placeholder={"Username"} value={username} onChange={(event: any) => {setUsername(event.target.value)}}/>
                    <InputBox type={"password"} placeholder={"Password"} value={password} onChange={(event: any) => {setPassword(event.target.value)}}/>
                    <Button onClick={handleLogin}>Login</Button>
                </Box>
            </div>
        </>
    )
}

export default Page;