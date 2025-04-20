import { React, useState, useEffect } from "react";
import ButtonGenre from "../buttonGenre/buttonGenre";
import { Spin, Alert } from "antd";
import "./FilmCard.css";
import { parseISO, format } from "date-fns";
import { enGB } from "date-fns/locale";

function FilmCard({ searchValue, searchResult }) {
  const [someFilms, setSomeFilms] = useState([]);

  function formatText(text) {
    if (text.length >= 200) {
      let num = 160;
      let finalText = text.slice(0, num);
      if (finalText[159] === " ") {
        return `${finalText}...`;
      } else {
        let lastWhiteSpace = finalText.lastIndexOf(" ");
        return `${finalText.slice(0, lastWhiteSpace)} ...`;
      }
    }

    return text;
  }

  useEffect(() => {
    const arr = searchResult.slice(0);
    setSomeFilms(searchResult);
  }, [searchResult]);

  const filmCards = someFilms.map((el, i) => {
    const imageMovie = `https://image.tmdb.org/t/p/original/${el.poster_path}`;
    let dateF = el.release_date;

    const liFilm = (
      <li key={i}>
        <img id="image" src={imageMovie} />

        <div id="movie">
          <h3 id="movieTitle">{el.title}</h3>
          <div id="movieDate">
            {" "}
            {dateF
              ? format(parseISO(dateF), "LLLL d, yyyy", { locale: enGB })
              : null}
          </div>
          <ButtonGenre />
          <ButtonGenre />
          <div id="descMovie">{formatText(el.overview)}</div>
        </div>
      </li>
    );

    return liFilm;
  });
  // console.log(searchValue);

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

export default FilmCard;
