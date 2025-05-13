import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';
import useAxiosAuth from '../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';

const CartPage = () => {
  const axios = useAxiosAuth();
  const [cartItems, setCartItems] = useState([]);
  const { data: cartData, refetch } = useAxios('Cart');
  const [showClearModal, setShowClearModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  console.log(cartData, "cartData");

  useEffect(() => {
    if (cartData && cartData.result && cartData.result.length > 0) {
      setCartItems(cartData.result);
    } else {
      setCartItems([]);
    }
  }, [cartData]);

  const increaseQuantity = (bookId) => {
    axios.put(`/api/Cart/increase/${bookId}`)
      .then(() => {
        toast.success("Increased quantity");
        refetch();
      })
      .catch(() => toast.error("Failed to increase quantity"));
  };

  const decreaseQuantity = (bookId) => {
    axios.put(`/api/Cart/decrease/${bookId}`)
      .then(() => {
        toast.success("Decreased quantity");
        refetch();
      })
      .catch(() => toast.error("Failed to decrease quantity"));
  };

  const confirmRemoveItem = (cartId) => {
    setItemToRemove(cartId);
    setShowRemoveModal(true);
  };

  const removeItem = () => {
    axios.delete(`/api/Cart/${itemToRemove}`)
      .then(() => {
        toast.success("Removed from cart");
        setCartItems(prev => prev.filter(item => item.id !== itemToRemove));
        setShowRemoveModal(false);
        setItemToRemove(null);
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const confirmClearCart = () => {
    setShowClearModal(true);
  };

  const clearCart = () => {
    axios.delete('/api/Cart/clear-all')
      .then(() => {
        toast.success("Cart cleared");
        setCartItems([]);
        setShowClearModal(false);
      })
      .catch(() => toast.error("Failed to clear cart"));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = item.book.basePrice || 0;
      return total + price * (item.quantity || 1);
    }, 0);

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return { subtotal, total: subtotal, totalItems };
  };

  const handlePlaceOrder = () => {
    axios.post('/api/order/place', {}, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      toast.success("Order placed successfully!");
      setCartItems([]);
    })
    .catch(() => toast.error("Failed to place order"));
  };

  const totals = calculateTotals();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-xl text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <li key={item.id} className="p-4 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                        <img
                          src={`http://localhost:7226/images/${item.book.coverImage}`}
                          alt={item.book.title}
                          className="w-24 h-36 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{item.book.title}</h3>
                            <p className="mt-2 font-medium">NPR {item.book.basePrice.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => confirmRemoveItem(item.id)} 
                            className="text-gray-400 hover:text-red-500"
                          >
                            ❌
                          </button>
                        </div>
                        <div className="mt-4 flex items-center">
                          <div className="flex items-center border rounded-md">
                            <button onClick={() => decreaseQuantity(item.book.id)} className="px-3 py-1">−</button>
                            <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.book.id)} className="px-3 py-1">+</button>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="text-sm text-gray-600">Subtotal</p>
                            <p className="text-lg font-medium">
                              NPR {(item.book.basePrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800">Continue Shopping</button>
                <button 
                  onClick={confirmClearCart} 
                  className="text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p>Subtotal ({totals.totalItems} items)</p>
                    <p>NPR {totals.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>NPR {totals.total.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear Cart Confirmation Modal */}
        {showClearModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Clear Cart</h3>
              <p className="mb-6">Are you sure you want to remove all items from your cart?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Item Confirmation Modal */}
        {showRemoveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Remove Item</h3>
              <p className="mb-6">Are you sure you want to remove this item from your cart?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowRemoveModal(false);
                    setItemToRemove(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={removeItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
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