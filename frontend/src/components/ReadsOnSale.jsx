import React from 'react';

const ReadsOnSale = () => {
  const books = [
    {
      id: 1,
      title: "The History of a Difficult Child",
      author: "Mihret Sibhat",
      image: "https://m.media-amazon.com/images/I/91xWXZRx2hL._UF894,1000_QL80_.jpg",
      status: "Available"
    },
    {
      id: 2,
      title: "Harry Potter And The Philosopher's Stone",
      author: "J K Rowling",
      image: "https://images.justwatch.com/poster/87608067/s718/harry-potter-and-the-philosophers-stone.jpg",
      status: "Available",
      hasAudio: true
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg",
      status: "Available"
    },
    {
      id: 4,
      title: "The fault in our stars",
      author: "John Green",
      image: "https://m.media-amazon.com/images/M/MV5BYTA4ODg5YWUtYmZiYy00Y2M4LWE0NjEtODE5MzhkYmJmZGEwXkEyXkFqcGc@._V1_.jpg",
      status: "Booked"
    },
    {
      id: 5,
      title: "Nightmare Island",
      author: "Shakirah Bourne",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVhs0zWJkL9afwN2gqJJ3vtmX4yJVAeZchddbahTVkHzCi9fyKtXwj0OEcznWUsFRn_VKd",
      status: "Booked"
    }
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <h2 className="text-3xl font-normal text-center mb-12 tracking-wider">READS ON SALE</h2>
      
      <div className="flex flex-wrap justify-center gap-8">
        {books.map((book) => (
          <div key={book.id} className="w-48">
            <div className="relative mb-3">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-64 object-cover"
              />
              <div className={`absolute bottom-0 left-0 px-2 py-1 text-white text-sm ${book.status === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}>
                {book.status}
              </div>
              {book.hasAudio && (
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-4.242a1 1 0 010 1.414m2.828-2.828a1 1 0 010 1.414" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="font-medium text-base">{book.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadsOnSale;