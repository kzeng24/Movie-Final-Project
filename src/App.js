import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import MovieWebsite from "./movie-website";
import authReducer from "./movie-website/reducers/auth-reducer";
import reviewsReducer from "./movie-website/reducers/reviews-reducer";
import searchReducer from "./movie-website/reducers/search-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { setUser } from "./movie-website/reducers/auth-reducer";
import { getProfileByUsername } from "./movie-website/services/auth-service";
import movieVideoReducer from "./movie-website/reducers/movie-video-reducer";
import topMoviesReducer from "./movie-website/reducers/top-movies-reducer";
import newMoviesReducer from "./movie-website/reducers/new-movies-reducer";
import popularMoviesReducer from "./movie-website/reducers/popular-movies-reducer";
import upcomingMoviesReducer from "./movie-website/reducers/upcoming-movies-reducer";
import movieDetailsReducer from "./movie-website/reducers/movie-details-reducer";

const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    user: authReducer,
    search: searchReducer,
    newMovies: newMoviesReducer,
    video: movieVideoReducer,
    topMovies: topMoviesReducer,
    popularMovies: popularMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    movieDetails: movieDetailsReducer
  },
});

function InnerApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Get the user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        if (storedUserData && storedUserData.username) {
          // Fetch the profile using the username from localStorage
          const user = await getProfileByUsername(storedUserData.username);
          if (user) {
            dispatch(setUser(user.data));
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
}, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/*" element={<MovieWebsite />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}

export default App;
