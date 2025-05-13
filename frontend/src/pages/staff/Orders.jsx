import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios/useAxios";
import useAxiosAuth from "../../utils/axios/useAxiosAuth";
import { toast } from "react-toastify";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function StaffOrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [enteredClaimCode, setEnteredClaimCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const signOut = useSignOut();
  const navigate = useNavigate();

  const axios = useAxiosAuth();
  const {
    data: orderData,
    loading,
    error,
    refetch,
  } = useAxios("order?pageNumber=1&pageSize=12&search=");

  console.log("Order Data:", orderData);

  useEffect(() => {
    if (orderData?.result) {
      const transformedOrders = orderData.result.map((order) => {
        // Calculate total quantity of all items in the order
        const totalQuantity = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

        // Get all book titles
        const bookTitles = order.items?.map(item => item.book?.title).filter(Boolean).join(", ") || "Unknown Book";

        return {
          id: order.id,
          claimCode: order.claimCode || `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          orderId: `#OD${order.id.substr(0, 5).toUpperCase()}`,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          productName: bookTitles,
          quantity: totalQuantity,
          claimExpiry: order.claimExpiry
            ? new Date(order.claimExpiry).toLocaleDateString()
            : "N/A",
          totalAmount: `Rs. ${order.totalAmount || 0}`,
          status: order.completionDate ? "Completed" : "Pending",
          isClaimed: order.isClaimed ? "Yes" : "No",
          user: {
            name: order.user?.name || "Unknown",
            email: order.user?.emailAddress
              || "unknown@example.com",
          },
          subtotal: `Rs. ${order.subtotal || 0}`,
          discountAmount: `Rs. ${order.discountAmount || 0}`,
          loyaltyDiscountAmount: `Rs. ${order.loyaltyDiscountAmount || 0}`,
          books: order.items?.map((item) => ({
            title: item.book?.title || "Unknown Book",
            quantity: item.quantity || 1,
            unitPrice: `Rs. ${item.unitPrice || 0}`,
          })) || [{ title: "Book", quantity: 1, unitPrice: "Rs. 0" }],
        };
      });
      setOrders(transformedOrders);
    }
  }, [orderData]);

  const handleLogout = () => {
    signOut();
    toast.success('Logged out successfully');
    navigate('/homepage');
  };

  const handleVerify = () => {
    if (!selectedOrder || enteredClaimCode !== selectedOrder.claimCode) return;

    setIsVerifying(true);
    setVerifyError(null);

    const payload = JSON.stringify(selectedOrder.claimCode);

    axios
      .post("api/order/fulfill-by-claim", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Order verified successfully");
        const updatedOrders = orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "Completed", isClaimed: "Yes" }
            : order
        );
        setOrders(updatedOrders);
        setSelectedOrder(null);
        setEnteredClaimCode("");
        refetch();
      })
      .catch((err) => {
        setVerifyError(
          err.response?.data?.message || err.message || "Failed to verify order"
        );
        toast.error("Verification failed");
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className='bg-gray-900 text-gray-400 p-4 min-h-screen shadow-lg w-72'>
        <div className='flex items-center pl-14 pt-4 pb-4'>
          <Link to='' className='flex items-center'>
            <img
              className='h-5 w-auto'
              src='/images/BOOKISH.svg'
              alt='BookShop Logo'
            />
          </Link>
        </div>

        <nav className='flex flex-col gap-1'>
          <div className='text-xs uppercase tracking-wider py-3 px-2 text-gray-500 font-medium'>
            Main Menu
          </div>

          <button className='flex items-center gap-3 p-3 w-full text-left transition-all duration-200 bg-gray-800 text-white rounded-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
              />
            </svg>
            Active Orders
          </button>

          <div className='mt-auto'>
            <button
              onClick={handleLogout}
              className='flex items-center gap-3 p-3 w-full text-left transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Orders List</h2>
          <span className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="mt-6 mb-4">
          <input
            type="text"
            placeholder="Search by code, username..."
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex justify-end">
          <select
            className="px-3 py-2 border border-gray-300 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-3">Claim Code</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Products</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Claim Expiry</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(
                  (order) =>
                    statusFilter === "All" || order.status === statusFilter
                )
                .map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{order.claimCode}</td>
                    <td className="p-3">{order.orderId}</td>
                    <td className="p-3">{order.orderDate}</td>
                    <td className="p-3" title={order.productName}>
                      {order.productName.length > 20
                        ? `${order.productName.substring(0, 20)}...`
                        : order.productName}
                    </td>
                    <td className="p-3">{order.quantity}</td>
                    <td className="p-3">{order.claimExpiry}</td>
                    <td className="p-3">{order.totalAmount}</td>
                    <td
                      className={`p-3 ${order.status === "Pending"
                        ? "text-orange-500"
                        : "text-green-500"
                        }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-3">
                      <button
                        className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-scaleIn transition-all duration-300 max-h-[90vh] flex flex-col">
            <div className="bg-[#111827] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button
                  className="text-white hover:text-gray-200 text-2xl"
                  onClick={() => {
                    setSelectedOrder(null);
                    setEnteredClaimCode("");
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                <span>{selectedOrder.claimCode}</span>
                <span>{selectedOrder.orderDate}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${selectedOrder.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Customer Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.user.email}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Claim Details
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Expiry:</span>{" "}
                    {selectedOrder.claimExpiry}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Claimed:</span>{" "}
                    {selectedOrder.isClaimed}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-lg text-gray-800 mb-3">
                  Books
                </h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="text-center p-3 text-sm font-semibold text-gray-700">
                          Qty
                        </th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700">
                          Unit Price
                        </th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.books.map((book, idx) => {
                        const unitPrice = parseInt(
                          book.unitPrice.replace(/\D/g, "")
                        );
                        return (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-3 text-sm text-gray-800">
                              {book.title}
                            </td>
                            <td className="p-3 text-sm text-center text-gray-600">
                              {book.quantity}
                            </td>
                            <td className="p-3 text-sm text-right text-gray-600">
                              {book.unitPrice}
                            </td>
                            <td className="p-3 text-sm text-right font-medium">
                              Rs. {unitPrice * book.quantity}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-2">
                <h4 className="font-semibold text-lg text-gray-800 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {selectedOrder.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-red-500">
                      -{selectedOrder.discountAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loyalty Discount</span>
                    <span className="text-red-500">
                      -{selectedOrder.loyaltyDiscountAmount}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-1 flex justify-between font-bold text-lg">
                    <span className="text-gray-700">Total Amount</span>
                    <span className="text-blue-600">
                      {selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.status === "Pending" && (
                <div className="mt-6 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Verification Required
                    </h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Please ask the customer for their claim code and enter it
                      below:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter claim code"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={enteredClaimCode}
                        onChange={(e) => setEnteredClaimCode(e.target.value)}
                      />
                      {enteredClaimCode === selectedOrder.claimCode && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Code matches
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setEnteredClaimCode("");
                  setVerifyError(null);
                }}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              {selectedOrder.status === "Pending" && (
                <>
                  <button
                    onClick={handleVerify}
                    disabled={
                      enteredClaimCode !== selectedOrder.claimCode ||
                      isVerifying
                    }
                    className={`px-5 py-2 rounded-lg text-white transition-colors ${enteredClaimCode === selectedOrder.claimCode &&
                      !isVerifying
                      ? "bg-[#111827] hover:bg-[#34415C] cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {isVerifying ? "Verifying..." : "Verify Order"}
                  </button>
                  {verifyError && (
                    <div className="text-red-500 text-sm mt-2">
                      {verifyError}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}