import { React, useState, useEffect } from "react";
import { Alert } from "antd";
import "./FilmCards.css";
import FilmCard from "../filmCard/FilmCard";

function FilmCards({ searchValue, searchResult, sessionId }) {
  const [someFilms, setSomeFilms] = useState([]);

  useEffect(() => {
    const arr = searchResult.slice(0);
    setSomeFilms(arr);
  }, [searchResult]);

  //добавляем рейтинг
  const addRating = (rate, movieID) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
      },
      body: JSON.stringify({ value: rate }),
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${sessionId}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        // Обновляем рейтинг конкретного фильма в массиве
        setSomeFilms((films) =>
          films.map((film) =>
            film.id === movieID ? { ...film, rating: rate } : film
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const filmCards = someFilms.map((el, i) => {
    const imageMovie = `https://image.tmdb.org/t/p/original${el.poster_path}`;

    const liFilm = (
      <li key={el.id} className="film-card">
        <FilmCard
          rating={el.vote_average.toFixed(1)}
          imageMovie={imageMovie}
          title={el.title}
          overview={el.overview}
          elId={el.id}
          dateF={el.release_date}
          addRating={addRating}
          allGenres={el.genre_ids}
          myRate={el.rating}
          poster_path={el.poster_path}
        />
      </li>
    );

    return liFilm;
  });

  if (searchValue && someFilms.length === 0) {
    return (
      <Alert
        message="Ничего не найдёно по данному запросу"
        type="info"
        showIcon
      />
    );
  } else {
    return filmCards;
  }
}

export default FilmCards;
