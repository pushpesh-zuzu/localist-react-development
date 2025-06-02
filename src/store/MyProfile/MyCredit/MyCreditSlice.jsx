import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../../Api/axiosInstance";
import { showToast } from "../../../utils";



  export const addBuyCreditApi = (CreditData) => {
      return async (dispatch) => {
        dispatch(setBuyCreditLoader(true));
        try {
          const response = await axiosInstance.post(`payment/buy-credits`,CreditData);
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
            dispatch(setAddCoupanData(response?.data?.data));
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
            console.log("response", response);
      
            if (response) {
              dispatch(setGetSellerCardData(response?.data?.data ??[]));
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
      export const getInvoiceBillingListApi = () => {
        return async (dispatch) => {
       
          try {
            const response = await axiosInstance.get(
              `payment/get-transaction-logs`,
              
            );
            
      
            if (response) {
              dispatch(setGetInoviceBillingListData(response?.data?.data ?? []));
            }
          } catch (error) {
        //    showToast("error", error?.response?.data?.message || "Something went wrong");
          } finally {
          
          }
        };
      }; 
      export const getInvoiceListDataApi = () => {
        return async (dispatch) => {
       
          try {
            const response = await axiosInstance.get(
              `payment/get-invoices `,
              
            );
            
      
            if (response) {
              dispatch(setGetInoviceListData(response?.data?.data ?? []));
            }
          } catch (error) {
        //    showToast("error", error?.response?.data?.message || "Something went wrong");
          } finally {
          
          }
        };
      }; 
      // export const downloadInvoceApi = (invoiceData) => {
      //   return async (dispatch) => {
      //     dispatch(setInvoiceLoader(true));
      //     try {
      //       const response = await axiosInstance.post(`payment/download-invoice`,invoiceData);
      //       console.log(response,"response")
      //       if (response) {
      //         // dispatch(setPreferencesList(response?.data?.data));
      //         return response?.data;
      //       }
      //     } catch (error) {
      //       showToast("error", error?.response?.data?.message);
      //     } finally {
      //       dispatch(setInvoiceLoader(false));
      //     }
      //   };
      // }
     
      export const downloadInvoceApi = (invoiceData) => {
  return async () => {
    try {
      const response = await axiosInstance.post(
        `payment/download-invoice`,
        invoiceData,
        {
          responseType: "blob", // 👈 IMPORTANT: ensures we get file blob
        }
      );

      // Create blob and download
      const blob = new Blob([response.data], { type: "application/pdf" }); // Change type if needed
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${invoiceData.invoice_id}.pdf`; // Customize file name if needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      showToast("error", error?.response?.data?.message || "Download failed");
    }
  };
};


     

const initialState = {
   
    sellerBillingLoader: false,
    buyCreditLoader:false,
    addCouanLoader:false,
    getSellerCardData:[],
    sellerCardLoader:false,
    getInoviceBillingList:[],
    addcoupanList:{},
    getInvoiceList:[],
    invoiceLoader:false
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
    setGetInoviceBillingListData(state,action) {
        state.getInoviceBillingList = action.payload
    },
    setAddCoupanData(state,action) {
        state.addcoupanList = action.payload
    },
    setGetInoviceListData(state,action){
        state.getInvoiceList = action.payload
    },
    setInvoiceLoader(state,action) {
        state.invoiceLoader = action.payload
    }
   
  },
});

export const {setSellerBillingLoader,setBuyCreditLoader,setInvoiceLoader,setAddCoupanData,setGetInoviceListData,setGetInoviceBillingListData,setAddCouanLoader,setGetSellerCardData,setSellerCardLoader} = myCreditSlice.actions;

export default myCreditSlice.reducer;
