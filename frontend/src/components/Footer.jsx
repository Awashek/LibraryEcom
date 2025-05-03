import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-6">BOOKISH</h1>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="inline-block p-2 border border-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="inline-block p-2 border border-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="inline-block p-2 border border-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H9v-2h2V9.5l3 3-3 3V17h6v-2h-4z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* About Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Privacy & Policy</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Genre & Themes Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Genre & Themes</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">All Books</a></li>
              <li><a href="#" className="hover:underline">Biography</a></li>
              <li><a href="#" className="hover:underline">Comedy</a></li>
              <li><a href="#" className="hover:underline">Fantasy</a></li>
              <li><a href="#" className="hover:underline">Fiction</a></li>
              <li><a href="#" className="hover:underline">History</a></li>
              <li><a href="#" className="hover:underline">Horror</a></li>
              <li><a href="#" className="hover:underline">Romance</a></li>
              <li><a href="#" className="hover:underline">Science</a></li>
            </ul>
          </div>
          
          {/* My Account Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">My Account</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">My Profile</a></li>
              <li><a href="#" className="hover:underline">Rented Books</a></li>
              <li><a href="#" className="hover:underline">Booked Books</a></li>
              <li><a href="#" className="hover:underline">Saved Books</a></li>
              <li><a href="#" className="hover:underline">Books History</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="pt-8 mt-8 text-center">
          <p>© copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;