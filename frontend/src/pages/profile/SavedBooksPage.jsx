import React, { useState } from 'react';
import Pagination from '../../components/common/Pagination';

const SavedBooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  
  const savedBooks = [
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Available'
    },
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Available'
    },
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Available'
    },
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Available'
    },
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Unavailable'
    },
    {
      title: 'The History of a Difficult Child',
      author: 'Mihret Sibhat',
      status: 'Unavailable'
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(savedBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = savedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='pl-6'>
      <h1 className="text-5xl font-bold mb-6 p-8">Saved Books</h1>

      <div className="w-full pl-8">
        <div className="grid grid-cols-4 mb-4">
          <div className="text-gray-800 font-medium">Book Title</div>
          <div className="text-gray-800 font-medium">Author Name</div>
          <div className="text-gray-800 font-medium">Book Status</div>
          <div className="text-gray-800 font-medium">Actions</div>
        </div>

        <div className="border-t border-gray-200">
          {currentBooks.map((book, index) => (
            <div key={index} className="grid grid-cols-4 py-6 border-b border-gray-200">
              <div className="text-gray-800">{book.title}</div>
              <div className="text-gray-600">{book.author}</div>
              <div className={`${book.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                {book.status}
              </div>
              <div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SavedBooksPage;