import { useState, useEffect } from "react";
import { X, AlertCircle, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Auth Modal Component
 * Shows a popup when unauthenticated users try to perform actions requiring authentication
 * 
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {function} onClose - Function to close the modal
 * @param {string} message - Optional custom message to display (defaults to cart message)
 * @returns {JSX.Element}
 */
const AuthModal = ({ isOpen, onClose, message }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Handle the animation timing when opening/closing
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300); // Match this with CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // If modal is not supposed to be in the DOM, return null
    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div
                className={`relative bg-white rounded-xl shadow-xl w-full max-w-md transform ${isOpen ? "scale-100" : "scale-95"
                    } transition-transform duration-300`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* Modal header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-700 p-2 rounded-full">
                            <AlertCircle size={20} />
                        </span>
                        <h3 className="text-xl font-semibold text-gray-800">Authentication Required</h3>
                    </div>
                </div>

                {/* Modal body */}
                <div className="p-6">
                    <p className="text-gray-600 mb-6">
                        {message || "Please sign in or create an account to add items to your cart."}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                            <LogIn size={18} />
                            Sign In
                        </Link>

                        <Link
                            to="/register"
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                            <UserPlus size={18} />
                            Register
                        </Link>
                    </div>
                </div>

                {/* Modal footer */}
                <div className="p-4 bg-gray-50 rounded-b-xl text-center text-sm text-gray-500">
                    You'll be redirected back after signing in.
                </div>
            </div>
        </div>
    );
};

export default AuthModal;