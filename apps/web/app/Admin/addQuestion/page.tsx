"use client"

import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import AddTopic from "../../components/AddTopic";
import ArgumentType from "../../components/ArgumentType";
import AddProblemStatement from "../../components/AddProblemStatement";

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [topic, setTopic] = useState('');
    const [topics, setTopics] = useState<string[]>([]);
    const [numOfArg, setNumOfArg] = useState(0);
    const [arg, setArg] = useState<string>('')
    const [argArray, setArgArray] = useState<{ key: string; value: string }[]>([]);
    const [outputType, setOutputType] = useState('');
    const [verified, setVerified] = useState(false)
    const [questionNum, setQuestionNum] = useState<Number>(0)

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

    const handleTopicChange = (event: any) => {
        setTopic(event.target.value);
    };

    const handleAddTopic = () => {
        if (topic === '' || topics.includes(topic)) {
            setTopic('')
            return;
        }
        setTopics([...topics, topic]);
        setTopic('');
    };

    const handleAddProblem = async () => {
        if(!questionNum){
            alert("Enter questino number");
            return;
        }
        if (name === '') {
            alert('Enter the problem name');
            return;
        }
        if (difficulty == ''){
            alert("Select difficulty for the problem");
            return;
        }
        if (description === '') {
            alert('Enter the description of the problem');
            return;
        }
        if (topics.length === 0) {
            alert('Add related topics for the problem');
            return;
        }
        for(let i = 0; i < argArray.length; i++){
            // @ts-ignore
            if(argArray[i].key == '' || argArray[i].value == ''){
                alert("Fill all the input arguments type");
                return;
            }
        }
        if(outputType == ''){
            alert("Enter output type")
            return;
        }

        const jsonObject = {
            "input": {

            },
            "output": outputType
        }

        argArray.map((a) => {
            // @ts-ignore
            jsonObject.input[a.key] = a.value
        })

        setArg(JSON.stringify(jsonObject))

        try {
            const response = await axios.post('/api/admin/addQuestion', {
                token: localStorage.getItem("token"),
                questionNum: questionNum,
                name: name,
                difficulty: difficulty,
                description: description,
                topics: topics,
                arguments: JSON.parse(arg),
            });
            if (response.status === 200) {
                alert(response.data.message);
                router.push('/Admin/allQuestions');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Error adding problem. Please try again.');
        }
    };

    const handleRemoveTopic = (indexToRemove: number) => {
        const updatedTopics = topics.filter((_, index) => index !== indexToRemove);
        setTopics(updatedTopics);
    };

    const handleNumOfArgChange = (event: any) => {
        setNumOfArg(parseInt(event.target.value));
    }

    const handleArgChange = (event: any, index: number, type: 'key' | 'value') => {
        const updatedArguments = [...argArray];
        const arg = updatedArguments[index] || {key: '', value: ''};
        updatedArguments[index] = {
            ...arg,
            [type]: event.target.value,
        };
        setArgArray(updatedArguments);
    };

    const handleOutputTypeChange = (event: any) => {
        setOutputType(event.target.value);
    }

    const handleQuestionNumChange = (event: any) => {
        setQuestionNum(event.target.value);
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header
                verified={verified}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <main className="flex flex-col items-center justify-center px-6 py-8 space-y-8">
                <h1 className="text-4xl font-extrabold tracking-wide">Add a New Problem</h1>
                <AddProblemStatement
                    handleNameChange={handleNameChange}
                    handleDescriptionChange={handleDescriptionChange}
                    handleDifficultyChange={handleDifficultyChange}
                    name={name}
                    description={description}
                    difficulty={difficulty}
                    handleQuestionNumChange={handleQuestionNumChange}
                    questionNum={questionNum}
                />
                <AddTopic
                    handleTopicChange={handleTopicChange}
                    handleAddTopic={handleAddTopic}
                    topic={topic}
                    topics={topics}
                    handleRemoveTopic={handleRemoveTopic}
                />
                <ArgumentType
                    numOfArg={numOfArg}
                    argArray={argArray}
                    outputType={outputType}
                    handleNumOfArgChange={handleNumOfArgChange}
                    handleArgChange={handleArgChange}
                    handleOutputTypeChange={handleOutputTypeChange}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleAddProblem}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Problem
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Page;