import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowAccountDropdown(!showAccountDropdown);
    };

    // Close dropdown when clicking outside
    const closeDropdown = () => {
        setShowAccountDropdown(false);
    };

    return (
        <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                className="h-6 w-auto"  // Adjusted to maintain aspect ratio
                                src="/images/Logo.svg"
                                alt="BookShop Logo"
                            />
                        </Link>
                    </div>

                    {/* Search Bar - Centered */}
                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Navigation */}
                    <div className="flex items-center space-x-4">
                        {/* Account with Dropdown */}
                        <div className="relative">
                            <button 
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                onClick={toggleDropdown}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                            
                            {/* Dropdown Menu */}
                            {showAccountDropdown && (
                                <>
                                    {/* Invisible overlay to detect outside clicks */}
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={closeDropdown}
                                    ></div>
                                    
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                        <Link 
                                            to="/login" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/register" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            Register
                                        </Link>
                                        <div className="border-t border-gray-100"></div>
                                        <Link 
                                            to="/profile" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            My Profile
                                        </Link>
                                        <Link 
                                            to="/orders" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            My Orders
                                        </Link>
                                        <Link 
                                            to="/settings" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100"></div>
                                        <Link 
                                            to="/logout" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <Link to="/wishlist" className="text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </Link>
                        <Link to="/cart" className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;