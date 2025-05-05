import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartPage() {
    // Sample cart data - in a real app, this would come from your state management (Redux, Context, etc.)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 12.99,
            quantity: 1,
            coverImage: "../images/placeholder-book.jpg"
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 10.50,
            quantity: 2,
            coverImage: "../images/placeholder-book.jpg"
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            price: 9.99,
            quantity: 1,
            coverImage: "../images/placeholder-book.jpg",
        }
    ]);

    // User membership data - in a real app, this would come from your authentication system
    const [membershipData, setMembershipData] = useState({
        isMember: true,
        successfulOrders: 12, // Example: User has completed 12 orders
    });

    // Calculate cart totals and discounts
    const calculateTotals = () => {
        // Basic calculations
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const shipping = 4.99;

        // Initialize discounts
        let discounts = {
            bulkDiscount: 0,
            loyaltyDiscount: 0,
            totalDiscount: 0
        };

        // Calculate member discounts if applicable
        if (membershipData.isMember) {
            // 5% discount for ordering 5+ books
            if (totalItems >= 5) {
                discounts.bulkDiscount = subtotal * 0.05;
            }

            // 10% additional discount after 10 successful orders
            if (membershipData.successfulOrders >= 10) {
                discounts.loyaltyDiscount = subtotal * 0.10;
            }

            // Calculate total discount
            discounts.totalDiscount = discounts.bulkDiscount + discounts.loyaltyDiscount;
        }

        // Final calculations
        const discountedSubtotal = subtotal - discounts.totalDiscount;
        const tax = discountedSubtotal * 0.08; // 8% tax rate
        const total = discountedSubtotal + shipping + tax;

        return {
            subtotal,
            discounts,
            discountedSubtotal,
            shipping,
            tax,
            total,
            totalItems
        };
    };

    const totals = calculateTotals();

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

    // Toggle membership status (for demo purposes)
    const toggleMembership = () => {
        setMembershipData({
            ...membershipData,
            isMember: !membershipData.isMember
        });
    };

    // Update order count (for demo purposes)
    const updateOrderCount = (change) => {
        const newCount = Math.max(0, membershipData.successfulOrders + change);
        setMembershipData({
            ...membershipData,
            successfulOrders: newCount
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Basket</h1>

                {/* Demo Controls (for testing) */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Membership Settings </h3>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="membershipStatus"
                                checked={membershipData.isMember}
                                onChange={toggleMembership}
                                className="mr-2"
                            />
                            <label htmlFor="membershipStatus">Member Status</label>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Order Count: {membershipData.successfulOrders}</span>

                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-gray-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-xl">Your basket is empty</p>
                        </div>
                        <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                                            <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                                                <img
                                                    src="../images/placeholder-book.jpg"
                                                    alt={item.title}
                                                    className="w-24 h-36 object-cover rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">by {item.author}</p>
                                                        <p className="text-lg font-medium text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
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
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-4 py-1 border-l border-r border-gray-300">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="ml-auto text-right">
                                                        <p className="text-sm text-gray-600">Subtotal</p>
                                                        <p className="text-lg font-medium text-gray-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 flex justify-between items-center">
                                <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Continue Shopping
                                </Link>

                                <button
                                    onClick={() => setCartItems([])}
                                    className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Clear Basket
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                                {/* Membership Status Badge */}
                                {membershipData.isMember && (
                                    <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-3">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-green-800 font-medium">Member Benefits Active</span>
                                        </div>
                                        <p className="text-green-700 text-sm mt-1">You have completed {membershipData.successfulOrders} orders</p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Subtotal ({totals.totalItems} items)</p>
                                        <p className="font-medium">${totals.subtotal.toFixed(2)}</p>
                                    </div>

                                    {/* Discount section */}
                                    {membershipData.isMember && totals.discounts.totalDiscount > 0 && (
                                        <div className="pt-2">
                                            {totals.discounts.bulkDiscount > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <p>5% Bulk Discount (5+ books)</p>
                                                    <p>-${totals.discounts.bulkDiscount.toFixed(2)}</p>
                                                </div>
                                            )}

                                            {totals.discounts.loyaltyDiscount > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <p>10% Loyalty Discount (10+ orders)</p>
                                                    <p>-${totals.discounts.loyaltyDiscount.toFixed(2)}</p>
                                                </div>
                                            )}

                                            <div className="flex justify-between font-medium pt-1 border-t border-dashed border-gray-200 mt-2">
                                                <p className="text-green-700">Total Savings</p>
                                                <p className="text-green-700">-${totals.discounts.totalDiscount.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Show subtotal after discounts if discounts exist */}
                                    {totals.discounts.totalDiscount > 0 && (
                                        <div className="flex justify-between pt-2 border-t border-gray-200">
                                            <p className="text-gray-600">Subtotal after discounts</p>
                                            <p className="font-medium">${totals.discountedSubtotal.toFixed(2)}</p>
                                        </div>
                                    )}

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

                                {/* Membership benefits notification */}
                                {!membershipData.isMember && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                                        <p className="text-blue-800">
                                            <span className="font-medium">Join our membership program!</span> Get 5% off when buying 5+ books and 10% after your 10th order.
                                        </p>
                                    </div>
                                )}

                                {/* Order thresholds notification for members */}
                                {membershipData.isMember && totals.totalItems < 5 && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                                        <p className="text-blue-800">
                                            <span className="font-medium">Add {5 - totals.totalItems} more books</span> to get a 5% member discount!
                                        </p>
                                    </div>
                                )}

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
}