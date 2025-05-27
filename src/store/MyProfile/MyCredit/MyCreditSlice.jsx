import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../../Api/axiosInstance";
import { showToast } from "../../../utils";



  export const addBuyCreditApi = (CreditData) => {
      return async (dispatch) => {
        dispatch(setBuyCreditLoader(true));
        try {
          const response = await axiosInstance.post(`users/buy-credits`,CreditData);
          if (response) {
            // dispatch(setPreferencesList(response?.data?.data));
            return response?.data;
          }
        } catch (error) {
          showToast("error", error?.response?.data?.message);
        } finally {
          dispatch(setBuyCreditLoader(false));
        }
      };
    };
    export const AddCoupanApi = (couponData) => {
      return async (dispatch) => {
        dispatch(setAddCouanLoader(true));
        try {
          const response = await axiosInstance.post(`users/add-coupon`,couponData);
          if (response) {
            // dispatch(setPreferencesList(response?.data?.data));
            return response?.data;
          }
        } catch (error) {
          showToast("error", error?.response?.data?.message);
        } finally {
          dispatch(setAddCouanLoader(false));
        }
      };
    }
    export const AddSellerBillingDetailsApi = (billingData) => {
        return async (dispatch) => {
          dispatch(setSellerCardLoader(true));
          try {
            const response = await axiosInstance.post(`users/seller-billing-details`,billingData);
            if (response) {
              // dispatch(setPreferencesList(response?.data?.data));
              return response?.data;
            }
          } catch (error) {
            showToast("error", error?.response?.data?.message);
          } finally {
            dispatch(setSellerCardLoader(false));
          }
        };
      }

    export const getSellerCardApi = () => {
        return async (dispatch) => {
       
          try {
            const response = await axiosInstance.get(
              `users/get-seller-card`,
              
            );
      
            if (response) {
              dispatch(setGetSellerCardData(response?.data?.data));
            }
          } catch (error) {
        //    showToast("error", error?.response?.data?.message || "Something went wrong");
          } finally {
          
          }
        };
      };
     
      export const AddSellerCardDetailsApi = (cardData) => {
        return async (dispatch) => {
          dispatch(setSellerBillingLoader(true));
          try {
            const response = await axiosInstance.post(`users/seller-card-details`,cardData);
            if (response) {
              // dispatch(setPreferencesList(response?.data?.data));
              return response?.data;
            }
          } catch (error) {
            showToast("error", error?.response?.data?.message);
          } finally {
            dispatch(setSellerBillingLoader(false));
          }
        };
      }

const initialState = {
   
    sellerBillingLoader: false,
    buyCreditLoader:false,
    addCouanLoader:false,
    getSellerCardData:[],
    sellerCardLoader:false
};








const myCreditSlice = createSlice({
  name: "myCredit",
  initialState: initialState,
  reducers: {
    setSellerBillingLoader(state,action){
        state.sellerBillingLoader = action.payload;
    },
    setBuyCreditLoader(state, action) {
      state.buyCreditLoader = action.payload;
    },
    setAddCouanLoader(state, action) {
      state.addCouanLoader = action.payload;
    },
    setGetSellerCardData(state, action) {
      state.getSellerCardData = action.payload;
    },
    setSellerCardLoader(state, action) {
      state.sellerCardLoader = action.payload;
    },
   
  },
});

export const {setSellerBillingLoader,setBuyCreditLoader,setAddCouanLoader,setGetSellerCardData,setSellerCardLoader} = myCreditSlice.actions;

export default myCreditSlice.reducer;
