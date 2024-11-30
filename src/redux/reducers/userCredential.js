import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoggedInUserDetail } from "../../http/http-calls";
import {
  addUserCredential,
  updateUserData,
  clearUserCredential,
} from "../actions";

export const getAndUpdateUserData = createAsyncThunk(
  "userCredential/getAndUpdateUserData",
  async (payload, thunkAPI) => {
    const res = await getLoggedInUserDetail();
    return res?.user;
  }
);

const initialState = {
  token: null,
  user: null,
};

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserCredential, (state, action) => {
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })

      .addCase(updateUserData, (state, action) => {
        state.user = action.payload;
      })

      .addCase(clearUserCredential, (state, action) => {
        state.token = null;
        state.user = null;
      })

      .addCase(getAndUpdateUserData.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAndUpdateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const userCredentialReducer = userCredentialSlice.reducer;
