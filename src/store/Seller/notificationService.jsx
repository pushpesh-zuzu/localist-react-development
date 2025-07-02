import axiosInstance from "../../Api/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationList: [],
  notificationLoader: false,
  addNotificationLoader: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationList: (state, action) => {
      state.notificationList = action.payload;
    },
    setNotificationLoader: (state, action) => {
      state.notificationLoader = action.payload;
    },
  },
});

export const { setNotificationList, setNotificationLoader } = notificationSlice.actions;
export default notificationSlice.reducer;

export const getNotificationList = (payload) => {
  return async (dispatch) => {
    dispatch(setNotificationLoader(true));
    try {
      const response = await axiosInstance.post("notification/fetch-all-notifications", payload);
      const data = response?.data?.data || [];
      dispatch(setNotificationList(data));
      return data;
    } catch (err) {
      console.error("Notification fetch failed:", err?.response?.data?.message || err.message);
    } finally {
      dispatch(setNotificationLoader(false));
    }
  };
};

export const markNotificationsAsRead = (payload) => {
  return async (dispatch) => {
    try {
      await axiosInstance.post(`notification/mark-as-read`, payload);
      dispatch(getNotificationList(payload));
    } catch (error) {
      console.log("Failed to mark notifications as read", error);
    }
  };
};
