import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


const initialState = {
    preferenceLoader:false,
    preferenceList:[],
    leadPreferenceLoader:false,
    serviceLoader:false,
    leadPreferenceData:[],
    leadRequestLoader:false,
    leadRequestList:[], 
    getlocationData:[],
    autoBidList:[]
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
            return response.data;
        //   dispatch(setLeadPreferenceData(response?.data?.data));
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
            dispatch(setLeadPreferenceData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const getLeadRequestList = () => {
    return async (dispatch) => {
      dispatch(setLeadListLoader(true));
      try {
        const response = await axiosInstance.get(`users/get-lead-request`);
        if (response) {
          dispatch(setLeadRequestListData(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setLeadListLoader(false));
      }
    };
  };
  export const addServiceLead = (ServiceData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/add_service`, ServiceData);
  
        if (response) {
            dispatch(setLeadPreferenceData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const addLocationLead = (locationData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/add_location`, locationData);
  
        if (response) {
            dispatch(setLeadPreferenceData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const getLocationLead = (getlocationData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get_user_locations`, getlocationData);
  
        if (response) {
            dispatch(setGetLocationData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const getAutoBid = (bidData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/autobid-list`, bidData);
  
        if (response) {
            dispatch(setAutoBidData(response?.data?.data));
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
    },
    setLeadPreferenceData(state, action) {
        state.leadPreferenceData = action.payload;
      },
      setLeadListLoader(state, action) {
        state.leadRequestLoader = action.payload;
      },
      setLeadRequestListData(state, action) {
        state.leadRequestList = action.payload;
      },
      setGetLocationData(state,action) {
        state.getlocationData = action.payload
      },
      setAutoBidData(state,action){
        state.autoBidList = action.payload
      }
   
  },
});

export const {setleadPreferencesListLoader,setAutoBidData,setGetLocationData,setPreferencesList,setleadPreferencesLoader,setServiceListLoader,setLeadPreferenceData,setLeadListLoader,setLeadRequestListData} = leadSettingSlice.actions;

export default leadSettingSlice.reducer;
