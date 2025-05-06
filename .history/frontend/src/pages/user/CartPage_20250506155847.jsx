import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [users, setUsers] = useState([]); // For storing all users
  const { data: cartData, refetch } = useAxios(`cart`);
  const { data: userData } = useAxios('users'); // Assuming you have an API endpoint for users

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
    } else {
      setCartItems([]);
    }
  }, [cartData]);

  useEffect(() => {
    if (userData && userData.length > 0) {
      setUsers(userData); // Set all users
    }
  }, [userData]);

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
        <h1 className='text-3xl font-semibold mb-4 text-center'>All Users' Cart</h1>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.email} className='mb-8'>
              <h2 className='text-2xl font-semibold'>{user.name} - {user.email}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {cartItems
                  .filter(item => item.userEmail === user.email) // Assuming cart items have a userEmail field
                  .map((item) => {
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
            </div>
          ))
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl'>No users or carts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
