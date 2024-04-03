'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('easy');
    const [testcase, setTestcase] = useState('');
    const [testcases, setTestcases] = useState<JSON []>([]);
    const [arg, setArg] = useState('')
    const [topic, setTopic] = useState('');
    const [topics, setTopics] = useState<string []>([]);

    const handleAllQuestions = () => {
        router.push('/Admin/allQuestions');
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event : any) => {
        setDescription(event.target.value);
    };

    const handleTagChange = (event : any) => {
        setTag(event.target.value);
    };

    // @ts-ignore
    const handleTestcaseChange = (value, ev) => {
        setTestcase(value);
    };

    const handleAddTestcase = async () => {
        if(testcase == ''){
            return;
        }
        const newTestCase = await JSON.parse(testcase)
        setTestcases([...testcases, newTestCase]);
        setTestcase("");
    };

    const handleTopicChange = (event: any) => {
        setTopic(event.target.value)
    };

    const handleAddTopic = () => {
        if(topic == ''){
            return ;
        }
        setTopics([...topics, topic])
        setTopic("");
    };

    const handleAddProblem = async () => {
        if(name == ''){
            alert("Enter the problem name");
            return;
        }
        if(description == ''){
            alert("Enter the description of the problem");
            return;
        }
        if(topics.length == 0){
            alert("Add related topic for the problem");
            return;
        }
        if(testcases.length == 0){
            alert("Add atleast 1 test cases");
            return;
        }
        const response = await axios.post("/api/admin/addQuestion", {
            name: name,
            tag: tag,
            description: description,
            topics: topics,
            arguments: JSON.parse(arg),
            testcases: testcases,
        })
        if(response.status == 200){
            alert(response.data.message);
            router.push('/Admin/addQuestion/boilerPlate');
            return;
        }
        alert(response.data.message);
    };

    // @ts-ignore
    const handleArgumentChange = (value, ev) => {
        setArg(value)
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-700">
                <h1 className="text-2xl font-extrabold tracking-wide ">DSA Practice</h1>
                <button
                    onClick={handleAllQuestions}
                    className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                    All Questions
                </button>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8">
                <h1 className="text-4xl font-extrabold tracking-wide -mt-6 mb-2">Add a new Question</h1>
                <div className="flex flex-col md:flex-row md:gap-12 w-full">
                    <input
                        type="text"
                        placeholder="Problem Name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
                    />
                    <div className="flex items-center mt-4 md:mt-0">
                        <label className="mr-4">Difficulty:</label>
                        <select
                            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-black"
                            value={tag}
                            onChange={handleTagChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                <textarea
                    placeholder="Description of the question"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full px-4 py-3 mt-4 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black resize-none min-h-40"
                />
                <div className="w-full mt-4 flex flex-col md:flex-row md:gap-12">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-lg font-semibold mb-2">Arguments Type</h2>
                        <Editor
                            className="rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black resize-none min-h-40"
                            height="25vh"
                            language="json"
                            theme="vs"
                            value={arg}
                            options={{
                                fontSize: 12,
                            }}
                            onChange={handleArgumentChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-end">
                        <h1 className="text-lg font-semibold mb-2">Add Testcases</h1>
                        <div className="relative">
                            <Editor
                                className="rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black resize-none min-h-40"
                                height="25vh"
                                language="json"
                                theme="vs"
                                value={testcase}
                                options={{
                                    fontSize: 12,
                                }}
                                onChange={handleTestcaseChange}
                            />
                            <button
                                onClick={handleAddTestcase}
                                className="absolute bottom-2 right-2 bg-gray-800 text-white px-4 py-2 rounded-lg mt-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                                Add Testcase
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <h1 className="text-lg font-semibold">Add Topics</h1>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Topic"
                            value={topic}
                            onChange={handleTopicChange}
                            className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
                        />
                        <button
                            onClick={handleAddTopic}
                            className="bg-gray-800 text-white px-4 py-1 rounded-lg mt-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                            Add Topic
                        </button>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleAddProblem}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
                    >
                        Add Problem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;