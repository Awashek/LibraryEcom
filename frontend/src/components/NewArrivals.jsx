import { useState, useEffect } from 'react';

const NewArrivals = () => {
    // Books data for New Arrivals section
    const [newArrivals, setNewArrivals] = useState([
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
        console.log("New Arrivals component mounted");
    }, []);

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-3xl font-normal text-center mb-12 tracking-wider">
                    NEW ARRIVALS
                </h2>

                {/* Book Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {newArrivals.map((book) => (
                        <div key={book.id} className="flex flex-col">
                            {/* Book Cover with Status Badge */}
                            <div className="relative mb-3 aspect-[2/3] w-full overflow-hidden">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-full h-full object-cover rounded-sm shadow-sm"
                                />
                                <div className={`absolute bottom-0 left-0 py-1 px-3 text-white text-sm ${book.status === "Available" ? "bg-green-600" : "bg-red-600"
                                    }`}>
                                    {book.status}
                                </div>
                            </div>

                            {/* Book Title */}
                            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                {book.title}
                            </h3>

                            {/* Author Name */}
                            <p className="text-gray-600 text-sm">
                                {book.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;