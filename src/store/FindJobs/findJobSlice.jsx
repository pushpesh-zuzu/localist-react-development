import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../utils";
import axiosInstance from "../../Api/axiosInstance.js";

const initialState = {
  popularList: [],
  popularLoader: false,
  searchServiceLoader: false,
  service: [],
  registerData:JSON.parse(localStorage.getItem("registerDataToken")) || null,
  registerLoader: false,
  registerStep: 0,
  registerToken: JSON.parse(localStorage.getItem("registerTokens")) || null,
  selectedServiceId: null,
  selectedServices:[],
  selectedServiceFormData:{
    miles1: "1",
    postcode: null,
    nation_wide: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    company_name: "",
    company_size: null,
    company_sales_team: null,
    company_website: "",
    is_company_website: 1,
    new_jobs: null,
    social_media: null,
    address: "",
    state: "",
    city: "",
    zipcode: "",
    is_zipcode: 1,
    suite: "",
    service_id: [],
    auto_bid: 0,
    miles2: "1",
  },
  
};
export const getPopularServiceList = () => {
  return async (dispatch) => {
    dispatch(setPopularServiceListLoader(true));
    try {
      const response = await axiosInstance.get(`users/popular-services`);
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
      const response = await axiosInstance.post(`users/search-services`, ServiceData);

      if (response) {
        dispatch(setService(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setsearchServiceLoader(false));
    }
  };
}
export const registerUserData = (registerData) => {
  return async (dispatch) => {
    dispatch(setRegisterLoader(true));
    try {
      const response = await axiosInstance.post(`users/registration`, registerData);

      if (response) {

        dispatch(setRegisterData(response?.data?.data));
        dispatch(setRegisterToken(response?.data?.data?.remember_tokens));
        return response.data;
      }
      else {
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
  }
};


const findJobSlice = createSlice({
  name: "findJobs",
  initialState: initialState,
  reducers: {
    setPopularList(state, action) {
      state.popularList = action.payload;
    },
    setPopularServiceListLoader(state, action) {
      state.popularLoader = action.payload;
    },
    setService(state, action) {
      state.service = action.payload;
    },

    setsearchServiceLoader(state, action) {
      state.searchServiceLoader = action.payload;
    },
    setRegisterLoader(state, action) {
      state.registerLoader = action.payload;
    },
    setRegisterStep(state, action) {
      state.registerStep = action.payload;
    },
    setRegisterToken(state, action) {
      state.registerToken = action.payload;
      localStorage.setItem("registerTokens", JSON.stringify(action.payload))
    },
    setSelectedServiceId(state, action) {
      state.selectedServiceId = action.payload;
      state.selectedServiceFormData.service_id = [action.payload]
    },
    setSelectedServiceFormData(state, action) {
      state.selectedServiceFormData =  { ...state.selectedServiceFormData, ...action.payload };
    },
    setselectedServices(state, action) {
      state.selectedServices = action.payload;
    },
     setRegisterData(state, action) {
      state.registerData = action.payload;
      localStorage.setItem("registerDataToken", JSON.stringify(action.payload))
    },
    // clearSelectedServices: (state) => {
    //   state.selectedServices = [];
    // },
  },
});

export const {
  setPopularServiceListLoader,
  setPopularList,
  setsearchServiceLoader,
  setService,
  setRegisterLoader,
  setRegisterStep,
  setRegisterToken,
  setSelectedServiceId,
  setSelectedServiceFormData,
  setselectedServices,
  setRegisterData
} = findJobSlice.actions;
export default findJobSlice.reducer;
