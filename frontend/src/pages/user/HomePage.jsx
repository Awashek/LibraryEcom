import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PopularGenres from '../../components/User/Books/PopularGenres';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../utils/axios/useAxios';
import RecommendedBooks from '../../components/User/Books/RecommendedBooks';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/allbooks');
  };

  // Categories
  const genres = [
    'Fiction',
    'NonFiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Fantasy',
    'ScienceFiction',
    'Biography',
    'History',
    'Education',
    'Horror',
  ];

  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=1&pageSize=12&search=`
  );

  // For placeholder images
  useEffect(() => {
    // This would normally be an API call to get real book data
    console.log('Home component mounted');
  }, []);

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <div className='relative bg-[#222]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
          <div className='lg:grid lg:grid-cols-2 lg:gap-8 items-center'>
            <div>
              <h1 className='text-xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
                <span className='block'>New Releases This Week</span>
              </h1>
              <p className='mt-4 max-w-2xl text-xl text-white'>
                Experience the joy of reading with us
              </p>
              <div className='mt-8 flex space-x-4'>
                <button
                  onClick={handleExploreClick}
                  className='bg-white text-black py-2 px-8 rounded-full flex items-center gap-2 hover:gap-3 transition-all duration-200'
                >
                  Explore Now{' '}
                  <ArrowRight
                    size={18}
                    className='transition-transform duration-200 hover:translate-x-1'
                  />
                </button>
              </div>
            </div>
            <div className='mt-12 lg:mt-0'>
              <div className='pl-4 -ml-16 -mr-16 sm:pl-6 md:-ml-16 lg:pl-0 lg:ml-0 lg:mr-0'>
                <img
                  className='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5'
                  src='/images/Homeimg.png'
                  alt='BookShop collection'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendedBooks />
      <PopularGenres />
    </div>
  );
};

export default HomePage;
