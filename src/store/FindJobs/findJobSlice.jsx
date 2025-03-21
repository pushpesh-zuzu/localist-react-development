import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../utils";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
    popularList:[],
    popularLoader:false,
    searchServiceLoader:false,
    service:[],
    registerLoader:false,
    registerStep:1,
    registerToken:JSON.parse(localStorage.getItem("registerTokens")) || null
    
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
        
            dispatch(setRegisterToken(response?.data?.data?.remember_tokens));
            return response.data;
        }
        else{
            showToast("error", response?.message || "Register failed. Please try again.");
        }
      } catch (error) {
      
        const errorData = error?.response?.data?.message;

        if (errorData && typeof errorData === "object") {
        
          Object.values(errorData).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => showToast("error", msg));
            } else {
              showToast("error", messages);
            }
          });
        } else {
          showToast("error", error?.response?.data?.message || "Register failed. Please try again.");
        }
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
    },
    setRegisterStep(state,action) {
      state.registerStep = action.payload
    },
    setRegisterToken(state,action){
        state.registerToken = action.payload;
        localStorage.setItem("registerTokens", JSON.stringify(action.payload))
    }
  }
});


export const {
    setPopularServiceListLoader,setPopularList,
    setsearchServiceLoader,setService,setRegisterLoader,
    setRegisterStep,setRegisterToken
  
} = findJobSlice.actions;
export default findJobSlice.reducer;