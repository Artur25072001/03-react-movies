import axios from "axios";
import type Movie from "../types/movie";

interface TmdbSearchResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<TmdbSearchResponse>(BASE_URL, {
      params: {
        language: "en-US",
        query,
      },
      headers: {
        Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}
