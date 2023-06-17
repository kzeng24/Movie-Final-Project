import { createSlice } from "@reduxjs/toolkit";
import { findMovieVideoThunk } from "../services/movie-video-thunks";

const initialState = {
  video: "",
  loading: false,
};

const movieVideoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: {
    [findMovieVideoThunk.pending]: (state) => {
      state.loading = true;
      state.video = "";
    },
    [findMovieVideoThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.video = "https://www.youtube.com/watch?v=" + payload;
      console.log(state.video);
    },
    [findMovieVideoThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default movieVideoSlice.reducer;
