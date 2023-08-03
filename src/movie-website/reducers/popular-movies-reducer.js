import { createSlice } from "@reduxjs/toolkit";
import { findPopularMoviesThunk } from "../services/movies-thunks";

const initialState = {
  popularMovies: [],
  loading: false,
};

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  extraReducers: {
    [findPopularMoviesThunk.pending]: (state) => {
      state.loading = true;
      state.popularMovies = [];
    },
    [findPopularMoviesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.popularMovies = payload;
    },
    [findPopularMoviesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default popularMoviesSlice.reducer;
