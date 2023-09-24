import Movie from "./Movie";

function MoviesList({ movies, onSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedMovie={onSelected}
        />
      ))}
    </ul>
  );
}
export default MoviesList;
