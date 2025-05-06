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
      discountMessages.push(`5% discount for ordering 5+ books`);
    }

    if (orderHistory.count >= 10) {
      loyaltyDiscount = 0.10;
      discountMessages.push(`10% loyalty discount for ${orderHistory.count} completed orders`);
    }

    return {
      volumeDiscount,
      loyaltyDiscount,
      totalDiscountRate: volumeDiscount + loyaltyDiscount,
      discountMessages
    };
  };

  const calculateTotals = () => {
    const itemTotal = cartItems.reduce((total, item) => {
      const price = item.book.basePrice || 0;
      return total + (price * (item.quantity || 1));
    }, 0);

    const discounts = calculateDiscounts();
    const discountAmount = itemTotal * discounts.totalDiscountRate;
    const discountedTotal = itemTotal - discountAmount;
    const shipping = 4.99;

    return {
      itemTotal,
      discountAmount,
      discountedTotal,
      shipping,
      total: discountedTotal + shipping,
      discounts
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <p className="text-blue-600 font-medium">
                  Completed Orders: {orderHistory.count}
                </p>
                {totals.discounts.discountMessages.map((msg, index) => (
                  <p key={index} className="text-sm text-gray-600 pl-2 mt-1">• {msg}</p>
                ))}
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
                          className="w-24 h-36 object-cover rounded-md mr-6"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{formattedItem.title}</h3>
                          <p className="text-gray-700">${formattedItem.price.toFixed(2)}</p>
                          <div className="mt-4 flex items-center">
                            <button
                              onClick={() => updateQuantity(formattedItem.id, formattedItem.quantity - 1)}
                              className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 bg-white border-t border-b">{formattedItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(formattedItem.id, formattedItem.quantity + 1)}
                              className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItem(formattedItem.id)}
                              className="ml-4 text-red-600 hover:underline"
                            >
                              Remove
                            </button>
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
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Items Total:</span>
                  <span>${totals.itemTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount:</span>
                  <span>− ${totals.discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>${totals.shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700">
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
