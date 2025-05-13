import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../utils/axios/useAxios';
import Pagination from '../../components/common/Pagination';
import { Tag } from 'lucide-react';

const GenreBooksPage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const formatGenreName = (genreName) => {
    if (!genreName) return '';
    return genreName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^./, (match) => match.toUpperCase());
  };

  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}`
  );

  useEffect(() => {
    if (booksData) {
      // Filter books by the genre from URL parameter
      const filteredByGenre = booksData.result
        ? booksData.result.filter(
            (book) =>
              book.genre && book.genre.toLowerCase() === genre.toLowerCase()
          )
        : [];

      setBooks(filteredByGenre);
      setTotalPages(Math.ceil(filteredByGenre.length / pageSize) || 1);
    }
  }, [booksData, genre, pageSize]);

  useEffect(() => {
    // Refetch data when page changes
    refetch();
  }, [currentPage, refetch]);

  // Calculate discounted price and round to nearest integer
  const calculateDiscountedPrice = (basePrice, discount) => {
    if (!discount) return Math.round(basePrice);
    return Math.round(basePrice * (1 - discount.discountPercentage / 100));
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center text-3xl font-bold mb-10 text-gray-900'>
          {formatGenreName(genre)} Books
        </h1>

        {books.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {books.map((book) => (
                <div
                  key={book.id}
                  className='group bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer'
                  onClick={() => navigate(`/book-details/${book.id}`)}
                >
                  <div className='relative pb-[140%] overflow-hidden'>
                    {/* Book Cover */}
                    <div className='absolute inset-0 bg-gray-100'>
                      <img
                        src={
                          book.coverImage
                            ? `http://localhost:7226/images/${book.coverImage}`
                            : '/placeholder.svg'
                        }
                        alt={book.title}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    </div>

                    {/* Status Badge */}
                    <div className='absolute top-2 right-2'>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          book.isAvailable
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {book.isAvailable ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Sale Badge - Only show if isSaleFlag is true */}
                    {book.validatedDiscount &&
                      book.validatedDiscount.isSaleFlag && (
                        <div className='absolute top-2 left-2'>
                          <span className='px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white flex items-center shadow-sm'>
                            <Tag className='h-3.5 w-3.5 mr-1' />
                            SALE
                          </span>
                        </div>
                      )}
                  </div>

                  <div className='p-4'>
                    <h3 className='text-gray-900 font-medium line-clamp-2 mb-3 text-sm'>
                      {book.title}
                    </h3>

                    {/* Price display with rounded prices */}
                    <div className='mt-auto'>
                      {book.validatedDiscount ? (
                        <div>
                          <div className='flex items-center'>
                            <span className='text-sm line-through text-gray-500 mr-2'>
                              NPR {Math.round(book.basePrice)}
                            </span>
                            <span className='text-sm font-medium text-gray-900'>
                              NPR{' '}
                              {calculateDiscountedPrice(
                                book.basePrice,
                                book.validatedDiscount
                              )}
                            </span>
                          </div>
                          {/* Discount percentage below price */}
                          <span className='mt-1 inline-block text-xs font-medium text-amber-600'>
                            {book.validatedDiscount.discountPercentage}% OFF
                          </span>
                        </div>
                      ) : (
                        <span className='text-sm font-medium text-gray-900'>
                          NPR {Math.round(book.basePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-10'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 bg-white rounded-md shadow-sm'>
            <div className='text-5xl mb-4'>📚</div>
            <p className='text-xl font-medium text-gray-700'>
              No {formatGenreName(genre)} books found
            </p>
            <button
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              onClick={() => navigate('/allbooks')}
            >
              Browse All Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreBooksPage;
