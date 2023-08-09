import { createSlice } from "@reduxjs/toolkit";
import { findBlockbustersThunk } from "../services/movies-thunks";

const initialState = {
  blockbusters: [],
  loading: false,
};

const blockbustersSlice = createSlice({
  name: "blockbusters",
  initialState,
  extraReducers: {
    [findBlockbustersThunk.pending]: (state) => {
      state.loading = true;
      state.blockbusters = [];
    },
    [findBlockbustersThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.blockbusters = payload;
    },
    [findBlockbustersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default blockbustersSlice.reducer;
