import React from 'react';

const AddProblemStatement = ({handleNameChange, handleDescriptionChange, handleDifficultyChange, name, description, difficulty,}: any) => {
    return (
        <div className="w-full space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <h2 className="text-lg font-semibold mb-2 text-white">Problem Statement</h2>
                <div className="flex flex-col md:flex-row md:gap-8 w-full space-y-4">
                    <input
                        type="text"
                        placeholder="Problem Name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                    />
                    <div className="flex items-center space-x-4">
                        <label className="text-white">Difficulty:</label>
                        <select
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white"
                            value={difficulty}
                            onChange={handleDifficultyChange}
                        >
                            <option value="">Select difficulty</option>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700 resize-none min-h-60"
                />
            </div>
        </div>
    );
};

export default AddProblemStatement;
