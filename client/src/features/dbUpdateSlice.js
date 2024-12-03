import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const user = JSON.parse(localStorage.getItem("user"));

export const uploadData = createAsyncThunk("db/upload", async (data) => {
  console.log(data);
  const res = await axios.post("http://localhost:5000/api/admin/update", data, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
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
