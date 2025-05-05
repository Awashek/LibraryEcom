import React, { useState, useEffect } from 'react';
import Pagination from '../../components/common/Pagination';

const AllBooksPage = () => {
  // Sample books data
  const allBooks = [
    {
      id: 1,
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      coverImage:
        'https://m.media-amazon.com/images/I/91xWXZRx2hL._UF894,1000_QL80_.jpg',
      status: 'Available',
    },
    {
      id: 2,
      title: "Harry Potter And The Philosopher's Stone",
      author: 'J K Rowling',
      coverImage:
        'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      status: 'Available',
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
      status: 'Available',
    },
    {
      id: 4,
      title: 'The fault in our stars',
      author: 'John Green',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BYTA4ODg5YWUtYmZiYy00Y2M4LWE0NjEtODE5MzhkYmJmZGEwXkEyXkFqcGc@._V1_.jpg',
      status: 'Booked',
    },
    {
      id: 5,
      title: 'Nightmare Island',
      author: 'Shakirah Bourne',
      coverImage:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd',
      status: 'Booked',
    },
    {
      id: 6,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
      status: 'Available',
    },
    {
      id: 7,
      title: "Harry Potter And The Philosopher's Stone",
      author: 'J K Rowling',
      coverImage:
        'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      status: 'Available',
    },
    {
      id: 8,
      title: 'Nightmare Island',
      author: 'Shakirah Bourne',
      coverImage:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd',
      status: 'Booked',
    },
    {
      id: 9,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
      status: 'Available',
    },
    {
      id: 10,
      title: "Harry Potter And The Philosopher's Stone",
      author: 'J K Rowling',
      coverImage:
        'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      status: 'Available',
    },
    // Add more books to create multiple pages
    {
      id: 11,
      title: 'Nightmare Island',
      author: 'Shakirah Bourne',
      coverImage:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd',
      status: 'Booked',
    },
    {
      id: 12,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
      status: 'Available',
    },
    {
      id: 13,
      title: "Harry Potter And The Philosopher's Stone",
      author: 'J K Rowling',
      coverImage:
        'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      status: 'Available',
    },
    {
      id: 14,
      title: 'Nightmare Island',
      author: 'Shakirah Bourne',
      coverImage:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd',
      status: 'Booked',
    },
    {
      id: 15,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
      status: 'Available',
    },
    {
      id: 16,
      title: "Harry Potter And The Philosopher's Stone",
      author: 'J K Rowling',
      coverImage:
        'https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg',
      status: 'Available',
    },
  ];

  // State for search, sort, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Lastest Update');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const booksPerPage = 10;
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    let result = [...allBooks];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'Latest Update':
        // Assuming books are already sorted by latest first
        break;
      case 'Title A-Z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Title Z-A':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Author A-Z':
        result.sort((a, b) => a.author.localeCompare(b.author));
        break;
      default:
        break;
    }

    setFilteredBooks(result);
  }, [searchQuery, sortOption]); // Removed allBooks from dependencies

  // Get current books for current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

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
                onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {currentBooks.map((book) => (
            <div key={book.id} className='flex flex-col'>
              <div className='relative pb-[150%] overflow-hidden'>
                {/* Use placeholder images for demo */}
                <div className='absolute inset-0 bg-gray-700'>
                  <div className='w-full h-full flex items-center justify-center'>
                    <div className='text-center'>
                      {/* This div simulates the cover image */}
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
                    book.status === 'Available' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {book.status}
                </div>
              </div>
              <h3 className='mt-2 text-sm font-medium'>{book.title}</h3>
              <p className='text-xs text-gray-400'>{book.author}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllBooksPage;
