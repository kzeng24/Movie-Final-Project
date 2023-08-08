import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function CarouselComponent({movie}) {
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const handleMouseEnter = () => {
      setDisplayOverlay(true);
    };

    const handleMouseLeave = () => {
      setDisplayOverlay(false);
    };
  return (
    <Link
      to={{
        pathname: `/details/${movie.id}`,
        state: { movie: movie },
      }}
    >
      <div
        className="wd-slider p-0 m-0 wd-centerOverlayOpacity"
        key={movie.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayOverlay && (
          <div
            className="wd-centerTextOverlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "rgba(134, 32, 132, 0.4)", // Semi-transparent black overlay
            }}
          >
            <h4>{movie.title}</h4>
          </div>
        )}
        <img
          src={"http://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
          alt="movie"
        />
      </div>
    </Link>
  );
}

export default CarouselComponent;
