import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: user ? user : null,
  message: "",
  validationErrors: "",
};

// Async thunk for user sign-in
export const signinUser = createAsyncThunk(
  "user/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://192.168.1.10:5000/api/auth/", data);
      console.log(res.data);
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://192.168.1.10:5000/api/auth/signup/",
        data
      );
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      return rejectWithValue("Failed to log out");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.validationErrors = "";
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
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.validationErrors = action.payload?.errors || {};
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
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.validationErrors = action.payload?.errors || {};
      })
      .addCase(logOutUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.status = "fulfilled";
        state.user = null; // Clear the user data on successful logout
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload; // Set the error message
        state.validationErrors = action.payload?.errors || {};
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
