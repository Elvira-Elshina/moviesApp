import { React, useState, useEffect } from "react";
import ButtonGenre from "../buttonGenre/buttonGenre";
import { Rate } from "antd";
import "./FilmCard.css";
import { parseISO, format } from "date-fns";
import { enGB } from "date-fns/locale";
import photo from "../../assets/noImage.png";

function FilmCard({
  rating,
  imageMovie,
  title,
  overview,
  elId,
  dateF,
  addRating,
  allGenres,
  myRate,
  poster_path,
  disabled,
}) {
  const [myRating, setMyRating] = useState(0);

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
  const getColor = () => {
    if (rating < 3) {
      return "rating03";
    } else if (3 <= rating && rating < 5) {
      return "rating35";
    } else if (5 <= rating && rating < 7) {
      return "rating57";
    } else if (7 <= rating) {
      return "rating7over";
    }
  };

  return (
    <>
      <div className="image-container">
        <img id="image" src={poster_path === null ? photo : imageMovie} />
      </div>

      <div id="movie">
        <div id="cont">
          <h3 id="movieTitle">{title}</h3>
          <div id={getColor()} className="rating">
            {rating}
          </div>
        </div>
        <div id="movieDate">
          {" "}
          {dateF
            ? format(parseISO(dateF), "LLLL d, yyyy", { locale: enGB })
            : null}
        </div>
        <div className="genreContainer">
          <ButtonGenre genreIds={allGenres} />
        </div>

        <div id="descMovie">{formatText(overview)}</div>
        <Rate
          onChange={(evt) => {
            addRating(evt, elId);
            setMyRating(evt);
          }}
          count={10}
          allowHalf
          defaultValue={myRate || 0}
          className="rate"
          value={myRate || 0}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default FilmCard;
