import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  questionLoader:false,
  questionanswerData:[],
  buyerStep:1,
  profileLoader:false,
  profileImageLoader:false,
  changePasswordLoader:false
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
        dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setquestionLoader(false));
    }
  };
};


export const updateProfileData = (profileData) => {
  return async (dispatch) => {
    dispatch(setProfileLoader(true));
    try {
      const response = await axiosInstance.post(
        `update-profile`,
        profileData
      );

      if (response) {
        // dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setProfileLoader(false));
    }
  };
};
export const updateProfileImageData = (profileImageData) => {
  return async (dispatch) => {
    dispatch(setProfileImageLoader(true));
    try {
      const response = await axiosInstance.post(
        `update-profile-image`,
        profileImageData
      );

      if (response) {
        // dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setProfileImageLoader(false));
    }
  };
};
export const updatePasswordData = (changeData) => {
  return async (dispatch) => {
    dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `change-password`,
        changeData
      );

      if (response) {
        // dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setChangePasswordLoader(false));
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
    setQuestionAnswerData(state,action){
      state.questionanswerData = action.payload
    },
    setBuyerStep(state,action){
      state.buyerStep = action.payload
    },
    setProfileLoader(state,action){
      state.profileLoader = action.payload
    },
    setProfileImageLoader(state,action){
      state.profileImageLoader = action.payload
    },
    setChangePasswordLoader(state,action){
      state.changePasswordLoader = action.payload
    }
  },
});

export const { setquestionLoader,setQuestionAnswerData,setBuyerStep,setProfileLoader,setProfileImageLoader,setChangePasswordLoader } = buyerSlice.actions;

export default buyerSlice.reducer;
