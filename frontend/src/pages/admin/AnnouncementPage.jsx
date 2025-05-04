import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import useAxios from '../../utils/axios/useAxios';
import useAxiosAuth from '../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';
import EditAnnouncement from '../../components/Admin/Announcement/EditAnnouncement';

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
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

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor()}`}
    >
      {priority}
    </span>
  );
};

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementData, setAnnouncements] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const navigate = useNavigate();
  const axios = useAxiosAuth();

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
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setAnnouncements(filtered);
  }, [searchTerm, sortField, sortDirection, announcements?.result]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp size={16} className='ml-1' />
    ) : (
      <ChevronDown size={16} className='ml-1' />
    );
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
          toast.success(response.data.message);
          refetch(); // Refresh data
          setIsDeleteModalOpen(false);
          setAnnouncementToDelete(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting announcement:', error);
        toast.error('Something went wrong. Please try again.');
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setAnnouncementToDelete(null);
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />

      <div className='flex-1 p-6 lg:p-8 overflow-x-auto'>
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div
                className='fixed inset-0 transition-opacity'
                aria-hidden='true'
                onClick={handleDeleteCancel}
              >
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
              </div>

              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span>

              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                      <AlertTriangle className='h-6 w-6 text-red-600' />
                    </div>
                    <div>
                      <h3 className='text-lg font-medium text-gray-900'>
                        Delete Announcement
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to delete the announcement "
                          {announcementToDelete?.message}"? This action cannot
                          be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 flex justify-end gap-3'>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none'
                      onClick={handleDeleteCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none'
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

        <div className='w-full mx-auto'>
          {/* Top Bar */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>
                Library Announcements
              </h1>
              <p className='text-gray-600'>
                Manage notices and updates for library patrons
              </p>
            </div>

            <div className='flex flex-wrap gap-3 w-full lg:w-auto justify-end'>
              <div className='relative w-full lg:w-72'>
                <Search
                  size={16}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  placeholder='Search announcements...'
                  className='pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={() => navigate('/add-announcement')}
                className='flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap'
              >
                <Plus size={16} />
                <span>New Announcement</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className='bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-4 px-6 text-left font-medium text-gray-500 min-w-[250px]'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('message')}
                      >
                        Message
                        {getSortIcon('message')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('startDate')}
                      >
                        Start Date
                        {getSortIcon('startDate')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('endDate')}
                      >
                        End Date
                        {getSortIcon('endDate')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Status
                    </th>
                    <th className='py-4 px-6 text-right font-medium text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {announcementData.map((announcement) => (
                    <tr
                      key={announcement.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-4 px-6 font-medium text-gray-900'>
                        {announcement.message}
                      </td>
                      <td className='py-4 px-6'>
                        {new Date(announcement.startDate).toLocaleDateString()}
                      </td>
                      <td className='py-4 px-6'>
                        {new Date(announcement.endDate).toLocaleDateString()}
                      </td>
                      <td className='py-4 px-6'>
                        <StatusBadge status='Active' />
                      </td>
                      <td className='py-4 px-6'>
                        <div className='flex justify-end gap-2'>
                          <button
                            onClick={() => handleEditClick(announcement)} // Arrow function creates a callback
                            className='p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(announcement)} // This was already correct
                            className='p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 gap-4'>
              <div className='text-sm text-gray-500'>
                Showing <span className='font-medium'>1</span> to{' '}
                <span className='font-medium'>{announcementData.length}</span>{' '}
                of{' '}
                <span className='font-medium'>
                  {announcements?.totalCount || 0}
                </span>{' '}
                announcements
              </div>
              <div className='flex items-center gap-1'>
                <button
                  className='p-2 rounded-md hover:bg-gray-100 disabled:opacity-50'
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} className='text-gray-500' />
                </button>
                <button
                  className='p-2 rounded-md hover:bg-gray-100 disabled:opacity-50'
                  disabled={currentPage === announcements?.totalPages}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(announcements?.totalPages || 1, p + 1)
                    )
                  }
                >
                  <ChevronRight size={16} className='text-gray-500' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
