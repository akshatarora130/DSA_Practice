"use client"

import { useRouter } from 'next/navigation';
import {useState} from "react";

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const handleAllQuestions = () => {
        router.push('/Admin/allQuestions');
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value)
    };

    const handleNext = () => {
        // @ts-ignore
        localStorage.setItem("name", name)
        // @ts-ignore
        localStorage.setItem("description", description)
        router.push("/Admin/addQuestion/boilerPlate")
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-300">
                <h1 className="text-4xl font-extrabold tracking-wide">DSA Practice</h1>
                <button onClick={handleAllQuestions} className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    All Questions
                </button>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center px-6">
                <h1 className="text-4xl font-extrabold tracking-wide mb-5">Add a new Question</h1>
                <input
                    type="text"
                    placeholder="Problem Name"
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
                />
                <textarea
                    placeholder="Description of the question"
                    onChange={handleDescriptionChange}
                    className="w-full px-4 py-3 mt-4 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black resize-none min-h-64"
                />
                <button onClick={handleNext} className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
