
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types.ts';
import { MovieContext } from '../context/MovieContext.tsx';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const context = useContext(MovieContext);

  useEffect(() => {
    if (context && context.movies.length > 0) {
      const foundMovie = context.movies.find(m => m.id === id);
      setMovie(foundMovie || null);
    }
  }, [id, context]);

  if (!context || context.movies.length === 0) {
    return <div className="text-center text-xl">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center text-xl">Movie not found.</div>;
  }
  
  const { startBooking } = context;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 -mt-8 -mx-4 rounded-b-lg overflow-hidden">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bms-dark via-bms-dark/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 flex items-end space-x-6">
          <img src={movie.poster} alt={`${movie.title} Poster`} className="w-32 rounded-lg shadow-xl hidden md:block" />
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-300">
              <span>{movie.duration} min</span>
              <span>&bull;</span>
              <span>{movie.genres.join(', ')}</span>
              <span>&bull;</span>
              <span>{movie.language}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-2">About the movie</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
      </div>

      {/* Showtimes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Showtimes</h2>
        <div className="bg-bms-charcoal p-4 rounded-lg">
          {movie.showtimes.map(showtime => (
            <div
              key={showtime.id}
              data-test={`showtime-${showtime.id}`}
              className="flex justify-between items-center p-4 border-b border-bms-gray last:border-b-0"
            >
              <div>
                <p className="text-lg font-bold">{new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-gray-400">{showtime.screen}</p>
              </div>
              <div className="flex items-center space-x-4">
                 <p className="font-bold text-lg">₹{showtime.price}</p>
                 <button 
                    onClick={() => startBooking(movie, showtime)}
                    className="bg-bms-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
                    Book Tickets
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;