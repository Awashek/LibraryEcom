import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Review Card Component
const ReviewCard = ({ rating, comment, userName }) => {
  return (
    <div className='flex flex-col gap-2 py-4 border-b border-gray-200'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-gray-200'></div>
        <div>
          <p className='font-medium text-sm'>{userName}</p>
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
const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      userName: 'User Name',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae elementum odio. Integer auctor purus et elementum posuere. Fusce vitae cursus erat, vel varius augue. Fusce eleifend tortor et leo ultrices.',
    },
    {
      id: 2,
      userName: 'User Name',
      rating: 3,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae elementum odio. Integer auctor purus et elementum posuere. Fusce vitae cursus erat, vel varius augue. Fusce eleifend tortor et leo ultrices.',
    },
  ]);

  return (
    <div>
      {/* Reviews List */}
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          userName={review.userName}
          rating={review.rating}
          comment={review.comment}
        />
      ))}

      <button className='w-full text-center text-gray-500 py-3 mt-4 text-sm'>
        Load More
      </button>
    </div>
  );
};

export default Reviews;
