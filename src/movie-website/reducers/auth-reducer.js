import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk, updateUserThunk, registerThunk } from "../services/auth-thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null },
  loadingLogin: false,
  loadingRegister: false,
  reducers: {
    storeUserInLocalStorage: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.currentUser = action.payload;
    },
    removeUserFromLocalStorage: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.loadingLogin = false;
    },
    [loginThunk.pending]: (state) => {
      state.loadingLogin = true;
    },
    [loginThunk.rejected]: (state, action) => {
      state.loadingLogin = false;
      state.error = action.error;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      state.loadingLogin = false;
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;

    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;

    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.loadingRegister = false;
    },
    [registerThunk.pending]: (state) => {
      state.loadingRegister = true;
    },
    [registerThunk.rejected]: (state, action) => {
      state.loadingRegister = false;
      state.error = action.error;
    },
  },
});

export const { storeUserInLocalStorage, removeUserFromLocalStorage, setUser } = authSlice.actions;
export default authSlice.reducer;