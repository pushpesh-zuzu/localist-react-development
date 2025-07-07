import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";
import sellerSlice from "./Seller/SellerSlice";
import notificationReducer from "./Seller/notificationService";
import leadSettingSlice from "./LeadSetting/leadSettingSlice";
import suggestQuestionsSlice from "./LeadSetting/SuggestQuestionSlice";
import myprofileSlice from "./MyProfile/myProfileSlice"
import myCreditSlice from "./MyProfile/MyCredit/MyCreditSlice";
import dashboardSlice from "./Dashboard/dashboardSlice"

const store = configureStore({
  reducer: {
    findJobs: findJobSlice,
    auth: authSlice,
    buyer: buyerSlice,
    seller: sellerSlice,
    notification: notificationReducer,
    leadSetting: leadSettingSlice,
    suggestQuestion: suggestQuestionsSlice,
    myProfile: myprofileSlice,
      myCredit: myCreditSlice, 
      dashboard:dashboardSlice
  },
});

export default store;
