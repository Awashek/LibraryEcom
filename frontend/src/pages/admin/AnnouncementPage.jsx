import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Clock,
  X,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import useAxios from "../../utils/axios/useAxios";
import useAxiosAuth from "../../utils/axios/useAxiosAuth";
import EditAnnouncement from "../../components/Admin/Announcement/EditAnnouncement";
import { useNavigate } from "react-router-dom";

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "Expired":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

// Message component with expand/collapse functionality
const MessageContent = ({ message, onViewFull }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      const element = messageRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [message]);

  return (
    <div className="mb-5">
      <div ref={messageRef} className="text-slate-900 text-base line-clamp-3">
        {message}
      </div>
      {isOverflowing && (
        <button
          onClick={() => onViewFull(message)}
          className="text-sm text-slate-600 hover:text-slate-800 font-medium mt-2"
        >
          View full
        </button>
      )}
    </div>
  );
};

// Message detail modal
const MessageDetailModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-900">
                Announcement
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="prose max-w-none text-slate-700">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementData, setAnnouncements] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const axios = useAxiosAuth();
  const navigate = useNavigate();

  const pageSize = 12;
  const { data: announcements, refetch } = useAxios(
    `announcements?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`
  );

  useEffect(() => {
    if (announcements?.result) {
      setAnnouncements(announcements.result);
    }
  }, [announcements?.result]);

  // Apply search and sorting
  useEffect(() => {
    let filtered = [...(announcements?.result || [])];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.publisher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setAnnouncements(filtered);
  }, [searchTerm, sortField, sortDirection, announcements?.result]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditClick = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (announcement) => {
    setAnnouncementToDelete(announcement);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .patch(`api/announcements/${announcementToDelete.id}`)
      .then((response) => {
        if (
          response?.data?.statusCode === 200 &&
          response?.data?.result === true
        ) {
          toast.success("Announcement deleted successfully.");
          refetch();
          setIsDeleteModalOpen(false);
          setAnnouncementToDelete(null);
        } else {
          toast.error("Error deleting announcement.");
        }
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setAnnouncementToDelete(null);
  };

  const handleViewFullMessage = (message) => {
    setSelectedMessage(message);
  };

  // Sort options dropdown
  const [showSortOptions, setShowSortOptions] = useState(false);

  const sortOptions = [
    { field: "message", label: "Message" },
    { field: "startDate", label: "Start Date" },
    { field: "endDate", label: "End Date" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminLayout />

      <div className="flex-1 p-6 lg:p-8">
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={handleDeleteCancel}
              >
                <div className="absolute inset-0 bg-black opacity-75 backdrop-blur-3xl"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">
                        Delete Announcement
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-slate-500">
                          Are you sure you want to delete the announcement? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                      onClick={handleDeleteCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={handleDeleteConfirm}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Announcement Modal */}
        <EditAnnouncement
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          announcement={currentAnnouncement}
          onSave={refetch}
          axios={axios}
        />

        {/* Message Detail Modal */}
        {selectedMessage && (
          <MessageDetailModal
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}

        <div className="w-full mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Library Announcements
              </h1>
              <p className="text-slate-500">
                Manage notices and updates for library patrons
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
              <div className="relative w-full lg:w-72">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <button
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  <Filter size={16} className="text-slate-500" />
                  <span className="text-slate-700">
                    Sort:{" "}
                    {sortOptions.find((opt) => opt.field === sortField)?.label}
                  </span>
                  {sortDirection === "asc" ? (
                    <ChevronUp size={16} className="text-slate-500" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-500" />
                  )}
                </button>

                {showSortOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <li key={option.field}>
                          <button
                            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                            onClick={() => {
                              handleSort(option.field);
                              setShowSortOptions(false);
                            }}
                          >
                            <span>{option.label}</span>
                            {sortField === option.field &&
                              (sortDirection === "asc" ? (
                                <ChevronUp
                                  size={16}
                                  className="text-slate-500"
                                />
                              ) : (
                                <ChevronDown
                                  size={16}
                                  className="text-slate-500"
                                />
                              ))}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/add-announcement")}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors whitespace-nowrap"
              >
                <Plus size={16} />
                <span>New Announcement</span>
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcementData.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="p-5 flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex justify-between mb-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        new Date(announcement.endDate) < new Date()
                          ? "bg-red-100 text-red-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {new Date(announcement.endDate) < new Date()
                        ? "Expired"
                        : "Active"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(announcement)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        aria-label="Edit announcement"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(announcement)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        aria-label="Delete announcement"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Message with expand/collapse functionality */}
                  <div className="flex-grow">
                    <MessageContent
                      message={announcement.message}
                      onViewFull={handleViewFullMessage}
                    />
                  </div>

                  {/* Date Information */}
                  <div className="pt-3 border-t border-slate-100 mt-auto">
                    <div className="flex items-center text-sm text-slate-500 mb-1.5">
                      <Calendar size={14} className="mr-2 text-slate-400" />
                      <span>Start: {formatDate(announcement.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock size={14} className="mr-2 text-slate-400" />
                      <span>End: {formatDate(announcement.endDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {announcementData.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center my-8">
              <div className="text-slate-500 mb-2 font-medium">
                No announcements found
              </div>
              <p className="text-slate-400 text-sm">
                Try adjusting your search or create a new announcement
              </p>
              <button
                onClick={() => navigate("/add-announcement")}
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors mx-auto"
              >
                <Plus size={16} />
                <span>New Announcement</span>
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{announcementData.length}</span> of{" "}
              <span className="font-medium">
                {announcements?.totalCount || 0}
              </span>{" "}
              announcements
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-200"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} className="text-slate-500" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-200"
                disabled={currentPage === announcements?.totalPages}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(announcements?.totalPages || 1, p + 1)
                  )
                }
                aria-label="Next page"
              >
                <ChevronRight size={16} className="text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
