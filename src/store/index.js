import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";
import leadSettingSlice from "./LeadSetting/leadSettingSlice";
import suggestQuestionsSlice from "./LeadSetting/SuggestQuestionSlice";
import myprofileSlice from "./MyProfile/myProfileSlice"

const store = configureStore({
  reducer: {
    findJobs: findJobSlice,
    auth: authSlice,
    buyer: buyerSlice,
    leadSetting: leadSettingSlice,
    suggestQuestion: suggestQuestionsSlice,
    myProfile: myprofileSlice
  },
});

export default store;
