import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../../utils/axios/useAxios';

const ReadesOnSale = () => {
    const navigate = useNavigate();

    const { data: booksData } = useAxios(`book?pageNumber=1&pageSize=50&search=`);
    const [readesOnSale, setReadesOnSale] = useState([]);

    console.log(booksData, "booksData");

    useEffect(() => {
    if (booksData?.result?.length > 0) {
        // Shuffle and select 5 random books
        const shuffled = [...booksData.result].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        // Format each book
        const formatted = selected.map(book => ({
            id: book.id,
            title: book.title,
            author: book.authors?.map(a => a.name).join(", ") || "Unknown Author",
            cover: book.coverImage
                ? `http://localhost:7226/images/${book.coverImage}`
                : "/placeholder.svg",
            status: book.isAvailable ? "Available" : "Booked",
        }));

        setReadesOnSale(formatted);
    }
}, [booksData]);


    return (
        <div className='bg-white pt-[50px]'>
            <section className='mx-[0px] px-[120px]'>
                <div className='mb-6'>
                    <div className='flex justify-between items-center mb-8'>
                        <div className='w-full'>
                            <h2 className='font-rubik text-4xl text-center'>RECOMMENDED READS</h2>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-4'>
                        {readesOnSale.map((book) => (
                            <Link
                                key={book.id}
                                to={`/book-details/${book.id}`}
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
