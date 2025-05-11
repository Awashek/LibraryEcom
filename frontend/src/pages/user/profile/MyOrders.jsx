import { useState, useEffect } from 'react';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';
import {
  Package,
  Calendar,
  Clock,
  ShoppingBag,
  CreditCard,
  Tag,
  Check,
  X,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export default function MyOrders() {
  const axios = useAxiosAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get('/api/order/my-orders')
      .then((res) => {
        console.log('📦 My Orders Response:', res.data);
        setOrders(res.data.result || []);
      })
      .catch(() => {
        toast.error('Failed to fetch orders');
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = (orderId) => {
    setCanceling(orderId);
    axios
      .put(`/api/order/cancel/${orderId}`)
      .then(() => {
        toast.success('Order cancelled successfully');
        fetchOrders();
      })
      .catch((err) => {
        toast.error('Failed to cancel order');
        console.error(err);
      })
      .finally(() => {
        setCanceling(null);
      });
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className='w-3 h-3 mr-1' />,
      },
      Completed: {
        color: 'bg-green-100 text-green-800',
        icon: <Check className='w-3 h-3 mr-1' />,
      },
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800',
      icon: null,
    };

    return (
      <div
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {status}
      </div>
    );
  };

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    if (activeTab === 'All') {
      return orders;
    } else if (activeTab === 'Pending') {
      return orders.filter((order) => ['Pending'].includes(order.status));
    } else if (activeTab === 'Completed') {
      return orders.filter((order) => ['Completed'].includes(order.status));
    }
    return orders;
  };

  const filteredOrders = getFilteredOrders();

  // Get order count for each tab
  const getOrderCount = (tab) => {
    if (tab === 'All') return orders.length;
    if (tab === 'Pending')
      return orders.filter((order) => ['Pending'].includes(order.status))
        .length;
    if (tab === 'Completed')
      return orders.filter((order) => ['Completed'].includes(order.status))
        .length;
    return 0;
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 p-6 lg:p-8 max-w-7xl mx-auto'>
        <div className='mb-6'>
          <div className='flex items-center gap-2 mb-2'>
            <ShoppingBag className='h-6 w-6 text-gray-700' />
            <h1 className='text-3xl font-bold text-gray-800'>My Orders</h1>
          </div>
          <p className='text-gray-600'>View and manage your order history</p>
        </div>

        {/* Filter Tabs */}
        <div className='mb-6 border-b border-gray-200'>
          <div className='flex flex-wrap -mb-px'>
            {['All', 'Pending', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-2 inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full 
                  ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {getOrderCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center p-12'>
            <div className='flex flex-col items-center'>
              <Loader2 className='h-10 w-10 text-gray-400 animate-spin mb-4' />
              <p className='text-gray-500'>Loading your orders...</p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center'>
            <ShoppingBag className='h-16 w-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-xl font-medium text-gray-700 mb-2'>
              No {activeTab !== 'All' ? activeTab : ''} Orders Found
            </h3>
            <p className='text-gray-500 max-w-md mx-auto'>
              {activeTab === 'All'
                ? "You haven't placed any orders yet. Start shopping to see your orders here."
                : `You don't have any ${activeTab.toLowerCase()} orders at the moment.`}
            </p>
          </div>
        ) : (
          <div className='space-y-6'>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className='bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'
              >
                <div className='mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Package className='h-5 w-5 text-gray-600' />
                      <p className='text-lg font-semibold text-gray-800'>
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className='flex items-center mt-1 text-sm text-gray-500'>
                      <Calendar className='h-4 w-4 mr-1' />
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                    {getStatusBadge(order.status)}
                    <div className='flex items-center font-medium text-gray-800'>
                      <CreditCard className='h-4 w-4 mr-1 text-gray-500' />
                      <span>NPR {order.totalAmount?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Show book items */}
                <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 mb-4'>
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors'
                    >
                      <div className='relative'>
                        <img
                          src={`http://localhost:7226/images/${item.book.coverImage}`}
                          alt={item.book.title}
                          className='w-20 h-28 object-cover rounded-md border shadow-sm'
                        />
                        {item.quantity > 1 && (
                          <div className='absolute -top-2 -right-2 bg-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                            {item.quantity}
                          </div>
                        )}
                      </div>
                      <div className='flex-1'>
                        <p className='font-semibold line-clamp-2'>
                          {item.book.title}
                        </p>
                        <div className='mt-1 space-y-1 text-sm text-gray-600'>
                          <p className='flex items-center'>
                            <Tag className='h-3 w-3 mr-1' />
                            Unit: NPR {item.unitPrice.toFixed(2)}
                          </p>
                          <p className='font-medium'>
                            Subtotal: NPR{' '}
                            {(item.unitPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className='my-4' />

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                  <div className='flex items-center text-sm text-gray-600'>
                    <div className='flex items-center mr-4'>
                      <span className='font-medium mr-1'>Claim Code:</span>
                      <code className='bg-gray-100 px-2 py-0.5 rounded text-gray-800'>
                        {order.claimCode || 'N/A'}
                      </code>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-medium mr-1'>Claimed:</span>
                      {order.isClaimed ? (
                        <span className='text-green-600 flex items-center'>
                          <Check className='h-4 w-4 mr-1' /> Yes
                        </span>
                      ) : (
                        <span className='text-gray-600 flex items-center'>
                          <X className='h-4 w-4 mr-1' /> No
                        </span>
                      )}
                    </div>
                  </div>

                  {order.status === 'Pending' && (
                    <button
                      disabled={canceling === order.id}
                      onClick={() => handleCancel(order.id)}
                      className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center'
                    >
                      {canceling === order.id ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <AlertTriangle className='mr-2 h-4 w-4' />
                          Cancel Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
