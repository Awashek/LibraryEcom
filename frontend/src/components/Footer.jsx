import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Sign-up Section */}
                <div className="py-12 border-b border-gray-200">
                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h3 className="text-gray-700">Subscribe to stay tuned for new product and latest updates.</h3>
                            <p className="text-gray-700">Let's do it!</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-col sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email "
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent sm:rounded-r-none"
                                />
                                <button className="mt-2 sm:mt-0 bg-gray-900 text-white px-6 py-2 rounded-md sm:rounded-l-none hover:bg-gray-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-8">
                    <div className="flex flex-col md:flex-row md:justify-between">
                        {/* Logo and Company Info */}
                        <div className="mb-8 md:mb-0">
                            <Link to="/" className="flex items-center">
                                <img
                                    className="h-6 w-auto"  
                                    src="/images/Logo.svg"
                                    alt="BookShop Logo"
                                />
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
                            <div>
                                <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                            </div>
                            <div>
                                <Link to="/features" className="text-gray-700 hover:text-gray-900">Features</Link>
                            </div>
                            <div>
                                <Link to="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
                            </div>
                            <div>
                                <Link to="/gallery" className="text-gray-700 hover:text-gray-900">Gallery</Link>
                            </div>
                            <div>
                                <Link to="/team" className="text-gray-700 hover:text-gray-900">Team</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Legal Links */}
                        <div className="flex flex-wrap space-x-6 mb-4 md:mb-0">
                            <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link>
                            <Link to="/terms-of-use" className="text-sm text-gray-600 hover:text-gray-900">Terms of Use</Link>
                            <Link to="/sales-and-refunds" className="text-sm text-gray-600 hover:text-gray-900">Sales and Refunds</Link>
                            <Link to="/legal" className="text-sm text-gray-600 hover:text-gray-900">Legal</Link>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;