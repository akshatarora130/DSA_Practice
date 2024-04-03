"use client"

import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [boilerPlate, setBoilerPlate] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("java");

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
        setDescription(localStorage.getItem("description") || "");
    }, []);

    const handleAllQuestions = () => {
        router.push('/Admin/allQuestions');
    };

    const handleLanguageChange = (event: any) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="flex items-center justify-between px-6 py-4 border-b-2 border-white">
                <h1 className="text-4xl font-extrabold tracking-wide">DSA Practice</h1>
                <button onClick={handleAllQuestions} className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    All Questions
                </button>
            </header>
            <main className="flex flex-col lg:flex-row flex-grow justify-between">
                <section className="w-full lg:w-1/3 px-6 py-8 lg:py-0">
                    <h1 className="text-2xl font-bold mb-4 mt-8">Write the boilerplate for the problem</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">{name}</h2>
                        <p className="text-gray-400">{description}</p>
                    </div>
                    <button className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8">
                        Add Problem
                    </button>
                </section>
                <section className="w-full lg:w-2/3 px-6 py-8">
                    <div className="flex items-center mb-4">
                        <label className="mr-4">Select Language:</label>
                        <select
                            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-black"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                        </select>
                    </div>
                    <div className="editor-container bg-gray-900 rounded-lg shadow-xl overflow-hidden border-gray-300 border-2">
                        <Editor
                            className="w-full h-full"
                            height="75vh"
                            width="100%"
                            language={selectedLanguage}
                            theme="vs-dark"
                            value={boilerPlate}
                            onChange={(value, ev) => {
                                // @ts-ignore
                                setBoilerPlate(value);
                            }}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Page;
