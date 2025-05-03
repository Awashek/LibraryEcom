import { useState } from 'react';
import {
  Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight,
  Filter, Grid, List, Search, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate hook
import AdminLayout from '../layouts/AdminLayout';

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 'ISBN-9780140449136',
      title: 'The Odyssey',
      author: 'Homer',
      price: 10.99,
      stock: 230,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    },
    {
      id: 'ISBN-9780679783268',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 8.49,
      stock: 120,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    },
    {
      id: 'ISBN-9780743273565',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 9.99,
      stock: 75,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    },
    {
      id: 'ISBN-9780439023528',
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      price: 12.99,
      stock: 310,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    },
    {
      id: 'ISBN-9780142437230',
      title: 'Moby-Dick',
      author: 'Herman Melville',
      price: 11.5,
      stock: 60,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    },
    {
      id: 'ISBN-9780061120084',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 7.99,
      stock: 150,
      status: 'Active',
      image: '../images/placeholder-book.jpg'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Delete "${productName}" permanently?`)) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminLayout />

      <div className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <div className="w-full mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex gap-3 w-full lg:w-auto">
              <button className="p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                <List size={20} className="text-gray-500" />
              </button>
              <button className="p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                <Grid size={20} className="text-gray-500" />
              </button>

              <div className="relative flex-grow lg:flex-grow-0 lg:w-72">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
              <div className="relative min-w-[180px]">
                <button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                  <span className="text-gray-700">Show: All</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="relative min-w-[180px]">
                <button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                  <span className="text-gray-700">Sort by: Popularity</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 min-w-[100px]">
                <Filter size={16} className="text-gray-700" />
                <span className="text-gray-700">Filter</span>
              </button>

              <button 
              onClick={() => navigate('/productsform')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap">
                <Plus size={16} />
                <span>Add Book</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Filter cards omitted for brevity */}
          </div>

          {/* Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-medium text-gray-500 min-w-[250px]">Book Title</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-500">Price</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-500">Stock</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-500">Author</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-500">Status</th>
                    <th className="py-4 px-6 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded-md mr-4 object-cover border border-gray-100"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.title}</div>
                            <div className="text-gray-500 text-sm">{product.author}</div>
                            <div className="text-gray-400 text-xs mt-1">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-6">{product.stock.toLocaleString()}</td>
                      <td className="py-4 px-6">{product.author}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className={`h-2.5 w-2.5 rounded-full mr-2 ${product.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></span>
                          <span>{product.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate('/productsform')} // ✅ Navigate on click
                            className="p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                <span className="font-medium">{products.length}</span> results
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} className="text-gray-500" />
                </button>
                <button
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}