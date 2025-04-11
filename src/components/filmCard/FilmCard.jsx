import { React, useState, useEffect } from "react";
import ButtonGenre from "../buttonGenre/buttonGenre";
import { Spin, Alert } from "antd";
import "./FilmCard.css";
import { parseISO, format } from "date-fns";
import { enGB } from "date-fns/locale";

function FilmCard() {
  let data = "";
  const apiKey = "api_key=217dfbf871ab6b5cbf10cbde7603737a";

  const [someFilms, setSomeFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  // const [filmTitle, setFilmTitle] = useState("");
  // const [filmDescription, setFilmDescription] = useState("");
  // const [filmDate, setFilmDate] = useState("");

  useEffect(() => {
    const result = fetch(
      // `https://api.themoviedb.org/3/movie/${data}?${apiKey}`,
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
        },
      }
    );
    result
      .then((res) => res.json())
      .then((resp) => {
        const arrFilms = resp.results.slice(0);
        setSomeFilms(arrFilms);
        setLoading(false);
      })
      .catch((error) => {
        setErr(true);
      });
  }, []);

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

  const filmCards = someFilms.map((el, i) => {
    const imageMovie = `https://image.tmdb.org/t/p/original/${el.poster_path}`;
    const dateF = el.release_date;
    const liFilm = (
      <li key={i}>
        <img id="image" src={imageMovie} />

        <div id="movie">
          <h3 id="movieTitle">{el.title}</h3>
          <div id="movieDate">
            {" "}
            {format(parseISO(dateF), "LLLL d, yyyy", { locale: enGB })}
          </div>
          <ButtonGenre />
          <ButtonGenre />
          <div id="descMovie">{formatText(el.overview)}</div>
        </div>
      </li>
    );

    return liFilm;
  });

  if (err) {
    return <Alert message="Error" type="error" showIcon />;
  } else if (loading) {
    return <Spin />;
  } else {
    return filmCards;
  }
}

export default FilmCard;
