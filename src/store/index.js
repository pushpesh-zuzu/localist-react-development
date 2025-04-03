import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";
import leadSettingSlice from "./LeadSetting/leadSettingSlice"

const store = configureStore({
  reducer: {
    findJobs:findJobSlice,
    auth:authSlice,
    buyer:buyerSlice,
    leadSetting:leadSettingSlice
  },
});

export default store;
