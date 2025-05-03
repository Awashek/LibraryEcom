import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("Registration data:", formData);
            // Registration success
            alert("Registration successful!");
            setIsLoading(false);
        } catch (error) {
            console.error("Registration error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url("/images/bg2.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%'
            }}>
            <div className="overflow-hidden max-w-3xl w-full p-12 mb-40 relative">
                {/* Curved white overlay */}
                <div className="absolute inset-0 z-0 rounded-full bg-white"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-1">Hello there,</h2>
                    <h1 className="text-3xl font-bold mb-6">Welcome to Bookish</h1>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block uppercase text-xs font-semibold mb-2">
                                    FIRST NAME
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={`w-full p-2 border-b ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500`}
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block uppercase text-xs font-semibold mb-2">
                                    LAST NAME
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={`w-full p-2 border-b ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500`}
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block uppercase text-xs font-semibold mb-2">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full p-2 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500`}
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block uppercase text-xs font-semibold mb-2">
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`w-full p-2 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block uppercase text-xs font-semibold mb-2">
                                CONFIRM PASSWORD
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`w-full p-2 border-b ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-500`}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="agreeTerms"
                                    className={`rounded border-gray-300 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-xs text-gray-500">
                                    By creating an account, you agree to the <a href="#" className="underline">Terms & Condition</a> and our <a href="#" className="underline">Privacy & Policy</a>
                                </label>
                                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-1/3 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                            >
                                {isLoading ? "Processing..." : "Sign Up"}
                            </button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account? <a href="/login" className="font-medium hover:underline cursor-pointer">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}