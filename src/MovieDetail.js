import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "502e8447";
function MovieDetail({
  selectedId,
  onCloseMovie,
  onAddWatchedMovies,
  isExist,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  useEffect(() => {
    const escEvent = (e) => {
      if (e.code === "Escape") onCloseMovie();
    };

    document.addEventListener("keydown", escEvent);
    return () => document.removeEventListener("keydown", escEvent);
  }, [onCloseMovie]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const movie = await data.json();
      setMovie(movie);
      setIsLoading(false);
    })();
  }, [selectedId]);
  useEffect(() => {
    if (!title) return;
    document.title = title;
    return () => (document.title = "usePopcorn");
  }, [title]);
  const handleAddMovie = () => {
    const movie = {
      imdbID: selectedId,
      title,
      runtime: Number(runtime.split(" ").at(0)),
      released,
      genre,
      imdbRating: Number(imdbRating),
      poster,
      userRating,
    };
    onAddWatchedMovies(movie);
    onCloseMovie();
  };
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ⬅
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isExist ? (
                <>
                  <StarRating max={10} size={24} onSetStar={setUserRating} />
                  {userRating > 5 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated movie with {isExist.userRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default MovieDetail;
