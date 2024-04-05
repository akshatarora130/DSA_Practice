"use client"

import React, { useEffect, useState } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Header from '../../../../components/Header';
import EditorComponent from '../../../../components/EditorComponent';
import axios from 'axios';
import ProblemStatement from "../../../../components/ProblemStatement";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];
    const [question, setQuestion] = useState<any>(null);
    const [userCode, setUserCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('java');
    const [size, setSize] = useState(12);
    const [javaCode, setJavaCode] = useState(false);
    const [cppCode, setCppCode] = useState(false);
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                setQuestion(response.data.question);
                if(response.data.question.userCode){
                    response.data.question.userCode.map((uc: any) => {
                        if(uc.language == 'java'){
                            setJavaCode(true);
                        }
                        if(uc.language == 'cpp'){
                            setCppCode(true);
                        }
                    })
                }
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

    const handleLanguageChange = (event: any) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSizeChange = (event: any) => {
        setSize(Number(event.target.value));
    };

    const handleUserCodeChange = (value: string) => {
        setUserCode(value);
    };

    const handleAddUserCode = async () => {
        if(userCode == ''){
            alert("Write driver code ");
            return;
        }
        if(javaCode && selectedLanguage == 'java'){
            alert("User code for java already added");
            return;
        }
        if(cppCode && selectedLanguage == 'cpp'){
            alert("User code for c++ already added");
            return;
        }
        const response = await axios.post("/api/admin/addQuestion/addUserCode", {
            language: selectedLanguage,
            code: userCode,
            questionId: questionId
        })
        console.log(response);
        if(response.status == 200){
            setUserCode('');
            if(response.data.userCode.language == 'java'){
                setJavaCode(true);
            }
            if(response.data.userCode.language == 'cpp'){
                setCppCode(true);
            }
            router.push(`/Admin/editQuestion/${questionId}`)
        }
        alert(response.data.message);
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
            <div className="flex flex-col lg:flex-row flex-grow justify-between">
                <ProblemStatement
                    question={question}
                    userOrDriver={"User"}
                />
                <EditorComponent
                    selectedLanguage={selectedLanguage}
                    size={size}
                    code={userCode}
                    handleLanguageChange={handleLanguageChange}
                    handleSizeChange={handleSizeChange}
                    handleCodeChange={handleUserCodeChange}
                    handleAddCode={handleAddUserCode}
                    javaCode={javaCode}
                    cppCode={cppCode}
                    userOrDriver={"User"}
                />
            </div>
        </div>
    );
};

export default Page;
