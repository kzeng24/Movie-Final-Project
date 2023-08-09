import * as moviesService from "./movies-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findMovieVideoThunk = createAsyncThunk(
  "newMovies/findMovieVideo",
  async (movieId) => await moviesService.findMovieVideo(movieId)
);

export const findMovieDetailsThunk = createAsyncThunk(
  "findMovie/findMovieDetails",
  async (movieId) => await moviesService.findMovieDetails(movieId)
);

export const findNewMoviesThunk = createAsyncThunk(
  "newMovies/findLatestMovies",
  async () => await moviesService.findLatestMovies()
);

export const findPopularMoviesThunk = createAsyncThunk(
  "popularMovies/findPopularMovies",
  async () => await moviesService.findPopularMovies()
);

export const findTopMoviesThunk = createAsyncThunk(
  "topMovies/findTopMovies",
  async () => await moviesService.findTopMovies()
);

export const findUpcomingMoviesThunk = createAsyncThunk(
  "upcomingMovies/findUpcomingMovies",
  async () => await moviesService.findUpcomingMovies()
);

export const findAudienceReviewsThunk = createAsyncThunk(
  "audienceReviews/findAudienceReviews",
  async (movieId) => await moviesService.findAudienceReviews(movieId)
);

export const findGenresThunk = createAsyncThunk(
  "genres/findGenres",
  async () => await moviesService.findGenres()
);

export const findGenreMoviesThunk = createAsyncThunk(
  "genres/findGenreMovies",
  async (id) => await moviesService.findGenreMovies(id)
);

export const findBlockbustersThunk = createAsyncThunk(
  "hits/findBlockbusters",
  async (id) => await moviesService.findBlockbusters()
);