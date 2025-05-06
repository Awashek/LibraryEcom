'use client';

import { useEffect, useState } from 'react';
import {
  Bookmark,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Building,
  Globe,
  BookUser,
  Tag,
  Star,
  ChevronLeft,
  ShoppingCart,
} from 'lucide-react';
import Reviews from '../../components/User/BooksReview/Reviews';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../../utils/axios/useAxios';

// Main Book Details Component
const BookDetails = () => {
  const { bookId } = useParams(); // Get the bookId from the URL
  const [book, setBook] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: bookData, refetch } = useAxios(`book/${bookId}`);

  useEffect(() => {
    if (bookData?.result) {
      setBook(bookData.result);
    }
  }, [bookData]);

  useEffect(() => {
    refetch(); // Fetch the book details when the component mounts
    window.scrollTo(0, 0); // Scroll to top when viewing a new book
  }, [bookId, refetch]);

  // Format publication date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically call an API to save the bookmark state
  };

  if (!book) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300 flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin'></div>
          <p className='mt-6 text-xl font-medium'>Loading book details...</p>
        </div>
      </div>
    );
  }

  // Calculate discounted price if available
  const discountedPrice =
    book.discount && book.discount.length > 0
      ? (book.basePrice * (1 - book.discount[0].percentage / 100)).toFixed(2)
      : null;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Back button */}
        <Link
          to='/allbooks'
          className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 group'
        >
          <ChevronLeft
            size={20}
            className='group-hover:-translate-x-1 transition-transform duration-200'
          />
          <span>Back to Books</span>
        </Link>

        {/* Hero section with book cover and initial details */}
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16'>
          {/* Book Cover */}
          <div className='flex-shrink-0 relative max-w-xs mx-auto lg:mx-0 w-full'>
            <div className='relative aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] group'>
              <img
                src={`http://localhost:7226/images/${book.coverImage}`}
                alt={book.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

              {/* Availability badge */}
              <div className='absolute bottom-4 left-4'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.isAvailable
                      ? 'bg-emerald-900/80 text-emerald-100'
                      : 'bg-rose-900/80 text-rose-100'
                  }`}
                >
                  {book.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className='absolute top-4 right-4 p-3 bg-gray-800/70 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-all duration-200 shadow-lg'
            >
              <Bookmark
                size={18}
                className={`${
                  isBookmarked ? 'fill-blue-400 text-blue-400' : 'text-gray-300'
                } transition-colors duration-200`}
              />
            </button>

            {/* Discount badge if available */}
            {discountedPrice && (
              <div className='absolute top-4 left-4'>
                <span className='px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white'>
                  {book.discount[0].percentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Book details */}
          <div className='flex flex-col justify-between flex-grow'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold mb-4 text-white leading-tight'>
                {book.title}
              </h1>

              {/* Publisher and publication date */}
              <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-6'>
                {book.publicationDate && (
                  <div className='flex items-center gap-2'>
                    <Calendar size={16} />
                    <span>
                      {formatDate(book.publicationDate).split(',')[1]}
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <Globe size={16} />
                  <span>{book.language}</span>
                </div>
              </div>

              {/* Book format and pages */}
              <div className='flex flex-wrap gap-4 mb-6'>
                <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2'>
                  <BookOpen size={18} className='text-blue-400' />
                  <span>
                    {book.bookFormat} · {book.pageCount} pages
                  </span>
                </div>
              </div>

              {/* Full Description - moved here from below */}
              <div className='mb-8'>
                <h3 className='text-lg font-semibold mb-2 text-white'>
                  About this book
                </h3>
                <div className='text-gray-400 leading-relaxed'>
                  {book.description ? (
                    book.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className='mb-4'>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>
              </div>

              {/* Price information */}
              <div className='mb-6'>
                {discountedPrice ? (
                  <div className='flex items-center gap-3'>
                    <span className='text-2xl font-bold text-white'>
                      NPR {discountedPrice}
                    </span>
                    <span className='text-lg line-through text-gray-500'>
                      NPR {book.basePrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className='text-2xl font-bold text-white'>
                    NPR {book.basePrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-wrap gap-4'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5'>
                Book Now <ArrowUpRight size={18} />
              </button>
              <button className='bg-gray-800 hover:bg-gray-700 py-3 px-8 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow-lg hover:-translate-y-0.5'>
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left column - Authors and Reviews (removed duplicate description) */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Authors section */}
            {book.authors && book.authors.length > 0 && (
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg'>
                <h2 className='text-2xl font-bold mb-6 text-white flex items-center gap-3'>
                  <BookUser size={22} className='text-blue-400' />
                  About the {book.authors.length > 1 ? 'Authors' : 'Author'}
                </h2>
                <div className='space-y-8'>
                  {book.authors.map((author) => (
                    <div key={author.id} className='text-gray-300'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-medium text-white'>
                          {author.name.charAt(0)}
                        </div>
                        <p className='font-medium text-xl text-white'>
                          {author.name}
                        </p>
                      </div>
                      {author.biography && (
                        <p className='mt-2 leading-relaxed'>
                          {author.biography}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg'>
              <h2 className='text-2xl font-bold mb-6 text-white flex items-center gap-3'>
                <Star size={22} className='text-blue-400' />
                Reader Reviews
              </h2>
              <Reviews />
            </div>
          </div>

          {/* Right column - Special offers and related books */}
          <div className='space-y-8'>
            {/* Discount information if available */}
            {book.discount && book.discount.length > 0 && (
              <div className='bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-2xl p-8 border border-blue-700/30 shadow-lg sticky top-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='bg-blue-500/20 rounded-full p-3'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-blue-300'
                    >
                      <path
                        d='M9 14L15 8M9.5 8.5H9.51M14.5 13.5H14.51M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <h2 className='text-xl font-bold text-blue-300'>
                    Special Offer
                  </h2>
                </div>
                <p className='text-blue-200 mb-4'>
                  {book.discount[0].description ||
                    'Limited time discount available!'}
                </p>
                <div className='bg-blue-500/10 rounded-xl p-4 border border-blue-700/20'>
                  <div className='text-center'>
                    <span className='text-3xl font-bold text-blue-300'>
                      {book.discount[0].percentage}%
                    </span>
                    <span className='text-blue-200 ml-1'>OFF</span>
                  </div>
                  <p className='text-center text-blue-200 text-sm mt-1'>
                    Valid until{' '}
                    {book.discount[0].endDate
                      ? formatDate(book.discount[0].endDate)
                      : 'limited time'}
                  </p>
                </div>
              </div>
            )}

            {/* Book details card */}
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg sticky top-8'>
              <h2 className='text-xl font-bold mb-6 text-white'>
                Product Details
              </h2>

              <ul className='space-y-5'>
                <li className='flex items-start gap-4'>
                  <Tag size={18} className='mt-0.5 text-blue-400 shrink-0' />
                  <div>
                    <p className='text-sm text-gray-400'>Genre</p>
                    <p className='text-gray-200'>{book.genre}</p>
                  </div>
                </li>

                <li className='flex items-start gap-4'>
                  <BookOpen
                    size={18}
                    className='mt-0.5 text-blue-400 shrink-0'
                  />
                  <div>
                    <p className='text-sm text-gray-400'>Format</p>
                    <p className='text-gray-200'>{book.bookFormat}</p>
                  </div>
                </li>

                <li className='flex items-start gap-4'>
                  <div className='p-0.5 mt-0.5 text-blue-400 shrink-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-400'>Pages</p>
                    <p className='text-gray-200'>{book.pageCount}</p>
                  </div>
                </li>

                {book.publicationDate && (
                  <li className='flex items-start gap-4'>
                    <Calendar
                      size={18}
                      className='mt-0.5 text-blue-400 shrink-0'
                    />
                    <div>
                      <p className='text-sm text-gray-400'>Published</p>
                      <p className='text-gray-200'>
                        {formatDate(book.publicationDate)}
                      </p>
                    </div>
                  </li>
                )}

                {book.publisherName && (
                  <li className='flex items-start gap-4'>
                    <Building
                      size={18}
                      className='mt-0.5 text-blue-400 shrink-0'
                    />
                    <div>
                      <p className='text-sm text-gray-400'>Publisher</p>
                      <p className='text-gray-200'>{book.publisherName}</p>
                    </div>
                  </li>
                )}

                <li className='flex items-start gap-4'>
                  <Globe size={18} className='mt-0.5 text-blue-400 shrink-0' />
                  <div>
                    <p className='text-sm text-gray-400'>Language</p>
                    <p className='text-gray-200'>{book.language}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
