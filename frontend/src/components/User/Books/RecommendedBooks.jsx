import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../utils/axios/useAxios';
import { Tag } from 'lucide-react';

const RecommendedBooks = () => {
  const navigate = useNavigate();
  const { data: booksData } = useAxios(`book?pageNumber=1&pageSize=50&search=`);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    if (booksData?.result?.length > 0) {
      // Shuffle and select books with sale discounts preferentially
      const shuffled = [...booksData.result].sort(() => 0.5 - Math.random());

      // Prioritize books with discounts
      const discountedBooks = shuffled.filter((book) => book.validatedDiscount);
      const regularBooks = shuffled.filter((book) => !book.validatedDiscount);

      // Select up to 8 books, prioritizing discounted ones
      const selectedBooks = [
        ...discountedBooks.slice(0, 8),
        ...regularBooks.slice(0, Math.max(0, 8 - discountedBooks.length)),
      ];

      // Format each book
      const formatted = selectedBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.authors?.map((a) => a.name).join(', ') || 'Unknown Author',
        coverImage: book.coverImage
          ? `http://localhost:7226/images/${book.coverImage}`
          : '/placeholder.svg',
        isAvailable: book.isAvailable,
        basePrice: Number(book.basePrice),
        discount: book.validatedDiscount || null,
      }));

      setRecommendedBooks(formatted);
    }
  }, [booksData]);

  // Calculate discounted price and round to nearest integer
  const calculateDiscountedPrice = (basePrice, discount) => {
    if (!discount) return Math.round(basePrice);
    return Math.round(basePrice * (1 - discount.discountPercentage / 100));
  };

  return (
    <div className='bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-10'>
          <h2 className='text-center text-3xl font-bold text-gray-900 mb-2'>
            RECOMMENDED READS
          </h2>
          <p className='text-center text-gray-600 max-w-2xl mx-auto'>
            Discover our handpicked selection of books we think you'll love
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              className='group bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer'
              onClick={() => navigate(`/book-details/${book.id}`)}
            >
              <div className='relative pb-[140%] overflow-hidden'>
                {/* Book Cover */}
                <div className='absolute inset-0 bg-gray-100'>
                  <img
                    src={book.coverImage}
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

                {/* Sale Badge - Only show if discount exists */}
                {book.discount && book.discount.isSaleFlag && (
                  <div className='absolute top-2 left-2'>
                    <span className='px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white flex items-center shadow-sm'>
                      <Tag className='h-3.5 w-3.5 mr-1' />
                      SALE
                    </span>
                  </div>
                )}

                {/* Special badges */}
                <div className='absolute bottom-2 left-2 flex gap-2'>
                  {book.isBestSeller && (
                    <span className='px-2 py-1 rounded-md text-xs font-medium bg-amber-500 text-white shadow-sm'>
                      Bestseller
                    </span>
                  )}
                  {book.isAwarded && (
                    <span className='px-2 py-1 rounded-md text-xs font-medium bg-purple-600 text-white shadow-sm'>
                      Award Winner
                    </span>
                  )}
                </div>
              </div>

              <div className='p-4'>
                <h3 className='text-gray-900 font-medium line-clamp-2 mb-1 text-sm'>
                  {book.title}
                </h3>

                {/* Price display with rounded prices */}
                <div className='mt-auto'>
                  {book.discount ? (
                    <div>
                      <div className='flex items-center'>
                        <span className='text-sm line-through text-gray-500 mr-2'>
                          NPR {Math.round(book.basePrice)}
                        </span>
                        <span className='text-sm font-medium text-gray-900'>
                          NPR{' '}
                          {calculateDiscountedPrice(
                            book.basePrice,
                            book.discount
                          )}
                        </span>
                      </div>
                      {/* Discount percentage below price */}
                      <span className='mt-1 inline-block text-xs font-medium text-amber-600'>
                        {book.discount.discountPercentage}% OFF
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
      </div>
    </div>
  );
};

export default RecommendedBooks;
