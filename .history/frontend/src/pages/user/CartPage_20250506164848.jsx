import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState({ count: 0 });
  const { data: cartData } = useAxios('Cart');
  const { data: orderData } = useAxios('OrderHistory');

  useEffect(() => {
    if (cartData && cartData.result && cartData.result.length > 0) {
      setCartItems(cartData.result);
    } else {
      setCartItems([]);
    }
  }, [cartData]);

  useEffect(() => {
    if (orderData && orderData.result) {
      setOrderHistory(orderData.result);
    }
  }, [orderData]);

  const formatCartBook = (item) => {
    const book = item.book;
    return {
      id: item.id || book.id,
      title: book.title,
      price: book.basePrice || 0,
      coverImage: book.coverImage || 'https://via.placeholder.com/150x200?text=No+Cover',
      quantity: item.quantity || 1
    };
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateDiscounts = () => {
    // Count total items in cart
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Initialize discounts
    let volumeDiscount = 0;
    let loyaltyDiscount = 0;
    let discountMessages = [];
    
    // Apply 5% discount for 5+ books in cart
    if (totalItems >= 5) {
      volumeDiscount = 0.05;
      discountMessages.push(`5% discount applied for ordering 5+ books`);
    }
    
    // Apply 10% stackable discount for members with 10+ completed orders
    if (orderHistory.count >= 10) {
      loyaltyDiscount = 0.10;
      discountMessages.push(`10% loyalty discount applied for ${orderHistory.count} completed orders`);
    }
    
    return {
      volumeDiscount,
      loyaltyDiscount,
      totalDiscountRate: volumeDiscount + loyaltyDiscount,
      discountMessages
    };
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = item.book.basePrice || 0;
      return total + (price * (item.quantity || 1));
    }, 0);

    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const shipping = 4.99;
    
    // Calculate discounts
    const discounts = calculateDiscounts();
    const discountAmount = subtotal * discounts.totalDiscountRate;
    
    // Calculate final amounts
    const subtotalAfterDiscount = subtotal - discountAmount;
    const tax = subtotalAfterDiscount * 0.08;
    const total = subtotalAfterDiscount + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      discounts,
      discountAmount,
      subtotalAfterDiscount,
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
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">You have completed {orderHistory.count} orders</span>
                </div>
                {orderHistory.count < 10 && (
                  <p className="text-sm text-gray-600 mt-1 pl-7">Complete {10 - orderHistory.count} more orders to receive 10% loyalty discount</p>
                )}
              </div>

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
                                ${formattedItem.price.toFixed(2)}
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
                                ${(formattedItem.price * formattedItem.quantity).toFixed(2)}
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
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({totals.totalItems})</span>
                    <span className="text-gray-900 font-medium">${totals.subtotal.toFixed(2)}</span>
                  </div>

                  {totals.discounts.totalDiscountRate > 0 && (
                    <>
                      {totals.discounts.discountMessages.map((message, index) => (
                        <div key={index} className="flex justify-between text-green-600">
                          <span>{message}</span>
                          <span>-${(index === 0 ? 
                            totals.subtotal * totals.discounts.volumeDiscount : 
                            totals.subtotal * totals.discounts.loyaltyDiscount).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-medium">
                        <span>Subtotal after discounts</span>
                        <span>${totals.subtotalAfterDiscount.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">${totals.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-gray-900 font-medium">${totals.tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Checkout
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