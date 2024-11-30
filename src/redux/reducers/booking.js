import { createSlice } from "@reduxjs/toolkit";
import { updateBooking, clearBooking } from "../actions";
import { addBooking } from "../actions/booking";

const initialState = {
  step1: null,
  step2: null,
  step3: null,
  step4: null,
  agentIds: [],
};

const BookingDataSlice = createSlice({
  name: "bookingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBooking, (state, action) => {
        console.log("action >", action);
        state.step1 = action.payload?.step1;
        state.step2 = action.payload?.step2;
        state.step3 = action.payload?.step3;
        state.step4 = action.payload?.step4;
        state.agentIds = action.payload?.agentIds;
      })

      .addCase(clearBooking, (state, action) => {
        state.step1 = null;
        state.step2 = null;
        state.step3 = null;
        state.step4 = null;
        state.agentIds = [];
      });
  },
});

export const bookingDataReducer = BookingDataSlice.reducer;
