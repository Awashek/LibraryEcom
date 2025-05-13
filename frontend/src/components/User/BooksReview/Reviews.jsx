'use client';

import { useState, useMemo } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import useAxios from '../../../utils/axios/useAxios';

// Review Card Component
const ReviewCard = ({ rating, comment, name, image }) => {
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    return parts
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className='group p-5 rounded-xl transition-all duration-300 hover:bg-gray-50'>
      <div className='flex items-start gap-4'>
        <div className='w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 ring-2 ring-white'>
          {image ? (
            <img
              src={image || '/placeholder.svg'}
              alt={name}
              className='w-full h-full object-cover'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-sm font-semibold text-teal-800 bg-gradient-to-br from-teal-50 to-teal-100">${getInitials(
                  name
                )}</div>`;
              }}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-sm font-semibold text-teal-800 bg-gradient-to-br from-teal-50 to-teal-100'>
              {getInitials(name)}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-gray-800'>{name}</p>
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= rating
                      ? 'text-yellow-500 fill-yellow-400'
                      : 'text-gray-200'
                  } transition-colors`}
                />
              ))}
            </div>
          </div>
          <p className='mt-2 text-gray-600 leading-relaxed'>{comment}</p>
        </div>
      </div>
    </div>
  );
};

// Reviews Component
const Reviews = ({ bookId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const { data: reviewsData, refetch } = useAxios(
    `review/book/${bookId}/?pageNumber=${currentPage}&pageSize=${pageSize}&search=`
  );

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    refetch();
  };

  const { result: reviews = [], totalCount = 0 } = reviewsData || {};

  // 💡 Compute average rating using useMemo
  const averageRating = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100'>
      {/* Header with Rating */}
      <div className='bg-white p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <MessageSquare className='w-5 h-5 text-teal-600' />
            <h2 className='text-xl font-bold text-gray-800'>Reader Reviews</h2>
            <span className='ml-2 px-2 py-0.5 bg-white text-xs font-medium text-teal-600 rounded-full shadow-sm'>
              {totalCount} {totalCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
          {averageRating && (
            <div className='flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm'>
              <Star className='w-5 h-5 fill-yellow-400 text-yellow-500 mr-1.5' />
              <span className='font-bold text-gray-800'>
                {averageRating}
                <span className='text-gray-400 text-sm font-normal ml-0.5'>
                  /5
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className='divide-y divide-gray-100'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.user.name}
              rating={review.rating}
              comment={review.comment}
              image={
                review.user.imageURL
                  ? `http://localhost:7226/images/user-images/${review.user.imageURL}`
                  : null
              }
            />
          ))
        ) : (
          <div className='py-12 flex flex-col items-center justify-center text-center'>
            <MessageSquare className='w-12 h-12 text-gray-300 mb-3' />
            <p className='text-gray-500 font-medium'>No reviews yet</p>
            <p className='text-gray-400 text-sm mt-1'>
              Be the first to share your thoughts on this book
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {reviews.length < totalCount && (
        <div className='p-4 bg-gray-50'>
          <button
            className='w-full py-3 px-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-all duration-200 border border-teal-200 hover:border-teal-300 rounded-lg bg-white hover:bg-teal-50 shadow-sm hover:shadow flex items-center justify-center'
            onClick={handleLoadMore}
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
