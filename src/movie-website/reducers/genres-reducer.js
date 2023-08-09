import { createSlice } from "@reduxjs/toolkit";
import { findGenresThunk } from "../services/movies-thunks";

const initialState = {
  genres: [],
  loading: false,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  extraReducers: {
    [findGenresThunk.pending]: (state) => {
      state.loading = true;
      state.genres = [];
    },
    [findGenresThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.genres = payload;
    },
    [findGenresThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default genresSlice.reducer;
