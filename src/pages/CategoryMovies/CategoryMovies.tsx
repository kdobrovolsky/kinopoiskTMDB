import {
    useFetchNowPlayingQuery,
    useFetchPopularMoviesQuery,
    useFetchTopRatedQuery,
    useFetchUpcomingQuery
} from "@/features/api/tmdbApi.ts";
import s from "@/pages/Main/Main.module.css";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {categoriesTitle} from "@/features/api/tmdbApi.types.ts";

export const CategoryMovies = () => {

    const navigate = useNavigate();
    const {type = 'popular'} = useParams()
    const currentType = type || "popular";

    const dataPopular = useFetchPopularMoviesQuery().data
    const dataNowPlaying = useFetchNowPlayingQuery().data
    const dataUpcoming = useFetchUpcomingQuery().data
    const dataTopRated = useFetchTopRatedQuery().data


    let data;
    if(currentType === "popular") {
        data = dataPopular
    }else if(currentType === "top-rated") {
        data = dataTopRated
    }else if(currentType === "upcoming") {
        data = dataUpcoming
    }else if(currentType === "now-playing") {
        data = dataNowPlaying
    }

    const handleClickPopular = () => {
        navigate("/category/popular");
    }

    const handleClickTopRated = () => {
        navigate("/category/top-rated");
    }

    const handleClickUpcomingMovies = () => {
        navigate("/category/upcoming");
    }
 const handleClickNowPlayingMovies= () => {
        navigate("/category/now-playing");
    }



    return (
        <div>
            <div>
                <button onClick={handleClickPopular}>Popular Movies</button>
                <button onClick={handleClickTopRated}>Top Rated Movies</button>
                <button onClick={handleClickUpcomingMovies}>Upcoming Movies</button>
                <button onClick={handleClickNowPlayingMovies}>Now Playing Movies</button>
            </div>
                <h2>{categoriesTitle[currentType]}</h2>
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
                                movie.vote_average >= 7 ? s.high :
                                    movie.vote_average >= 5 ? s.medium : s.low
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
        </div>

    )
}