import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: user ? user : null,
};

export const signinUser = createAsyncThunk("user/signIn", async (data) => {
  const res = await axios.post("http://localhost:5000/api/auth/", data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => { // Builder callback notation
    builder.addCase(signinUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(signinUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
