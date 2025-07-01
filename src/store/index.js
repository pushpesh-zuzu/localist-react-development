import { configureStore } from "@reduxjs/toolkit";
import findJobSlice from "./FindJobs/findJobSlice";
import authSlice from "./Auth/authSlice";
import buyerSlice from "./Buyer/BuyerSlice";
import sellerSlice from "./Seller/SellerSlice";
import leadSettingSlice from "./LeadSetting/leadSettingSlice";
import suggestQuestionsSlice from "./LeadSetting/SuggestQuestionSlice";
import myprofileSlice from "./MyProfile/myProfileSlice"
import myCreditSlice from "./MyProfile/MyCredit/MyCreditSlice";

const store = configureStore({
  reducer: {
    findJobs: findJobSlice,
    auth: authSlice,
    buyer: buyerSlice,
    seller: sellerSlice,
    leadSetting: leadSettingSlice,
    suggestQuestion: suggestQuestionsSlice,
    myProfile: myprofileSlice,
      myCredit: myCreditSlice, // Assuming MyCredit is part of myProfile
  },
});

export default store;
