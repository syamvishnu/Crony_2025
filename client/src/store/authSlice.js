import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: user ? user : null,
};

export const signUpUser = createAsyncThunk("user/signUp", async (data) => {
  const res = await axios.post("http://localhost:5000/register", data);

  return res.data;
});

export const signinUser = createAsyncThunk("user/signIn", async (data) => {
  console.log(data);
  const res = await axios.post("http://localhost:5000/login", data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
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
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    },
    [signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    [signinUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signinUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    },
    [signinUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    [logOutUser.fulfilled]: (state, action) => {
      state.user = null;
    },
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
