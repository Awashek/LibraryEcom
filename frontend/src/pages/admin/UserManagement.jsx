import { useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import useAxios from "../../utils/axios/useAxios";

export default function DiscountManagement() {
  const {
    data: discountData,
    loading: discountLoading,
    error: discountError,
  } = useAxios(`discount?pageNumber=1&pageSize=12&search=`);

  const [searchTerm, setSearchTerm] = useState("");
  const [discountStatusFilter, setDiscountStatusFilter] = useState("All");

  const getDiscountStatus = (endDate) => {
    if (!endDate || endDate === "0001-01-01") return "Active";
    const now = new Date();
    const end = new Date(endDate);
    return end < now ? "Inactive" : "Active";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminLayout />
      <div className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Discount Management
              </h1>
              <p className="text-gray-600">
                Manage and monitor book discounts and their status
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search discounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </div>

              {/* Status Filter */}
              <div className="w-full lg:w-auto">
                <select
                  value={discountStatusFilter}
                  onChange={(e) => setDiscountStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Discount Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Discounts</h2>
              {discountLoading ? (
                <p className="text-gray-500 text-sm">Loading discounts...</p>
              ) : discountError ? (
                <p className="text-red-500 text-sm">
                  Error loading discounts: {discountError.message}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">
                  Showing {discountData?.result?.length || 0} of{" "}
                  {discountData?.totalCount || 0} discounts
                </p>
              )}
            </div>

            {discountLoading ? (
              <div className="p-6 text-center">Loading discounts...</div>
            ) : discountError ? (
              <div className="p-6 text-center text-red-500">
                Error loading discounts: {discountError.message}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Book Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Discount %
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {discountData?.result
                      ?.filter((discount) => {
                        const status = getDiscountStatus(discount.endDate);
                        const matchesSearch = discount.bookTitle
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                        const matchesStatus =
                          discountStatusFilter === "All" ||
                          status === discountStatusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((discount) => {
                        const status = getDiscountStatus(discount.endDate);
                        return (
                          <tr
                            key={discount.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {discount.bookTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {discount.discountPercentage}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {discount.startDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {discount.endDate === "0001-01-01"
                                ? "No end date"
                                : discount.endDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
