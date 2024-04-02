import React from "react";

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

const Button = ({ onClick, children } : ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
        >
            {children}
        </button>
    );
};

export default Button;
