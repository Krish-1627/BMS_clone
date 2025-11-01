
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types.ts';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div data-test={`movie-card-${movie.id}`} className="bg-bms-charcoal rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
      <Link to={`/movie/${movie.id}`} data-test={`movie-link-${movie.id}`}>
        <img src={movie.poster} alt={`${movie.title} Poster`} className="w-full h-auto object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.genres.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;