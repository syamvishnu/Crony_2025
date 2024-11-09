import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: "",
  error: false,
  success: false,
};

// Async thunk for SDR search
export const sdrSearch = createAsyncThunk("sdr/Search", async (data) => {
  const res = await axios.post("http://192.168.1.69:5000/api/sdr", data);
  return res;
});

const sdrSlice = createSlice({
  name: "sdr",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.data = "";
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sdrSearch.pending, (state) => {
        state.loading = true;
        state.data = "";
        state.error = false;
        state.success = false;
      })
      .addCase(sdrSearch.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.success = true;
      })
      .addCase(sdrSearch.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = "";
        state.success = false;
      });
  },
});

export const { reset } = sdrSlice.actions;

export default sdrSlice.reducer;
