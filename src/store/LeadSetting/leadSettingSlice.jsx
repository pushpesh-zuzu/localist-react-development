import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


const initialState = {
    preferenceLoader:false,
    preferenceList:[],
    leadPreferenceLoader:false,
    serviceLoader:false
};


export const getleadPreferencesList = (serviceId) => {
    return async (dispatch) => {
      dispatch(setServiceListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-services`,serviceId);
        if (response) {
          dispatch(setPreferencesList(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setServiceListLoader(false));
      }
    };
  };


  export const leadPreferencesData = (leadPreferencesData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesLoader(true));
      try {
        const response = await axiosInstance.post(`users/lead-preferences`, leadPreferencesData);
  
        if (response) {
        //   dispatch(setService(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesLoader(false));
      }
    };
  }
  export const leadPreferences = (leadPreferencesData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-lead-preferences`, leadPreferencesData);
  
        if (response) {
        //   dispatch(setService(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }

const leadSettingSlice = createSlice({
  name: "leadSetting",
  initialState: initialState,
  reducers: {
    setleadPreferencesListLoader(state,action) {
        state.preferenceLoader = action.payload
    },
    setPreferencesList(state,action) {
        state.preferenceList = action.payload
    },
    setleadPreferencesLoader(state,action){
        state.leadPreferenceLoader = action.payload
    },
    setServiceListLoader(state,action){
        state.serviceLoader = action.payload
    }
   
  },
});

export const {setleadPreferencesListLoader,setPreferencesList,setleadPreferencesLoader,setServiceListLoader } = leadSettingSlice.actions;

export default leadSettingSlice.reducer;
