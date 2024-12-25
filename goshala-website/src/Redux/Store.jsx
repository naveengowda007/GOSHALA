import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Redux/AuthSlice";

export const Store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
