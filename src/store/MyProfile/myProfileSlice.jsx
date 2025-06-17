import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
// Async thunk for submitting seller profile
export const updateSellerProfile = createAsyncThunk(
  "myProfile/updateSellerProfile",
  async (formState, { rejectWithValue }) => {
    try {
      const allowedKeys = [
        "type", "company_logo", "company_name", "profile_image", "name",
        "company_email", "company_phone", "company_website", "company_location",
        "company_locaion_reason", "company_size", "company_total_years", "about_company",
      ];

      const body = new FormData();
      allowedKeys.forEach((key) => {
        const val = formState[key];
        if (val != null && !key.endsWith("Preview")) {
          body.append(key, val);
        }
      });

      const response = await axiosInstance.post(
        "https://localists.zuzucodes.com/admin/api/users/update-seller-profile",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const initialState = {
  customerLinkData: [],
  reviewLoader: false,
  reviewListData: [],
  editProfileList: [],
  sellerLoader: false,

  // NEW state for update logic
  updateSuccess: false,
  updateError: null,
};

const myprofileSlice = createSlice({
  name: "myProfile",
  initialState,
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
    setEditProfileList(state, action) {
      state.editProfileList = action.payload;
    },
    setSellerUpdateLoader(state, action) {
      state.sellerLoader = action.payload;
    },
    clearUpdateStatus(state) {
      state.updateSuccess = false;
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSellerProfile.pending, (state) => {
        state.sellerLoader = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state) => {
        state.sellerLoader = false;
        state.updateSuccess = true;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.sellerLoader = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      });
  },
});

export const {
  setGetCustomerLinkData,
  setReviewListLoader,
  setGetReviewData,
  setEditProfileList,
  setSellerUpdateLoader,
  clearUpdateStatus
} = myprofileSlice.actions;

export default myprofileSlice.reducer;

