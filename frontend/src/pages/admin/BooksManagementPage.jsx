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
  ArrowUpDown,
} from 'lucide-react';
import DiscountModal from '../../components/Admin/BooksManagement/DiscountModal';

import { BsThreeDotsVertical } from 'react-icons/bs';
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
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [priceSort, setPriceSort] = useState('none');
  const totalPages = 10;
  const axios = useAxiosAuth();

  const pageSize = 12;
  const navigate = useNavigate();
  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`
  );
  const [products, setProducts] = useState([]);

  console.log('booksData', booksData);

  useEffect(() => {
    if (booksData?.result) {
      setProducts(booksData.result);
    }
  }, [booksData?.result]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleDiscount = (book) => {
    setSelectedBook(book);
    setShowDiscountModal(true);
  };

  const handleEdit = (bookId) => {
    setEditingBookId(bookId);
    setShowEditModal(true);
  };

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

  // Filter books by availability and sort by price
  const getFilteredAndSortedProducts = () => {
    // First filter by availability
    let filteredBooks = filterStatus === 'all'
      ? products
      : products.filter((product) =>
          filterStatus === 'available'
            ? product.isAvailable
            : !product.isAvailable
        );
    
    // Then sort by price
    if (priceSort !== 'none') {
      filteredBooks = [...filteredBooks].sort((a, b) => {
        const priceA = a.validatedDiscount 
          ? calculateDiscountedPrice(a.basePrice, a.validatedDiscount.discountPercentage)
          : a.basePrice;
        
        const priceB = b.validatedDiscount
          ? calculateDiscountedPrice(b.basePrice, b.validatedDiscount.discountPercentage)
          : b.basePrice;
        
        return priceSort === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }
    
    return filteredBooks;
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return Math.round(price);
    const discounted = price - (price * discount) / 100;
    return Math.round(discounted);
  };

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
                className='flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-indigo-700'
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
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Price Sort
                  </label>
                  <select
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md w-full'
                  >
                    <option value='none'>Default</option>
                    <option value='asc'>Price: Low to High</option>
                    <option value='desc'>Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {getFilteredAndSortedProducts().map((product) => (
              <div
                key={product.id}
                className='bg-gray-50 rounded-xl shadow-lg p-4 relative hover:shadow-xl transition-shadow'
              >
                {/* Product Image */}
                <div className='relative'>
                  {product.coverImage ? (
                    <img
                      src={`http://localhost:7226/images/${product.coverImage}`}
                      alt={product.title}
                      className='w-full h-48 object-cover rounded-lg'
                    />
                  ) : (
                    <div className='w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg'>
                      <BookOpen size={48} className='text-gray-300' />
                    </div>
                  )}

                  {/* Availability Badge */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold text-white rounded-full ${
                      product.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {product.isAvailable ? 'Available' : 'Out of Stock'}
                  </span>

                  {/* On Sale Badge - Add this */}
                  {product.validatedDiscount?.isSaleFlag && (
                    <span className='absolute top-3 left-3 px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full'>
                      On Sale
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className='mt-4 relative'>
                  <div className='flex items-center justify-between mb-1'>
                    <h3 className='font-semibold text-lg text-gray-800 line-clamp-1'>
                      {product.title}
                    </h3>
                    <div className='relative'>
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === product.id ? null : product.id
                          )
                        }
                      >
                        <BsThreeDotsVertical className='text-gray-600 hover:text-gray-800' />
                      </button>
                      {openMenuId === product.id && (
                        <div className='absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-md z-50'>
                          <button
                            onClick={() => {
                              handleDiscount(product);
                              setOpenMenuId(null);
                            }}
                            className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                          >
                            Discount
                          </button>
                          <button
                            className='block w-full text-left px-4 py-2 text-indigo-600 hover:bg-gray-100'
                            onClick={() => {
                              handleEdit(product.id);
                              setOpenMenuId(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                            onClick={() => {
                              handleDelete(product.id, product.title);
                              setOpenMenuId(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-y-2 text-sm text-gray-600 mt-2 mb-3'>
                    <div className='flex items-center gap-1 col-span-1'>
                      <User size={14} className='text-gray-500' />
                      <span className='truncate'>
                        {product.authors?.map((a) => a.name).join(', ') ||
                          'Unknown Author'}
                      </span>
                    </div>

                    <div className='flex items-center gap-1 col-span-1 justify-end'>
                      <Tag size={14} className='text-gray-500' />
                      {product.validatedDiscount ? (
                        <div className='flex flex-col items-end'>
                          <span className='text-sm line-through text-gray-400'>
                            NPR {product.basePrice}
                          </span>
                          <span className='text-red-600 font-medium'>
                            NPR{' '}
                            {calculateDiscountedPrice(
                              product.basePrice,
                              product.validatedDiscount.discountPercentage
                            )}
                          </span>
                          <span className='text-xs text-green-600'>
                            {product.validatedDiscount.discountPercentage}% OFF
                          </span>
                        </div>
                      ) : (
                        <span>NPR {product.basePrice}</span>
                      )}
                    </div>

                    <div className='flex items-center gap-1 col-span-1'>
                      <Calendar size={14} className='text-gray-500' />
                      <span>
                        {product.publicationDate
                          ? new Date(product.publicationDate).getFullYear()
                          : 'N/A'}
                      </span>
                    </div>

                    <div className='flex items-center gap-1 col-span-1 justify-end'>
                      <FileText size={14} className='text-gray-500' />
                      <span>{product.genre}</span>
                    </div>
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

      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        book={selectedBook}
        onSubmit={(discountData) => {
          refetch();
          setShowDiscountModal(false);
        }}
      />

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