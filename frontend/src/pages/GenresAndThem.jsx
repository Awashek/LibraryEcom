import React from 'react';
import { Link } from 'react-router-dom';

import book1 from '../assets/images/books/carnarygirls.jpg';
import book2 from '../assets/images/books/alicehoffman.jpg';
import book3 from '../assets/images/books/abc.jpg';
import book4 from '../assets/images/books/def.jpg';
import book5 from '../assets/images/books/ghi.jpg';

// Import all genre images
import biographyGenre from '../assets/images/genre/biographygenre.png';
import comedyGenre from '../assets/images/genre/comedygenre.png';
import fantasyGenre from '../assets/images/genre/fantasygenre.png';
import fictionGenre from '../assets/images/genre/fictiongenre.png';
import historyGenre from '../assets/images/genre/historygenre.png';
import horrorGenre from '../assets/images/genre/horrorgenre.png';
import mysteryGenre from '../assets/images/genre/mysterygenre.png';
import romanceGenre from '../assets/images/genre/romance.png';
import scienceGenre from '../assets/images/genre/sciencegenre.png';

const GenresAndTheme = () => {
  // Book data
  const books = [
    {
      id: 1,
      image: book1,
      title: "Carnary Girls",
      author: "Mihret Sibhat",
      status: "Available"
    },
    {
      id: 2,
      image: book2,
      title: "The Invisible Hour",
      author: "Mihret Sibhat",
      status: "Available"
    },
    {
      id: 3,
      image: book3,
      title: "A Visit from the Goon Squad",
      author: "Mihret Sibhat",
      status: "Available"
    },
    {
      id: 4,
      image: book4,
      title: "The Thousands Autumns",
      author: "Mihret Sibhat",
      status: "Available"
    },
    {
      id: 5,
      image: book5,
      title: "The Tiger's Wife",
      author: "Mihret Sibhat",
      status: "Booked"
    }
  ];

  // Genre data
  const genres = [
    {
      id: 1,
      image: biographyGenre,
      title: "Biography",
      bookCount: "50 books"
    },
    {
      id: 2,
      image: comedyGenre,
      title: "Comedy",
      bookCount: "50 books"
    },
    {
      id: 3,
      image: fantasyGenre,
      title: "Fantasy",
      bookCount: "50 books"
    },
    {
      id: 4,
      image: fictionGenre,
      title: "Fiction",
      bookCount: "50 books"
    },
    {
      id: 5,
      image: historyGenre,
      title: "History",
      bookCount: "50 books"
    },
    {
      id: 6,
      image: horrorGenre,
      title: "Horror",
      bookCount: "50 books"
    },
    {
      id: 7,
      image: mysteryGenre,
      title: "Mystery",
      bookCount: "50 books"
    },
    {
      id: 8,
      image: romanceGenre,
      title: "Romance",
      bookCount: "50 books"
    },
    {
      id: 9,
      image: scienceGenre,
      title: "Science",
      bookCount: "50 books"
    }
  ];

 

  return (
    <div className="bg-[#1E1E1E] pt-[92px] min-h-screen ">
      {/* All Books Section */}
      <section className="mx-[0px] px-[120px]">
        <div className="mb-12">
          <div className="flex justify-between items-center text-white mb-11">
            <Link to="/allbooks">
              <h2 className="font-rubik text-2xl font-bold">ALL BOOKS</h2>
            </Link>
            
            <div className="flex items-center gap-2 group cursor-pointer">
              <Link to="/allbooks" className="text-white text-lg underline group-hover:text-[#0077ff] transition-colors">
                See All
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                className="stroke-white group-hover:stroke-[#0077ff] transition-colors">
                <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-4">
          {books.map((book) => (
              <Link key={book.id} to="/bookdetails" className="flex-shrink-0 group">
                <div className="w-full">
                  <div className="relative overflow-hidden rounded shadow-lg">
                    <img
                      src={book.image}
                      alt={`${book.title} cover`}
                      className="h-[425px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className={`m-0 px-3 py-1 inline-flex items-center justify-center text-white text-xs font-medium absolute bottom-2 left-2 z-10 rounded ${
                      book.status === "Available" ? "bg-[#5CA202]" : "bg-[#C22A34]"
                    }`}>
                      {book.status}
                    </p>
                  </div>
                  <div className="text-white mt-3">
                    <p className="text-lg font-medium mb-1 group-hover:text-[#0077ff] transition-colors">{book.title}</p>
                    <p className="text-sm text-gray-300">{book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Genre and Themes Section */}
<section className="w-screen bg-white py-12 px-[120px]">
  <div className=" sm:px-4">
    <div className="text-center mb-14">
      <h2 className="text-black text-3xl font-bold">GENRE & THEMES</h2>
    </div>
    <div className="flex justify-center">
      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {genres.map((genre) => (
          <Link key={genre.id} to="/categories" className="group">
            <div className="flex flex-col items-center">
              <div className="w-full h-fit p-2 border-2 border-dashed border-gray-600 rounded-[400px] group-hover:border-[#0077ff] transition-all">
                <div className="w-full h-full rounded-[400px] overflow-hidden">
                  <img
                    src={genre.image}
                    alt={genre.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xl text-black font-medium group-hover:text-[#0077ff] transition-colors">
                  {genre.title}
                </p>
                <p className="text-sm text-gray-400 mt-1">-{genre.bookCount}-</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default GenresAndTheme;