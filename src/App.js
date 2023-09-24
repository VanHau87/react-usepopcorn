import { useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import movieData from "./tempMovieData";
import Search from "./Search";
import NumberResults from "./NumberResults";
import Box from "./Box";
import MoviesList from "./MoviesList";
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import watchedData from "./tempWatchedData";

export default function App() {
  const [movies, setMovies] = useState(movieData);
  const [watched, setWatched] = useState(watchedData);
  return (
    <>
      <Navbar>
        <Search />
        <NumberResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
