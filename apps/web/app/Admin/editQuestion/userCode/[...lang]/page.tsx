"use client"

import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "../../../../components/Header";
import Editor from "@monaco-editor/react";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];
    const lang = path[path.length-2];

    const [question, setQuestion] = useState('');
    const [verified, setVerified] = useState(false)
    const [code, setCode] = useState('');
    const [id, setId] = useState('');

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

        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                const fetchedQuestion = response.data.question;
                setQuestion(fetchedQuestion);
                fetchedQuestion.userCode.forEach((uc: any) => {
                    if (uc.language === lang) {
                        setCode(uc.code)
                        setId(uc.id)
                    };
                });
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };
        fetchQuestion();
    }, []);

    const handleLogin = () => {
        router.push("/Admin/login")
    }

    const handleLogout = () => {
        router.push("/Admin/login")
        localStorage.removeItem("token")
    }

    const handleCodeChange = (value:any, ev:any) => {
        setCode(value);
    }

    const handleEditUserCode = async () => {
        const response = await axios.post("/api/admin/editQuestion/userCode", {
            id: id,
            code: code
        })

        if(response.status == 200){
            router.push(`/Admin/editQuestion/${questionId}`);
        }
        alert(response.data.message);
    }

    if(!question){
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
            <main className="flex flex-col px-6 py-8 space-y-8">
                <h1 className="text-4xl font-extrabold tracking-wide">Edit {lang} User Code</h1>
                <div className="editor-container bg-gray-900 rounded-lg shadow-xl overflow-hidden border-gray-300 border-2">
                    <Editor
                        className="w-full h-full"
                        height="65vh"
                        width="100%"
                        language={lang}
                        theme="vs-dark"
                        value={code}
                        options={{
                            fontSize: 16,
                        }}
                        onChange={handleCodeChange}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleEditUserCode}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Edit User Code
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Page;