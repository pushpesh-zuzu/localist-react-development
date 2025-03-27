import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import axios from "axios";

const initialState = {
  questionLoader:false,
  questionanswerData:[],
  buyerStep:1,
  profileLoader:false,
  profileImageLoader:false,
  changePasswordLoader:false,
  requestId:"",
  buyerRequest:{
    service_id:"",
    postcode:"",
    questions:[],
    phone:"",
    recevive_online:""
}
};

export const questionAnswerData = (questionData) => {
  return async (dispatch) => {
    dispatch(setquestionLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/questions-answer`,
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
export const createRequestData = (requestData) => {
  return async (dispatch) => {
    
    dispatch(setProfileLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/create-new-request`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        
        // dispatch(setQuestionAnswerData(response?.data?.data));
        dispatch(setRequestId(response?.data?.data?.request_id))
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setProfileLoader(false));
    }
  };
};

export const updateProfileData = (profileData) => {
  return async (dispatch) => {
    dispatch(setProfileLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/update-profile`,
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
        `users/update-profile-image`,
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
        `users/change-password`,
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
export const addImageSubmittedData = (ImageData) => {
  return async (dispatch) => {
    dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/add-image-to-submitted-request`,
        ImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

export const textQualityData = (qualityData) => {
  return async (dispatch) => {
    dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/check-paragraph-quality`,
        qualityData
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

export const addDetailsRequestData = (addDetailsData) => {
  return async (dispatch) => {
    dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/add-details-to-request`,
        addDetailsData
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
    },
    setbuyerRequestData(state, action) {
      state.buyerRequest =  { ...state.buyerRequest, ...action.payload };
    },
    setRequestId(state,action){
      state.requestId = action.payload
    }
    // setQuestions(state, action) {   
    //   state.buyerRequest.questionData = action.payload;
    // },
  },
});

export const { setquestionLoader,setQuestionAnswerData,setBuyerStep,setProfileLoader,setProfileImageLoader,setChangePasswordLoader,setbuyerRequestData,setRequestId } = buyerSlice.actions;

export default buyerSlice.reducer;
