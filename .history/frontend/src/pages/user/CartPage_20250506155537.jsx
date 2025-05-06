import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const { data: cartData, refetch } = useAxios(`cart`);

  useEffect(() => {
    // Assuming you store user data in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
    } else {
      setCartItems([]);
    }
  }, [cartData]);

  const formatCartBook = (item) => {
    const book = item.book;
    return {
      id: book.id,
      title: book.title,
      author:
        book.authors && book.authors.length > 0
          ? book.authors.map((a) => a.name).join(', ')
          : 'Unknown Author',
      price: book.basePrice,
      discount: book.discount,
      coverImage: 'https://via.placeholder.com/150x200?text=No+Cover',
    };
  };

  return (
    <div className='min-h-screen bg-[#222] text-white py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4 text-center'>Your Cart</h1>
        {userEmail && (
          <p className='text-center mb-8 text-gray-300'>
            Logged in as: <span className='font-medium'>{userEmail}</span>
          </p>
        )}

        {cartItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {cartItems.map((item) => {
              const book = formatCartBook(item);
              return (
                <div key={book.id} className='bg-gray-800 rounded-lg p-4'>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className='w-full h-48 object-cover rounded'
                  />
                  <h3 className='mt-2 text-lg font-semibold'>{book.title}</h3>
                  <p className='text-sm text-gray-400'>{book.author}</p>
                  {book.discount ? (
                    <div className='mt-2'>
                      <span className='text-sm line-through text-gray-400 mr-2'>
                        ${book.price.toFixed(2)}
                      </span>
                      <span className='text-sm font-medium'>
                        ${(
                          book.price *
                          (1 - book.discount.percentage / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <p className='text-sm font-medium mt-2'>
                      ${book.price.toFixed(2)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl'>No cart added</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
