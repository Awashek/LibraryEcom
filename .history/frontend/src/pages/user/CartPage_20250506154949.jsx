import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { data: cartData, refetch } = useAxios(`cart/user-cart`);
  
  useEffect(() => {
    if (cartData && cartData.result) {
      setCartItems(cartData.result);
    }
  }, [cartData]);

  const formatCartItem = (item) => {
    const book = item.book;
    return {
      id: book.id,
      title: book.title,
      author: book.authors?.map((a) => a.name).join(', ') || 'Unknown Author',
      price: book.basePrice,
      discount: book.discount,
      status: book.isAvailable ? 'Available' : 'Booked',
      coverImage: 'https://via.placeholder.com/150x200?text=No+Cover',
    };
  };

  return (
    <div className='min-h-screen bg-[#222] text-white py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center text-3xl font-medium mb-8'>MY CART</h1>

        {cartItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {cartItems.map((item) => {
              const book = formatCartItem(item);
              return (
                <div key={book.id} className='flex flex-col'>
                  <div className='relative pb-[150%] overflow-hidden'>
                    <div className='absolute inset-0 bg-gray-700'>
                      <div className='w-full h-full flex items-center justify-center'>
                        <div className='w-full h-full absolute inset-0'>
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 px-2 py-1 m-2 text-xs font-medium ${
                        book.status === 'Available' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {book.status}
                    </div>
                  </div>
                  <h3 className='mt-2 text-sm font-medium'>{book.title}</h3>
                  <p className='text-xs text-gray-400'>{book.author}</p>
                  {book.discount ? (
                    <div className='flex items-center mt-1'>
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
                    <span className='text-sm font-medium mt-1'>
                      ${book.price.toFixed(2)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-xl'>No books added to cart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
