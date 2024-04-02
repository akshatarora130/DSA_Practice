import React from "react";

type InputFieldProps =  {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({type, placeholder, value, onChange} : InputFieldProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
            onChange={onChange}
        />
    );
};

export default InputField;
