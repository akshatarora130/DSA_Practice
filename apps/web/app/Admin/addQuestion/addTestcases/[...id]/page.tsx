"use client"

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Header from "../../../../components/Header";
import { placeHolder } from "../../../../utils/placeHolder";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];
    const [question, setQuestion] = useState<any>(null);
    const [verified, setVerified] = useState(false);
    const [inputValues, setInputValues] = useState<any>({});
    const [outputValue, setOutputValue] = useState<string>('');

    useEffect(() => {
        const verify = async () => {
            const response = await axios.post("/api/admin/verify", {
                token: localStorage.getItem("token")
            });
            if (response.status === 200) {
                setVerified(true);
            }
        };
        verify();

        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                setQuestion(response.data.question);
                const initialValues: any = {};
                Object.keys(response.data.question.arguments.input).forEach((key) => {
                    initialValues[key] = '';
                });
                setInputValues(initialValues);
                setOutputValue('');
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };
        fetchQuestion();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputValues((prevValues: any) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutputValue(e.target.value);
    };

    const handleLogin = () => {
        router.push("/Admin/login");
    };

    const handleLogout = () => {
        router.push("/Admin/login");
        localStorage.removeItem("token");
    };

    const handleAddTestcase = async () => {
        const testCase = {
            input: inputValues,
            output: outputValue,
        };
        const updatedTestcases = [...question.testcases, testCase];
        const response = await axios.post("/api/admin/addQuestion/addTestcase", {
            id: questionId,
            testcases: updatedTestcases
        })
        if(response.status == 200){
            router.push(`/Admin/editQuestion/${questionId}`)
        }
        alert(response.data.message)
    };

    if (!question) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
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
            <main className="container mx-auto px-4 py-8">
                <center><h1 className="text-4xl font-bold mb-6">Add Testcase</h1></center>
                <div className="bg-gray-800 rounded-lg p-4 space-y-4 mb-8">
                    <h2 className="text-2xl font-semibold mb-2 text-white">Input</h2>
                    {Object.entries(question.arguments.input).map(([key, value]) => (
                        <div key={key} className="flex items-center mb-2 ml-4">
                            <div className="w-24 text-lg text-white ">{key}</div>
                            <input
                                id={key}
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                                // @ts-ignore
                                placeholder={placeHolder(value)}
                                value={inputValues[key]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                </div>
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Output</h2>
                    <div className="flex items-center mb-4">
                        <input
                            id={"output"}
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700 ml-4"
                            placeholder={placeHolder(question.arguments.output)}
                            value={outputValue}
                            onChange={handleOutputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleAddTestcase}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add TestCase
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Page;
