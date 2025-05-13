import React, { useContext } from "react";
import "./buttonGenre.css";
import GenreContext from "../../context/GenreContext";

function ButtonGenre({ genreIds }) {
  const allGenres = useContext(GenreContext);
  const result = allGenres.genres.filter((el) => {
    return genreIds.includes(el.id);
  });

  return (
    <ul id="but">
      {result.map((el, i) => {
        return (
          <li key={i} id="nameG">
            {el.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ButtonGenre;
