import React from 'react';
import { Share2, Bookmark, ArrowUpRight } from 'lucide-react';
import Reviews from '../../components/User/BooksReview/Reviews';
import BookCardImage from '../../assets/images/BookDetails/bg.jpg';

// Main Book Details Component
const BookDetails = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <div className='relative'>
        {/* Top section with book cover and initial details */}
        <div className='flex flex-col md:flex-row gap-14 mb-8 justify-end'>
          {/* Book Cover */}
          <div className='relative z-20'>
            <img
              src={BookCardImage}
              alt='Book cover'
              className='w-64 h-96 object-cover rounded-md shadow-xl'
            />
          </div>

          {/* Top section details - right side of image */}
          <div className='md:w-2/3 pr-28'>
            <h1 className='text-4xl font-bold mb-4'>
              The History of a Difficult Child
            </h1>
            <p className='text-lg text-gray-700 font-medium mb-4'>
              Mihret Sibhat
            </p>

            <p className='text-gray-500 text-sm mb-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Book Now button section - now properly positioned */}
            <div className='flex gap-4 mb-8'>
              <button className='bg-black text-white py-2 px-6 rounded-full flex items-center gap-2'>
                Book Now <ArrowUpRight size={16} />
              </button>
              <button className='p-2 border border-gray-200 rounded-full'>
                <Bookmark size={20} className='text-gray-600' />
              </button>
            </div>
          </div>
        </div>

        {/* Content sections in a white background */}
        <div className='bg-white p-6 rounded-md shadow-md relative z-10 -top-36'>
          {/* Book Info Sections */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mt-32'>
            <div>
              <h2 className='text-lg font-bold mb-3'>Description</h2>
              <p className='text-sm text-gray-600 mb-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex.
              </p>
              <p className='text-sm text-gray-600'>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat.
              </p>
            </div>

            <div>
              <div className='mb-6'>
                <h2 className='text-lg font-bold mb-2'>Editors</h2>
                <p className='text-sm text-gray-600'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </p>
              </div>

              <div>
                <h2 className='text-lg font-bold mb-2'>Language</h2>
                <p className='text-sm text-gray-600'>
                  Standard English (USA & UK)
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className='md:col-span-2 mt-6 pr-12'>
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
