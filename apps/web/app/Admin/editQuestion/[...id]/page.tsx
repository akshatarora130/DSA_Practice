"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/Header';

interface Question {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    topics: string[];
    arguments: {
        input: Record<string, any>;
        output: string;
    };
    publishable: boolean;
    driverCode: { language: string; code: string }[];
    solution: { language: string; code: string }[];
    userCode: { language: string; code: string }[];
    testcases: { input: Record<string, any>; output: string }[];
    questionNum: number
}

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];

    const [verified, setVerified] = useState(false);
    const [question, setQuestion] = useState<Question | null>(null);
    const [cppDriverCode, setCppDriverCode] = useState('');
    const [javaDriverCode, setJavaDriverCode] = useState('');
    const [cppUserCode, setCppUserCode] = useState('');
    const [javaUserCode, setJavaUserCode] = useState('');
    const [javaSolution, setJavaSolution] = useState('');
    const [cppSolution, setCppSolution] = useState('');
    const [published, setPublished] = useState(false);
    const [desc, setDesc] = useState<String[]>([])

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.post('/api/admin/verify', {
                    token: localStorage.getItem('token'),
                });
                if (response.status === 200) {
                    setVerified(true);
                }
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        };
        verifyUser();

        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                const fetchedQuestion: Question = response.data.question;
                setQuestion(fetchedQuestion);
                setPublished(response.data.question.Publishable);
                setDesc(response.data.question.description.split("\n"));
                console.log(response.data.question.Publishable);
                fetchedQuestion.driverCode.forEach((dc) => {
                    if (dc.language === 'java') setJavaDriverCode(dc.code);
                    if (dc.language === 'cpp') setCppDriverCode(dc.code);
                });
                fetchedQuestion.userCode.forEach((uc) => {
                    if (uc.language === 'java') setJavaUserCode(uc.code);
                    if (uc.language === 'cpp') setCppUserCode(uc.code);
                });
                fetchedQuestion.solution.forEach((s) => {
                    if (s.language === 'java') setJavaSolution(s.code);
                    if (s.language === 'cpp') setCppSolution(s.code);
                });
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };
        fetchQuestion();
    }, []);

    const handleLogin = () => {
        router.push('/Admin/login');
    };

    const handleLogout = () => {
        router.push('/Admin/login');
        localStorage.removeItem('token');
    };

    const handleDeleteTestcase = async (index: number) => {
        const updatedTestcases = question?.testcases ? [...question.testcases] : [];
        updatedTestcases.splice(index, 1);
        const newQuestion = { ...question }; // Create a shallow copy
        if (newQuestion) {
            newQuestion.testcases = updatedTestcases;
            // @ts-ignore
            setQuestion(newQuestion);
        }

        // Make the API call to update the test cases
        const response = await axios.post("/api/admin/addQuestion/addTestcase", {
            id: questionId,
            testcases: updatedTestcases
        });
    };


    const renderTestcases = () => {
        return (
            <div className="bg-gray-900 rounded-md p-6 mb-4">
                <h2 className="text-2xl font-semibold mb-4 text-white">Testcases</h2>
                {question?.testcases.map((testcase, index) => (
                    <div key={`testcase-${index}`} className="mb-6">
                        <div className="bg-gray-800 rounded-md p-4 ">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-white">Testcase {index + 1}</h3>
                                {!published && <button
                                    onClick={() => handleDeleteTestcase(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md focus:outline-none"
                                >
                                    Delete
                                </button>}
                            </div>
                            <div className="flex-col text-white">
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 ml-4">Input</h4>
                                    {Object.entries(testcase.input).map(([key, value]) => (
                                        <div key={key} className="flex items-center mb-2 ml-10">
                                            <div className="w-20 text-lg">{key}:</div>
                                            <div className="flex-1">{value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 ml-4">Output</h4>
                                    <div className="ml-10">{testcase.output}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleEditProblemStatement = () => {
        router.push(`/Admin/editQuestion/problemStatement/${questionId}`);
    };

    const handleEditTopics = () => {
        router.push(`/Admin/editQuestion/topics/${questionId}`);
    };

    const handleEditJavaDriverCode = () => {
        router.push(`/Admin/editQuestion/driverCode/java/${questionId}`)
    };

    const handleAddJavaDriverCode = () => {
        router.push(`/Admin/addQuestion/driverCode/${questionId}`)
    };

    const handleEditCppDriverCode = () => {
        router.push(`/Admin/editQuestion/driverCode/cpp/${questionId}`)
    };

    const handleAddCppDriverCode = () => {
        router.push(`/Admin/addQuestion/driverCode/${questionId}`)
    };

    const handleEditJavaUserCode = () => {
        router.push(`/Admin/editQuestion/userCode/java/${questionId}`)
    };

    const handleAddJavaUserCode = () => {
        router.push(`/Admin/addQuestion/userCode/${questionId}`)
    };

    const handleEditCppUserCode = () => {
        router.push(`/Admin/editQuestion/userCode/cpp/${questionId}`)
    };

    const handleAddCppUserCode = () => {
        router.push(`/Admin/addQuestion/userCode/${questionId}`);
    };

    const handleAddTestcases = () => {
        router.push(`/Admin/addQuestion/addTestcases/${questionId}`);
    };

    const handlePublish = async () => {
        if(question?.name == '' || question?.description == null || question.difficulty == null){
            alert("Complete Problem statement");
            return;
        }
        if(question.topics.length == 0){
            alert("Add topics");
            return;
        }
        if(javaDriverCode == '' || cppDriverCode == ''){
            alert("Complete driver code");
            return;
        }
        if(javaUserCode == '' || cppUserCode == ''){
            alert("Complete usercode");
            return;
        }
        if(javaSolution == '' || cppSolution == ''){
            alert("Complete solution");
            return;
        }
        if(question.testcases.length < 2){
            alert("Add minimum two testcases");
        }
        const response = await axios.post("/api/admin/publishQuestion", {
            id: questionId
        })

        if(response.status == 200){
            router.push(`/Admin/editQuestion/${questionId}`);
        }
        alert(response.data.message);
    };

    const handleAllQuestions = () => {
        router.push("/Admin/allQuestions")
    }

    const handleAddJavaSolution = () => {
        router.push(`/Admin/addQuestion/solution/${questionId}`)
    }

    const handleAddCppSolution = () => {
        router.push(`/Admin/addQuestion/solution/${questionId}`)
    }

    const handleEditJavaSolution = () => {
        router.push(`/Admin/editQuestion/solution/java/${questionId}`);
    }

    const handleEditCppSolution = () => {
        router.push(`/Admin/editQuestion/solution/cpp/${questionId}`);
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
        <div className="bg-black min-h-screen text-white">
            <Header verified={verified} handleLogin={handleLogin} handleLogout={handleLogout} />
            <div className="container mx-auto px-4 py-8 space-y-8">
                <center><h1 className="text-4xl font-bold mb-4">Problem {question.name}</h1></center>
                {question && (
                    <>
                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <u><h1 className="text-3xl font-bold mb-4">Problem Statement</h1></u>
                            <h1 className="text-xl font-bold mb-2 ml-4">{question.questionNum}. {question.name}</h1>
                            <div className="mb-2 ml-4">
                                {desc.map((d) => {
                                    return (
                                        <p className="text-lg">{d}</p>
                                    )
                                })}
                            </div>
                            <p className="text-lg mb-4 ml-4"><b>Difficulty:</b> {question.difficulty}</p>
                            {!published && <button
                                onClick={handleEditProblemStatement}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ml-4"
                            >
                                Edit Problem Statement
                            </button>}
                        </div>

                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <u><h2 className="text-3xl mb-4 font-bold">Topics</h2></u>
                            <div className="flex flex-wrap mb-4 ml-4">
                                {question.topics.map((topic, index) => (
                                    <span
                                        key={`topic-${index}`}
                                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                            {!published && <button
                                onClick={handleEditTopics}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ml-4"
                            >
                                Edit Topics
                            </button>}
                        </div>

                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <u><h2 className="text-3xl mb-4 font-bold"> Types</h2></u>
                            <h2 className="text-xl font-bold ml-4 mb-2">Input Type</h2>
                            {Object.entries(question.arguments.input).map(([key, value]) => (
                                <div key={key} className="mb-2 ml-10">
                                    <span className="font-bold">{key}: </span>
                                    <span>{value}</span>
                                </div>
                            ))}
                            <h2 className="text-xl font-bold mb-2 ml-4">Output Type</h2>
                            <p className="ml-10">{question.arguments.output}</p>
                        </div>

                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Driver Code</h2>
                            <div className="mb-4">
                                {javaDriverCode && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-2">{javaDriverCode}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditJavaDriverCode}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit Java Driver Code
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!javaDriverCode && (
                                    <button
                                        onClick={handleAddJavaDriverCode}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add Java Code
                                    </button>
                                )}
                            </div>
                            <div>
                                {cppDriverCode && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-4">{cppDriverCode}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditCppDriverCode}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit C++ Driver Code
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!cppDriverCode && (
                                    <button
                                        onClick={handleAddCppDriverCode}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add C++ Code
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <h2 className="text-2xl font-bold mb-4">User Code</h2>
                            <div className="mb-4">
                                {javaUserCode && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-2">{javaUserCode}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditJavaUserCode}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit Java Code
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!javaUserCode && (
                                    <button
                                        onClick={handleAddJavaUserCode}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add Java Code
                                    </button>
                                )}
                            </div>
                            <div>
                                {cppUserCode && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-2">{cppUserCode}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditCppUserCode}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit C++ Code
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!cppUserCode && (
                                    <button
                                        onClick={handleAddCppUserCode}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add C++ Code
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Solution</h2>
                            <div className="mb-4">
                                {javaSolution && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-2">{javaSolution}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditJavaSolution}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit Java Solution
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!javaSolution && (
                                    <button
                                        onClick={handleAddJavaSolution}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add Java Solution
                                    </button>
                                )}
                            </div>
                            <div>
                                {cppSolution && (
                                    <div>
                                        <pre className="bg-gray-900 text-white p-4 rounded-md mb-2">{cppSolution}</pre>
                                        <div className="flex mt-2 space-x-2 mb-2 justify-end">
                                            {!published && <button
                                                onClick={handleEditCppSolution}
                                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            >
                                                Edit C++ Solution
                                            </button>}
                                        </div>
                                    </div>
                                )}
                                {!cppSolution && (
                                    <button
                                        onClick={handleAddCppSolution}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                    >
                                        Add C++ Solution
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="bg-black border-2 border-white rounded-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Testcases</h2>
                            {renderTestcases()}
                            <button
                                onClick={handleAddTestcases}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                                Add Testcases
                            </button>
                        </div>
                        <div className="flex gap-4">
                            {!published && <button
                                onClick={handlePublish}
                                className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Publish
                            </button>}
                            <button
                                onClick={handleAllQuestions}
                                className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                All Questions
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default Page;
