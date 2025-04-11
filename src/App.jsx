import { React, useState, useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { Button, Alert } from "antd";
import ButtonGenre from "./components/buttonGenre/buttonGenre";
import FilmCard from "./components/filmCard/FilmCard";

function MoviesApp() {
  return (
    <div id="generalContainer">
      <Online>
        <ul>
          <FilmCard />
        </ul>
      </Online>
      <Offline>
        <Alert
          message="Отсутствует подключение к интернету"
          type="warning"
          showIcon
        />
      </Offline>
    </div>
  );
}

export default MoviesApp;
