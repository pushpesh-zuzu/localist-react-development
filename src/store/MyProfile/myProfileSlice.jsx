import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { showToast } from "../../utils";

export const getCustomerLinkApi = () => {
    return async (dispatch) => {
   
      try {
        const response = await axiosInstance.get(
          `review/get-customer-link`,
          
        );
  
        if (response) {
          dispatch(setGetCustomerLinkData(response?.data?.data));
        }
      } catch (error) {
       showToast("error", error?.response?.data?.message || "Something went wrong");
      } finally {
      
      }
    };
  };

  export const addSubmitReviewApi = (ReviewData) => {
      return async (dispatch) => {
        dispatch(setReviewListLoader(true));
        try {
          const response = await axiosInstance.post(`review/submit-review`,ReviewData);
          if (response) {
            // dispatch(setPreferencesList(response?.data?.data));
            return response?.data;
          }
        } catch (error) {
          showToast("error", error?.response?.data?.message);
        } finally {
          dispatch(setReviewListLoader(false));
        }
      };
    };

    export const getReviewListApi = (reviewUserId) => {
        return async (dispatch) => {
       
          try {
            const response = await axiosInstance.get(
              `review/get-reviews/${reviewUserId}`,
              
            );
      
            if (response) {
              dispatch(setGetReviewData(response?.data?.data));
            }
          } catch (error) {
        //    showToast("error", error?.response?.data?.message || "Something went wrong");
          } finally {
          
          }
        };
      };
      

      export const sellerEditProfileApi = (profileData) => {
        return async (dispatch) => {
          dispatch(setReviewListLoader(true));
          try {
            const response = await axiosInstance.post(`users/edit-profile`,profileData);
            if (response) {
              dispatch(setEditProfileList(response?.data?.data));
              return response?.data;
            }
          } catch (error) {
            showToast("error", error?.response?.data?.message);
          } finally {
            dispatch(setReviewListLoader(false));
          }
        };
      };
      
      export const sellerUpdateProfileApi = (profileUpdateData) => {
        return async (dispatch) => {
          dispatch(setSellerUpdateLoader(true));
          try {
            const response = await axiosInstance.post(`users/update-profile`,profileUpdateData);
            if (response) {
              dispatch(setEditProfileList(response?.data?.data));
              return response?.data;
            }
          } catch (error) {
            showToast("error", error?.response?.data?.message);
          } finally {
            dispatch(setSellerUpdateLoader(false));
          }
        };
      };

      export const sellerUpdatePasswordApi = (UpdateData) => {
        return async (dispatch) => {
          dispatch(setSellerUpdateLoader(true));
          try {
            const response = await axiosInstance.post(`users/change-password`,UpdateData);
            if (response) {
              // dispatch(setEditProfileList(response?.data?.data));
              return response?.data;
            }
          } catch (error) {
            showToast("error", error?.response?.data?.message);
          } finally {
            dispatch(setSellerUpdateLoader(false));
          }
        };
      };

const initialState = {
    customerLinkData:[],
    reviewLoader:false,
    reviewListData:[],
    editProfileList:[],
    sellerLoader:false
};








const myprofileSlice = createSlice({
  name: "myProfile",
  initialState: initialState,
  reducers: {
    setGetCustomerLinkData(state, action) {
      state.customerLinkData = action.payload;
    },
    setReviewListLoader(state, action) {
      state.reviewLoader = action.payload;
    },
    setGetReviewData(state, action) {
      state.reviewListData = action.payload;
    },
    setEditProfileList(state,action){
      state.editProfileList = action.payload
    },
    setSellerUpdateLoader(state,action) {
      state.sellerLoader =action.payload
    }
   
  },
});

export const {setGetCustomerLinkData ,setReviewListLoader,setSellerUpdateLoader,setGetReviewData,setEditProfileList} = myprofileSlice.actions;

export default myprofileSlice.reducer;
