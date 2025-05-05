import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex">
            <div className="w-1/3 mr-4">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto object-cover rounded"
                />
            </div>
            <div className="w-2/3">
                {/* For Top Sellers */}
                {book.subtitle && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-800 uppercase">{book.title}</h3>
                        <h4 className="text-md font-medium text-gray-700 mb-2">{book.subtitle}</h4>
                    </>
                )}
                
                {/* For Recommended */}
                {!book.subtitle && (
                    <>
                        <p className="text-sm font-medium text-gray-700 mb-1 uppercase">{book.author}</p>
                        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    </>
                )}
                
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${book.price}</span>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                        Add to basket
                    </button>
                </div>
                {book.author && book.subtitle && (
                    <p className="mt-2 text-xs text-gray-500 uppercase">{book.author}</p>
                )}
            </div>
        </div>
    );
};

export default BookCard;