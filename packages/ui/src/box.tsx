import React from "react";

type BoxProps = {
    children: React.ReactNode;
    heading: String
}

const Box = ({children, heading} : BoxProps) => {
    return (
        <>
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto md:h-80 border-2 border-white rounded-2xl text-white bg-gray-900 p-6">
                <div className="font-extrabold text-lg md:text-xl mb-5">
                    {heading}
                </div>
                {children}
            </div>
        </>
    )
}

export default Box;