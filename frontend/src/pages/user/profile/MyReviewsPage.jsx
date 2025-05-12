import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Star,
  Edit,
  Trash2,
  Clock,
  History,
  Loader2,
  Check,
  X,
  ShoppingBag,
} from "lucide-react";
import useAxiosAuth from "../../../utils/axios/useAxiosAuth";
import Cookies from "js-cookie";

const MyReviewsPage = () => {
  const axios = useAxiosAuth();
  const [activeTab, setActiveTab] = useState("toBeReviewed");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewInputs, setReviewInputs] = useState({});
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/order/my-orders");
      // Filter only completed orders
      const completedOrders =
        response.data.result?.filter((order) => order.status === "Completed") ||
        [];
      setOrders(completedOrders);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserId = () => {
    try {
      const authStateCookie = Cookies.get("_auth_state");
      if (!authStateCookie) throw new Error("User not authenticated");
      const decodedAuthState = decodeURIComponent(authStateCookie);
      const authState = JSON.parse(decodedAuthState);
      return authState.id;
    } catch (error) {
      console.error("Error parsing auth cookie:", error);
      return null;
    }
  };

  const handleSubmitReview = (bookId, orderItemId) => {
  const { reviewText = '', rating = 0 } = reviewInputs[orderItemId] || {};

  if (!reviewText.trim() || rating === 0) {
    toast.error('Please provide both a rating and review text');
    return;
  }

  const userId = getUserId();
  if (!userId) {
    toast.error('User authentication failed');
    return;
  }

  const formData = new FormData();
  formData.append('BookId', bookId);
  formData.append('UserId', userId);
  formData.append('Rating', rating);
  formData.append('Comment', reviewText);

  axios
    .post('/api/review', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      toast.success('Review submitted successfully');
      fetchCompletedOrders();
      setReviewInputs((prev) => ({ ...prev, [orderItemId]: { reviewText: '', rating: 0 } }));
    })
    .catch((error) => {
      toast.error('Failed to submit review');
      console.error(error);
    });
};

const handleUpdateReview = (reviewId, orderItemId) => {
  const { reviewText = '', rating = 0 } = reviewInputs[orderItemId] || {};

  if (!reviewText.trim() || rating === 0) {
    toast.error('Please provide both a rating and review text');
    return;
  }

  axios
    .put(`/api/review/${reviewId}`, {
      rating,
      comment: reviewText,
    })
    .then(() => {
      toast.success('Review updated successfully');
      fetchCompletedOrders();
      setEditingReviewId(null);
      setReviewInputs((prev) => ({ ...prev, [orderItemId]: { reviewText: '', rating: 0 } }));
    })
    .catch((error) => {
      toast.error('Failed to update review');
      console.error(error);
    });
};

// De-duplicate books for review display
const deduplicateReviewItems = (items) => {
  const seenBookIds = new Set();
  return items.filter((item) => {
    if (seenBookIds.has(item.book.id)) return false;
    seenBookIds.add(item.book.id);
    return true;
  });
};

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`/api/review/${reviewId}`);
      toast.success("Review deleted successfully");
      fetchCompletedOrders();
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    }
  };

  const startEditing = (review) => {
    setEditingReviewId(review.id);
    setReviewText(review.comment);
    setRating(review.rating);
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setReviewText("");
    setRating(0);
  };

  const renderStarRating = (itemId, currentRating, onChangeFn) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChangeFn(itemId, "rating", star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= currentRating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const updateReviewInput = (itemId, field, value) => {
    setReviewInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  // Get items that need to be reviewed (no review exists)
  const getItemsToBeReviewed = () => {
    const items = [];
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!item.hasReview) {
          items.push({
            ...item,
            orderId: order.id,
            orderDate: order.orderDate,
          });
        }
      });
    });
    return items;
  };

  // Get items that have been reviewed
  const getReviewedItems = () => {
    const items = [];
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (item.hasReview) {
          items.push({
            ...item,
            orderId: order.id,
            orderDate: order.orderDate,
          });
        }
      });
    });
    return items;
  };

 const itemsToBeReviewed = deduplicateReviewItems(getItemsToBeReviewed());
const reviewedItems = deduplicateReviewItems(getReviewedItems());


  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="h-6 w-6 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-800">My Reviews</h1>
          </div>
          <p className="text-gray-600">Manage your product reviews</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab("toBeReviewed")}
              className={`mr-2 inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm
                ${
                  activeTab === "toBeReviewed"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <Clock className="h-4 w-4 mr-2" />
              To Be Reviewed
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full 
                ${
                  activeTab === "toBeReviewed"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {itemsToBeReviewed.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`mr-2 inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm
                ${
                  activeTab === "history"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <History className="h-4 w-4 mr-2" />
              History
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full 
                ${
                  activeTab === "history"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {reviewedItems.length}
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-gray-400 animate-spin mb-4" />
              <p className="text-gray-500">Loading your orders...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "toBeReviewed" && itemsToBeReviewed.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                <Check className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Reviews Pending
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You don't have any products waiting for review at the moment.
                </p>
              </div>
            )}

            {activeTab === "history" && reviewedItems.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Review History
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You haven't reviewed any products yet.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {activeTab === "toBeReviewed" &&
                itemsToBeReviewed.map((item) => (
                  <div
                    key={`${item.orderId}-${item.id}`}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:7226/images/${item.book.coverImage}`}
                          alt={item.book.title}
                          className="w-32 h-48 object-cover rounded-md border shadow-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.book.title}
                        </h3>
                        <div className="text-sm text-gray-600 mb-3">
                          Ordered on{" "}
                          {new Date(item.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">
                          Share your thoughts about this book
                        </p>
                        {renderStarRating(
                          item.id,
                          reviewInputs[item.id]?.rating || 0,
                          updateReviewInput
                        )}

                        <textarea
                          value={reviewInputs[item.id]?.reviewText || ""}
                          onChange={(e) =>
                            updateReviewInput(
                              item.id,
                              "reviewText",
                              e.target.value
                            )
                          }
                          className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          rows="4"
                          placeholder="Write your review..."
                        />
                        <div className="flex justify-end mt-3">
                          <button
                            onClick={() =>
                              handleSubmitReview(item.book.id, item.id)
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "history" &&
                reviewedItems.map((item) => (
                  <div
                    key={`${item.orderId}-${item.id}`}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:7226/images/${item.book.coverImage}`}
                          alt={item.book.title}
                          className="w-32 h-48 object-cover rounded-md border shadow-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.book.title}
                        </h3>
                        <div className="text-sm text-gray-600 mb-3">
                          Ordered on{" "}
                          {new Date(item.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                        {editingReviewId === item.review?.id ? (
                          <>
                            {renderStarRating(rating, setRating)}
                            <textarea
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="mt-3 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              rows="4"
                              placeholder="Write your review..."
                            />
                            <div className="flex justify-end space-x-3 mt-3">
                              <button
                                onClick={cancelEditing}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateReview(item.review.id)
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                Update Review
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <= item.review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                              {item.review.comment}
                            </p>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => startEditing(item.review)}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteReview(item.review.id)
                                }
                                className="flex items-center text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;
