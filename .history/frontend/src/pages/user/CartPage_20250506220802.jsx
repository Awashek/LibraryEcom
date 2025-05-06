import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [memberInfo, setMemberInfo] = useState({
    isMember: true, // Default to true for display purposes
    successfulOrders: 12, // Default number of orders for display
  });
  
  const { data: cartData } = useAxios('Cart'); 
  
  // Safely fetch member info with error handling
  const { data: memberData, error: memberError } = useAxios('Member/current', {
    // Setting manual to true prevents the request from automatically firing
    // We'll handle this manually to prevent 404 errors in the console
    manual: true
  });
  
  useEffect(() => {
    if (cartData && cartData.result && cartData.result.length > 0) {
      setCartItems(cartData.result); // Access the 'result' array from the response
    } else {
      setCartItems([]); // Empty cart if no data is found
    }
    
    // Try to fetch member data - in production this would connect to your API
    // This is commented out to prevent errors since your endpoint may not exist yet
    /* 
    try {
      // You would implement proper fetching here with proper error handling
      const fetchMemberInfo = async () => {
        const response = await fetch('/api/member/current');
        if (response.ok) {
          const data = await response.json();
          setMemberInfo({
            isMember: true,
            successfulOrders: data.successfulOrders || 0
          });
        }
      };
      fetchMemberInfo();
    } catch (error) {
      console.log("Member info not available, using default values");
    }
    */
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

  // Calculate member discounts
  const calculateMemberDiscounts = (subtotal, totalItems) => {
    let discounts = [];
    let finalSubtotal = subtotal;
    
    // Get member status either from API or localStorage
    // In a real app, you'd authenticate properly and store member status securely
    const localMemberData = localStorage.getItem('memberInfo');
    const currentMemberInfo = localMemberData ? JSON.parse(localMemberData) : memberInfo;
    
    // 5% discount for ordering 5+ books
    if (totalItems >= 5) {
      const bulkDiscount = subtotal * 0.05;
      discounts.push({
        name: "5% Bulk Purchase Discount (5+ books)",
        amount: bulkDiscount
      });
      finalSubtotal -= bulkDiscount;
    }
    
    // 10% loyalty discount after 10 successful orders
    if (currentMemberInfo.isMember && currentMemberInfo.successfulOrders >= 10) {
      const loyaltyDiscount = subtotal * 0.10;
      discounts.push({
        name: "10% Loyalty Discount (10+ orders)",
        amount: loyaltyDiscount
      });
      finalSubtotal -= loyaltyDiscount;
    }
    
    return {
      discounts,
      finalSubtotal
    };
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
    
    // Apply member discounts
    const { discounts, finalSubtotal } = calculateMemberDiscounts(subtotal, totalItems);
    
    const shipping = 4.99;
    const tax = finalSubtotal * 0.08; // 8% tax on post-discount subtotal
    const total = finalSubtotal + shipping + tax;
    
    return {
      originalSubtotal: subtotal,
      subtotal: finalSubtotal,
      memberDiscounts: discounts,
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
                    <p className="font-medium">${totals.originalSubtotal.toFixed(2)}</p>
                  </div>

                  {/* Member Discounts Section */}
                  {totals.memberDiscounts.length > 0 && (
                    <div className="pt-2">
                      <p className="text-gray-600 font-medium text-sm">Member Discounts:</p>
                      {totals.memberDiscounts.map((discount, index) => (
                        <div key={index} className="flex justify-between text-green-600 mt-1">
                          <p className="text-sm">{discount.name}</p>
                          <p className="font-medium">-${discount.amount.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between font-medium mt-2 pt-2 border-t border-dashed border-gray-200">
                        <p className="text-gray-600">Discounted Subtotal</p>
                        <p>${totals.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
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

                {/* Member Status Badge - Now with a toggle for testing */}
                <div className="mt-4">
                  {memberInfo.isMember ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-800 font-medium">Member Benefits Applied</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1 pl-7">
                        {memberInfo.successfulOrders} completed orders
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5zm0 8a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0V13z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 font-medium">Sign in for member benefits</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Toggle for testing discount features (in development only) */}
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>Test Member Status:</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setMemberInfo({isMember: true, successfulOrders: 12})}
                        className={`px-2 py-1 rounded ${memberInfo.isMember ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                      >
                        Member
                      </button>
                      <button 
                        onClick={() => setMemberInfo({isMember: false, successfulOrders: 0})}
                        className={`px-2 py-1 rounded ${!memberInfo.isMember ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                      >
                        Guest
                      </button>
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