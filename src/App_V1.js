import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import movieData from "./tempMovieData";
import Search from "./Search";
import NumberResults from "./NumberResults";
import Box from "./Box";
import MoviesList from "./MoviesList";
import Summary from "./Summary";
import WatchedList from "./WatchedList";
// import watchedData from "./tempWatchedData";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetail from "./MovieDetail";
// import tempWatchedData from "./tempWatchedData";

const KEY = "502e8447";
export default function App() {
  const [movies, setMovies] = useState(movieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [tempQuery, setTempQuery] = useState("Kingdom");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedMovie = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      if (!tempQuery.length) {
        setMovies([]);
        setErrMsg("");
        return;
      }
      try {
        setIsLoading(true);
        setErrMsg("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&S=${tempQuery}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrMsg(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [tempQuery]);

  const handleSearch = (e) => {
    setTempQuery(e);
  };
  const handleClose = () => {
    setSelectedId(null);
  };
  const handleAddWatchedMovies = (movie) => {
    setWatched((prev) => [...prev, movie]);
  };
  const handleDeleteWatched = (id) => {
    const update = watched.filter((movie) => movie.imdbID !== id);
    setWatched([...update]);
  };
  const isExist = watched.find((movie) => movie.imdbID === selectedId);
  return (
    <>
      <Navbar>
        <Search query={tempQuery} onSearch={(e) => handleSearch(e)} />
        <NumberResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : Boolean(errMsg) ? (
            <ErrorMessage message={errMsg} />
          ) : (
            <MoviesList movies={movies} onSelected={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleClose}
              onAddWatchedMovies={handleAddWatchedMovies}
              isExist={isExist}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
