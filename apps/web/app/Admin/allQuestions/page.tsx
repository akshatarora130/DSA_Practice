"use client"

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Question {
    id: number;
    name: string;
    difficulty: string;
    publishable: boolean;
}

const Page = () => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.post("/api/admin/verify", {
                    token: localStorage.getItem("token"),
                });
                if (response.status === 200) {
                    setVerified(true);
                }
            } catch (error) {
                console.error("Error verifying user:", error);
            }
        };
        verifyUser();

        const fetchQuestions = async () => {
            try {
                const response = await axios.post("/api/admin/allQuestions", {});
                setQuestions(response.data.questions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleLogin = () => {
        router.push("/Admin/login");
    };

    const handleLogout = () => {
        router.push("/Admin/login");
        localStorage.removeItem("token");
    };

    const handleEdit = (id: number) => {
        router.push(`/Admin/editQuestion/${id}`);
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Header
                verified={verified}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <div className="container mx-auto px-4 py-8">
                <center><h1 className="text-4xl font-extrabold tracking-wide mb-4">All Questions</h1></center>
                <table className="w-full table-auto border-collapse border border-gray-800">
                    <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        <th className="px-4 py-2">Question ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Difficulty</th>
                        <th className="px-4 py-2">Publishable</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((q, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}
                        >
                            <td className="border px-4 py-2 w-1/6">{q.id}</td>
                            <td className="border px-4 py-2 w-3/6">
                                <button
                                    className="text-blue-400 hover:text-blue-500 hover:underline"
                                    onClick={() => handleEdit(q.id)}
                                >
                                    {q.name}
                                </button>
                            </td>
                            <td className="border px-4 py-2 w-1/6">{q.difficulty}</td>
                            <td className="border px-4 py-2 w-1/6">{q.publishable ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => router.push("/Admin/addQuestion")}
                    >
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;

