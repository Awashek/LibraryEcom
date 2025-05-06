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
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    let volumeDiscount = 0;
    let loyaltyDiscount = 0;
    let discountMessages = [];

    if (totalItems >= 5) {
      volumeDiscount = 0.05;
      discountMessages.push(`5% discount applied for ordering 5+ books`);
    }

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
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const baseTotal = cartItems.reduce((total, item) => {
      const price = item.book.basePrice || 0;
      return total + (price * (item.quantity || 1));
    }, 0);

    const shipping = 4.99;
    const discounts = calculateDiscounts();
    const discountAmount = baseTotal * discounts.totalDiscountRate;
    const total = baseTotal - discountAmount + shipping;

    return {
      baseTotal,
      shipping,
      discountAmount,
      discounts,
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
            <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
            <button className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <p className="font-medium text-blue-600">
                  You have completed {orderHistory.count} orders
                </p>
                {orderHistory.count < 10 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Complete {10 - orderHistory.count} more orders to receive 10% loyalty discount
                  </p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const formattedItem = formatCartBook(item);
                    return (
                      <li key={formattedItem.id} className="p-4 flex flex-col sm:flex-row">
                        <img
                          src={formattedItem.coverImage}
                          alt={formattedItem.title}
                          className="w-24 h-36 object-cover rounded-md mr-6 mb-4 sm:mb-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{formattedItem.title}</h3>
                              <p className="text-lg text-gray-700 mt-2">${formattedItem.price.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => removeItem(formattedItem.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ×
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
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Books Total</span>
                  <span>${totals.baseTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${totals.shipping.toFixed(2)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>- ${totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
                {totals.discounts.discountMessages.map((msg, idx) => (
                  <p key={idx} className="text-sm text-green-600 mt-1">{msg}</p>
                ))}
                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
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
