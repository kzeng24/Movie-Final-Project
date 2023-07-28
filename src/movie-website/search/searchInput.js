import React from "react";
import SearchBtn from "../../ui-styling/buttons/icons/searchBtn";
import "../../ui-styling/index.css";
import "./index.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findMoviesThunk } from "../services/search-thunks";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

function SearchInput() {

  const [title, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
        await dispatch(findMoviesThunk({ title }));
        navigate({
          pathname: '/search/',
          search: `?${createSearchParams({
            q: title
          }).toString()}`
        })
    } catch (e) {
        alert(e);
    }
};

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <label for="search-bar-search" className="text-center ">
            <h2 className="wd-pinkText">Search Movie</h2>
          </label>
        </div>

        <br />
        <div className="wd-margin">
          <div className="d-flex">
            <input
              type="text"
              className="form-control px-3"
              id="search-bar-search"
              placeholder="Search movies"
              onChange={(event) => setSearch(event.target.value)}
            />
            <SearchBtn fn={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchInput;