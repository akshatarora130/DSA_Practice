"use client"

import Header from "../../components/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        const verify = async () => {
            const response = await axios.post("/api/admin/verify", {
                token: localStorage.getItem("token")
            })
            if(response.status == 200){
                setVerified(true)
            }
        }
        verify()
    }, []);

    const handleLogin = () => {
        router.push("/Admin/login")
    }

    const handleLogout = () => {
        router.push("/Admin/login")
        localStorage.removeItem("token")
    }

    return(
        <>
            <div className="bg-black w-screen min-h-screen flex flex-col text-white">
                <Header
                    verified={verified}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                />
                <button onClick={() => router.push("/Admin/addQuestion")}>Add question</button>
            </div>
        </>
    )
}

export default Page;