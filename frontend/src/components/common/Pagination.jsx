import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        {currentPage > 1 && (
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
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
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-700 border hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        {currentPage < totalPages && (
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          >
            Next
          </button>
        )}
      </div>
    );
};

export default Pagination;