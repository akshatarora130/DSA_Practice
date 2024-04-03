import React from "react";

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    classname: string;
}

const Button = ({ onClick, children , classname} : ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={classname}
        >
            {children}
        </button>
    );
};

export default Button;
