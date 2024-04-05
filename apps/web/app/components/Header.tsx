import { useRouter } from 'next/navigation';


const Header = ({verified, handleLogin, handleLogout} : any) => {
    const router = useRouter();

    const handleAllQuestions = () => {
        router.push('/Admin/allQuestions');
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b-2 border-white">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">DSA Practice</h1>
            <div className="flex gap-4">
                <button
                    onClick={handleAllQuestions}
                    className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                    All Questions
                </button>
                {!verified && <button
                    onClick={handleLogin}
                    className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                    Login
                </button>}
                {verified && <button
                    onClick={handleLogout}
                    className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                    Logout
                </button>}
            </div>
        </header>
    );
};

export default Header;
