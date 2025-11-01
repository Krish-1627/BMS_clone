
import React, { useContext } from 'react';
import PosterSlider from '../components/PosterSlider.tsx';
import MovieCard from '../components/MovieCard.tsx';
import { MovieContext } from '../context/MovieContext.tsx';

const HomePage: React.FC = () => {
  const context = useContext(MovieContext);
  const movies = context?.movies || [];
  
  if (movies.length === 0) {
      return <div className="text-center p-10">Loading movies...</div>
  }

  return (
    <div className="space-y-12">
      <PosterSlider movies={movies} />
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Now Showing</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;