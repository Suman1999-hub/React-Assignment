import { createSlice } from "@reduxjs/toolkit";
import { showLoader, hideLoader } from "../actions";

const initialState = { isVisible: false, loaderText: "Loading" };

const loaderDataSlice = createSlice({
  name: "loaderData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showLoader, (state, action) => {
        state.isVisible = true;
        state.loaderText = action.payload || "Loading";
      })

      .addCase(hideLoader, (state, action) => {
        state.isVisible = false;
        state.loaderText = "Loading";
      });
  },
});

export const loaderDataReducer = loaderDataSlice.reducer;
