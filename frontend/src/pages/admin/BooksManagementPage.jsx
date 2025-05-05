import { useEffect, useState } from 'react';
import {
  Edit,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  Search,
  Plus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import AdminLayout from '../../layouts/AdminLayout';
import useAxios from '../../utils/axios/useAxios';

export default function BooksManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const pageSize = 12;
  const navigate = useNavigate();
  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}&search=`
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (booksData?.result) {
      setProducts(booksData.result);
    }
  }, [booksData?.result]);

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Delete "${productName}" permanently?`)) {
      setProducts(products.filter((product) => product.id !== productId));
      refetch();
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />

      <div className='flex-1 p-6 lg:p-8 overflow-x-auto'>
        <div className='w-full mx-auto'>
          {/* Top Bar */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
            <div className='flex gap-3 w-full lg:w-auto'>
              <button className='p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50'>
                <List size={20} className='text-gray-500' />
              </button>
              <button className='p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50'>
                <Grid size={20} className='text-gray-500' />
              </button>

              <div className='relative flex-grow lg:flex-grow-0 lg:w-72'>
                <Search
                  size={16}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  placeholder='Search books...'
                  className='pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300'
                />
              </div>
            </div>

            <div className='flex flex-wrap gap-3 w-full lg:w-auto justify-end'>
              <div className='relative min-w-[180px]'>
                <button className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50'>
                  <span className='text-gray-700'>Show: All</span>
                  <ChevronDown size={16} className='text-gray-500' />
                </button>
              </div>

              <div className='relative min-w-[180px]'>
                <button className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50'>
                  <span className='text-gray-700'>Sort by: Popularity</span>
                  <ChevronDown size={16} className='text-gray-500' />
                </button>
              </div>

              <button className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 min-w-[100px]'>
                <Filter size={16} className='text-gray-700' />
                <span className='text-gray-700'>Filter</span>
              </button>

              <button
                onClick={() => navigate('/add-book')}
                className='flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap'
              >
                <Plus size={16} />
                <span>Add Book</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            {/* Filter cards omitted for brevity */}
          </div>

          {/* Table */}
          <div className='bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-4 px-6 text-left font-medium text-gray-500 min-w-[200px]'>
                      Book Title
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      ISBN
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Language
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Genre
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Format
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Price
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Publication Date
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Available
                    </th>
                    <th className='py-4 px-6 text-left font-medium text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4 text-sm text-gray-700 font-medium'>
                        {product.title}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.isbn}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.language}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.genre}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.bookFormat}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.basePrice}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {new Date(product.publicationDate).toLocaleDateString()}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {product.isAvailable ? 'Yes' : 'No'}
                      </td>
                      <td className='px-6 py-4 flex gap-2'>
                        <button
                          className='text-indigo-600 hover:text-indigo-900'
                          onClick={() => navigate(`/add-book/${product.id}`)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className='text-red-600 hover:text-red-800'
                          onClick={() =>
                            handleDelete(product.id, product.title)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
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
                <span className='font-medium'>6</span> of{' '}
                <span className='font-medium'>{products.length}</span> results
              </div>
              <div className='flex items-center gap-1'>
                <button
                  className='p-2 rounded-md hover:bg-gray-100 disabled:opacity-50'
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} className='text-gray-500' />
                </button>
                <button
                  className='p-2 rounded-md hover:bg-gray-100 disabled:opacity-50'
                  disabled={currentPage === totalPages}
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
