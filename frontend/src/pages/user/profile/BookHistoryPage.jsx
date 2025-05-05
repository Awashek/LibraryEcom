import React, { useState } from 'react';
import Pagination from '../../../components/common/Pagination';

const BooksHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5; // Show 5 books per page

  // Sample book history data
  const bookHistory = [
    {
      id: 1,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 2,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 3,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 4,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 5,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 6,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
    {
      id: 7,
      title: 'The History of a Difficult Child',
      rentedDate: '22 Aug 2023',
      returnDate: '29 Aug 2023',
      status: 'Returned',
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(bookHistory.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookHistory.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='pl-6'>
      <h1 className='text-5xl font-bold mb-6 p-8'>Books History</h1>

      <div className='w-full pl-8'>
        <div className='grid grid-cols-4 mb-4'>
          <div className='text-gray-800 font-medium'>Book Title</div>
          <div className='text-gray-800 font-medium'>Rented Date</div>
          <div className='text-gray-800 font-medium'>Return Date</div>
          <div className='text-gray-800 font-medium'>Status</div>
        </div>

        <div className='border-t border-gray-200'>
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className='grid grid-cols-4 py-6 border-b border-gray-200'
            >
              <div className='text-gray-800'>{book.title}</div>
              <div className='text-gray-600'>{book.rentedDate}</div>
              <div className='text-gray-600'>{book.returnDate}</div>
              <div className='text-gray-500'>{book.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6 flex justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BooksHistoryPage;
