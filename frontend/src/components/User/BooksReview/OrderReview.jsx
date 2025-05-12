import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  Star,
  Edit,
  Trash2,
  MessageSquare,
  PenTool,
  Loader2,
} from 'lucide-react';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';

export default function BookReviewSystem({ bookId, userId }) {
  const axios = useAxiosAuth();
  const [isReviewing, setIsReviewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(true);
  const [userHasReview, setUserHasReview] = useState(false);

  // Get userId from cookies safely
  const getUserId = () => {
    try {
      const authStateCookie = Cookies.get('_auth_state');
      if (!authStateCookie) throw new Error('User not authenticated');
      const decodedAuthState = decodeURIComponent(authStateCookie);
      const authState = JSON.parse(decodedAuthState);
      return authState.id;
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
      return null;
    }
  };

  const checkUserReview = useCallback(() => {
    const userId = getUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`/api/review/book/${bookId}/all`)
      .then((response) => {
        const userReview = response.data.result.find(
          (r) => r.userId === userId
        );
        if (userReview) {
          setReview(userReview);
          setRating(userReview.rating);
          setReviewText(userReview.comment);
          setUserHasReview(true);
        }
      })
      .catch((error) => {
        console.error('Error checking reviews:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId, axios]);

  useEffect(() => {
    checkUserReview();
  }, [checkUserReview]);


  useEffect(() => {
  // Reset state when bookId changes
  setReview(null);
  setRating(5);
  setReviewText('');
  setUserHasReview(false);
  setIsEditing(false);
  setIsReviewing(false);
  setIsDeleting(false);
}, [bookId]);


  const handleSubmitReview = (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) return;

    const formData = new FormData();
    formData.append('BookId', bookId);
    formData.append('Rating', rating);
    formData.append('Comment', reviewText);
    formData.append('UserId', userId);

    axios
      .post('/api/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        toast.success('Review submitted successfully');
        setIsReviewing(false);
        checkUserReview();
      })
      .catch((error) => {
        toast.error('Failed to submit review');
        console.error(error);
      });
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Rating', rating);
    formData.append('Comment', reviewText);

    axios
      .put(`/api/review/${review.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Review updated successfully');
        setIsEditing(false);
        checkUserReview();
      })
      .catch((error) => {
        toast.error('Failed to update review');
        console.error(error);
      });
  };

  const handleDeleteReview = () => {
    setIsDeleting(true);
    axios
      .delete(`/api/review/${review.id}`)
      .then(() => {
        toast.success('Review deleted successfully');
        setReview(null);
        setUserHasReview(false);
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error('Failed to delete review');
        console.error(error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const StarRating = ({ value, onChange, readOnly }) => {
    return (
      <div className='flex'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type='button'
            onClick={() => !readOnly && onChange(star)}
            className={`${
              readOnly ? 'cursor-default' : 'cursor-pointer'
            } focus:outline-none`}
            disabled={readOnly}
          >
            <Star
              className={`h-5 w-5 ${
                star <= value
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-4'>
        <Loader2 className='h-5 w-5 text-blue-500 animate-spin' />
      </div>
    );
  }

  if (userHasReview && review) {
    if (isEditing) {
      return (
        <div className='border border-gray-200 rounded-lg p-4 bg-white shadow-sm'>
          <h3 className='text-lg font-medium mb-3 flex items-center'>
            <PenTool className='h-5 w-5 mr-2 text-blue-500' />
            Edit Your Review
          </h3>
          <form onSubmit={handleUpdateReview}>
            <div className='mb-3'>
              <label className='block text-sm font-medium mb-1'>Rating</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                rows='3'
                required
              />
            </div>
            <div className='flex justify-between'>
              <div>
                <button
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Update Review
                </button>
              </div>
              <button
                type='button'
                onClick={handleDeleteReview}
                disabled={isDeleting}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center'
              >
                {isDeleting ? (
                  <Loader2 className='h-4 w-4 mr-1 animate-spin' />
                ) : (
                  <Trash2 className='h-4 w-4 mr-1' />
                )}
                Delete
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className='border border-gray-200 rounded-lg p-4 bg-white shadow-sm'>
        <div className='flex justify-between items-start'>
          <div className='mb-2'>
            <h3 className='text-lg font-medium flex items-center'>
              <MessageSquare className='h-5 w-5 mr-2 text-blue-500' />
              Your Review
            </h3>
            <div className='mt-1 flex items-center'>
              <StarRating value={review.rating} readOnly={true} />
              <span className='ml-2 text-sm text-gray-500'>
                {new Date(review.reviewDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className='text-blue-600 hover:text-blue-800 flex items-center text-sm'
          >
            <Edit className='h-4 w-4 mr-1' />
            Edit
          </button>
        </div>
        <p className='text-gray-700 mt-2'>{review.comment}</p>
      </div>
    );
  }

  if (isReviewing) {
    return (
      <div className='border border-gray-200 rounded-lg p-4 bg-white shadow-sm'>
        <h3 className='text-lg font-medium mb-3 flex items-center'>
          <PenTool className='h-5 w-5 mr-2 text-blue-500' />
          Write a Review
        </h3>
        <form onSubmit={handleSubmitReview}>
          <div className='mb-3'>
            <label className='block text-sm font-medium mb-1'>Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Share your thoughts about this book...'
              rows='3'
              required
            />
          </div>
          <div className='flex'>
            <button
              type='button'
              onClick={() => setIsReviewing(false)}
              className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <button
        onClick={() => setIsReviewing(true)}
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center'
      >
        <PenTool className='h-4 w-4 mr-2' />
        Write a Review
      </button>
    </div>
  );
}
