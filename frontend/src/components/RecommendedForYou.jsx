import React from 'react';
import BookCarousel from './BookCarousel';
const RecommendedForYou = () => {
    const books = [
        {
            image: "../images/placeholder-book.jpg",
            title: "Pride and Protest",
            author: "NIKKI PAYNE",
            description: "A woman goes head-to-head with the CEO of...",
            price: 15.50
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "Forget a Mentor, Find...",
            author: "SYLVIA ANN HEWLETT",
            description: "In this powerful yet practical book, economist and...",
            price: 29.99
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "The Alchemist",
            author: "PAULO COELHO",
            description: "A magical story about following your dreams...",
            price: 19.99
        },
        {
            image: "../images/placeholder-book.jpg",
            title: "Atomic Habits",
            author: "JAMES CLEAR",
            description: "Tiny changes, remarkable results...",
            price: 24.75
        }
    ];

    return <BookCarousel title="Recommended for you" books={books} />;
};

export default RecommendedForYou;