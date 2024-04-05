"use client"

import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "../../../../components/Header";
import AddProblemStatement from "../../../../components/AddProblemStatement";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split('/');
    const questionId = path[path.length - 1];

    const [question, setQuestion] = useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
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

        const fetchQuestion = async () => {
            try {
                const response = await axios.post('/api/admin/fetchQuestion', {
                    id: questionId,
                });
                const fetchedQuestion = response.data.question;
                setQuestion(fetchedQuestion);
                setName(response.data.question.name);
                setDescription(response.data.question.description);
                setDifficulty(response.data.question.difficulty);

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

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };

    const handleDifficultyChange = (event: any) => {
        setDifficulty(event.target.value);
    };

    const handleEditProblemStatement = async () => {
        const response = await axios.post("/api/admin/editQuestion/problemStatement", {
            id: questionId,
            name: name,
            description: description,
            difficulty: difficulty
        })
        if(response.status == 200){
            router.push(`/Admin/editQuestion/${questionId}`)
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
            <main className="flex flex-col items-center justify-center px-6 py-8 space-y-8">
                <h1 className="text-4xl font-extrabold tracking-wide">Edit Problem Statement</h1>
                <AddProblemStatement
                    handleNameChange={handleNameChange}
                    handleDescriptionChange={handleDescriptionChange}
                    handleDifficultyChange={handleDifficultyChange}
                    name={name}
                    description={description}
                    difficulty={difficulty}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleEditProblemStatement}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Edit Problem
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Page;