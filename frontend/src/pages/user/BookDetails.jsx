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
import useAxiosAuth from '../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';

// Main Book Details Component
const BookDetails = () => {
  const axios = useAxiosAuth();

  const { bookId } = useParams(); // Get the bookId from the URL
  const [book, setBook] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: bookData, refetch } = useAxios(`book/${bookId}`);
  const [wishlistId, setWishlistId] = useState(null);

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
  const addtocart = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle bookmark
  useEffect(() => {
    if (book?.id) {
      axios
        .get(`/api/whitelist`)
        .then((res) => {
          const match = res.data.result.find(
            (item) => item.book.id === book.id
          );
          if (match) {
            setIsBookmarked(true);
            setWishlistId(match.id); // store the whitelist entry ID for deletion
          } else {
            setIsBookmarked(false);
            setWishlistId(null);
          }
        })
        .catch((err) => {
          console.error('❌ Failed to fetch wishlist:', err);
        });
    }
  }, [book?.id]);

  const toggleBookmark = () => {
    if (!book) return;

    if (isBookmarked && wishlistId) {
      axios
        .delete(`/api/whitelist/${wishlistId}`)
        .then(() => {
          toast.success('Removed from wishlist');
          setIsBookmarked(false);
          setWishlistId(null);
        })
        .catch((error) => {
          console.error(
            '❌ Remove Error:',
            error.response?.data || error.message
          );
          toast.error('Failed to remove from wishlist');
        });
    } else {
      axios
        .post('/api/whitelist', { BookId: book.id })
        .then((res) => {
          toast.success('Book added to wishlist!');
          setIsBookmarked(true);
          setWishlistId(res.data.result?.id); // in case response contains it
        })
        .catch((error) => {
          console.error('❌ Add Error:', error.response?.data || error.message);
          toast.error('Failed to add to wishlist');
        });
    }
  };

  // Calculate discounted price and round to nearest integer
  const calculateDiscountedPrice = (basePrice, discount) => {
    if (!discount) return Math.round(basePrice);
    return Math.round(basePrice * (1 - discount.discountPercentage / 100));
  };

  if (!book) {
    return (
      <div className='min-h-screen bg-gray-50 text-gray-600 flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin'></div>
          <p className='mt-6 text-xl font-medium'>Loading book details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!book) return;

    axios
      .post(
        '/api/Cart',
        { bookId: book.id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        toast.success('Book added to cart!');
      })
      .catch((error) => {
        console.error('Add to Cart Error:', error);
        toast.error('Failed to add book to cart');
      });
  };

  // Calculate discounted price if available
  const discountedPrice =
    book.discount && book.discount.length > 0
      ? (book.basePrice * (1 - book.discount[0].percentage / 100)).toFixed(2)
      : null;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Back button */}
        <Link
          to='/allbooks'
          className='inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors duration-200 group'
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
            <div className='relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg group'>
              <img
                src={`http://localhost:7226/images/${book.coverImage}`}
                alt={book.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

              {/* Availability badge */}
              <div className='absolute bottom-4 left-4'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {book.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className='absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg'
            >
              <Bookmark
                size={18}
                className={`${
                  isBookmarked ? 'fill-teal-500 text-teal-500' : 'text-gray-500'
                } transition-colors duration-200`}
              />
            </button>

            {/* Discount badge if available */}
            {discountedPrice && (
              <div className='absolute top-4 left-4'>
                <span className='px-3 py-1 rounded-full text-xs font-bold bg-teal-500 text-white'>
                  {book.discount[0].percentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Book details */}
          <div className='flex flex-col justify-between flex-grow'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold mb-4 text-gray-800 leading-tight'>
                {book.title}
              </h1>

              {/* Publisher and publication date */}
              <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6'>
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
                <div className='bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2'>
                  <BookOpen size={18} className='text-teal-600' />
                  <span>
                    {book.bookFormat} · {book.pageCount} pages
                  </span>
                </div>
              </div>

              {/* Full Description - moved here from below */}
              <div className='mb-8'>
                <h3 className='text-lg font-semibold mb-2 text-gray-800'>
                  About this book
                </h3>
                <div className='text-gray-600 leading-relaxed'>
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
                {book.discount && book.discount.isSaleFlag && (
                  <div className='absolute top-2 left-2'>
                    <span className='px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white flex items-center shadow-sm'>
                      <Tag className='h-3.5 w-3.5 mr-1' />
                      SALE
                    </span>
                  </div>
                )}
              </div>

              <div className='mt-auto'>
                {book.discount ? (
                  <div>
                    <div className='flex items-center'>
                      <span className='text-sm line-through text-gray-500 mr-2'>
                        NPR {Math.round(book.price)}
                      </span>
                      <span className='text-sm font-medium text-gray-900'>
                        NPR{' '}
                        {calculateDiscountedPrice(book.price, book.discount)}
                      </span>
                    </div>
                    {/* Discount percentage below price */}
                    <span className='mt-1 inline-block text-xs font-medium text-amber-600'>
                      {book.discount.discountPercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <span className='text-sm font-medium text-gray-900'>
                    NPR {Math.round(book.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-wrap gap-4'>
              <button
                className='bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow-md hover:-translate-y-0.5'
                onClick={handleAddToCart}
              >
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
              <div className='bg-white rounded-2xl p-8 shadow-md border border-gray-100'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3'>
                  <BookUser size={22} className='text-teal-600' />
                  About the {book.authors.length > 1 ? 'Authors' : 'Author'}
                </h2>
                <div className='space-y-8'>
                  {book.authors.map((author) => (
                    <div key={author.id} className='text-gray-600'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-lg font-medium text-teal-700'>
                          {author.name.charAt(0)}
                        </div>
                        <p className='font-medium text-xl text-gray-800'>
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
            <div className='bg-white rounded-2xl p-8 shadow-md border border-gray-100'>
              <h2 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3'>
                <Star size={22} className='text-teal-600' />
                Reader Reviews
              </h2>
              <Reviews bookId={bookId} />
            </div>
          </div>

          {/* Right column - Special offers and related books */}
          <div className='space-y-8'>
            {/* Book details card */}
            <div className='bg-white rounded-2xl p-8 shadow-md border border-gray-100 sticky top-8'>
              <h2 className='text-xl font-bold mb-6 text-gray-800'>
                Product Details
              </h2>

              <ul className='space-y-5'>
                <li className='flex items-start gap-4'>
                  <Tag size={18} className='mt-0.5 text-teal-600 shrink-0' />
                  <div>
                    <p className='text-sm text-gray-500'>Genre</p>
                    <p className='text-gray-700'>{book.genre}</p>
                  </div>
                </li>

                <li className='flex items-start gap-4'>
                  <BookOpen
                    size={18}
                    className='mt-0.5 text-teal-600 shrink-0'
                  />
                  <div>
                    <p className='text-sm text-gray-500'>Format</p>
                    <p className='text-gray-700'>{book.bookFormat}</p>
                  </div>
                </li>

                <li className='flex items-start gap-4'>
                  <div className='p-0.5 mt-0.5 text-teal-600 shrink-0'>
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
                    <p className='text-sm text-gray-500'>Pages</p>
                    <p className='text-gray-700'>{book.pageCount}</p>
                  </div>
                </li>

                {book.publicationDate && (
                  <li className='flex items-start gap-4'>
                    <Calendar
                      size={18}
                      className='mt-0.5 text-teal-600 shrink-0'
                    />
                    <div>
                      <p className='text-sm text-gray-500'>Published</p>
                      <p className='text-gray-700'>
                        {formatDate(book.publicationDate)}
                      </p>
                    </div>
                  </li>
                )}

                {book.publisherName && (
                  <li className='flex items-start gap-4'>
                    <Building
                      size={18}
                      className='mt-0.5 text-teal-600 shrink-0'
                    />
                    <div>
                      <p className='text-sm text-gray-500'>Publisher</p>
                      <p className='text-gray-700'>{book.publisherName}</p>
                    </div>
                  </li>
                )}

                <li className='flex items-start gap-4'>
                  <Globe size={18} className='mt-0.5 text-teal-600 shrink-0' />
                  <div>
                    <p className='text-sm text-gray-500'>Language</p>
                    <p className='text-gray-700'>{book.language}</p>
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
