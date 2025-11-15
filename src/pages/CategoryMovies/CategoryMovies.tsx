import {
    useFetchNowPlayingQuery,
    useFetchPopularMoviesQuery,
    useFetchTopRatedQuery,
    useFetchUpcomingQuery
} from "@/features/api/tmdbApi.ts";
import s from "./CategoryMovies.module.css";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {categoriesTitle} from "@/features/api/tmdbApi.types.ts";
import {useEffect, useState} from "react";
import {Pagination} from "@/common";

import {MOVIE_CATEGORIES} from "@/features";
import {RATING_THRESHOLDS} from "@/shared";

export const CategoryMovies = () => {

    const navigate = useNavigate();
    const {type = 'popular'} = useParams()
    const [page, setPage] = useState(1);

    const {data:dataPopular} = useFetchPopularMoviesQuery(page,{skip: type !== 'popular'});
    const {data:dataNowPlaying} = useFetchNowPlayingQuery(page,{skip: type !== 'dataNowPlaying'})
    const {data:dataUpcoming} = useFetchUpcomingQuery(page,{skip: type !== 'upcoming'})
    const {data:dataTopRated} = useFetchTopRatedQuery(page,{skip: type !== 'dataTopRated'})


    let data;
    switch (type) {
        case "popular":
            data = dataPopular
            break;
        case "top-rated":
            data = dataTopRated
            break;
        case 'upcoming':
            data = dataUpcoming
            break;
        case 'now-playing':
            data = dataNowPlaying
            break;
        default:
            data = dataPopular
    }



    useEffect(() => {
        setPage(1)
    }, [type]);

    return (
        <div className={s.container}>

            <nav className={s.navigation}>
            {MOVIE_CATEGORIES.map((category) => (
                <button
                key={category.key}
                onClick={() => navigate(`/category/${category.key}`)}
                className={`${s.navButton} ${type === category.key ? s.active: ''}`}>
                    {category.label}
                </button>
            ))}
            </nav>

            <h1 className={s.categoryTitle}>{categoriesTitle[type]}</h1>
            <div className={s.moviesGrid}>
                {data?.results.map((movie) => (
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
                                movie.vote_average >= RATING_THRESHOLDS.HIGH ? s.high :
                                    movie.vote_average >= RATING_THRESHOLDS.MEDIUM ? s.medium : s.low
                            }`}
                        >
                            {movie.vote_average.toFixed(1)}
                        </div>
                        <div className={s.movieInfo}>
                            <h3 className={s.movieTitle}>{movie.title}</h3>
                        </div>
                    </article>
                ))}
            </div>
            <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1}/>
        </div>
    )
}