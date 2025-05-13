import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import biographyGenre from '../../../assets/images/genre/biographygenre.png';
import comedyGenre from '../../../assets/images/genre/comedygenre.png';
import fantasyGenre from '../../../assets/images/genre/fantasygenre.png';
import fictionGenre from '../../../assets/images/genre/fictiongenre.png';
import historyGenre from '../../../assets/images/genre/historygenre.png';
import horrorGenre from '../../../assets/images/genre/horrorgenre.png';
import mysteryGenre from '../../../assets/images/genre/mysterygenre.png';
import romanceGenre from '../../../assets/images/genre/romance.png';
import scienceGenre from '../../../assets/images/genre/sciencegenre.png';
import educationGenre from '../../../assets/images/genre/educationgenre.png';
import nonfictionGenre from '../../../assets/images/genre/nonfictiongenre.png';
import thrillerGenre from '../../../assets/images/genre/thrillergenre.png';
import { useNavigate } from 'react-router-dom';

const PopularGenresSlider = () => {
  const genres = [
    {
      id: 1,
      image: biographyGenre,
      title: 'Biography',
      bookCount: '50 books',
    },
    {
      id: 2,
      image: thrillerGenre,
      title: 'Thriller',
      bookCount: '50 books',
    },
    {
      id: 3,
      image: fantasyGenre,
      title: 'Fantasy',
      bookCount: '50 books',
    },
    {
      id: 4,
      image: fictionGenre,
      title: 'Fiction',
      bookCount: '50 books',
    },
    {
      id: 5,
      image: historyGenre,
      title: 'History',
      bookCount: '50 books',
    },
    {
      id: 6,
      image: horrorGenre,
      title: 'Horror',
      bookCount: '50 books',
    },
    {
      id: 7,
      image: mysteryGenre,
      title: 'Mystery',
      bookCount: '50 books',
    },
    {
      id: 8,
      image: romanceGenre,
      title: 'Romance',
      bookCount: '50 books',
    },
    {
      id: 9,
      image: scienceGenre,
      title: 'ScienceFiction',
      bookCount: '50 books',
    },
    {
      id: 10,
      image: educationGenre,
      title: 'Education',
      bookCount: '50 books',
    },
    {
      id: 11,
      image: nonfictionGenre,
      title: 'NonFiction',
      bookCount: '50 books',
    },
  ];

  // State for slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();

  // Number of genres to show at once (based on screen size)
  const [itemsToShow, setItemsToShow] = useState(5);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsToShow(5);
      } else if (window.innerWidth >= 1024) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 640) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slider navigation functions
  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow < genres.length ? prevIndex + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : genres.length - itemsToShow
    );
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      next();
    }
    if (touchStart - touchEnd < -75) {
      prev();
    }
  };

  // Get visible genres
  const visibleGenres = () => {
    const end = Math.min(currentIndex + itemsToShow, genres.length);
    if (currentIndex + itemsToShow > genres.length) {
      // Wrap around
      return [
        ...genres.slice(currentIndex),
        ...genres.slice(0, itemsToShow - (genres.length - currentIndex)),
      ];
    }
    return genres.slice(currentIndex, end);
  };

  return (
    <section className='w-full bg-white py-12 px-4 md:px-8 lg:px-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-black text-4xl tracking-wider'>GENRE & THEMES</h2>
        </div>

        <div
          className='relative'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider navigation arrows */}
          <button
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors hidden md:block'
            onClick={prev}
            aria-label='Previous genres'
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors hidden md:block'
            onClick={next}
            aria-label='Next genres'
          >
            <ChevronRight size={24} />
          </button>

          {/* Genres slider */}
          <div className='flex justify-center overflow-hidden w-full'>
            <div
              className='flex transition-transform duration-300 ease-in-out gap-6 w-full'
              style={{
                transform: `translateX(0)`,
                justifyContent: 'center',
              }}
            >
              {visibleGenres().map((genre) => (
                <a
                  key={genre.id}
                  className='group flex-shrink-0'
                  style={{
                    width: `calc((100% - ${
                      (itemsToShow - 1) * 1.5
                    }rem) / ${itemsToShow})`,
                  }}
                  onClick={() =>
                    navigate(`/genre/${genre.title.toLowerCase()}`)
                  }
                >
                  <div className='flex flex-col items-center'>
                    <div className='w-full aspect-square p-2 border-2 border-dashed border-gray-600 rounded-full group-hover:border-blue-500 transition-all'>
                      <div className='w-full h-full rounded-full overflow-hidden'>
                        <img
                          src={genre.image}
                          alt={genre.title}
                          className='w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-300'
                        />
                      </div>
                    </div>
                    <div className='mt-4 text-center'>
                      <p className='text-xl text-black font-medium group-hover:text-blue-500 transition-colors'>
                        {genre.title}
                      </p>
                      <p className='text-sm text-gray-400 mt-1'>
                        -{genre.bookCount}-
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Slider dots/indicators */}
        <div className='flex justify-center mt-8 gap-2'>
          {Array.from({
            length: Math.min(genres.length - itemsToShow + 1, 5),
          }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex % (genres.length - itemsToShow + 1)
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularGenresSlider;
