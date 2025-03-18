import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  adminToken: JSON.parse(localStorage.getItem("barkToken")) || null,
  loginLoader: false,
};

export const userLogin = (loginData) => {
  return async (dispatch, getState) => {
    dispatch(setLoginLoader(true));
    try {
      const response = await axiosInstance.post(`login`, loginData);

      if (response) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
      }
    } catch (error) {
    //   dispatch(setAuthError(error?.response?.data?.message));
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

export const {
  setToken,
  setLoginLoader,
} = authSlice.actions;

export default authSlice.reducer;
