import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded"
        >
          Previous
        </button>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === page
              ? 'bg-white text-gray-900'
              : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;