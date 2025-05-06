import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { data: cartData } = useAxios('Cart'); // Fetch all cart data from the API
  
  useEffect(() => {
    if (cartData && cartData.result && cartData.result.length > 0) {
      setCartItems(cartData.result); // Access the 'result' array from the response
    } else {
      setCartItems([]); // Empty cart if no data is found
    }
  }, [cartData]);

  // Format cart book data
  const formatCartBook = (item) => {
    const book = item.book;
    return {
      id: item.id || book.id,
      title: book.title,
      price: book.basePrice || 0,
      discount: book.discount,
      coverImage: book.coverImage || 'https://via.placeholder.com/150x200?text=No+Cover',
      quantity: item.quantity || 1
    };
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const book = item.book;
      const price = book.basePrice || 0;
      const discountedPrice = book.discount 
        ? price * (1 - book.discount.percentage / 100)
        : price;
      return total + (discountedPrice * (item.quantity || 1));
    }, 0);
    
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const shipping = 4.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    return {
      subtotal,
      shipping,
      tax,
      total,
      totalItems
    };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl">Your cart is empty</p>
            </div>
            <button className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const formattedItem = formatCartBook(item);
                    return (
                      <li key={formattedItem.id} className="p-4 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                          <img
                            src={formattedItem.coverImage}
                            alt={formattedItem.title}
                            className="w-24 h-36 object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{formattedItem.title}</h3>
                              <p className="text-lg font-medium text-gray-900 mt-2">
                                {formattedItem.discount ? (
                                  <>
                                    ${(formattedItem.price * (1 - formattedItem.discount.percentage / 100)).toFixed(2)}
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                      ${formattedItem.price.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  `$${formattedItem.price.toFixed(2)}`
                                )}
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(formattedItem.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-4 flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(formattedItem.id, formattedItem.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="px-4 py-1 border-l border-r border-gray-300">
                                {formattedItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(formattedItem.id, formattedItem.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>

                            <div className="ml-auto text-right">
                              <p className="text-sm text-gray-600">Subtotal</p>
                              <p className="text-lg font-medium text-gray-900">
                                ${formattedItem.discount ? 
                                  ((formattedItem.price * (1 - formattedItem.discount.percentage / 100)) * formattedItem.quantity).toFixed(2) : 
                                  (formattedItem.price * formattedItem.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </button>

                <button
                  onClick={() => setCartItems([])}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal ({totals.totalItems} items)</p>
                    <p className="font-medium">${totals.subtotal.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">${totals.shipping.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax (8%)</p>
                    <p className="font-medium">${totals.tax.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <p>Total</p>
                      <p>${totals.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Checkout button */}
                <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;