import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

// Async thunk for user sign-in
export const headerRead = createAsyncThunk("db/header", async (data) => {
  const res = await axios.post("http://localhost:5000/api/admin/headers", data);
  return res.data;
});

export const uploadData = createAsyncThunk("db/upload", async (data) => {
  console.log(data);
  const res = await axios.post("http://localhost:5000/api/admin/update", data);
  return res.data;
});

const dbData = createSlice({
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
        state.data = action.payload;
      })
      .addCase(headerRead.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      /////////////  DB Update /////////////////////////

      .addCase(uploadData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(uploadData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = dbData.actions;

export default dbData.reducer;
