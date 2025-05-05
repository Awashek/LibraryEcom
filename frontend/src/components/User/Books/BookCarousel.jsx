import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';
const BookCarousel = ({ title, books, showGenreFilter = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const booksPerView = 2;
    const maxIndex = Math.max(books.length - booksPerView, 0);

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                {showGenreFilter && (
                    <div className="relative">
                        <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <option>Choose a genre</option>
                            <option>Fiction</option>
                            <option>Non-Fiction</option>
                            <option>Science Fiction</option>
                            <option>Biography</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative overflow-hidden">
                <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / booksPerView)}%)` }}
                >
                    {books.map((book, index) => (
                        <div 
                            key={index} 
                            className="w-full px-2"
                            style={{ flex: `0 0 ${100 / booksPerView}%` }}
                        >
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                {books.length > booksPerView && (
                    <>
                        {currentIndex > 0 && (
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                                aria-label={`Previous ${title.toLowerCase()}`}
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        )}

                        {currentIndex < maxIndex && (
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                                aria-label={`Next ${title.toLowerCase()}`}
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookCarousel;