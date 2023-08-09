import React, { useEffect, useState } from "react";
import "./index.css";
import "../../ui-styling/index.css"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LuStars } from "react-icons/lu";

function SearchResult() {
  const movies = useSelector((state) => state.search.data.results);
  const {genreMovies, genre} = useSelector(state => state.genreMovies);
  const [resultList, setResultList] = useState([]);
  const [genreOption, setGenreOption] = useState(false);

  useEffect(() => {
     setResultList(movies);
     setGenreOption(false);
  }, [movies])

  useEffect(() => {
    setResultList(genreMovies);
    setGenreOption(true);
  }, [genreMovies]);

  return (
    <>
      <div className="container">
        <div className="wd-margin">
          <span className="d-flex wd-purpleText m-3">
            {genreOption && (
              <h5>
                Top {genre} Results <LuStars />
              </h5>
            )}
          </span>
          <div className="list-group ">
            {resultList && (
              <div className="list-group ">
                {resultList
                  .filter((movie) => movie.poster_path)
                  .map((movie) => (
                    <NavLink
                      to={`/details/${movie.id}`}
                      state={{ movie }}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="row p-3">
                        <div className="col-md-5 col-lg-4">
                          <img
                            src={
                              "https://image.tmdb.org/t/p/w440_and_h660_face/" +
                              movie.poster_path
                            }
                            height="5px"
                            className="img-fluid float-left mr-3"
                          />
                        </div>
                        <div className="col-md-7 col-lg-8">
                          <h3>{movie.title}</h3>
                          <div className="wd-search-result-text d-none d-md-block">
                            {movie.release_date}
                            <br />
                            <br />
                            {movie.overview.length > 270
                              ? `${movie.overview.substring(0, 270)}...`
                              : movie.overview}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
