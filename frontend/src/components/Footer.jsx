import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // Navigate to the path
    navigate(path);
    // Scroll to top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className='bg-black text-white py-8 w-full'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* Brand Section */}
          <div className='mb-8 md:mb-0'>
            <div
              onClick={() => handleNavigation('/')}
              className='inline-block cursor-pointer'
            >
              <h1 className='text-3xl font-bold mb-6'>BOOKISH</h1>
              <p className='max-w-md text-sm text-gray-400 leading-relaxed'>
                A private library store bringing exclusive and collectible books
                to your fingertips. Browse, reserve, and pick up curated
                reads—signed editions, bestsellers, and hidden gems—tailored for
                the passionate reader.
              </p>
            </div>
          </div>

          {/* Navigation Section */}
          <div className='mb-8 md:mb-0'>
            <h2 className='text-lg font-semibold mb-4'>Pages</h2>
            <ul className='space-y-2'>
              <li>
                <div
                  onClick={() => handleNavigation('/')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  Home
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/allbooks')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  All Books
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/cart')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  Cart
                </div>
              </li>
            </ul>
          </div>

          {/* My Account Section */}
          <div>
            <h2 className='text-lg font-semibold mb-4'>My Account</h2>
            <ul className='space-y-2'>
              <li>
                <div
                  onClick={() => handleNavigation('/profile')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  My Profile
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/profile/myorders')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  My Orders
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/profile/my-reviews')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  My Reviews
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/profile/wishlist')}
                  className='hover:underline transition duration-300 cursor-pointer'
                >
                  My Wishlist
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='pt-8 mt-8 border-t border-gray-800 text-center'>
          <p>© {new Date().getFullYear()} Bookish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
