import { createSlice } from "@reduxjs/toolkit";
import { findGenreMoviesThunk } from "../services/movies-thunks";

const initialState = {
  genreMovies: [],
  genre: "",
  loading: false,
};

const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState,
  extraReducers: {
    [findGenreMoviesThunk.pending]: (state) => {
      state.loading = true;
      state.genreMovies = [];
    },
    [findGenreMoviesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.genre = payload.name;
      state.genreMovies = payload.list;
    },
    [findGenreMoviesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default genreMoviesSlice.reducer;
