import React from "react";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../services/auth-thunks";
import { useLocation } from "react-router-dom";
import DeleteBtn from "../../../../ui-styling/buttons/icons/deleteBtn";

function MovieBucketListItem({ movieInfo }) {
  const { currentUser } = useSelector(state => state.user);
  const userSavedMovies = currentUser?.savedMovies;
  const location = useLocation();

  const dispatch = useDispatch();
  const handleUnSaveBtn = async (e) => {
    const newSavedMoviesList = userSavedMovies.filter(
      (savedMovie) => savedMovie.id !== movieInfo.id
    );
    const updatedViewer = {
      ...currentUser,
      savedMovies: newSavedMoviesList,
    };
    dispatch(updateUserThunk(updatedViewer));
    e.preventDefault();
    alert("Un-saving movie: " + movieInfo.title);
  };
  return (
    <>
      <NavLink
        to={`/details/${movieInfo.id}`}
        state={{ movieInfo }}
        className="list-group-item list-group-item-action flex-column align-items-start wd-movie-list-item"
      >
        {
          (location.pathname.endsWith("/profile") || location.pathname.endsWith(`/profile/${currentUser.username}`)) &&
          <DeleteBtn
            fn={(e) => handleUnSaveBtn(e)}
            className={"float-end"}
          />
        }
        <div className="row p-3 wd-movie-list-row">
          <div className="col-3 wd-movie-list-image d-none d-lg-block">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
              className="float-left mr-3"
            />
          </div>
          <div className="col-9 wd-movie-list-info d-none d-lg-block">
            <h3>{movieInfo.title}</h3>
            <h5>
              Rating: {movieInfo.vote_average}
              <br />
            </h5>
          </div>
          <div className="d-lg-none col-12">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
              className="float-left mr-3 wd-md-screen-size-img"
            />
            <h3>{movieInfo.title}</h3>
            <div>
              Rating: {movieInfo.vote_average}
              <br />
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default MovieBucketListItem;