import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ReadesOnSale = () => {
    const navigate = useNavigate();

    // Books data for Reads On Sale section
    const [readesOnSale, setReadesOnSale] = useState([
        {
            id: 1,
            title: "The History of a Difficult Child",
            author: "Mihret Sibhat",
            cover: "https://m.media-amazon.com/images/I/91xWXZRx2hL._UF894,1000_QL80_.jpg",
            status: "Available"
        },
        {
            id: 2,
            title: "Harry Potter And The Philosopher's Stone",
            author: "J K Rowling",
            cover: "https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg",
            status: "Booked"
        },
        {
            id: 3,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            cover: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg",
            status: "Available"
        },
        {
            id: 4,
            title: "The fault in our stars",
            author: "John Green",
            cover: "https://m.media-amazon.com/images/M/MV5BYTA4ODg5YWUtYmZiYy00Y2M4LWE0NjEtODE5MzhkYmJmZGEwXkEyXkFqcGc@._V1_.jpg",
            status: "Booked"
        },
        {
            id: 5,
            title: "The Gorge",
            author: "Zach Dean",
            cover: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd",
            status: "Available"
        },
    ]);

    useEffect(() => {
        console.log("Reads On Sale component mounted");
    }, []);

    const handleAllBooksClick = () => {
        navigate('/allbooks');
    };

    return (
        <div className='bg-white pt-[50px]'>
            {/* Reads On Sale Section */}
            <section className='mx-[0px] px-[120px]'>
                <div className='mb-6'>
                    <div className='flex justify-between items-center mb-8'>
                        <div className='w-full'>
                            <h2 className='font-rubik text-4xl text-center'>READS ON SALE</h2>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-4'>
                        {readesOnSale.map((book) => (
                            <Link
                                key={book.id}
                                to='/bookdetails'
                                className='flex-shrink-0 group'
                            >
                                <div className='w-full'>
                                    <div className='relative overflow-hidden rounded shadow-lg'>
                                        <img
                                            src={book.cover}
                                            alt={`${book.title} cover`}
                                            className='h-[425px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                                        />
                                        <p
                                            className={`m-0 px-3 py-1 inline-flex items-center justify-center text-white text-xs font-medium absolute bottom-2 left-2 z-10 rounded ${book.status === 'Available'
                                                    ? 'bg-[#5CA202]'
                                                    : 'bg-[#C22A34]'
                                                }`}
                                        >
                                            {book.status}
                                        </p>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='text-lg font-medium mb-1 group-hover:text-[#0077ff] transition-colors'>
                                            {book.title}
                                        </p>
                                        <p className='text-sm text-gray-600'>{book.author}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReadesOnSale;