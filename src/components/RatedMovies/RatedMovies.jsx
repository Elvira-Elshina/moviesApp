import { React } from "react";
import FilmCard from "../filmCard/FilmCard";

function RatedMovies({ myRatedMovies }) {
  return (
    <>
      {myRatedMovies?.map((el, i) => {
        const imageMovie = `https://image.tmdb.org/t/p/original${el.poster_path}`;
        const liFilm = (
          <li key={el.id}>
            <FilmCard
              rating={el.vote_average.toFixed(1)}
              imageMovie={imageMovie}
              title={el.title}
              overview={el.overview}
              elId={el.id}
              dateF={el.release_date}
              allGenres={el.genre_ids}
              myRate={el.rating}
              disabled
            />
          </li>
        );

        return liFilm;
      })}
    </>
  );
}

export default RatedMovies;
