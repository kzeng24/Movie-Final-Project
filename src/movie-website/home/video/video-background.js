import React, { useEffect } from "react";
import "./index.css";
import "../../../ui-styling/index.css";
import ExploreBtn from "../../../ui-styling/buttons/text/exploreBtn";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { findMovieVideoThunk } from "../../services/movies-thunks";

function VideoBackground({ topMovieRef }) {
  const { currentUser } = useSelector((state) => state.user || {});
  const { firstMovie } = useSelector((state) => state.newMovies || {});
  const { video } = useSelector((state) => state.video || {});

  const dispatch = useDispatch();
  useEffect(() => {
    if (firstMovie) {
      dispatch(findMovieVideoThunk(firstMovie.id));
    }
  }, [firstMovie]);

  const divStyle = {
    position: "fixed",
    top: "50%",
    left: "6%",
    transform: "translateY(-50%)",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  const onExplore = (e) => {
    e.preventDefault();
    topMovieRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  return (
    <div className="wd-video-background">
      <ReactPlayer
        url={video}
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="70vh"
        config={{
          youtube: {
            playerVars: { modestbranding: 1 },
          },
        }}
      />
      <div className="position-absolute" style={divStyle}>
        <div className="wd-text-container">
          <div className="position-relative">
            <div className="wd-vline" />
          </div>
          <div className="m-0">
            <h4 className="ps-4">Out Now</h4>
            <h1 className="ps-4">{firstMovie?.original_title}</h1>
            <h5 className="ps-4 w-50 d-none d-md-block">{firstMovie?.overview}</h5>
          </div>
        </div>
        <div className="ps-4">
          <h4 style={{ textTransform: "lowercase" }}>
            {`- Welcome ${currentUser && currentUser.roles
                ? currentUser.username + " (" + currentUser.roles[0] + ")"
                : ""
              } -`}
          </h4>
          <div className="d-none d-md-block">
            <span onClick={onExplore}>
              <ExploreBtn />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VideoBackground;
