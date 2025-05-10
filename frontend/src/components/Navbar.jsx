import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useNotificationHub from "./NotificationHub/useNotificationHub";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Bell } from "lucide-react";
import useAxios from "../utils/axios/useAxios";

const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const { notifications } = useNotificationHub();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { data: MyOrderData } = useAxios(`order/my-orders`);
  console.log(MyOrderData, "MyOrderData");

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isGenrePage =
    location.pathname === "/genresandthem" || location.pathname === "/allbooks";

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
    setShowGenreDropdown(false);
  };

  const toggleGenreDropdown = () => {
    setShowGenreDropdown(!showGenreDropdown);
    setShowAccountDropdown(false);
  };

  const closeDropdowns = () => {
    setShowAccountDropdown(false);
    setShowGenreDropdown(false);
    setShowNotificationDropdown(false);
  };

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    navigate("/homepage");
    closeDropdowns();
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-5 w-auto" src="/images/Logo.svg" alt="BookShop Logo" />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-full ${
                isHomePage
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-700 hover:text-white hover:bg-gray-900 transition-colors duration-300"
              }`}
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <div className="relative">
              <Link
                to="/genresandthem"
                className={`flex items-center px-4 py-2 rounded-full ${
                  isGenrePage
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "text-gray-700 hover:text-white hover:bg-gray-900 transition-colors duration-300"
                }`}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                Genre & Themes
              </Link>
              {showGenreDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeDropdowns}></div>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <Link to="/fiction" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Fiction
                    </Link>
                    <Link to="/non-fiction" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Non-Fiction
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <Link to="/cart" className="text-gray-600 hover:text-gray-900 focus:outline-none">
           < ShoppingCart/>
            </Link>

            {/* Notification Icon */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none relative"
                onClick={() => setShowNotificationDropdown((prev) => !prev)}
              >
                <Bell/>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full ">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotificationDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeDropdowns}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-2 z-20 border border-gray-200 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 font-semibold text-gray-800 border-b">
                      📨 Notifications
                    </div>
                    {notifications.length === 0 ? (
                      <div className="px-4 py-2 text-gray-500">No notifications</div>
                    ) : (
                      notifications.map((msg, idx) => (
                        <div key={idx} className="px-4 py-2 text-sm text-gray-700 border-b">
                          {msg}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900">
              <Heart/>
            </Link>

            {/* Account Icon */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={toggleAccountDropdown}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {showAccountDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeDropdowns}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                    <div className="border-t border-gray-100"></div>
                    <Link to="/myorders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
