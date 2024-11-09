import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: "",
  error: false,
  success: false,
};

export const keySearch = createAsyncThunk("key/Search", async (data) => {
  const res = await axios.post("http://192.168.1.69:5000/sdr/reverse", data);
  console.log(res);
  return res;
});

const keySlice = createSlice({
    name: "key",
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
        .addCase(keySearch.pending, (state) => {
          state.loading = true;
          state.data = "";
          state.error = false;
          state.success = false;
        })
        .addCase(keySearch.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = false;
          state.success = true;
        })
        .addCase(keySearch.rejected, (state) => {
          state.loading = false;
          state.error = true;
          state.data = "";
          state.success = false;
        });
    },
  });
  

export const { reset } = keySlice.actions;
export default keySlice.reducer;
