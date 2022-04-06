import { createSlice } from "@reduxjs/toolkit";

export const snackbar = createSlice({
  name: "snackbar",
  initialState: {
    visible: false,
    message: ""
  },
  reducers: {
    openSnackBar: (state, action) => {
      state.visible = true;
      state.message = action.payload;
    },
    closeSnackBar: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSnackBar, closeSnackBar, } = snackbar.actions;

export default snackbar.reducer;
