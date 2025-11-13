import { useFetchPopularMoviesQuery } from "@/features/api/tmdbApi.ts";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type { TMDBMovie } from "@/features/api/tmdbApi.types.ts";
import s from './Main.module.css';
import {useNavigate} from "react-router"; // Импорт стилей

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

    const onSearchQueryHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    }

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/search?query =${encodeURIComponent(searchQuery)}`);
        }
    }

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
                            value={searchQuery}
                            onChange={onSearchQueryHandler}
                            placeholder="Search for movies..."
                            className={s.searchInput}
                        />
                        <button
                            type="submit"
                            className={s.searchButton}
                        >
                            Search
                        </button>
                    </form>
                </div>

            </section>

            <div className={s.mainContent}>
                <h2 className={s.mainTitle}>Main Content</h2>
            </div>
        </div>
    );
};