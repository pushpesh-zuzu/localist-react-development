import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  adminToken: JSON.parse(localStorage.getItem("barkToken")) || null,
  loginLoader: false,
};

export const userLogin = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginLoader(true));
    try {

      const response = await axiosInstance.post(`login`, loginData);

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
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
  },
});

export const { setToken, setLoginLoader } = authSlice.actions;

export default authSlice.reducer;
