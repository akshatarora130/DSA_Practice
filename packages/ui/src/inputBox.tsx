import React from "react";

type InputFieldProps =  {
    type: string;
    placeholder: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    classname: string
}

const InputField = ({type, placeholder, value, onChange, classname} : InputFieldProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={classname}
            onChange={onChange}
        />
    );
};

export default InputField;
