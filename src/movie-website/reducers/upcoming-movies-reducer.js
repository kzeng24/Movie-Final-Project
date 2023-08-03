import { createSlice } from "@reduxjs/toolkit";
import { findUpcomingMoviesThunk } from "../services/movies-thunks";

const initialState = {
  upcomingMovies: [],
  loading: false,
};

const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState,
  extraReducers: {
    [findUpcomingMoviesThunk.pending]: (state) => {
      state.loading = true;
      state.upcomingMovies = [];
    },
    [findUpcomingMoviesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.upcomingMovies = payload;
    },
    [findUpcomingMoviesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default upcomingMoviesSlice.reducer;
