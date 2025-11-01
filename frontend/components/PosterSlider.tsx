
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types.ts';

interface PosterSliderProps {
  movies: Movie[];
}

const PosterSlider: React.FC<PosterSliderProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);
  
  if (movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl mb-12">
      <Link to={`/movie/${currentMovie.id}`}>
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bms-dark via-bms-dark/50 to-transparent"></div>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
          <h2 className="text-2xl md:text-4xl font-bold">{currentMovie.title}</h2>
          <p className="text-sm md:text-md mt-2 max-w-lg hidden md:block">{currentMovie.overview.substring(0, 150)}...</p>
        </div>
      </Link>
       <div className="absolute bottom-4 right-4 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-bms-red' : 'bg-white/50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PosterSlider;