import React, { useEffect } from "react";
import "../../ui-styling/index.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findMovieDetailsThunk } from "../services/movies-thunks";
import "./reviews/reviews.css";

const Cast = () => {
  const { movieDetails } = useSelector((state) => state.movieDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findMovieDetailsThunk(id));
  }, [dispatch, id]);

  console.log("TEST ", movieDetails.cast);
  return (
    <>
      {movieDetails.cast && (
        <div className="wd-review-div">
          <div className="wd-review-content">
            <div className="col-8">
              <div className="row">
                <h3>Cast</h3>
                <br />
                <br />
                {movieDetails.cast.map((actor) => (
                  <div className="col-3">
                    <h5>
                      <b>{actor.name}</b>
                    </h5>
                    <p>{actor.character}</p>
                  </div>
                ))}
              </div>
              <div className="row">
                {movieDetails.cast.map((actor) => (
                  <div className="col-3">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w440_and_h660_face/" +
                        actor.profile_path
                      }
                      className="w-100"
                    />
                  </div>
                ))}
              </div>
              <br />
              <div className="row">
                <h3>Crew</h3>
                <br />
                <br />
                {movieDetails.crew.map((staff) => (
                  <div className="col-3">
                    <h5>
                      <b>{staff.name}</b>
                    </h5>
                    <p>{staff.job}</p>
                  </div>
                ))}
              </div>
              <div className="row">
                {movieDetails.crew.map((staff) => (
                  <div className="col-3">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w440_and_h660_face/" +
                        staff.profile_path
                      }
                      className="w-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Cast;
