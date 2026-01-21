import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
    onSelect: (moviedId: number) => void;
    movies: Movie[];
}

export default function MovieGrid({onSelect, movies}: MovieGridProps) {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const handleClick = (movieId: number) => {
        onSelect(movieId)
    };

return (
    <ul className={css.grid}>
        {movies.map((movie) => (
            <li key={movie.id} onClick={() => handleClick(movie.id)}>
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>
        ))}
    </ul>
);
}