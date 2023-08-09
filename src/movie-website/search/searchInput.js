import React, { useEffect } from "react";
import SearchBtn from "../../ui-styling/buttons/icons/searchBtn";
import "../../ui-styling/index.css";
import "./index.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findMoviesThunk } from "../services/search-thunks";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { findGenreMoviesThunk, findGenresThunk } from "../services/movies-thunks";

function SearchInput() {

  const [title, setSearch] = useState("");
  const [genreOption, setGenreOption] = useState(false);
  const {genres} = useSelector(state => state.genres);
  const [chosenGenre, setChosenGenre] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (genreOption) {
        await dispatch(findGenreMoviesThunk(chosenGenre));
        navigate({
          pathname: "/search",
          search: `?${createSearchParams({
            with_genres: chosenGenre,
          }).toString()}`,
        });
      } else {
        await dispatch(findMoviesThunk({ title }));
        navigate({
          pathname: '/search',
          search: `?${createSearchParams({
            q: title
          }).toString()}`
        })};
      }
      catch (e) {
        alert(e);
    }
};

useEffect(() => {
  dispatch(findGenresThunk());
}, [dispatch, genreOption])

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <label for="search-bar-search" className="text-center ">
            <h2 className="wd-pinkText">Search Movies</h2>
          </label>
        </div>

        <br />
        <div className="wd-margin">
          <div className="d-flex">
            <div class="input-group mb-3">
              {genreOption ? (
                <select
                  class="form-select"
                  onChange={(event) => setChosenGenre(event.target.value)}
                  value={chosenGenre}
                >
                  <option disabled selected>
                    Select genre
                  </option>
                  {genres?.map((genre) => (
                    <option value={genre.id} >{genre.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  class="form-control px-3"
                  placeholder="Search movies"
                  onChange={(event) => setSearch(event.target.value)}
                />
              )}
              <button
                class="btn btn-outline-secondary dropdown-toggle "
                type="button"
                data-bs-toggle="dropdown"
              >
                {genreOption && "Genre"}
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setGenreOption(true);
                    }}
                  >
                    Genre
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setGenreOption(false);
                    }}
                  >
                    Search
                  </a>
                </li>
              </ul>
            </div>
            <SearchBtn fn={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchInput;