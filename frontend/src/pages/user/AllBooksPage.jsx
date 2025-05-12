'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '../../components/common/Pagination';
import useAxios from '../../utils/axios/useAxios';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Tag } from 'lucide-react';

const AllBooksPage = () => {
  // State for search, sort, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Title A-Z');
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();
  const pageSize = 4;

  // Fixed genres based on the enum
  const genres = [
    'Fiction',
    'NonFiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Fantasy',
    'ScienceFiction',
    'Biography',
    'History',
    'Education',
    'Horror',
  ];

  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`
  );


  useEffect(() => {
    if (booksData) {
      setBooks(booksData.result || []);
      setTotalCount(booksData.totalCount || 0);
    }
  }, [booksData]);

  useEffect(() => {
    // Refetch data when search query or page changes
    refetch();
  }, [searchQuery, currentPage, refetch]);

  // Format book data for UI
  const formatBookData = (book) => {
    return {
      id: book.id,
      title: book.title,
      coverImage: book.coverImage
        ? `http://localhost:7226/images/${book.coverImage}`
        : null,
      price: book.basePrice,
      discount: book.validatedDiscount || null,
      genre: book.genre,
      isAvailable: book.isAvailable,
    };
  };

  // Filter books by genre first, then apply sorting
  const filteredAndSortedBooks = React.useMemo(() => {
    // Step 1: Filter by genre if a genre is selected
    const filteredBooks = selectedGenre
      ? books.filter((book) => book.genre === selectedGenre)
      : books;

    // Step 2: Format the filtered books
    const formattedBooks = filteredBooks.map(formatBookData);

    // Step 3: Apply sorting
    switch (sortOption) {
      case 'Title A-Z':
        return [...formattedBooks].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case 'Title Z-A':
        return [...formattedBooks].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      default:
        return formattedBooks;
    }
  }, [books, selectedGenre, sortOption]);

  // Calculate total pages using the filtered count
  const totalPages = booksData?.totalPages || 1;

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Select genre
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre);
    setCurrentPage(1); // Reset to page 1 when changing genre
  };

  // Calculate discounted price and round to nearest integer
  const calculateDiscountedPrice = (basePrice, discount) => {
    if (!discount) return Math.round(basePrice);
    return Math.round(basePrice * (1 - discount.discountPercentage / 100));
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center text-3xl font-bold mb-10 text-gray-900'>
          Book Collection
        </h1>

        {/* Search and Sort Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
          <div className='w-full md:w-2/3'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search by title...'
                className='block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className='flex items-center'>
            <span className='mr-3 text-gray-600 font-medium'>Sort by</span>
            <div className='relative'>
              <select
                className='block appearance-none bg-white border border-gray-300 text-gray-900 py-2.5 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200'
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option>Title A-Z</option>
                <option>Title Z-A</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                <ChevronDown className='h-4 w-4' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          {/* Left Sidebar - Genre Filter */}
          <div className='w-full md:w-1/4 lg:w-1/5'>
            <div className='bg-white rounded-md shadow-sm p-5 sticky top-8'>
              <h2 className='text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2'>
                Genres
              </h2>
              <ul className='space-y-1'>
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                      selectedGenre === ''
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => handleGenreSelect('')}
                  >
                    All Genres
                  </button>
                </li>
                {genres.map((genre) => (
                  <li key={genre}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                        selectedGenre === genre
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => handleGenreSelect(genre)}
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content - Books Grid */}
          <div className='w-full md:w-3/4 lg:w-4/5'>
            {filteredAndSortedBooks.length > 0 ? (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {filteredAndSortedBooks.map((book) => (
                    <div
                      key={book.id}
                      className='group bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer'
                      onClick={() => navigate(`/book-details/${book.id}`)}
                    >
                      <div className='relative pb-[140%] overflow-hidden'>
                        {/* Book Cover */}
                        <div className='absolute inset-0 bg-gray-100'>
                          <img
                            src={book.coverImage || '/placeholder.svg'}
                            alt={book.title}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                          />
                        </div>

                        {/* Status Badge */}
                        <div className='absolute top-2 right-2'>
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              book.isAvailable
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                          >
                            {book.isAvailable ? 'Available' : 'Out of Stock'}
                          </span>
                        </div>

                        {/* Sale Badge - Only show if isSaleFlag is true */}
                        {book.discount && book.discount.isSaleFlag && (
                          <div className='absolute top-2 left-2'>
                            <span className='px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white flex items-center shadow-sm'>
                              <Tag className='h-3.5 w-3.5 mr-1' />
                              SALE
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='p-4'>
                        <h3 className='text-gray-900 font-medium line-clamp-2 mb-3 text-sm'>
                          {book.title}
                        </h3>

                        {/* Price display with rounded prices */}
                        <div className='mt-auto'>
                          {book.discount ? (
                            <div>
                              <div className='flex items-center'>
                                <span className='text-sm line-through text-gray-500 mr-2'>
                                  NPR {Math.round(book.price)}
                                </span>
                                <span className='text-sm font-medium text-gray-900'>
                                  NPR{' '}
                                  {calculateDiscountedPrice(
                                    book.price,
                                    book.discount
                                  )}
                                </span>
                              </div>
                              {/* Discount percentage below price */}
                              <span className='mt-1 inline-block text-xs font-medium text-amber-600'>
                                {book.discount.discountPercentage}% OFF
                              </span>
                            </div>
                          ) : (
                            <span className='text-sm font-medium text-gray-900'>
                              NPR {Math.round(book.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-10'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center py-16 bg-white rounded-md shadow-sm'>
                <div className='text-5xl mb-4'>📚</div>
                <p className='text-xl font-medium text-gray-700'>
                  No books found
                </p>
                <p className='text-gray-500 mt-2'>
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooksPage;
