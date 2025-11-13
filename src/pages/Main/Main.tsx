import { useFetchPopularMoviesQuery } from "@/features/api/tmdbApi.ts";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { TMDBMovie } from "@/features/api/tmdbApi.types.ts";
import s from './Main.module.css';
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const [randomMovie, setRandomMovie] = useState<TMDBMovie | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { data } = useFetchPopularMoviesQuery();

    useEffect(() => {
        if (data?.results) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setRandomMovie(data.results[randomIndex]);
        }
    }, [data]);


    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };


    const handleViewMore = () => {
        navigate('/category?type=popular');
    };



    return (
        <div className={s.container}>

            <section
                className={s.welcomeSection}
                style={{
                    backgroundImage: randomMovie?.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path})`
                        : 'none',
                }}
            >
                <div className={s.overlay}></div>

                <div className={s.welcomeContent}>
                    <h1 className={s.title}>Welcome to MovieDB</h1>
                    <p className={s.subtitle}>Now playing: {randomMovie?.title}</p>

                    <form onSubmit={handleSearchSubmit} className={s.searchForm}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInput}
                            placeholder="Search for movies..."
                            className={s.searchInput}
                        />
                        <button
                            type="submit"
                            className={s.searchButton}
                            disabled={!searchQuery.trim()}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>


            <section className={s.mainContent}>
                <div className={s.sectionHeader}>
                    <h2 className={s.sectionTitle}>Popular Movies</h2>
                    <button
                        className={s.viewMoreButton}
                        onClick={handleViewMore}
                    >
                        View More
                    </button>
                </div>

                <div className={s.moviesGrid}>
                    {data?.results.slice(0, 6).map((movie) => (
                        <article key={movie.id} className={s.movieCard}>
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className={s.moviePoster}
                                    loading="lazy"
                                />
                            ) : (
                                <div className={s.posterPlaceholder}>
                                    No Image
                                </div>
                            )}


                            <div
                                className={`${s.movieRatingOverlay} ${
                                    movie.vote_average >= 7 ? s.high :
                                        movie.vote_average >= 5 ? s.medium : s.low
                                }`}
                            >
                                {movie.vote_average.toFixed(1)}
                            </div>
                            <div className={s.movieInfo}>
                                <h3 className={s.movieTitle}>{movie.title}</h3>
                                <div className={s.movieRating}>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};