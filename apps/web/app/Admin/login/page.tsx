"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@repo/ui/button"
import InputBox from "@repo/ui/inputBox";
import Box from "@repo/ui/box"
import axios from "axios";

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/admin/login", {
                username: username,
                password: password
            })
            if(response.status == 200){
                alert(response.data.message);
                localStorage.setItem("token", response.data.token);
                setUsername("");
                setPassword("");
                router.push("/Admin/addQuestion")
            }
            else{
                alert(response.data.message)
            }
        }
        catch (error){
            console.error(error)
        }
    }

    return (
        <>
            <div className="bg-black w-screen min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl mb-12 font-extrabold tracking-wide">DSA Practice</h1>
                <Box heading={"Admin Login"}>
                    <InputBox type={"text"} placeholder={"Username"} value={username} onChange={(event: any) => {setUsername(event.target.value)}} classname={"w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"}/>
                    <InputBox type={"password"} placeholder={"Password"} value={password} onChange={(event: any) => {setPassword(event.target.value)}} classname={"w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"}/>
                    <Button onClick={handleLogin} classname={"w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"}>Login</Button>
                </Box>
            </div>
        </>
    )
}

export default Page;