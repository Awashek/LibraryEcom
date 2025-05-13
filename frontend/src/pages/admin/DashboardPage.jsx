"use client"

import { useState, useEffect } from "react"
import useAxios from "../../utils/axios/useAxios"
import { BookOpen, Users, ShoppingBag, ChevronDown, User, Star, TrendingUp } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

// Component for Stats Card
function StatsCard({ title, icon, mainStat, mainLabel, secondaryStat, secondaryLabel, color }) {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold mt-2">{mainStat.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{mainLabel}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      </div>

      <div className="mt-4 flex items-center">
        <TrendingUp size={16} className={colorClasses[color]} />
        <span className={`ml-1 text-sm font-medium ${colorClasses[color]}`}>{secondaryStat}</span>
        <span className="ml-1 text-sm text-gray-500">{secondaryLabel}</span>
      </div>
    </div>
  )
}

// Component for Status Badge
function StatusBadge({ status }) {
  const statusStyles = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  }

  const style = statusStyles[status] || statusStyles.default

  return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${style}`}>{status}</span>
}

// Review Card Component
function ReviewCard({ bookName, userName, review, rating, date }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="font-medium text-lg text-gray-800 truncate">{bookName}</h3>
      <div className="flex items-center mt-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
      </div>
      <p
        className="text-gray-600 text-sm mb-3 overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {review}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>By {userName}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

// Weekly Line Chart Component
function WeeklyLineChart({ data }) {
  const chartData = {
    labels: data.map((item) => `Week ${item.week}`),
    datasets: [
      {
        label: "Orders",
        data: data.map((item) => item.totalOrders),
        fill: false,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        tension: 0.3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#fff",
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 11,
          },
        },
        grid: {
          drawBorder: false,
          color: "rgba(229, 231, 235, 0.5)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  return <Line data={chartData} options={options} />
}

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState("")
  const [showAllReviews, setShowAllReviews] = useState(false)
  const { data: dashboardData } = useAxios(`dashboard/overview`)

  useEffect(() => {
    const date = new Date()
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [])

  // Prepare stats data from API response
  const memberStats = {
    total: dashboardData?.result?.totalMembers || 0,
    active: dashboardData?.result?.activeMembers || 0,
    new: dashboardData?.result?.newMembers || 0,
  }

  const bookStats = {
    total: dashboardData?.result?.totalBooks || 0,
    available: dashboardData?.result?.availableBooks || 0,
    reserved: dashboardData?.result?.totalBooks - dashboardData?.result?.availableBooks || 0,
  }

  const orderStats = {
    total: dashboardData?.result?.totalOrders || 0,
    pending: dashboardData?.result?.pendingOrders || 0,
    completed: dashboardData?.result?.completedOrders || 0,
  }

  // Format recent orders from API
  const recentOrders =
    dashboardData?.result?.recentOrders?.map((order) => ({
      id: order.id,
      member: order.member,
      book: order.book,
      status: order.status,
      date: order.date,
    })) || []

  const popularBooks = [
    { title: "Looking Backward", author: "Unknown", orders: 3, available: 1 },
    { title: "Under the Tree", author: "Unknown", orders: 1, available: 1 },
    { title: "The Dries", author: "Unknown", orders: 1, available: 1 },
  ]

  const bookReviews =
    dashboardData?.result?.reviews?.map((r) => ({
      id: r.id,
      userName: r.user?.name ?? "Anonymous",
      review: r.comment,
      rating: r.rating,
      date: new Date(r.reviewDate).toLocaleDateString(),
      bookName: r.bookTitle,
    })) || []

  const weeklyOrders =
    dashboardData?.result?.weeklyOrders?.map((order) => ({
      week: order.week,
      totalOrders: order.totalOrders,
    })) || []

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminLayout />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-5">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">{currentDate}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="ml-2 text-gray-700 font-medium">Admin</span>
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Members"
              icon={<Users className="text-blue-500" />}
              mainStat={memberStats.total}
              mainLabel="Total Members"
              secondaryStat={memberStats.new}
              secondaryLabel="New this month"
              color="blue"
            />

            <StatsCard
              title="Books"
              icon={<BookOpen className="text-green-500" />}
              mainStat={bookStats.available}
              mainLabel="Available Books"
              secondaryStat={bookStats.reserved}
              secondaryLabel="Currently Reserved"
              color="green"
            />

            <StatsCard
              title="Orders"
              icon={<ShoppingBag className="text-purple-500" />}
              mainStat={orderStats.total}
              mainLabel="Total Orders"
              secondaryStat={orderStats.pending}
              secondaryLabel="Pending Pickup"
              color="purple"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Orders Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Weekly Orders</h2>
                <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-gray-600">Last 12 weeks</span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </div>
              </div>
              <div className="h-64">
                <WeeklyLineChart data={weeklyOrders} />
              </div>
            </div>

            {/* Latest Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Latest Reviews</h2>
                <span
                  className="text-blue-600 text-sm hover:underline cursor-pointer px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  View All
                </span>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide">
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
          </div>

          {/* More Book Reviews Section - Shown when "View All" is clicked */}
          {showAllReviews && (
            <div className="mb-6 bg-white rounded-lg shadow-md p-6" id="allReviews">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">All Book Reviews</h2>
                <button
                  className="text-blue-600 text-sm hover:underline px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={() => setShowAllReviews(false)}
                >
                  Hide Reviews
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                  <button className="text-blue-600 text-sm hover:underline px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                    View All
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.split("-")[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.member}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.book}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Books */}
            <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Popular Books</h2>
                  <button className="text-blue-600 text-sm hover:underline px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                    View All
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {popularBooks.map((book, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">{book.title}</h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{book.orders} orders</p>
                        <p className="text-xs text-gray-500">{book.available} available</p>
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
  )
}
