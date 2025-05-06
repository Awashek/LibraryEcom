import React, { useState, useEffect } from 'react';
import useAxios from '../../utils/axios/useAxios';
import {
  BookOpen,
  Users,
  ShoppingBag,
  Package,
  Bell,
  Search,
  Calendar,
  TrendingUp,
  BarChart2,
  ChevronDown,
  User,
  Star,
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';

// Dummy data for the dashboard
const recentOrders = [
  {
    id: '1234',
    member: 'John Smith',
    book: 'The Great Gatsby',
    status: 'Ready for pickup',
    date: '2025-05-02',
  },
  {
    id: '1235',
    member: 'Emma Wilson',
    book: 'To Kill a Mockingbird',
    status: 'Processing',
    date: '2025-05-02',
  },
  {
    id: '1236',
    member: 'Michael Brown',
    book: '1984',
    status: 'Ready for pickup',
    date: '2025-05-01',
  },
  {
    id: '1237',
    member: 'Sophia Davis',
    book: 'Pride and Prejudice',
    status: 'Picked up',
    date: '2025-05-01',
  },
  {
    id: '1238',
    member: 'James Johnson',
    book: 'The Hobbit',
    status: 'Processing',
    date: '2025-04-30',
  },
];

const popularBooks = [
  { title: 'Dune', author: 'Frank Herbert', orders: 28, available: 5 },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    orders: 24,
    available: 3,
  },
  {
    title: 'Harry Potter Series',
    author: 'J.K. Rowling',
    orders: 22,
    available: 8,
  },
  {
    title: 'A Song of Ice and Fire',
    author: 'George R.R. Martin',
    orders: 19,
    available: 2,
  },
];

// Dummy data for book reviews
const bookReviews = [
  {
    id: 1,
    bookName: 'The Midnight Library',
    userName: 'Alex Johnson',
    review:
      'An absolutely captivating read that makes you think about the choices we make in life.',
    rating: 5,
    date: '2025-05-01',
  },
  {
    id: 2,
    bookName: 'Project Hail Mary',
    userName: 'Sarah Williams',
    review:
      "Incredible sci-fi that balances technical details with heart. Couldn't put it down!",
    rating: 5,
    date: '2025-04-29',
  },
  {
    id: 3,
    bookName: 'Klara and the Sun',
    userName: 'Marcus Lee',
    review:
      'A poignant exploration of artificial intelligence and what it means to be human.',
    rating: 4,
    date: '2025-04-28',
  },
  {
    id: 4,
    bookName: 'The Four Winds',
    userName: 'Elena Rodriguez',
    review:
      "Heartbreaking historical fiction that resonates with today's challenges.",
    rating: 4,
    date: '2025-04-27',
  },
];

const memberStats = {
  total: 1243,
  active: 876,
  new: 36,
};

const bookStats = {
  total: 5842,
  available: 4217,
  reserved: 328,
};

const orderStats = {
  total: 2156,
  pending: 43,
  completed: 2113,
};

