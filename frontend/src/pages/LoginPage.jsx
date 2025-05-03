import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, rememberMe });
        // Handle login validation here

        // After successful login, navigate to account page
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url("/images/bg.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%'

            }}>
            <div className=" mb-48 overflow-hidden max-w-2xl w-full p-12 relative">
                {/* Curved white overlay */}
                <div className="absolute inset-0 z-0 rounded-full bg-white"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-1">Hello there,</h2>
                    <h1 className="text-3xl font-bold mb-6">Welcome to Bookish</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="email" className="block uppercase text-xs font-semibold mb-2">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block uppercase text-xs font-semibold mb-2">
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="rounded text-black focus:ring-black"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Remember Me
                                    </label>
                                </div>
                                <Link to="/reset-password" className="text-sm text-gray-700 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-4">
                                    By logging in, you agree to the <a href="#" className="underline">Terms & Condition</a> and our <a href="#" className="underline">Privacy & Policy</a>
                                </p>

                                <button
                                    type="submit"
                                    className="w-1/3 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                >
                                    Login
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account? <Link to="/register" className="font-medium hover:underline cursor-pointer">Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}