import { useEffect, useState } from 'react';
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Filter,
  BookOpen,
  User,
  Tag,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import useAxios from '../../utils/axios/useAxios';
import AddBook from '../../components/Admin/BooksManagement/AddBook';
import EditBook from '../../components/Admin/BooksManagement/EditBook';
import { toast } from 'react-toastify';
import useAxiosAuth from '../../utils/axios/useAxiosAuth';

export default function BooksManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const totalPages = 10;
  const axios = useAxiosAuth();

  const pageSize = 12;
  const navigate = useNavigate();
  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (booksData?.result) {
      setProducts(booksData.result);
    }
  }, [booksData?.result]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleEdit = (bookId) => {
    setEditingBookId(bookId);
    setShowEditModal(true);
  };

  // Add this function to open the delete confirmation modal
  const handleDelete = (bookId, bookTitle) => {
    setBookToDelete({ id: bookId, title: bookTitle });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    axios
      .delete(`/api/book/${bookToDelete.id}`)
      .then(() => {
        setProducts(products.filter((book) => book.id !== bookToDelete.id));
        toast.success('Book deleted successfully');
        refetch();
      })
      .catch((error) => {
        toast.error('Failed to delete book');
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
        setIsDeleting(false);
      });
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showAddModal || showEditModal || isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddModal, showEditModal, isDeleteModalOpen]);

  const filteredProducts =
    filterStatus === 'all'
      ? products
      : products.filter((product) =>
          filterStatus === 'available'
            ? product.isAvailable
            : !product.isAvailable
        );

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />

      <div className='flex-1 p-6 lg:p-8'>
        <div className='w-full mx-auto'>
          {/* Header and Search */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl font-bold text-gray-800'>
                Books Management
              </h1>
            </div>

            <div className='flex flex-wrap items-center gap-3 w-full lg:w-auto'>
              {/* Search */}
              <form
                onSubmit={handleSearch}
                className='relative flex-grow lg:w-64'
              >
                <Search
                  size={16}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  placeholder='Search books...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300'
                />
              </form>

              {/* Filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50'
              >
                <Filter size={16} className='text-gray-700' />
                <span className='text-gray-700'>Filter</span>
              </button>

              {/* Add Book */}
              <button
                onClick={() => setShowAddModal(true)}
                className='flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
              >
                <Plus size={18} />
                Add Book
              </button>
            </div>
          </div>

          {/* Filters (Collapsible) */}
          {showFilters && (
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6'>
              <div className='flex flex-wrap gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md w-full'
                  >
                    <option value='all'>All Books</option>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Not Available</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'
              >
                {/* Book Cover */}
                <div className='relative pt-[80%] bg-gray-100'>
                  {product.coverImage ? (
                    <img
                      src={`http://localhost:7226/images/${product.coverImage}`}
                      alt={product.title}
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <BookOpen size={48} className='text-gray-300' />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className='absolute top-2 right-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.isAvailable ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                {/* Book Details */}
                <div className='p-4'>
                  <h3 className='font-semibold text-gray-800 mb-1 line-clamp-1'>
                    {product.title}
                  </h3>

                  <div className='flex items-center text-sm text-gray-500 mb-1'>
                    <User size={14} className='mr-1' />
                    <span className='line-clamp-1'>
                      {product.authors
                        ?.map((author) => author.name)
                        .join(', ') || 'Unknown Author'}
                    </span>
                  </div>

                  <div className='flex items-center text-sm text-gray-500 mb-1'>
                    <Tag size={14} className='mr-1' />
                    <span>NPR {product.basePrice}</span>
                  </div>

                  <div className='flex items-center text-sm text-gray-500 mb-1'>
                    <Calendar size={14} className='mr-1' />
                    <span>
                      {product.publicationDate
                        ? new Date(product.publicationDate).getFullYear()
                        : 'N/A'}
                    </span>
                  </div>

                  <div className='flex items-center text-sm text-gray-500 mb-3'>
                    <FileText size={14} className='mr-1' />
                    <span>{product.genre}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex justify-between gap-2 pt-2 border-t border-gray-100'>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className='flex-1 flex justify-center items-center gap-1 py-2 text-indigo-600 hover:bg-indigo-50 rounded'
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className='flex-1 flex justify-center items-center gap-1 py-2 text-red-600 hover:bg-red-50 rounded'
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='mt-6 flex justify-center'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='p-2 border border-gray-300 rounded-md disabled:opacity-50'
              >
                <ChevronLeft size={16} />
              </button>
              <span className='px-4 py-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className='p-2 border border-gray-300 rounded-md disabled:opacity-50'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <AddBook
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            refetch();
          }}
        />
      )}

      {/* Edit Book Modal */}
      {showEditModal && (
        <EditBook
          bookId={editingBookId}
          onClose={() => {
            setShowEditModal(false);
            setEditingBookId(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setEditingBookId(null);
            refetch();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg w-full max-w-sm mx-4 p-6 shadow-xl'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-medium text-gray-900'>
                Confirm Delete
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='text-gray-400 hover:text-gray-500'
              >
                <X size={20} />
              </button>
            </div>

            <div className='mt-3 text-center'>
              <p className='text-sm text-gray-500 mb-6'>
                Are you sure you want to delete "
                <span className='font-medium'>{bookToDelete?.title}</span>"?
                This action cannot be undone.
              </p>

              <div className='flex space-x-3 justify-center'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none'
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none flex items-center justify-center'
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className='animate-spin mr-2'>⚪</span>
                      Deleting...
                    </>
                  ) : (
                    <>Delete</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
