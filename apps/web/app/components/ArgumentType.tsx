import React from 'react';

const ArgumentType = ({ numOfArg, argArray, outputType, handleNumOfArgChange, handleArgChange, handleOutputTypeChange,}: any) => {
    return (
        <div className="w-full bg-gray-800 rounded-lg p-4 space-y-4">
            <h2 className="text-lg font-semibold mb-2 text-white">Add Type</h2>
            <h2 className="text-sm font-semibold mb-2 text-white">Input Argument type</h2>
            <div className="flex items-center space-x-4">
                <select
                    value={numOfArg}
                    onChange={handleNumOfArgChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                >
                    <option value={0}>Select Number of Input Arguments</option>
                    {[...Array(10).keys()].map((value) => (
                        <option key={value} value={value + 1}>{value + 1}</option>
                    ))}
                </select>
            </div>
            {numOfArg > 0 &&
                <div>
                    {Array.from(Array(numOfArg).keys()).map((index) => (
                        <div key={index} className="flex items-center space-x-4 mb-2">
                            <input
                                type="text"
                                placeholder={`Argument ${index + 1}`}
                                value={argArray[index]?.key || ''}
                                onChange={(e) => handleArgChange(e, index, 'key')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                            />
                            <select
                                value={argArray[index]?.value || ''}
                                onChange={(e) => handleArgChange(e, index, 'value')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                            >
                                <option value="">Select Type</option>
                                <option value="Integer">Integer</option>
                                <option value="Float">Float</option>
                                <option value="Boolean">Boolean</option>
                                <option value="Integer Array">Integer Array</option>
                                <option value="String">String</option>
                                <option value="Integer 2D dynamic Array">Integer 2D dynamic Array</option>
                                {/* Add options here */}
                            </select>
                        </div>
                    ))}
                </div>
            }
            <div>
                <h2 className="text-sm font-semibold mb-2 text-white">Output type</h2>
                <select
                    value={outputType}
                    onChange={handleOutputTypeChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500 text-white bg-gray-700"
                >
                    <option value="">Select output type</option>
                    <option value="Integer">Integer</option>
                    <option value="Float">Float</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Integer Array">Integer Array</option>
                    <option value="String">String</option>
                    <option value="Integer 2D dynamic Array">Integer 2D dynamic Array</option>
                    {/* Add options here */}
                </select>
            </div>
        </div>
    );
};

export default ArgumentType;