const monthlySales = [
  { month: 'Jan', orders: 145 },
  { month: 'Feb', orders: 132 },
  { month: 'Mar', orders: 161 },
  { month: 'Apr', orders: 187 },
  { month: 'May', orders: 92 },
];

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  


  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <AdminLayout />

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        {/* Top header */}
        <header className='bg-white shadow-sm'>
          <div className='flex items-center justify-between p-5'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-800'>
                Dashboard
              </h1>
              <p className='text-sm text-gray-500'>{currentDate}</p>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search...'
                  className='pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <Search
                  className='absolute left-3 top-2.5 text-gray-400'
                  size={18}
                />
              </div>

              <div className='relative'>
                <Bell className='text-gray-600 cursor-pointer' />
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
                  3
                </span>
              </div>

              <div className='flex items-center cursor-pointer'>
                <div className='h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center'>
                  <User size={18} />
                </div>
                <span className='ml-2 text-gray-700'>Admin</span>
                <ChevronDown size={16} className='ml-1 text-gray-500' />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className='p-6'>
          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <StatsCard
              title='Members'
              icon={<Users className='text-blue-500' />}
              mainStat={memberStats.total}
              mainLabel='Total Members'
              secondaryStat={memberStats.new}
              secondaryLabel='New this month'
              color='blue'
            />

            <StatsCard
              title='Books'
              icon={<BookOpen className='text-green-500' />}
              mainStat={bookStats.available}
              mainLabel='Available Books'
              secondaryStat={bookStats.reserved}
              secondaryLabel='Currently Reserved'
              color='green'
            />

            <StatsCard
              title='Orders'
              icon={<ShoppingBag className='text-purple-500' />}
              mainStat={orderStats.total}
              mainLabel='Total Orders'
              secondaryStat={orderStats.pending}
              secondaryLabel='Pending Pickup'
              color='purple'
            />
          </div>

          {/* Middle Row */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
            {/* Monthly Orders Chart */}
            <div className='lg:col-span-2 bg-white rounded-lg shadow p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Monthly Orders
                </h2>
                <div className='flex items-center text-sm'>
                  <span className='text-gray-500'>Last 5 months</span>
                  <ChevronDown size={16} className='ml-1 text-gray-500' />
                </div>
              </div>

              <div className='h-64'>
                <SimpleBarChart data={monthlySales} />
              </div>
            </div>

            {/* Latest Reviews */}
            <div className='bg-white rounded-lg shadow p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Latest Reviews
                </h2>
                <span
                  className='text-blue-600 text-sm hover:underline cursor-pointer'
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  View All
                </span>
              </div>

              <div className='space-y-4 h-64 overflow-auto'>
                {bookReviews.slice(0, 3).map((review) => (
                  <ReviewCard
                    key={review.id}
                    bookName={review.bookName}
                    userName={review.userName}
                    review={review.review}
                    rating={review.rating}
                    date={review.date}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* More Book Reviews Section - Shown when "View All" is clicked */}
          {showAllReviews && (
            <div className='mb-6' id='allReviews'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  All Book Reviews
                </h2>
                <button
                  className='text-blue-600 text-sm hover:underline'
                  onClick={() => setShowAllReviews(false)}
                >
                  Hide Reviews
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {bookReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    bookName={review.bookName}
                    userName={review.userName}
                    review={review.review}
                    rating={review.rating}
                    date={review.date}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Row */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Recent Orders */}
            <div className='lg:col-span-2 bg-white rounded-lg shadow'>
              <div className='p-6 border-b border-gray-100'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-semibold text-gray-800'>
                    Recent Orders
                  </h2>
                  <button className='text-blue-600 text-sm hover:underline'>
                    View All
                  </button>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Order ID
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Member
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Book
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          #{order.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.member}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.book}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <StatusBadge status={order.status} />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Books */}
            <div className='bg-white rounded-lg shadow'>
              <div className='p-6 border-b border-gray-100'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-semibold text-gray-800'>
                    Popular Books
                  </h2>
                  <button className='text-blue-600 text-sm hover:underline'>
                    View All
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <div className='space-y-4'>
                  {popularBooks.map((book, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <div>
                        <h3 className='font-medium text-gray-800'>
                          {book.title}
                        </h3>
                        <p className='text-sm text-gray-500'>{book.author}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium text-gray-900'>
                          {book.orders} orders
                        </p>
                        <p className='text-xs text-gray-500'>
                          {book.available} available
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for Stats Card
function StatsCard({
  title,
  icon,
  mainStat,
  mainLabel,
  secondaryStat,
  secondaryLabel,
  color,
}) {
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          <p className='text-3xl font-bold mt-2'>{mainStat.toLocaleString()}</p>
          <p className='text-sm text-gray-500 mt-1'>{mainLabel}</p>
        </div>
        <div className='p-3 rounded-full bg-gray-100'>{icon}</div>
      </div>

      <div className='mt-4 flex items-center'>
        <TrendingUp size={16} className={colorClasses[color]} />
        <span className={`ml-1 text-sm font-medium ${colorClasses[color]}`}>
          {secondaryStat}
        </span>
        <span className='ml-1 text-sm text-gray-500'>{secondaryLabel}</span>
      </div>
    </div>
  );
}

// Component for Status Badge
function StatusBadge({ status }) {
  let bgColor = 'bg-gray-100 text-gray-800';

  if (status === 'Ready for pickup') {
    bgColor = 'bg-green-100 text-green-800';
  } else if (status === 'Processing') {
    bgColor = 'bg-yellow-100 text-yellow-800';
  } else if (status === 'Picked up') {
    bgColor = 'bg-blue-100 text-blue-800';
  }

  return (
    <span
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}
    >
      {status}
    </span>
  );
}

// Review Card Component
function ReviewCard({ bookName, userName, review, rating, date }) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-300'>
      <h3 className='font-medium text-lg text-gray-800'>{bookName}</h3>
      <div className='flex items-center mt-1 mb-2'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }
            />
          ))}
        </div>
        <span className='ml-2 text-sm text-gray-500'>{rating}/5</span>
      </div>
      <p
        className='text-gray-600 text-sm mb-3 overflow-hidden text-ellipsis'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {review}
      </p>
      <div className='flex justify-between items-center text-xs text-gray-500'>
        <span>By {userName}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

// Simple Bar Chart Component
function SimpleBarChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.orders)) * 1.2;

  return (
    <div className='flex h-full items-end space-x-2'>
      {data.map((item, index) => {
        const height = (item.orders / maxValue) * 100;

        return (
          <div key={index} className='flex flex-col items-center flex-1'>
            <div className='relative w-full h-full'>
              <div
                className='absolute bottom-0 w-full bg-blue-500 rounded-t-lg'
                style={{ height: `${height}%` }}
              ></div>
            </div>
            <div className='mt-2 text-xs text-gray-500'>{item.month}</div>
            <div className='text-xs font-medium'>{item.orders}</div>
          </div>
        );
      })}
    </div>
  );
}
