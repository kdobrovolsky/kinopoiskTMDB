import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {TMDBMoviesResponse, TMDBUpcomingResponse} from "@/features/api/tmdbApi.types.ts";

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {

      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: build => ({
    fetchPopularMovies: build.query<TMDBMoviesResponse, void>({
      query: () => `movie/popular`,
    }),
    fetchTopRated: build.query<TMDBMoviesResponse, void>({
      query: () => `movie/top_rated`,
    }),
    fetchUpcoming: build.query<TMDBUpcomingResponse, void>({
      query: () => `movie/upcoming`,
    }),
    fetchNowPlaying: build.query<TMDBUpcomingResponse, void>({
      query: () => `movie/now_playing`,
    }),
  }),
});


export const {useFetchPopularMoviesQuery,useFetchNowPlayingQuery,useFetchTopRatedQuery,useFetchUpcomingQuery} = tmdbApi