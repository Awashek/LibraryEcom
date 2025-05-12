import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios/useAxios";
import useAxiosAuth from "../../utils/axios/useAxiosAuth";
import { toast } from "react-toastify";

export default function StaffOrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [enteredClaimCode, setEnteredClaimCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const axios = useAxiosAuth();
  const {
    data: orderData,
    loading,
    error,
    refetch,
  } = useAxios("order?pageNumber=1&pageSize=12&search=");

  useEffect(() => {
    if (orderData?.result) {
      const transformedOrders = orderData.result.map((order) => ({
        id: order.id,
        claimCode:
          order.claimCode ||
          `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        orderId: `#OD${order.id.substr(0, 5).toUpperCase()}`,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        productName: "Book",
        quantity: order.orderItems?.length || 1,
        claimExpiry: order.claimExpiry
          ? new Date(order.claimExpiry).toLocaleDateString()
          : "N/A",
        totalAmount: `Rs. ${order.totalAmount || 0}`,
        status: order.completionDate ? "Completed" : "Pending",
        isClaimed: order.isClaimed ? "Yes" : "No",
        user: {
          name: order.user?.name || "Unknown",
          email: order.user?.email || "unknown@example.com",
        },
        subtotal: `Rs. ${order.subtotal || 0}`,
        discountAmount: `Rs. ${order.discountAmount || 0}`,
        loyaltyDiscountAmount: `Rs. ${order.loyaltyDiscountAmount || 0}`,
        books: order.orderItems?.map((item) => ({
          title: item.book?.title || "Unknown Book",
          quantity: item.quantity || 1,
          unitPrice: `Rs. ${item.unitPrice || 0}`,
        })) || [{ title: "Book", quantity: 1, unitPrice: "Rs. 0" }],
      }));
      setOrders(transformedOrders);
    }
  }, [orderData]);

  const handleLogout = () => {
    signOut(); // This will clear the auth state and cookies
    toast.success("Logged out successfully");
    navigate("/homepage"); // Redirect to login page after logout
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
      <aside className="w-64 bg-[#0E1323] text-white p-6">
        <h2 className="text-2xl font-bold mb-10">BOOKISH</h2>
        <nav className="space-y-4">
          <button className="text-left w-full hover:text-white bg-gray-700 px-3 py-2 rounded">
            Active Orders
          </button>
          <button
            className="text-left w-full text-white bg-gray-700 px-3 py-2 rounded hover:"
            onClick={handleLogout}
          >
            Logout
          </button>
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
                    <td className="p-3">{order.productName}</td>
                    <td className="p-3">{order.quantity}</td>
                    <td className="p-3">{order.claimExpiry}</td>
                    <td className="p-3">{order.totalAmount}</td>
                    <td
                      className={`p-3 ${
                        order.status === "Pending"
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
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedOrder.status === "Completed"
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
                    className={`px-5 py-2 rounded-lg text-white transition-colors ${
                      enteredClaimCode === selectedOrder.claimCode &&
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
