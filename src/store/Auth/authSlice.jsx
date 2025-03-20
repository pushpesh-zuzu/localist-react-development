import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  adminToken: JSON.parse(localStorage.getItem("barkToken")) || null,
  userToken: JSON.parse(localStorage.getItem("barkUserToken")) || null,
  loginLoader: false,
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
    dispatch(setToken(null));
    dispatch(setUserToken(null));
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
  },
});

export const { setToken, setLoginLoader,setUserToken } = authSlice.actions;

export default authSlice.reducer;
