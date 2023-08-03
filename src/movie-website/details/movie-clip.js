import React from "react";
import "./reviews/reviews.css"
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { findMovieVideoThunk } from "../services/movies-thunks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieClipSection() {
    const { video } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const { id } = useParams();
     useEffect(() => {
       dispatch(findMovieVideoThunk(id));
       console.log("TEST", video);
     }, [dispatch, id]);
    return (
      <>
        {video && (
          <div className="wd-review-div wd-blackBackground">
            <div className="wd-review-content">
              <div className="col-8">
                <h3 style={{ color: "white" }}>Movie Clip</h3>
                <br />
                <ReactPlayer
                  url={video}
                  playing={false}
                  loop={false}
                  width="100%"
                  height="55vh"
                  config={{
                    youtube: {
                      playerVars: { modestbranding: 1 },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default MovieClipSection;

