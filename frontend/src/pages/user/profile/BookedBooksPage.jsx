import React, { useState } from 'react';

const BookedBooksPage = () => {
    const [bookTitle, setBookTitle] = useState('The History of a Difficult Child');
    const [rentingDate, setRentingDate] = useState('22/08/2023');
    const [dueDate, setDueDate] = useState('22/08/2023');

    const handleSave = () => {
        console.log('Saved book:', { bookTitle, rentingDate, dueDate });
    };

    const handleCancel = () => {
        console.log('Canceled');
    };

    return (
        <div className='pl-8'>
            <h1 className="text-5xl font-bold mb-2 p-8">Booked Books</h1>

            <div className="p-8">
                <div className="mb-8">
                    <label className="block text-gray-500 mb-2">Book Title</label>
                    <div className="text-2xl font-medium text-gray-800">{bookTitle}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-gray-500 mb-2">Renting Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={rentingDate}
                                onChange={(e) => setRentingDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 text-gray-800"
                            />
                            <div className="absolute right-3 top-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-500 mb-2">Due Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 text-gray-800"
                            />
                            <div className="absolute right-3 top-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={handleSave}
                        className="px-8 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-8 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookedBooksPage;