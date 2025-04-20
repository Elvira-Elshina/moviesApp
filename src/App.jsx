import { React, useState, useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { Pagination, Spin, Input, Tabs, Alert } from "antd";
import FilmCard from "./components/filmCard/FilmCard";
import debounce from "lodash/debounce";

function MoviesApp() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const url = "";
  const APIKey = "";
  const language = "";
  const query = "";
  useEffect(() => {
    setLoading(true);

    const response = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdkZmJmODcxYWI2YjVjYmYxMGNiZGU3NjAzNzM3YSIsIm5iZiI6MTczOTI4MzkyOS45ODIsInN1YiI6IjY3YWI1ZGQ5NTE4NDA4YWJmOGJiMmY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgFAODEHWdNUPjWEQa3cemqDHPIm5luKFRzYcrXSwq0",
        },
      }
    );

    response
      .then((res) => res.json())
      .then((res) => {
        console.log(res.total_pages);
        setTotalPages(res.total_pages);
        setSearchResult(res.results);
        setLoading(false);
      })
      .catch((error) => {
        setErr(true);
      });
  }, [searchValue, page]);

  const onPaginationChange = (e) => setPage(e);

  return (
    <div id="generalContainer">
      {/* <Online> */}
      <form id="searchContainer">
        <Tabs
          defaultActiveKey="Search"
          items={[
            {
              label: "Search",
              key: "1",
            },
            {
              label: "Rated",
              key: "2",
            },
          ]}
        />
        <Input
          type="search"
          placeholder="Type to search..."
          onChange={debounce((e) => {
            const val = e.target.value.replace(/ /g, "+");
            setSearchValue(val);
          }, 500)}
        />
      </form>
      <ul>
        {err ? <Alert message="Error!" type="error" showIcon /> : null}
        {loading ? (
          <Spin />
        ) : (
          <FilmCard
            searchValue={searchValue}
            searchResult={searchResult}
            loading={loading}
          />
        )}
      </ul>
      <Pagination
        showSizeChanger={false}
        total={totalPages}
        onChange={onPaginationChange}
        pageSize={10}
      />
      {/* </Online> */}
      {/* <Offline> */}
      {/* <Alert
        message="Отсутствует подключение к интернету"
        type="warning"
        showIcon
      /> */}
      {/* </Offline> */}
    </div>
  );
}

export default MoviesApp;
