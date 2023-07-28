import React, { useEffect, useState } from "react";
import "../../index.css"
import Rating from '@mui/material/Rating';
import axios from "axios";
import { Link } from 'react-router-dom';


function CriticReviewListItem({ title, rating, description, movieId }) {
    const [movieReviewed, setMovieReviewed] = useState([]);
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
    }, [movieId])

    return (
      <Link
        to={{ pathname: `/details/${movieReviewed.id}` }}
        className="list-group-item list-group-item-action flex-column align-items-start wd-movie-list-item"
      >
        <div className="row p-3 wd-movie-list-row">
          <div className="col-3 wd-movie-list-image d-none d-lg-block">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieReviewed.backdrop_path}`}
              className="float-left mr-3"
            />
          </div>
          <div className="col-9 wd-movie-list-info d-none d-lg-block">
            <h3>{movieReviewed.title}</h3>
            <br />
            <h4> {title}</h4>
            <Rating name="read-only" value={rating} readOnly />
            <br />
            <h5>{description}</h5>
          </div>
          <div className="d-lg-none col-12">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieReviewed.backdrop_path}`}
              className="float-left mr-3 wd-md-screen-size-img"
            />
            <h3>{movieReviewed.title}</h3>
            <br />
            <h4> {title}</h4>
            <Rating name="read-only" value={rating} readOnly />
            <br />
            <h5>{description}</h5>
          </div>
        </div>
      </Link>
    );
};

export default CriticReviewListItem;
