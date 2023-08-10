import React, { forwardRef, useEffect, useState } from 'react';
import "./index.css";
import "../../../ui-styling/index.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  findNewMoviesThunk,
  findTopMoviesThunk,
  findPopularMoviesThunk,
  findUpcomingMoviesThunk,
  findBlockbustersThunk,
} from "../../services/movies-thunks";
import { findCriticReviewsThunk } from '../../services/reviews-thunks';
import CriticCarouselComponent from './critic-carousel-component';
import CarouselComponent from './carousel-component';


const HomeCarousel = forwardRef((props, ref) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 767, min: 200 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const { currentUser } = useSelector(state => state.user);
  const { newMovies } = useSelector((state) => state.newMovies);
  const { topMovies } = useSelector((state) => state.topMovies);
  const { popularMovies } = useSelector((state) => state.popularMovies);
  const { blockbusters } = useSelector((state) => state.blockbusters);
  const { upcomingMovies } = useSelector((state) => state.upcomingMovies);
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const savedMovies = currentUser?.savedMovies;

  // loads movie lists
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNewMoviesThunk());
    dispatch(findTopMoviesThunk());
    dispatch(findPopularMoviesThunk());
    dispatch(findUpcomingMoviesThunk());
    dispatch(findBlockbustersThunk());

    const loadReviewedMovies = async () => {
      let movieIds = [];
      if (currentUser) {
        const { payload } = await dispatch(
          findCriticReviewsThunk(currentUser.username)
        );
        payload.map((review) => {
          movieIds.push(review.movieId);
        });
        movieIds = movieIds.filter(function (item, pos) {
          return movieIds.indexOf(item) == pos;
        });
      }
      setReviewedMovies(movieIds);
    };
    loadReviewedMovies();
  }, [dispatch, currentUser]);

  return (
    <div>
      <br />
      {currentUser &&
        currentUser.roles[0] === "VIEWER" &&
        savedMovies.length >= 0 && (
          <div ref={ref}>
            <div className="wd-carousel-title position-relative">
              <div className="wd-text-container">
                <h3 className="wd-purpleText">- Your Saved Movies -</h3>
              </div>
            </div>
            <div className="wd-carousel-parent">
              <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                partialVisible={false}
              >
                {savedMovies.map((movie) => {
                  return <CarouselComponent movie={movie} />;
                })}
              </Carousel>
            </div>
          </div>
        )}

      {currentUser &&
        currentUser.roles[0] === "CRITIC" &&
        reviewedMovies.length >= 0 && (
          <div ref={ref}>
            <div className="wd-carousel-title position-relative">
              <div className="wd-text-container">
                <h3 className="wd-purpleText">- Your Reviewed Movies -</h3>
              </div>
            </div>
            <div className="wd-carousel-parent">
              <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                partialVisible={false}
              >
                {reviewedMovies.map((mid) => {
                  return <CriticCarouselComponent movieId={mid} />;
                })}
              </Carousel>
            </div>
          </div>
        )}

      <div ref={ref}>
        <div className="wd-carousel-title position-relative">
          <div className="wd-text-container">
            <h3 className="wd-purpleText">Now Playing</h3>
          </div>
        </div>
        <div className="wd-carousel-parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
          >
            {newMovies.map((movie) => {
              return <CarouselComponent movie={movie} />;
            })}
          </Carousel>
        </div>
      </div>

      <div className="wd-carousel-title position-relative">
        <div className="wd-text-container">
          <h3 className="wd-purpleText">Popular</h3>
        </div>
      </div>
      <div className="wd-carousel-parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
        >
          {popularMovies.map((movie) => {
            return <CarouselComponent movie={movie} />;
          })}
        </Carousel>
      </div>

      <div className="wd-carousel-title position-relative">
        <div className="wd-text-container">
          <h3 className="wd-purpleText">Blockbusters</h3>
        </div>
      </div>
      <div className="wd-carousel-parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
        >
          {blockbusters.map((movie) => {
            return <CarouselComponent movie={movie} />;
          })}
        </Carousel>
      </div>

      <div className="wd-carousel-title position-relative">
        <div className="wd-text-container">
          <h3 className="wd-purpleText">Top Rated</h3>
        </div>
      </div>
      <div className="wd-carousel-parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
        >
          {topMovies.map((movie) => {
            return <CarouselComponent movie={movie} />;
          })}
        </Carousel>
      </div>

      <div className="wd-carousel-title position-relative">
        <div className="wd-text-container">
          <h3 className="wd-purpleText">Upcoming</h3>
        </div>
      </div>
      <div className="wd-carousel-parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
        >
          {upcomingMovies.map((movie) => {
            return <CarouselComponent movie={movie} />;
          })}
        </Carousel>
      </div>
      <br />
    </div>
  );
});

export default HomeCarousel;
