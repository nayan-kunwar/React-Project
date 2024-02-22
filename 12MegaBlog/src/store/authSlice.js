//1- File for track authentication. That user is authenticated or not we ask from store

import { createSlice } from "@reduxjs/toolkit";

//This is a state in store
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { // login and logout are actions
    login: (state, action) => { //any value need to update happens in state, action contain payload
      state.status = true, 
      state.userData = action.payload.userData; // action.payload = {userData} coming from App.jsx
    },
    logout: (state) => {
        state.status = false,
        state.userData = null
    }
  },
});

export const { login, logout } = authSlice.actions; //login and logout value is extracted from -> authSlice.actions = {}
// export reducer from authSlice
export default authSlice.reducer;


// create slice for post too