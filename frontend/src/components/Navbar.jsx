import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isGenrePage =
    location.pathname === '/genresandthem' || location.pathname === '/allbooks';

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
    setShowGenreDropdown(false);
  };

  const toggleGenreDropdown = () => {
    setShowGenreDropdown(!showGenreDropdown);
    setShowAccountDropdown(false);
  };

  // Close dropdowns when clicking outside
  const closeDropdowns = () => {
    setShowAccountDropdown(false);
    setShowGenreDropdown(false);
  };

  const handleLogout = () => {
    signOut(); // This will clear the auth state and cookies
    toast.success('Logged out successfully');
    navigate('/login'); // Redirect to login page after logout
    closeDropdowns(); // Close the dropdown menu
  };

  return (
    <nav className='bg-white shadow-sm fixed w-full top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center'>
              <img
                className='h-5 w-auto'
                src='/images/Logo.svg'
                alt='BookShop Logo'
              />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            <Link
              to='/'
              className={`flex items-center px-4 py-2 rounded-full ${
                isHomePage
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'text-gray-700 hover:text-white hover:bg-gray-900 transition-colors duration-300'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Home
            </Link>
            <div className='relative'>
              <Link
                to='/genresandthem'
                className={`flex items-center px-4 py-2 rounded-full ${
                  isGenrePage
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-white hover:bg-gray-900 transition-colors duration-300'
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
                  />
                </svg>
                Genre & Themes
              </Link>
              {/* Right Navigation */}
              <div className='flex items-center space-x-4'>
                {/* Search Icon */}
                <button className='text-gray-600 hover:text-gray-900 focus:outline-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
                {/* Cart Icon */}
                <Link to='/cart' className='text-gray-600 hover:text-gray-900'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='9' cy='21' r='1' />
                    <circle cx='20' cy='21' r='1' />
                    <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6' />
                  </svg>
                </Link>

                {/* Account with Dropdown */}
                <div className='relative'>
                  <button
                    className='text-gray-600 hover:text-gray-900 focus:outline-none'
                    onClick={toggleAccountDropdown}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </button>

                  {/* Account Dropdown Menu */}
                  {showAccountDropdown && (
                    <>
                      <div
                        className='fixed inset-0 z-10'
                        onClick={closeDropdowns}
                      ></div>

                      <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200'>
                        <Link
                          to='/login'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Login
                        </Link>
                        <Link
                          to='/register'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Register
                        </Link>
                        <div className='border-t border-gray-100'></div>
                        <Link
                          to='/profile'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          My Profile
                        </Link>
                        <Link
                          to='/orders'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          My Orders
                        </Link>
                        <Link
                          to='/settings'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Settings
                        </Link>
                        <div className='border-t border-gray-100'></div>
                        <Link
                          to='/logout'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          Logout
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button className='md:hidden text-gray-600 hover:text-gray-900 focus:outline-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Navigation */}
        <div className='flex items-center space-x-4'>
          {/* Search Icon */}
          <button className='text-gray-600 hover:text-gray-900 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>

          {/* Account with Dropdown */}
          <div className='relative'>
            <button
              className='text-gray-600 hover:text-gray-900 focus:outline-none'
              onClick={toggleAccountDropdown}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </button>

            {/* Account Dropdown Menu */}
            {showAccountDropdown && (
              <>
                <div
                  className='fixed inset-0 z-10'
                  onClick={closeDropdowns}
                ></div>

                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200'>
                  <Link
                    to='/login'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Register
                  </Link>
                  <div className='border-t border-gray-100'></div>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    My Profile
                  </Link>
                  <Link
                    to='/orders'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    My Orders
                  </Link>
                  <Link
                    to='/settings'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Settings
                  </Link>
                  <div className='border-t border-gray-100'></div>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className='md:hidden text-gray-600 hover:text-gray-900 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
