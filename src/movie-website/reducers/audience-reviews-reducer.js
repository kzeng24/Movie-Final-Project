import { createSlice } from "@reduxjs/toolkit";
import { findAudienceReviewsThunk } from "../services/movies-thunks";

const initialState = {
  audienceReviews: [],
  loading: false,
};

const audienceReviewsSlice = createSlice({
  name: "audienceReviews",
  initialState,
  extraReducers: {
    [findAudienceReviewsThunk.pending]: (state) => {
      state.loading = true;
      state.audienceReviews = [];
    },
    [findAudienceReviewsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.audienceReviews = payload;
    },
    [findAudienceReviewsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default audienceReviewsSlice.reducer;
