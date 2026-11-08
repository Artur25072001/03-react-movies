import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchMovies from "../../services/movieService";
import type Movie from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(query);
      setMovies(results);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (catchError) {
      console.error("Error searching movies:", catchError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
