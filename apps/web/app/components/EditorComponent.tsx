import React from 'react';
import Editor from '@monaco-editor/react';

const EditorComponent = ({ selectedLanguage, size, code, handleLanguageChange, handleSizeChange, handleCodeChange, handleAddCode, javaCode, cppCode, userOrDriver}: any) => {
    return (
        <div className="w-full lg:w-2/3 px-6 py-8">
            <div className="flex justify-between mb-6">
                <div className="flex gap-2">
                    <p className="text-lg font-bold mb-2">{userOrDriver} code not added for:   </p>
                    <div className="flex flex-wrap gap-2">
                        {!javaCode && <span className="bg-white text-black px-2 py-1 rounded-lg h-auto">Java</span>}
                        {!cppCode && <span className="bg-white text-black px-2 py-1 rounded-lg">C++</span>}
                    </div>
                </div>
                <div className="flex items-center gap-4 justify-end">
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
            </div>
            <div className="editor-container bg-gray-900 rounded-lg shadow-xl overflow-hidden border-gray-300 border-2">
                <Editor
                    className="w-full h-full"
                    height="70vh"
                    width="100%"
                    language={selectedLanguage}
                    theme="vs-dark"
                    value={code}
                    options={{
                        fontSize: size,
                    }}
                    onChange={handleCodeChange}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleAddCode}
                    className="bg-white hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-lg transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add {userOrDriver} Code
                </button>
            </div>
        </div>
    );
};

export default EditorComponent;
