import { createSlice } from "@reduxjs/toolkit";

export const drawer = createSlice({
  name: "drawer",
  initialState: {
    visibility: false,
    body: "",
    title: "",
    width: 400,
  },
  reducers: {
    openDrawer: (state, action) => {
      const { body, title, width } = action.payload;
      state.visibility = true;
      state.body = body;
      state.title = title;
      state.width = width;
    },
    closeDrawer: (state) => {
      state.visibility = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openDrawer, closeDrawer } = drawer.actions;

export default drawer.reducer;
