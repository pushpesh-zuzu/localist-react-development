import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";

const store = configureStore({
  reducer: {
    findJobs:findJobSlice,
    auth:authSlice,
    buyer:buyerSlice
  },
});

export default store;
