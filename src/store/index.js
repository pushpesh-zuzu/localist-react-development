import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice"

const store = configureStore({
  reducer: {
    findJobs:findJobSlice,
    auth:authSlice
  },
});

export default store;
