import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Movie, Showtime } from '../types.ts';

interface MovieContextType {
  movies: Movie[];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  startBooking: (movie: Movie, showtime: Showtime) => void;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch from backend instead of local JSON
        const response = await fetch('http://localhost:4000/api/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data as Movie[]);
      } catch (error) {
        console.error("Could not fetch movies from backend:", error);
      }
    };

    fetchMovies();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setSelectedShowtime(null);
  };

  const startBooking = (movie: Movie, showtime: Showtime) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    openModal();
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        isModalOpen,
        openModal,
        closeModal,
        selectedMovie,
        selectedShowtime,
        startBooking,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
