import React from 'react';
import BookCarousel from './BookCarousel';
const TopSellers = () => {
    const books = [
        {
            image: "../images/placeholder-book.jpg",
            title: "THE TIME HAS COME",
            subtitle: "The Time Has Come",
            description: "Lindbergh's Pharmacy is an Athens, Georgia. Institution...",
            price: 27.89,
            author: "MILL LEITCH"
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "I WANT A BETTER CATASTROPHE",
            subtitle: "I Want a Better Catastrophe...",
            description: "With global warming projected to rocket past the...",
            price: 26.99,
            author: "ANDREW BOYD"
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "ANOTHER TOP SELLER",
            subtitle: "Another Great Book",
            description: "This is another popular book description...",
            price: 24.99,
            author: "JANE DOE"
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "BESTSELLER FOUR",
            subtitle: "Fourth Best Seller",
            description: "Description for the fourth bestselling book...",
            price: 22.99,
            author: "JOHN SMITH"
        }
    ];

    return <BookCarousel title="Top Sellers" books={books} showGenreFilter={true} />;
};

export default TopSellers;