import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  header: [],
};

// Async thunk for user sign-in
export const headerRead = createAsyncThunk("db/header", async (data) => {
  const res = await axios.post(
    "http://localhost:5000/api/admin/headers",
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return res.data;
});

const headerReadSlice = createSlice({
  name: "dbData",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(headerRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(headerRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.header = action.payload;
      })
      .addCase(headerRead.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    /////////////  DB Update /////////////////////////
  },
});

export const { reset } = headerReadSlice.actions;

export default headerReadSlice.reducer;
