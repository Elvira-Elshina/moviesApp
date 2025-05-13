import { React, useState, useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { Pagination, Spin, Input, Tabs, Alert } from "antd";

import GenreContext from "./context/GenreContext";

import FilmCards from "./components/filmCards/FilmCards";
import RatedMovies from "./components/RatedMovies/RatedMovies";

import debounce from "lodash/debounce";

function MoviesApp() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState("Search");
  const [myRatedMovies, setMyRatedMovies] = useState([]);
  const [searchPagination, setSearchPagination] = useState(0);

  const sessionId = sessionStorage.getItem("guest_session_id");

  useEffect(() => {
    //запрашиваем жанры
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGenres(res);
      })
      .catch((err) => console.error(err));
  }, []);

  //запрашиваем оцененные пользователм фильмы
  useEffect(() => {
    if (activeTab === "2") {
      fetch(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setTotalPages(res.total_pages);
          setMyRatedMovies(res.results);
        })
        .catch((err) => console.error(err));
    } else {
      setTotalPages(searchPagination);
    }
  }, [activeTab]);

  const items = [
    {
      label: "Search",
      key: "1",
      children: (
        <>
          <Input
            type="search"
            placeholder="Type to search..."
            onChange={debounce((e) => {
              const val = e.target.value.replace(/ /g, "+");
              setSearchValue(val);
            }, 500)}
          />
          <ul id="movieList">
            {err ? <Alert message="Error!" type="error" showIcon /> : null}
            {loading ? (
              <Spin />
            ) : (
              <FilmCards
                searchValue={searchValue}
                searchResult={searchResult}
                loading={loading}
                sessionId={sessionId}
              />
            )}
          </ul>
        </>
      ),
    },
    {
      label: "Rated",
      key: "2",
      children: (
        <ul id="movieList">
          <RatedMovies myRatedMovies={myRatedMovies} />
        </ul>
      ),
    },
  ];

  //делаем запрос на гостевую сессию
  useEffect(() => {
    if (!sessionId) {
      fetch("https://api.themoviedb.org/3/authentication/guest_session/new", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
        },
      })
        .then((res) => res.json())
        .then((sessionData) => {
          sessionStorage.setItem(
            "guest_session_id",
            sessionData.guest_session_id
          );
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId]);

  //делаем запрос на фильм и тд
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.total_pages);
        setSearchPagination(res.total_pages);
        setSearchResult(res.results);
        setLoading(false);
      })
      .catch((error) => {
        setErr(true);
      });
  }, [searchValue, page]);

  const onPaginationChange = (e) => setPage(e);

  const handleTabChange = (key) => setActiveTab(key);

  return (
    <GenreContext.Provider value={genres}>
      <div id="generalContainer">
        {/* <Online id="onlineSpan"> */}
        <form id="searchContainer">
          <Tabs
            defaultActiveKey="Search"
            items={items}
            onChange={handleTabChange}
          />
        </form>
        <Pagination
          showSizeChanger={false}
          total={totalPages}
          onChange={onPaginationChange}
          pageSize={10}
          size="small"
          style={{ width: "100vw", justifyContent: "center" }}
        />
        {/* </Online> */}
        <Offline>
          <Alert
            message="Отсутствует подключение к интернету"
            type="warning"
            showIcon
          />
        </Offline>
      </div>
    </GenreContext.Provider>
  );
}

export default MoviesApp;
