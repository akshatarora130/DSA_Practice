"use client"

import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import {  useState } from "react";

const Page = () => {
    const router = useRouter();
    const [boilerPlate, setBoilerPlate] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("java");
    const [size, setSize] = useState(12)

    const handleAllQuestions = () => {
        router.push('/Admin/allQuestions');
    };

    const handleLanguageChange = (event: any) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSizeChange = (event: any) => {
        setSize(event.target.value);
    }

    const handleAddBoilePlate = () => {}

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-white">
                <h1 className="text-2xl font-extrabold tracking-wide">DSA Practice</h1>
                <button onClick={handleAllQuestions} className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    All Questions
                </button>
            </div>
            <div className="flex flex-col lg:flex-row flex-grow justify-between">
                <div className="w-full lg:w-1/3 px-6 py-8 lg:py-0">
                    <h1 className="text-2xl font-bold mb-4 mt-8">Write the boilerplate for the problem</h1>
                    <div className="mb-4">
                        // Todo Problem component
                    </div>
                    <button
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
                        onClick={handleAddBoilePlate}
                    >
                        Add Boiler Plate
                    </button>
                </div>
                <div className="w-full lg:w-2/3 px-6 py-8">
                    <div className="flex items-center mb-4 gap-4 justify-end">
                        <div>
                            <label className="mr-4">Language:</label>
                            <select
                                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-black"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                            >
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>
                        <div>
                            <label className="mr-4">Size:</label>
                            <select
                                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-black"
                                value={size}
                                onChange={handleSizeChange}
                            >
                                <option value="12">12px</option>
                                <option value="14">14px</option>
                                <option value="16">16px</option>
                                <option value="18">18px</option>
                                <option value="20">20px</option>
                            </select>
                        </div>
                    </div>
                    <div className="editor-container bg-gray-900 rounded-lg shadow-xl overflow-hidden border-gray-300 border-2">
                        <Editor
                            className="w-full h-full"
                            height="75vh"
                            width="100%"
                            language={selectedLanguage}
                            theme="vs-dark"
                            value={boilerPlate}
                            options={{
                                fontSize: size,
                            }}
                            onChange={(value, ev) => {
                                // @ts-ignore
                                setBoilerPlate(value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
