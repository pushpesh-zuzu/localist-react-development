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
},
qualityData:{},
addDetailLoader:false,
buyerrequestListLoader:false, 
buyerRequestList:[] ,
getuploadImg:[],
infoLoader:false,
requestLoader:false,
submitImageLoader:false,
notificationList:[],
notificationLoader:false,
addNotificationLoader:false
};

export const questionAnswerData = (questionData) => {
  return async (dispatch) => {
    dispatch(setquestionLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/questions-answer`,
        questionData,
        {
          headers: {
            Authorization: null,
          },
        }
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
    
    dispatch(setCreateRequesLoader(true));
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
        return response.data
        // navigate("/buyers/create");
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setCreateRequesLoader(false));
    }
  };
};

export const updateProfileData = () => {
  return async (dispatch) => {
    dispatch(setProfileLoader(true));
    try {
      const response = await axiosInstance.get(
        `customer/setting/get-profile-info`,
        
      );

      if (response) {
        dispatch(setGetUploadImgData(response?.data?.data));
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
        `customer/setting/update-profile-image`,
        profileImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (response) {
        dispatch(updateProfileData());
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
        `customer/setting/change-password`,
        changeData
      );

      if (response) {
       return response.data
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setChangePasswordLoader(false));
    }
  };
};
export const updateUserIfoData = (userData) => {
  return async (dispatch) => {
    dispatch(setChangeInfoLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/setting/update-profile-info`,
        userData
      );

      if (response) {
        return response.data
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setChangeInfoLoader(false));
    }
  };
};
export const addImageSubmittedData = (ImageData) => {
  return async (dispatch) => {
    dispatch(setSubmitImageLoader(true));
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
      dispatch(setSubmitImageLoader(false));
    }
  };
};

export const textQualityData = (qualityData) => {
  return async (dispatch) => {
    // dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/check-paragraph-quality`,
        qualityData
      );

      if (response) {
        dispatch(setQualityData(response?.data?.data?.quality_score));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      // dispatch(setChangePasswordLoader(false));
    }
  };
};
export const getbuyerrequestList = () => {
  return async (dispatch) => {
    dispatch(setbuyerrequestListLoader(true));
    try {
      const response = await axiosInstance.get(`customer/my-request/get-submitted-request-list`);
      if (response) {
        dispatch(setbuyerRequestList(response?.data?.data));
     
      }
    } catch (error) {
      console.log("error", error?.response?.data?.message);
    } finally {
      dispatch(setbuyerrequestListLoader(false));
    }
  };
};

export const addDetailsRequestData = (addDetailsData) => {
  return async (dispatch) => {
    dispatch(setAddDetailLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/add-details-to-request`,
        addDetailsData
      );

      if (response) {
        dispatch(getbuyerrequestList())
        return response.data
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setAddDetailLoader(false));
    }
  };
};
export const getNotificationData = (NotificationData) => {
  return async (dispatch) => {
    dispatch(setNotificationLoader(true));
    try {
      const response = await axiosInstance.post(
        `notification/get-notification-settings`,
        NotificationData
      );

      if (response) {
       dispatch(setGetNotificationData(response?.data?.data));
        return response.data
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setNotificationLoader(false));
    }
  };
};

export const addNotificationData = (addNotificationData) => {
  return async (dispatch) => {
    dispatch(setAddNotificationLoader(true));
    try {
      const response = await axiosInstance.post(
        `notification/add-update-notification-settings`,
        addNotificationData
      );

      if (response) {
      //  dispatch(setGetNotificationData(response?.data?.data));
        return response.data
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setAddNotificationLoader(false));
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
    },
    setQualityData(state,action){
      state.qualityData = action.payload
    },
    setAddDetailLoader(state,action){
      state.addDetailLoader = action.payload
    },
    setbuyerrequestListLoader(state,action){
      state.buyerrequestListLoader = action.payload
    },
    setbuyerRequestList(state,action){
      state.buyerRequestList = action.payload
    } ,
    setGetUploadImgData(state,action) {
      state.getuploadImg = action.payload
    },
    setChangeInfoLoader(state,action){
      state.infoLoader = action.payload
    },
    setCreateRequesLoader(state,action){
      state.requestLoader = action.payload
    },
    setSubmitImageLoader(state,action){
      state.submitImageLoader = action.payload
    },
    setGetNotificationData(state, action) {   
      state.notificationList = action.payload;
    },
    setNotificationLoader(state, action) {
      state.notificationLoader = action.payload;
    },
    setAddNotificationLoader(state, action) {
      state.addNotificationLoader = action.payload;
    },
  },
});

export const { setquestionLoader,setAddNotificationLoader,setQuestionAnswerData,setNotificationLoader,setBuyerStep,setProfileLoader,setProfileImageLoader,setSubmitImageLoader,setChangePasswordLoader,setbuyerRequestData,setRequestId,setQualityData,setAddDetailLoader,setbuyerrequestListLoader,setbuyerRequestList,setGetUploadImgData,setChangeInfoLoader,setCreateRequesLoader,setGetNotificationData } = buyerSlice.actions;

export default buyerSlice.reducer;
