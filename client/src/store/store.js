import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import sdrReducer from "../features/sdrSlice";
import keywordReducer from "../features/keywordSlice"

export const store = configureStore({
  reducer: {
    user: authReducer,
    sdr: sdrReducer,
    key: keywordReducer,
  },
});
