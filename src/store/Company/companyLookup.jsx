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

      if (
        response.data &&
        !response.data.error &&
        !response.data.body
      ) {

        dispatch(setCompanyData(response.data));
        return true;
      } else {

        dispatch(setCompanyError("Company not found"));
        return false;
      }

    } catch (error) {
      let message = "Company lookup failed";

      const body = error?.response?.data?.body;
      if (body) {
        try {
          const parsed = JSON.parse(body);
          message = parsed.message || message;
        } catch (e) {

        }
      }

      dispatch(setCompanyError(message));
      return false;
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
