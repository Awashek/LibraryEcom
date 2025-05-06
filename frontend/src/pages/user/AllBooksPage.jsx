import React, { useState, useEffect } from 'react';
import Pagination from '../../components/common/Pagination';
import useAxios from '../../utils/axios/useAxios';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const AllBooksPage = () => {
  // State for search, sort, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Title A-Z');
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();
  const pageSize = 12;

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
      discount: book.discount,
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

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center text-4xl font-bold mb-12 tracking-tight'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300'>
            Book Collection
          </span>
        </h1>

        {/* Search and Sort Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-4'>
          <div className='w-full md:w-2/3'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search by title...'
                className='block w-full pl-12 pr-4 py-3 border-0 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className='flex items-center'>
            <span className='mr-3 text-gray-300 font-medium'>Sort by</span>
            <div className='relative'>
              <select
                className='block appearance-none bg-gray-800 border-0 text-white py-3 px-5 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200'
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option>Title A-Z</option>
                <option>Title Z-A</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400'>
                <ChevronDown className='h-4 w-4' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-8'>
          {/* Left Sidebar - Genre Filter */}
          <div className='w-full md:w-1/4 lg:w-1/5'>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sticky top-8'>
              <h2 className='text-xl font-semibold mb-6 border-b border-gray-700 pb-3'>
                Genres
              </h2>
              <ul className='space-y-1'>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedGenre === ''
                        ? 'bg-gray-700 text-white font-medium'
                        : 'hover:bg-gray-700/50 text-gray-300'
                    }`}
                    onClick={() => handleGenreSelect('')}
                  >
                    All Genres
                  </button>
                </li>
                {genres.map((genre) => (
                  <li key={genre}>
                    <button
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        selectedGenre === genre
                          ? 'bg-gray-700 text-white font-medium'
                          : 'hover:bg-gray-700/50 text-gray-300'
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                  {filteredAndSortedBooks.map((book) => (
                    <div
                      key={book.id}
                      className='group flex flex-col bg-gray-800/30 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-700/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer'
                      onClick={() => navigate(`/book-details/${book.id}`)} // Add this line
                    >
                      <div className='relative pb-[140%] overflow-hidden'>
                        <div className='absolute inset-0 bg-gray-700/50'>
                          <div className='w-full h-full flex items-center justify-center'>
                            <div className='w-full h-full absolute inset-0'>
                              <img
                                src={book.coverImage || '/placeholder.svg'}
                                alt={book.title}
                                className='w-full h-full object-cover transition-transform duration-500'
                              />
                            </div>
                          </div>
                        </div>
                        {/* Status Badge */}
                        <div className='absolute top-3 right-3'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              book.isAvailable
                                ? 'bg-emerald-900/80 text-emerald-100'
                                : 'bg-rose-900/80 text-rose-100'
                            }`}
                          >
                            {book.isAvailable ? 'Available' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      <div className='p-4 flex flex-col flex-grow'>
                        <h3 className='text-base font-medium line-clamp-2 mb-2 group-hover:text-gray-100 transition-colors'>
                          {book.title}
                        </h3>

                        {/* Price display */}
                        <div className='mt-auto'>
                          {book.discount > 1 ? (
                            <div className='flex items-center'>
                              <span className='text-sm line-through text-gray-400 mr-2'>
                                NPR {book.price.toFixed(2)}
                              </span>
                              <span className='text-sm font-medium text-white'>
                                NPR{' '}
                                {(
                                  book.price *
                                  (1 - book.discount.percentage / 100)
                                ).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className='text-sm font-medium'>
                              NPR {book.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-12'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center py-20 bg-gray-800/20 rounded-2xl'>
                <div className='text-5xl mb-4'>📚</div>
                <p className='text-xl font-medium text-gray-300'>
                  No books found
                </p>
                <p className='text-gray-400 mt-2'>
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
