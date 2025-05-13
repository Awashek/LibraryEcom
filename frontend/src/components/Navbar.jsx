import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heart, ShoppingCart, Bell, User } from "lucide-react";
import useNotificationHub from "./NotificationHub/useNotificationHub";
import useAxios from "../utils/axios/useAxios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true);

  const { notifications } = useNotificationHub();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const isAuthenticated = !!authUser;

  const { data: MyOrderData } = useAxios(`order/my-orders`);
  const { data: announcementData } = useAxios(
    `announcements?pageNumber=1&pageSize=12&search=`
  );

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

  // Filter active announcements
  const activeAnnouncements =
    announcementData?.result?.filter((a) => {
      const now = new Date();
      return new Date(a.startDate) <= now && now <= new Date(a.endDate);
    }) || [];

  useEffect(() => {
    if (notifications.length > 0 || activeAnnouncements.length > 0) {
      setHasUnseenNotifications(true);
    }
  }, [notifications.length, activeAnnouncements.length]);
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-5 w-auto"
                src="/images/Logo.svg"
                alt="BookShop Logo"
              />
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
              Home
            </Link>

            <div className="relative">
              <Link
                to="/allbooks"
                className={`flex items-center px-4 py-2 rounded-full ${
                  isGenrePage
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "text-gray-700 hover:text-white hover:bg-gray-900 transition-colors duration-300"
                }`}
              >
                Books
              </Link>
              {showGenreDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={closeDropdowns}
                  ></div>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <Link
                      to="/fiction"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Fiction
                    </Link>
                    <Link
                      to="/non-fiction"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Non-Fiction
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 focus:outline-none pb-2"
            >
              <ShoppingCart />
            </Link>

            {/* Notification Icon */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none relative"
                onClick={() => {
                  setShowNotificationDropdown((prev) => !prev);
                  setHasUnseenNotifications(false); // mark as seen
                }}
              >
                <Bell />
                {(notifications.length > 0 || activeAnnouncements.length > 0) &&
                  hasUnseenNotifications && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                      {notifications.length + activeAnnouncements.length}
                    </span>
                  )}
              </button>
              {showNotificationDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={closeDropdowns}
                  ></div>
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-2 z-20 border border-gray-200 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 font-semibold text-gray-800 border-b">
                      📨 Notifications
                    </div>

                    {/* Real-time notifications */}
                    {notifications.map((msg, idx) => (
                      <div
                        key={`n-${idx}`}
                        className="px-4 py-2 text-sm text-gray-700 border-b"
                      >
                        {msg}
                      </div>
                    ))}

                    {/* Announcements */}
                    {activeAnnouncements.map((a) => (
                      <div
                        key={a.id}
                        className="px-4 py-2 text-sm text-gray-700 border-b whitespace-pre-wrap"
                      >
                        {a.message}
                      </div>
                    ))}

                    {notifications.length === 0 &&
                      activeAnnouncements.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">
                          No notifications
                        </div>
                      )}
                  </div>
                </>
              )}
            </div>

            {/* Authentication Section */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={toggleAccountDropdown}
                >
                  <User className="h-6 w-6" />
                </button>
                {showAccountDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={closeDropdowns}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/profile/myorders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/profile/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My WishList
                      </Link>
                      <Link
                        to="/profile/my-reviews"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Reviews
                      </Link>
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
