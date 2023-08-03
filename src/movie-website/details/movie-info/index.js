import React, { useEffect } from "react";
import "./details.css";
import "../../../ui-styling/index.css";
import SavedBtn from "../../../ui-styling/buttons/icons/savedBtn";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../../../ui-styling/buttons/icons/deleteBtn";
import { updateUserThunk } from "../../services/auth-thunks";
import {findMovieDetailsThunk} from "../../services/movies-thunks"
import TagBtn from "../../../ui-styling/buttons/text/tagBtn";
import {MdOutlineDateRange} from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { LuStars } from "react-icons/lu";
import {MdMovieFilter} from "react-icons/md";
import {RxLapTimer} from "react-icons/rx";

const MovieListItem = () => {
  const { currentUser } = useSelector(state => state.user);
  const {movieDetails} = useSelector(state => state.movieDetails);

  const userSavedMovies = currentUser?.savedMovies;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findMovieDetailsThunk(id));
  }, [dispatch, id]);

  const handleSaveBtn = async () => {
    const newSavedMoviesList = userSavedMovies.concat(movieDetails);
    const updatedViewer = {
      ...currentUser,
      savedMovies: newSavedMoviesList,
    };
    dispatch(updateUserThunk(updatedViewer));
    alert("Saving movie: " + movieDetails.title);
  };

  const handleUnSaveBtn = async () => {
    const newSavedMoviesList = userSavedMovies.filter(
      (savedMovie) => savedMovie.id !== movieDetails.id
    );
    const updatedViewer = {
      ...currentUser,
      savedMovies: newSavedMoviesList,
    };
    dispatch(updateUserThunk(updatedViewer));
    alert("Un-saving movie: " + movieDetails.title);
  };

  const forceLogin = () => {
    alert("Create an account to proceed");
    navigate("/login");
  }

  // Check if movie exists and that all lists are loaded
  if (!movieDetails || !movieDetails.genres || !movieDetails.production_countries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="wd-video-details-background row"
        style={{
          backgroundImage: `url(
            http://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}
          )`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black overlay
          }}
        />
        <div
          className="wd-details-row"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="row">
            <div className="wd-left-col col-sm-3 col-md-2 col-lg-1">
              {currentUser && currentUser.roles[0] === "VIEWER" && (
                <>
                  {userSavedMovies.filter(
                    (savedMovie) => savedMovie.id === movieDetails.id
                  ).length === 0 ? (
                    <SavedBtn fn={handleSaveBtn} />
                  ) : (
                    <DeleteBtn fn={handleUnSaveBtn} addWhiteBorder={true} />
                  )}
                </>
              )}
              {!currentUser && <SavedBtn fn={forceLogin} />}
            </div>

            <div className="col-sm-9 col-md-5">
              <h1>{movieDetails.title}</h1>
              {movieDetails.original_language !== "en" && (
                <h5>{movieDetails.original_title}</h5>
              )}
              <br />

              <h5>
                <LuStars />{" "}
                {movieDetails.vote_average === 0
                  ? "Not rated yet"
                  : movieDetails.vote_average + " / 10"}
              </h5>
              <br />
              <h5>
                <MdOutlineDateRange /> {movieDetails.release_date}
              </h5>
              <br />
              {movieDetails.tagline && (
                <h5>
                  <b>
                    <i>"{movieDetails.tagline}"</i>
                  </b>
                </h5>
              )}

              <h5>{movieDetails.overview}</h5>

              <br />
              <h5>
                {movieDetails.genres.map((genre) => (
                  <>
                    <TagBtn text={genre.name} />
                  </>
                ))}
              </h5>
              <br />
              {movieDetails.production_countries.length > 0 && (
                <h5>
                  <SlGlobe />{" "}
                  {
                    movieDetails.production_countries[
                      movieDetails.production_countries.length - 1
                    ].name
                  }
                </h5>
              )}

              <br />
              <h5>
                <RxLapTimer /> {movieDetails.runtime} minutes
              </h5>
              <br />
              {movieDetails.homepage && (
                <h5>
                  <MdMovieFilter />{" "}
                  <a href={movieDetails.homepage} style={{ color: "white" }}>
                    {movieDetails.homepage}
                  </a>
                </h5>
              )}

              <div className="d-sm-block d-md-none wd-details-row">
                <img
                  className="w-75"
                  src={
                    "https://image.tmdb.org/t/p/w440_and_h660_face/" +
                    movieDetails.poster_path
                  }
                  alt="Movie Poster"
                />
              </div>
            </div>

            <div className="wd-photo-col d-none d-md-block col-md-5">
              <img
                className="w-75 mx-3"
                src={
                  "https://image.tmdb.org/t/p/w440_and_h660_face/" +
                  movieDetails.poster_path
                }
                alt="Movie Poster"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieListItem;