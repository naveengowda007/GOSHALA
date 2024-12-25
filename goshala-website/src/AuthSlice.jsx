import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // Login status
  userDetails: null, // User information like name, email, etc.
  token: null, // JWT or session token
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload.userDetails; // Store user details
      state.token = action.payload.token; // Store token
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.token = null;
    },
    Customer: (state) => {},
  },
});

export const { login, logout } = AuthSlice.actions; // Export actions
export default AuthSlice.reducer; // Export reducer
