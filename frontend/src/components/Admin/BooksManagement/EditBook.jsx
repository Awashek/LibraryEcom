import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Upload,
  BookOpen,
  User,
  Calendar,
  Hash,
  FileText,
  Languages,
  Tag,
  Bookmark,
  BookType,
  X,
  Building,
} from 'lucide-react';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';
import useAxios from '../../../utils/axios/useAxios';
import { toast } from 'react-toastify';

export default function EditBook({ bookId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    authorIds: [],
    publisherName: '',
    description: '',
    isbn: '',
    publicationDate: '',
    pageCount: '',
    bookFormat: '',
    basePrice: '',
    genre: '',
    language: '',
    isAvailable: 'true',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Fetch book data
  const { data: bookData, refetch } = useAxios(`book/${bookId}`);

  // Fetch authors using useAxios hook
  const { data: authors } = useAxios(
    `author?pageNumber=${currentPage}&pageSize=${pageSize}&search=`
  );

  // Load book data when component mounts or bookId changes
  useEffect(() => {
    if (bookId) {
      refetch();
    }
  }, [bookId, refetch]);

  // Format mappings for dropdown values
  const mapBookFormatToValue = (format) => {
    const formatMap = {
      Paperback: '1',
      Hardcover: '2',
      SignedEdition: '3',
      LimitedEdition: '4',
      FirstEdition: '5',
      CollectorsEdition: '6',
      AuthorsEdition: '7',
      DeluxeEdition: '8',
    };
    return formatMap[format] || '';
  };

  const mapGenreToValue = (genre) => {
    const genreMap = {
      Fiction: '1',
      'Non-Fiction': '2',
      Mystery: '3',
      Thriller: '4',
      Romance: '5',
      Fantasy: '6',
      'Science Fiction': '7',
      Biography: '8',
      History: '9',
      Education: '10',
      Horror: '11',
    };
    return genreMap[genre] || '';
  };

  const mapLanguageToValue = (language) => {
    const languageMap = {
      English: '1',
      Nepali: '2',
      Hindi: '3',
      Spanish: '4',
      French: '5',
      German: '6',
      Chinese: '7',
      Japanese: '8',
      Korean: '9',
      Arabic: '10',
      Russian: '11',
      Portuguese: '12',
      Italian: '13',
    };
    return languageMap[language] || '';
  };

  // Update form data when book data is loaded
  useEffect(() => {
    if (bookData?.result) {
      const book = bookData.result;
      console.log('Loaded book data:', book);

      setFormData({
        title: book.title || '',
        authorIds: book.authors?.map((author) => author.id) || [],
        publisherName: book.publisherName || '',
        description: book.description || '',
        isbn: book.isbn || '',
        publicationDate: book.publicationDate
          ? book.publicationDate.split('T')[0]
          : '',
        pageCount: book.pageCount?.toString() || '',
        bookFormat: mapBookFormatToValue(book.bookFormat) || '',
        basePrice: book.basePrice?.toString() || '',
        genre: mapGenreToValue(book.genre) || '',
        language: mapLanguageToValue(book.language) || '',
        isAvailable: book.isAvailable ? 'true' : 'false',
      });

      if (book.coverImage) {
        setCoverImagePreview(`http://localhost:7226/images/${book.coverImage}`);
      }
      setIsLoading(false);
    }
  }, [bookData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAuthorDropdown &&
        !event.target.closest('.author-dropdown-container')
      ) {
        setShowAuthorDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthorDropdown]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAuthorSelection = (authorId) => {
    setFormData((prev) => {
      const newAuthorIds = prev.authorIds.includes(authorId)
        ? prev.authorIds.filter((id) => id !== authorId)
        : [...prev.authorIds, authorId];
      return { ...prev, authorIds: newAuthorIds };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.authorIds.length === 0) {
      toast.error('Please select at least one author');
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Append all form fields - using the same case pattern as AddBook component
    formDataToSend.append('title', formData.title);
    formDataToSend.append('publisherName', formData.publisherName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('isbn', formData.isbn);
    formDataToSend.append('publicationDate', formData.publicationDate);
    formDataToSend.append('pageCount', formData.pageCount);
    formDataToSend.append('bookFormat', formData.bookFormat);
    formDataToSend.append('basePrice', formData.basePrice);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('language', formData.language);
    formDataToSend.append('isAvailable', formData.isAvailable);

    // Append author IDs - using the same approach as AddBook
    formData.authorIds.forEach((id) => {
      formDataToSend.append('authorIds', id);
    });

    // Append cover image if exists
    if (coverImage) {
      formDataToSend.append('coverImage', coverImage);
    }

    axios
      .put(`/api/book/${bookId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Book updated successfully!');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        toast.error(error.response?.data?.message || 'Failed to update book');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Stop propagation to prevent closing when clicking inside the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg p-6'>
          <p>Loading book data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-hidden'>
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-6xl h-screen max-h-[95vh] flex flex-col'
        onClick={handleModalClick}
      >
        <div className='sticky top-0 z-10 bg-white p-4 border-b border-gray-200 flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-gray-800'>Edit Book</h1>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            aria-label='Close'
          >
            <X size={20} className='text-gray-600' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-6'>
          <form onSubmit={handleSubmit} className='h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full'>
              {/* Main Content - Wider section */}
              <div className='lg:col-span-2 space-y-4'>
                {/* Book Details */}
                <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center text-indigo-700'>
                    Book Details
                  </h2>

                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Title*
                        </label>
                        <input
                          name='title'
                          type='text'
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                          placeholder='Enter book title'
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Publisher Name*
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Building size={16} className='text-gray-500' />
                          </div>
                          <input
                            name='publisherName'
                            type='text'
                            required
                            value={formData.publisherName}
                            onChange={handleChange}
                            className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                            placeholder='Enter publisher name'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='relative author-dropdown-container'>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Authors*
                      </label>
                      <div
                        className='flex items-center p-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50'
                        onClick={() =>
                          setShowAuthorDropdown(!showAuthorDropdown)
                        }
                      >
                        <User size={16} className='text-gray-500 mr-2' />
                        <span>
                          {formData.authorIds.length > 0
                            ? `${formData.authorIds.length} author${
                                formData.authorIds.length > 1 ? 's' : ''
                              } selected`
                            : 'Select authors'}
                        </span>
                      </div>

                      {showAuthorDropdown && authors?.result && (
                        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto'>
                          {authors.result.map((author) => (
                            <div
                              key={author.id}
                              className='p-2 hover:bg-gray-100'
                            >
                              <label className='flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  checked={formData.authorIds.includes(
                                    author.id
                                  )}
                                  onChange={() =>
                                    toggleAuthorSelection(author.id)
                                  }
                                  className='mr-2 h-4 w-4 text-indigo-600 focus:outline-none border-gray-300 rounded'
                                />
                                <span>{author.name}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description*
                      </label>
                      <textarea
                        name='description'
                        rows={3}
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                        placeholder='Enter book description'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          ISBN*
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Hash size={16} className='text-gray-500' />
                          </div>
                          <input
                            name='isbn'
                            type='text'
                            required
                            value={formData.isbn}
                            onChange={handleChange}
                            className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                            placeholder='Enter ISBN'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Publication Date*
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Calendar size={16} className='text-gray-500' />
                          </div>
                          <input
                            name='publicationDate'
                            type='date'
                            required
                            value={formData.publicationDate}
                            onChange={handleChange}
                            className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Page Count*
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <FileText size={16} className='text-gray-500' />
                          </div>
                          <input
                            name='pageCount'
                            type='number'
                            required
                            min='1'
                            value={formData.pageCount}
                            onChange={handleChange}
                            className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                            placeholder='Enter page count'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Book Format*
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <BookType size={16} className='text-gray-500' />
                          </div>
                          <select
                            name='bookFormat'
                            required
                            value={formData.bookFormat}
                            onChange={handleChange}
                            className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 appearance-none'
                          >
                            <option value=''>Select Format</option>
                            <option value='1'>Paperback</option>
                            <option value='2'>Hardcover</option>
                            <option value='3'>Signed Edition</option>
                            <option value='4'>Limited Edition</option>
                            <option value='5'>First Edition</option>
                            <option value='6'>Collectors Edition</option>
                            <option value='7'>Authors Edition</option>
                            <option value='8'>Deluxe Edition</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center text-indigo-700'>
                    <Tag size={18} className='mr-2' />
                    Pricing
                  </h2>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Base Price (NPR)*
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <span className='text-gray-500'>NPR</span>
                      </div>
                      <input
                        name='basePrice'
                        type='number'
                        step='0.01'
                        min='0'
                        required
                        value={formData.basePrice}
                        onChange={handleChange}
                        className='w-full p-2.5 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                        placeholder='Enter base price'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className='space-y-4'>
                {/* Genre & Language */}
                <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center text-indigo-700'>
                    <Bookmark size={18} className='mr-2' />
                    Genre & Language
                  </h2>

                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Genre*
                    </label>
                    <select
                      name='genre'
                      required
                      value={formData.genre}
                      onChange={handleChange}
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 appearance-none'
                    >
                      <option value=''>Select Genre</option>
                      <option value='1'>Fiction</option>
                      <option value='2'>Non-Fiction</option>
                      <option value='3'>Mystery</option>
                      <option value='4'>Thriller</option>
                      <option value='5'>Romance</option>
                      <option value='6'>Fantasy</option>
                      <option value='7'>Science Fiction</option>
                      <option value='8'>Biography</option>
                      <option value='9'>History</option>
                      <option value='10'>Education</option>
                      <option value='11'>Horror</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Language*
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <Languages size={16} className='text-gray-500' />
                      </div>
                      <select
                        name='language'
                        required
                        value={formData.language}
                        onChange={handleChange}
                        className='w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 appearance-none'
                      >
                        <option value=''>Select Language</option>
                        <option value='1'>English</option>
                        <option value='2'>Nepali</option>
                        <option value='3'>Hindi</option>
                        <option value='4'>Spanish</option>
                        <option value='5'>French</option>
                        <option value='6'>German</option>
                        <option value='7'>Chinese</option>
                        <option value='8'>Japanese</option>
                        <option value='9'>Korean</option>
                        <option value='10'>Arabic</option>
                        <option value='11'>Russian</option>
                        <option value='12'>Portuguese</option>
                        <option value='13'>Italian</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status and Image Upload */}
                <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-200'>
                  <h2 className='text-lg font-semibold mb-4 flex items-center text-indigo-700'>
                    Status
                  </h2>
                  <select
                    name='isAvailable'
                    value={formData.isAvailable}
                    onChange={handleChange}
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 appearance-none mb-4'
                  >
                    <option value='true'>Available</option>
                    <option value='false'>Not Available</option>
                  </select>

                  <h2 className='text-lg font-semibold mb-4 flex items-center text-indigo-700'>
                    <Upload size={18} className='mr-2' />
                    Book Cover
                  </h2>
                  <div>
                    <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors bg-gray-50'>
                      {coverImagePreview ? (
                        <div className='w-full h-full overflow-hidden rounded-lg'>
                          <img
                            src={coverImagePreview}
                            alt='Preview'
                            className='w-full h-full object-contain'
                          />
                        </div>
                      ) : (
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <Upload size={24} className='text-gray-400 mb-2' />
                          <p className='text-sm text-gray-500'>
                            <span className='font-medium text-indigo-600'>
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                      <input
                        type='file'
                        name='coverImage'
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom action bar - sticky */}
        <div className='sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
