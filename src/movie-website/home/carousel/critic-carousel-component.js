import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./index.css"


function CriticCarouselComponent({ movieId }) {
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [movieReviewed, setMovieReviewed] = useState([]);
    const handleMouseEnter = () => {
        setDisplayOverlay(true);
      };

      const handleMouseLeave = () => {
        setDisplayOverlay(false);
      };
    useEffect(() => {
        const GET_MOVIE_API = `https://api.themoviedb.org/3/movie/${movieId}`;
        const loadMovie = async () => {
            const response = await axios.get(GET_MOVIE_API, {
                params: {
                    api_key: 'ffdfb660a1488ae7f304368f73e0e7ec',
                },
            })
            setMovieReviewed(response.data);
        }
        loadMovie();
    }, [])

    return (
      <Link
        to={{
          pathname: `/details/${movieReviewed.id}`,
          state: { movie: movieReviewed },
        }}
      >
        <div
          className="wd-slider p-0 m-0"
          key={movieReviewed.id}
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
             <h4>{movieReviewed.title}</h4>
            </div>
          )}
          <img
            src={
              "http://image.tmdb.org/t/p/w500/" + movieReviewed.backdrop_path
            }
            alt="movie"
          />
        </div>
      </Link>
    );
};

export default CriticCarouselComponent;
