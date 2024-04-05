const ProblemStatement = ({  question}: any) => {
    const description = question.description.split("\n\n");

    return (
        <div className="w-full lg:w-1/3 px-6 py-8 lg:py-0">
            <h1 className="text-2xl font-bold mb-4 mt-8">{` Add drive code for the problem `}</h1>
            <h1 className="text-xl font-bold mb-4 mt-8">{` ${question.id}. ${question.name}`}</h1>
            {description.map((des: string) => {
                return <div className="mb-6">{des}</div>;
            })}

        </div>
    );
};

export default ProblemStatement;
