import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {TMDBMoviesResponse} from "@/features/api/tmdbApi.types.ts";

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
  }),
});


export const {useFetchPopularMoviesQuery} = tmdbApi