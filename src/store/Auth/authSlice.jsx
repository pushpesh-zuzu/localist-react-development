import { createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { setRegisterData, setRegisterToken, setSelectedServiceId } from "../FindJobs/findJobSlice";

const userToken = JSON.parse(localStorage.getItem("barkUserToken"));
const initialState = {
  adminToken: JSON.parse(localStorage.getItem("barkToken")) || null,
  userToken: JSON.parse(localStorage.getItem("barkUserToken")) || null,
  loginLoader: false,
  logoutLoader:false,
  switchUserLoader:false,
  currentUser:userToken?.active_status || null,
};

export const userLogin = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginLoader(true));
    try {

      const response = await axiosInstance.post(`users/login`, loginData);

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
        dispatch(setUserToken(response?.data?.data));
        dispatch(setCurrentUser(response?.data?.data?.user_type));
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
      const response = await axiosInstance.post("users/logout");
      
      if (response) {
        dispatch(setToken(null));
        dispatch(setUserToken(null))
        dispatch(setRegisterToken(null))
        dispatch(setRegisterData(null))
        dispatch(setSelectedServiceId(null))
        return true;
      }
    } catch (error) {
     
    } finally {
      dispatch(setLogoutLoader(false));
    }
  };
};

export const switchUser = (switchData) => {
  return async (dispatch) => {
    dispatch(setSwitchUserLoader(true));
    try {

      const response = await axiosInstance.post(`users/switch_user`, switchData);

      if (response?.data?.success) {
       
        return response.data;
      } else {
          throw new Error(response?.data?.message || "Switch User failed");
 
      }
    } catch (error) {
      
      
      throw error;
    } finally {
      dispatch(setSwitchUserLoader(false));
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
    },
    setSwitchUserLoader(state, action) {
      state.switchUserLoader = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
   
  },
});

export const { setToken, setLoginLoader,setUserToken,setLogoutLoader,setSwitchUserLoader,setCurrentUser} = authSlice.actions;

export default authSlice.reducer;
