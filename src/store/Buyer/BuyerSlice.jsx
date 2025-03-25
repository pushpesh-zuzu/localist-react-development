import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import WhatServiceYouNeed from "../../component/buyerPanel/PlaceNewRequest/BuyerRegistration/WhatServiceYouNeed/WhatServiceYouNeed";

const initialState = {
  buyerRegistrationModals: {
    WhatServiceYouNeed: null,
    ServiceYouNeed: null,
    // baki ke steps yaha ayenge
  },
};

export const questionAnswerData = (questionData) => {
  return async (dispatch) => {
    dispatch(setquestionLoader(true));
    try {
      const response = await axiosInstance.post(
        `questions-answer`,
        questionData
      );

      if (response) {
        // dispatch(setService(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setquestionLoader(false));
    }
  };
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState: initialState,
  reducers: {
    setquestionLoader(state, action) {
      state.questionLoader = action.payload;
    },
    setBuyerRegistrationModals(state, action) {
      const { modalName, value } = action.payload;
      state.buyerRegistrationModals[modalName] = value;
    },
  },
});

export const { setquestionLoader, setBuyerRegistrationModals } =
  buyerSlice.actions;

export default buyerSlice.reducer;
