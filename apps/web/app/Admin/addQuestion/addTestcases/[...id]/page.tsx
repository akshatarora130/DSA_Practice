"use client"

import React, { useEffect, useState } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import axios from 'axios';
import Header from "../../../../components/Header";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];
    const [question, setQuestion] = useState<any>(null);
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                setQuestion(response.data.question);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        const verify = async () => {
            const response = await axios.post("/api/admin/verify", {
                token: localStorage.getItem("token")
            })
            if(response.status == 200){
                setVerified(true)
            }
        }

        verify()
        fetchQuestion().then(() => {

        });
    }, []);

    const handleLogin = () => {
        router.push("/Admin/login")
    }

    const handleLogout = () => {
        router.push("/Admin/login")
        localStorage.removeItem("token")
    }


    if (!question) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header
                verified={verified}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <div>
                <h1>Testcase</h1>

            </div>
        </div>
    );
};

export default Page;