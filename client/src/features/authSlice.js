import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: user ? user : null,
};

// Async thunk for user sign-in
export const signinUser = createAsyncThunk("user/signIn", async (data) => {
  const res = await axios.post("http://localhost:5000/api/auth/", data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
});

// Async thunk for user sign-up
export const signUpUser = createAsyncThunk("user/signUp", async (data) => {
  const res = await axios.post("http://localhost:5000/api/auth/signup/", data);
  return res.data;
});

export const logOutUser = createAsyncThunk("user/logOut", async (data) => {
  await localStorage.removeItem("user");
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
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logOutUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.user = null; // Clear the user data on successful logout
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload; // Set the error message
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
