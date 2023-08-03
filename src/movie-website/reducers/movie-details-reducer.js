import { createSlice } from "@reduxjs/toolkit";
import { findMovieDetailsThunk } from "../services/movies-thunks";

const initialState = {
  movieDetails: {},
  loading: false,
};

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  extraReducers: {
    [findMovieDetailsThunk.pending]: (state) => {
      state.loading = true;
      state.movieDetails = {};
    },
    [findMovieDetailsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.movieDetails = payload;
    },
    [findMovieDetailsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default movieDetailsSlice.reducer;
