import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import useAxios from '../../utils/axios/useAxios';
import { toast } from 'react-toastify';
import AddAuthor from '../../components/Admin/AuthorManagement/AddAuthor';
import UpdateAuthor from '../../components/Admin/AuthorManagement/UpdateAuthor';
import AdminLayout from '../../layouts/AdminLayout';
import useAxiosAuth from '../../utils/axios/useAxiosAuth';

export default function AuthorsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorData, setAuthors] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosAuth();

  const pageSize = 12;
  const { data: authors, refetch } = useAxios(
    `author?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`
  );

  useEffect(() => {
    if (authors?.result) {
      setAuthors(authors.result);
    }
  }, [authors?.result]);

  // Apply search and sorting
  useEffect(() => {
    let filtered = [...(authors?.result || [])];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.biography?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setAuthors(filtered);
  }, [searchTerm, sortField, sortDirection, authors?.result]);

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

  const handleAddAuthor = () => {
    refetch();
    toast.success('Author added successfully');
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    axios
      .patch(`/api/author/${authorToDelete.id}`, { isDeleted: true })
      .then(() => {
        setAuthors(
          authorData.filter((author) => author.id !== authorToDelete.id)
        );
        toast.success('Author deleted successfully');
        refetch();
      })
      .catch((error) => {
        toast.error('Failed to delete author');
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
        setAuthorToDelete(null);
        setIsDeleting(false);
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setAuthorToDelete(null);
  };

  const handleEditClick = (author) => {
    setCurrentAuthor(author);
    setIsEditModalOpen(true);
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />
      <div className='flex-1 p-6 lg:p-8 overflow-x-auto'>
        {/* Add Author Modal */}
        <AddAuthor
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddAuthor}
        />

        {/* Edit Author Modal */}
        <UpdateAuthor
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          author={currentAuthor}
          onSave={refetch}
          axios={axios}
        />

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div
                className='fixed inset-0 transition-opacity'
                aria-hidden='true'
                onClick={handleDeleteCancel}
              >
                <div className='absolute inset-0 bg-black opacity-75 backdrop-blur-3xl'></div>
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
                        Delete Author
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to delete the author "
                          {authorToDelete?.name}"? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 flex justify-end gap-3'>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none'
                      onClick={handleDeleteCancel}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50'
                      onClick={handleDeleteConfirm}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='w-full mx-auto'>
          {/* Top Bar */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>
                Author Management
              </h1>
              <p className='text-gray-600'>
                Manage authors and their information
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
                  placeholder='Search authors...'
                  className='pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap'
              >
                <Plus size={16} />
                <span>Add Author</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className='bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-4 px-6 text-left font-medium text-gray-500 min-w-[200px]'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('name')}
                      >
                        Author Name
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('biography')}
                      >
                        Biography
                        {getSortIcon('biography')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      <div
                        className='flex items-center cursor-pointer'
                        onClick={() => handleSort('birthDate')}
                      >
                        Birth Date
                        {getSortIcon('birthDate')}
                      </div>
                    </th>
                    <th className='py-4 px-6 text-right font-medium text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {authorData.map((author) => (
                    <tr
                      key={author.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-4 px-6 font-medium text-gray-900'>
                        {author.name}
                      </td>
                      <td className='py-4 px-6 max-w-[300px] truncate'>
                        {author.biography || 'N/A'}
                      </td>
                      <td className='py-4 px-6'>
                        {author.birthDate
                          ? new Date(author.birthDate).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className='py-4 px-6'>
                        <div className='flex justify-end gap-2'>
                          <button
                            onClick={() => handleEditClick(author)}
                            className='p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setAuthorToDelete(author);
                              setIsDeleteModalOpen(true);
                            }}
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
                <span className='font-medium'>{authorData.length}</span> of{' '}
                <span className='font-medium'>{authors?.totalCount || 0}</span>{' '}
                authors
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
                  disabled={currentPage === authors?.totalPages}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(authors?.totalPages || 1, p + 1)
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
