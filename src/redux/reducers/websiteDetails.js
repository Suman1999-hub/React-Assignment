import { createSlice } from "@reduxjs/toolkit";
import { updateDetails, clearDetails } from "../actions";

const initialState = {
  data: {},
};

const websiteDetailsDataSlice = createSlice({
  name: "websiteDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDetails, (state, action) => {
        console.log("action >", action);
        state.data = action.payload;
      })

      .addCase(clearDetails, (state, action) => {
        state.data = {};
      });
  },
});

export const websiteDetailsDataReducer = websiteDetailsDataSlice.reducer;
