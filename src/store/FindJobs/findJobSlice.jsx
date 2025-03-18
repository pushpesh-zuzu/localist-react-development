import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
    popularList:[],
    popularLoader:false,
    searchServiceLoader:false,
    service:[]
    
};
export const getPopularServiceList = () => {
    return async (dispatch, getState) => {
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
    return async (dispatch, getState) => {
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
  }
});


export const {
    setPopularServiceListLoader,setPopularList,
    setsearchServiceLoader,setService
  
} = findJobSlice.actions;
export default findJobSlice.reducer;