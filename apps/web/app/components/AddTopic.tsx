import React from 'react';

const AddTopic = ({
                      handleTopicChange,
                      handleAddTopic,
                      topic,
                      topics,
                      handleRemoveTopic,
                  }: any) => {
    return (
        <div className="w-full space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <h2 className="text-lg font-semibold mb-2 text-white">Add Topics</h2>
                <div className="flex items-center space-x-4">
                    <select
                        value={topic}
                        onChange={handleTopicChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                    >
                        <option value="">Select Topic</option>
                        <option value="Basics">Basics</option>
                        <option value="Array">Array</option>
                        <option value="Matrix">Matrix</option>
                        <option value="HashTable">HashTable</option>
                        {/* Add more options as needed */}
                    </select>
                    <button
                        onClick={handleAddTopic}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-lg transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Topic
                    </button>
                </div>
                {topics.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2 text-white">Selected Topics</h2>
                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic: string, index: number) => (
                                <div key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center">
                                    <span className="mr-2">{topic}</span>
                                    <button
                                        onClick={() => handleRemoveTopic(index)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                        title="Remove Topic"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTopic;
