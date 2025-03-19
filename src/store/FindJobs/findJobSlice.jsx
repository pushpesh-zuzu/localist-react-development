import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { showToast } from "../../utils";

const initialState = {
    popularList:[],
    popularLoader:false,
    searchServiceLoader:false,
    service:[],
    registerLoader:false
    
};
export const getPopularServiceList = () => {
    return async (dispatch) => {
      dispatch(setPopularServiceListLoader(true));
      try {
        const response = await axiosInstance.get(`popular-services`);
        if (response) {
          dispatch(setPopularList(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setPopularServiceListLoader(false));
      }
    };
  };
  export const searchService = (ServiceData) => {
    return async (dispatch) => {
      dispatch(setsearchServiceLoader(true));
      try {
        const response = await axiosInstance.post(`search-services`, ServiceData);
  
        if (response) {
            dispatch(setService(response?.data?.data))
          
        }
      } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setsearchServiceLoader(false));
      }
    };
  };
  
  export const registerUserData = (registerData) => {
    return async (dispatch) => {
      dispatch(setRegisterLoader(true));
      try {
        const response = await axiosInstance.post(`registration`, registerData);
  
        if (response) {
            // dispatch(setService(response?.data?.data))
            return response.data;
        }
        else{
            showToast("error", response?.message || "Register failed. Please try again.");
        }
      } catch (error) {
        console.log(error,"kk")
        showToast("error", error?.message || "Register failed. Please try again.");
      } finally {
        dispatch(setRegisterLoader(false));
      }
    };
  };
  
  

const findJobSlice = createSlice({
  name: "findJobs",
  initialState: initialState,
  reducers: {
    setPopularList(state,action){
state.popularList = action.payload
    },
    setPopularServiceListLoader(state,action){
        state.popularLoader=action.payload
    },
    setService(state,action){
        state.service= action.payload
    },
  
    setsearchServiceLoader(state,action) {
        state.searchServiceLoader= action.payload
    }
    ,setRegisterLoader(state,action){
        state.registerLoader = action.payload
    }
  }
});


export const {
    setPopularServiceListLoader,setPopularList,
    setsearchServiceLoader,setService,setRegisterLoader
  
} = findJobSlice.actions;
export default findJobSlice.reducer;