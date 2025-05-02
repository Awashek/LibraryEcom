import { useState } from 'react';
import { Bookmark } from 'lucide-react';

export default function Wishlist() {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        },
        {
            id: 2,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        },
        {
            id: 3,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        },
        {
            id: 4,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        },
        {
            id: 5,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        },
        {
            id: 6,
            title: "The Time Has Come",
            author: "Will Leitch",
            institution: "Lindbergh's Pharmacy is an Athens, Georgia, institution",
            price: 27.89,
            coverImage: "../images/placeholder-book.jpg",
            inWishlist: true
        }
    ]);

    const addToCart = (id) => {
        console.log(`Added book ${id} to cart`);
    };

    const toggleWishlist = (id) => {
        setBooks(books.map(book =>
            book.id === id ? { ...book, inWishlist: !book.inWishlist } : book
        ));
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-navy-900 mb-8">Your Wishlist</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="border rounded-md p-4 bg-white relative">
                        <button
                            className="absolute top-4 right-4 z-10"
                            onClick={() => toggleWishlist(book.id)}
                        >
                            <Bookmark
                                fill={book.inWishlist ? "black" : "none"}
                                className="text-black"
                                size={24}
                            />
                        </button>

                        <div className="mb-3">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-64 object-cover rounded"
                            />
                        </div>

                        <h3 className="font-bold text-lg mb-1">{book.title}</h3>

                        <p className="text-gray-600 text-sm mb-4">
                            {book.institution}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">$ {book.price}</span>
                            <button
                                onClick={() => addToCart(book.id)}
                                className="bg-gray-800 text-white px-4 py-2 rounded text-sm"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

