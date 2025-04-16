import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";
import leadSettingSlice from "./LeadSetting/leadSettingSlice";
import suggestQuestionsSlice from "./LeadSetting/SuggestQuestionSlice";

const store = configureStore({
  reducer: {
    findJobs: findJobSlice,
    auth: authSlice,
    buyer: buyerSlice,
    leadSetting: leadSettingSlice,
    suggestQuestion: suggestQuestionsSlice,
  },
});

export default store;
