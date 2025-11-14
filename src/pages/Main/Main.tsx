import s from './Main.module.css';
import {MainHeader, NowPlayingMovies, PopularMovies, TopRatedMovies, UpcomingMovies} from "@/pages/Main"

export const Main = () => {

    return (
        <div className={s.container}>
            <MainHeader />
            <PopularMovies />
            <TopRatedMovies/>
            <UpcomingMovies/>
            <NowPlayingMovies/>

        </div>
    );
};