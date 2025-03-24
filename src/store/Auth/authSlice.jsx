import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { setRegisterData, setRegisterToken } from "../FindJobs/findJobSlice";

const initialState = {
  adminToken: JSON.parse(localStorage.getItem("barkToken")) || null,
  userToken: JSON.parse(localStorage.getItem("barkUserToken")) || null,
  loginLoader: false,
  logoutLoader:false
};

export const userLogin = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginLoader(true));
    try {

      const response = await axiosInstance.post(`login`, loginData);

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
        dispatch(setUserToken(response?.data?.data));
        return response.data;
      } else {
          throw new Error(response?.data?.message || "Login failed");
 
      }
    } catch (error) {
      
      
      throw error;
    } finally {
      dispatch(setLoginLoader(false));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(setLogoutLoader(true));
    try {
      const response = await axiosInstance.post("logout");
      
      if (response) {
        dispatch(setToken(null));
        dispatch(setUserToken(null))
        dispatch(setRegisterToken(null))
        dispatch(setRegisterData(null))
        return true;
      }
    } catch (error) {
     
    } finally {
      dispatch(setLogoutLoader(false));
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.adminToken = action.payload;
      localStorage.setItem("barkToken", JSON.stringify(action.payload));
    },
    setLoginLoader(state, action) {
      state.loginLoader = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem("barkUserToken", JSON.stringify(action.payload));
    },
    setLogoutLoader(state,action){
      state.logoutLoader = action.payload
    }
  },
});

export const { setToken, setLoginLoader,setUserToken,setLogoutLoader} = authSlice.actions;

export default authSlice.reducer;
