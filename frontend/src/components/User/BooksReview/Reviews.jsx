import React, { useState } from 'react';
import { Star } from 'lucide-react';
import useAxios from '../../../utils/axios/useAxios';

// Review Card Component
const ReviewCard = ({ rating, comment, name, image }) => {
  return (
    <div className='flex flex-col gap-2 py-4 border-b border-gray-200'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-gray-200 overflow-hidden'>
          {image ? (
            <img
              src={image}
              alt='user'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-xs text-gray-500'>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className='font-medium text-sm'>{name}</p>
          <div className='flex items-center'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`${
                  star <= rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className='text-sm text-gray-600'>{comment}</p>
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

  if (!reviewsData) {
    return <p className='text-gray-500 py-4'>Loading reviews...</p>;
  }

  const { result: reviews = [], totalCount = 0 } = reviewsData;

  return (
    <div>
      {/* Reviews List */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.user.name}
            rating={review.rating}
            comment={review.comment}
            image={
              review.user.imageURL
                ? `http://localhost:7226/images/user-images/${review.user.imageURL.replace(
                    'images/user-images//',
                    ''
                  )}`
                : null
            }
          />
        ))
      ) : (
        <p className='text-gray-500 py-4'>No reviews yet.</p>
      )}

      {reviews.length < totalCount && (
        <button
          className='w-full text-center text-gray-500 py-3 mt-4 text-sm hover:text-teal-600'
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Reviews;
