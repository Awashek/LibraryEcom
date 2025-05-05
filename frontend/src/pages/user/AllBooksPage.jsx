import React, { useState, useEffect } from 'react';
import Pagination from '../../components/common/Pagination';
import useAxios from '../../utils/axios/useAxios';
import { useNavigate } from 'react-router-dom';

const AllBooksPage = () => {
  // State for search, sort, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Latest Update');
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const pageSize = 12;

  const { data: booksData, refetch } = useAxios(
    `book?pageNumber=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`
  );

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.result || []);
      setTotalCount(booksData.totalCount || 0); // Changed from rowCount to totalCount
    }
  }, [booksData]);

  useEffect(() => {
    // Refetch data when search query or page changes
    refetch();
  }, [searchQuery, currentPage, refetch]);

  // Format book data for UI
  const formatBookData = (book) => {
    return {
      id: book.id, // Changed from Id to id
      title: book.title, // Changed from Title to title
      // Handle empty authors array
      author:
        book.authors && book.authors.length > 0
          ? book.authors.map((a) => a.name).join(', ')
          : 'Unknown Author',
      // Use a default cover image
      coverImage: 'https://via.placeholder.com/150x200?text=No+Cover',
      status: book.isAvailable ? 'Available' : 'Booked', // Changed from IsAvailable to isAvailable
      price: book.basePrice, // Changed from BasePrice to basePrice
      discount: book.discount,
      genre: book.genre,
      language: book.language,
      publicationDate: book.publicationDate, // Added for sorting
    };
  };

  // Apply sorting to the formatted books data
  const sortedBooks = React.useMemo(() => {
    const formattedBooks = books.map(formatBookData);

    switch (sortOption) {
      case 'Latest Update':
        // Sort by publication date (newest first)
        return [...formattedBooks].sort(
          (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
        );
      case 'Title A-Z':
        return [...formattedBooks].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case 'Title Z-A':
        return [...formattedBooks].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      case 'Author A-Z':
        return [...formattedBooks].sort((a, b) =>
          a.author.localeCompare(b.author)
        );
      default:
        return formattedBooks;
    }
  }, [books, sortOption]);

  // Calculate total pages using totalCount from API
  const totalPages = booksData?.totalPages || 1;

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className='min-h-screen bg-[#222] text-white py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center text-3xl font-medium mb-8'>ALL BOOKS</h1>

        {/* Search and Sort Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
          <div className='w-full md:w-2/3 mb-4 md:mb-0'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-black'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search by title, author...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-white text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className='flex items-center'>
            <span className='mr-2 text-gray-300'>SORT BY</span>
            <div className='relative'>
              <select
                className='block appearance-none bg-white border border-gray-700 text-black py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option>Latest Update</option>
                <option>Title A-Z</option>
                <option>Title Z-A</option>
                <option>Author A-Z</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {sortedBooks.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
              {sortedBooks.map((book) => (
                <div key={book.id} className='flex flex-col'>
                  <div className='relative pb-[150%] overflow-hidden'>
                    <div className='absolute inset-0 bg-gray-700'>
                      <div className='w-full h-full flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='w-full h-full absolute inset-0'>
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className='w-full h-full object-cover'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 px-2 py-1 m-2 text-xs font-medium ${
                        book.status === 'Available'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {book.status}
                    </div>
                  </div>
                  <h3 className='mt-2 text-sm font-medium'>{book.title}</h3>
                  <p className='text-xs text-gray-400'>{book.author}</p>
                  {book.discount ? (
                    <div className='flex items-center mt-1'>
                      <span className='text-sm line-through text-gray-400 mr-2'>
                        ${book.price.toFixed(2)}
                      </span>
                      <span className='text-sm font-medium'>
                        $
                        {(
                          book.price *
                          (1 - book.discount.percentage / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className='text-sm font-medium mt-1'>
                      ${book.price.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className='text-center py-12'>
            <p className='text-xl'>No books found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
