import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  companyData: {},
  companyLoader: false,
  companyError: null,
};

export const fetchCompanyDetails = (regNumber) => {
  return async (dispatch) => {
    dispatch(setCompanyLoader(true));
    dispatch(clearCompanyData());
    try {
      const response = await axiosInstance.get(
        `users/fetch_company_details/${regNumber}`
      );
      if (response.data) {
        dispatch(setCompanyData(response.data));
        return response.data;
      }
    } catch (error) {
      dispatch(setCompanyError(error?.response?.data?.message || "Company lookup failed"));
    } finally {
      dispatch(setCompanyLoader(false));
    }
  };
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData(state, action) {
      state.companyData = action.payload;
    },
    setCompanyLoader(state, action) {
      state.companyLoader = action.payload;
    },
    setCompanyError(state, action) {
      state.companyError = action.payload;
    },
    clearCompanyData(state) {
      state.companyData = {
        company_name: "",
        address: "",
        locality: "",
        postcode: "",
        country: ""
      };
    }
  },
});

export const {
  setCompanyData,
  setCompanyLoader,
  setCompanyError,
  clearCompanyData,
} = companySlice.actions;

export default companySlice.reducer;
