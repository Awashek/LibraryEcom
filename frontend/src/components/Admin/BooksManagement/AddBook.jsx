import React from 'react';
import {
  ArrowLeft,
  Upload,
  Trash2,
  BookOpen,
  User,
  Building,
  Calendar,
  Hash,
  FileText,
  Languages,
  Tag,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function AddBook() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />

      <div className='flex-1 p-6 lg:p-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center mb-6'>
            <button className='mr-4 p-2 rounded-md hover:bg-gray-100'>
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <h1 className='text-2xl font-bold text-gray-800'>Add New Book</h1>
          </div>

          <form>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Main Content - Wider section */}
              <div className='lg:col-span-2 space-y-6'>
                {/* Book Details */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center'>
                    <BookOpen size={18} className='mr-2' />
                    Book Details
                  </h2>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Title*
                      </label>
                      <input
                        type='text'
                        className='w-full p-3 border border-gray-300 rounded-lg'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Author*
                      </label>
                      <div className='flex items-center'>
                        <User
                          size={16}
                          className='text-gray-500 absolute ml-3'
                        />
                        <input
                          type='text'
                          className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description*
                      </label>
                      <textarea
                        rows={4}
                        className='w-full p-3 border border-gray-300 rounded-lg'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          ISBN*
                        </label>
                        <div className='flex items-center'>
                          <Hash
                            size={16}
                            className='text-gray-500 absolute ml-3'
                          />
                          <input
                            type='text'
                            className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Publisher
                        </label>
                        <div className='flex items-center'>
                          <Building
                            size={16}
                            className='text-gray-500 absolute ml-3'
                          />
                          <input
                            type='text'
                            className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Publication Date
                        </label>
                        <div className='flex items-center'>
                          <Calendar
                            size={16}
                            className='text-gray-500 absolute ml-3'
                          />
                          <input
                            type='date'
                            className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Pages
                        </label>
                        <div className='flex items-center'>
                          <FileText
                            size={16}
                            className='text-gray-500 absolute ml-3'
                          />
                          <input
                            type='number'
                            className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Language
                        </label>
                        <div className='flex items-center'>
                          <Languages
                            size={16}
                            className='text-gray-500 absolute ml-3'
                          />
                          <input
                            type='text'
                            className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center'>
                    <Tag size={18} className='mr-2' />
                    Pricing & Stock
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Price (NPR)*
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3 top-3 text-gray-500'>
                          NPR
                        </span>
                        <input
                          type='number'
                          className='w-full p-3 pl-12 border border-gray-300 rounded-lg'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Quantity*
                      </label>
                      <input
                        type='number'
                        className='w-full p-3 border border-gray-300 rounded-lg'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className='space-y-6'>
                {/* Genre */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4'>Genre</h2>
                  <input
                    type='text'
                    className='w-full p-3 border border-gray-300 rounded-lg mb-4'
                    placeholder='Press Enter to add genre'
                  />
                  <div className='flex flex-wrap gap-2'>
                    <span className='bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm'>
                      Fiction
                    </span>
                    <span className='bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm'>
                      Classic
                    </span>
                  </div>
                </div>

                {/* Status and Image Upload */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4'>Status</h2>
                  <select className='w-full p-3 border border-gray-300 rounded-lg mb-6'>
                    <option>Available</option>
                    <option>Out of Stock</option>
                    <option>Draft</option>
                  </select>

                  <h2 className='text-lg font-semibold mb-4'>Book Cover</h2>
                  <div className='space-y-4'>
                    <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400'>
                      <Upload size={24} className='text-gray-400 mb-2' />
                      <span className='text-sm text-gray-500'>
                        Upload Cover Image
                      </span>
                      <input type='file' className='hidden' accept='image/*' />
                    </label>
                    <div className='text-sm text-gray-500'>
                      <p>• Recommended size: 500×750px</p>
                      <p>• Formats: JPG, PNG</p>
                      <p>• Max size: 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type='submit'
                  className='w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                >
                  Save Book
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
