import { useEffect, useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import useAxios from '../../../utils/axios/useAxios';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';

export default function WishlistPage() {
  const axios = useAxiosAuth();
  const { data: wishlistData } = useAxios(
    `whitelist?pageNumber=1&pageSize=12&search=`
  );
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (wishlistData && wishlistData.result) {
      const formattedBooks = wishlistData.result.map((item) => {
        const book = item.book;
        return {
          wishlistId: item.id, // this is important for delete call
          id: book.id,
          title: book.title,
          author: book.authors?.[0]?.name || 'Unknown Author',
          institution: book.publisherName || 'Unknown Publisher',
          price: book.basePrice || 0,
          coverImage: book.coverImage,
          inWishlist: true,
        };
      });
      setBooks(formattedBooks);
    }
  }, [wishlistData]);

  const addToCart = (bookId) => {
    axios
      .post(
        '/api/Cart',
        { bookId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => toast.success('Book added to cart!'))
      .catch((error) => {
        console.error('Add to Cart Error:', error);
        toast.error('Failed to add book to cart');
      });
  };

  const toggleWishlist = (bookId, wishlistId) => {
    if (!wishlistId) return;

    axios
      .delete(`/api/whitelist/${wishlistId}`)
      .then(() => {
        toast.success('Removed from wishlist');
        setBooks((prev) => prev.filter((book) => book.id !== bookId));
      })
      .catch((error) => {
        console.error('Remove Error:', error.response?.data || error.message);
        toast.error('Failed to remove from wishlist');
      });
  };

  return (
    <div className='p-6 max-w-6xl mx-auto bg-gray-50'>
      <div className='mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          <Heart className='h-6 w-6 text-gray-700' />
          <h1 className='text-3xl font-bold text-gray-800'>My Wishlist</h1>
        </div>
        <p className='text-gray-600'>
          Easily view and manage your saved items.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {books.map((book) => (
          <div
            key={book.id}
            className='border rounded-md p-4 bg-white relative'
          >
            <button
              className='absolute top-4 right-4 z-10'
              onClick={() => toggleWishlist(book.id, book.wishlistId)}
            >
              <Bookmark
                fill={book.inWishlist ? 'black' : 'none'}
                className='text-black'
                size={24}
              />
            </button>

            <div className='mb-3'>
              <img
                src={`http://localhost:7226/images/${book.coverImage}`}
                alt={book.title}
                className='w-full h-64 object-cover rounded'
              />
            </div>

            <h3 className='font-bold text-lg mb-1'>{book.title}</h3>
            <p className='text-gray-600 text-sm mb-4'>{book.institution}</p>

            <div className='flex justify-between items-center mt-2'>
              <span className='font-medium'>$ {book.price}</span>
              <button
                onClick={() => addToCart(book.id)}
                className='bg-gray-800 text-white px-4 py-2 rounded text-sm'
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
