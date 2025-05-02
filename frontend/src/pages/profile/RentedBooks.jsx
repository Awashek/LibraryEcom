import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

const RentedBooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4; // Changed to 5 to match others
    
    const rentedBooks = [
        {
            id: 1,
            title: 'The History of a Difficult',
            rentedDate: '22 Aug 2023',
            returnDate: '29 Aug 2023',
            status: 'Borrowed'
        },
        {
            id: 2,
            title: 'The History of a Difficult Child',
            rentedDate: '22 Aug 2023',
            returnDate: '29 Aug 2023',
            status: 'Borrowed'
        },
        {
            id: 3,
            title: 'The History of a Difficult Child',
            rentedDate: '22 Aug 2023',
            returnDate: '29 Aug 2023',
            status: 'Delayed'
        },
        {
            id: 4,
            title: 'The History of a Difficult Child',
            rentedDate: '22 Aug 2023',
            returnDate: '29 Aug 2023',
            status: 'Extended'
        },
        {
            id: 5,
            title: 'The History of a Difficult Child',
            rentedDate: '22 Aug 2023',
            returnDate: '29 Aug 2023',
            status: 'Extended'
        }
    ];

    // Calculate pagination
    const totalPages = Math.ceil(rentedBooks.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = rentedBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Borrowed':
                return 'text-green-600';
            case 'Delayed':
                return 'text-red-600';
            case 'Extended':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div>
            <h1 className="text-5xl font-bold mb-6 p-8">Rented Books</h1>

            <div className="w-full pl-8">
                <div className="grid grid-cols-4 mb-4">
                    <div className="text-gray-800 font-medium">Book Title</div>
                    <div className="text-gray-800 font-medium">Rented Date</div>
                    <div className="text-gray-800 font-medium">Return Date</div>
                    <div className="text-gray-800 font-medium">Status</div>
                </div>

                <div className="border-t border-gray-200">
                    {currentBooks.map((book) => (
                        <div key={book.id} className="grid grid-cols-4 py-6 border-b border-gray-200">
                            <div className="text-gray-800">{book.title}</div>
                            <div className="text-gray-600">{book.rentedDate}</div>
                            <div className="text-gray-600">{book.returnDate}</div>
                            <div className={getStatusColor(book.status)}>{book.status}</div>
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

export default RentedBooks;