import { createSlice } from "@reduxjs/toolkit";

export const session = createSlice({
  name: "session",
  initialState: {
    isAuth: false,
  },
  reducers: {
    signin: (state) => {
      state.isAuth = true;
    },
    logout: (state, action) => {
      state.isAuth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, logout, } = session.actions;

export default session.reducer;
