import { React, useState, useEffect } from "react";
import { Button } from "antd";
import ButtonGenre from "./components/buttonGenre/buttonGenre";
import FilmCard from "./components/filmCard/FilmCard";

function MoviesApp() {
  return (
    <div>
      <ul>
        <FilmCard />
      </ul>
    </div>
  );
}

export default MoviesApp;
