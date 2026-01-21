import SearchBar from '../SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import styles from './App.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      setError(false);
      setMovies([]);

      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(results);
    } catch (error) {
      setError(true);
      toast.error('Failed to fetch movies. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movieId: number): void => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  };
  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      <main className={styles.main}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}

        {!isLoading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleMovieSelect} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
