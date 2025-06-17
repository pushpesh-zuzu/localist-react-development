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

// Thunk to upload photos and YouTube link
export const updateSellerPhotos = createAsyncThunk(
  "myProfile/updateSellerPhotos",
  async (formState, { rejectWithValue }) => {
    try {
      const body = new FormData();
      body.append("type", formState.type || "photos");
      body.append("company_youtube_link", formState.company_youtube_link || "");

      if (Array.isArray(formState.company_photos)) {
        formState.company_photos.forEach((file) => {
          if (file instanceof File) {
            body.append("company_photos[]", file);
          }
        });
      }

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
// Thunk for social media links update
export const updateSellerSocialLinks = createAsyncThunk(
  "myProfile/updateSellerSocialLinks",
  async (formState, { rejectWithValue }) => {
    try {
      const body = new FormData();
      body.append("type", "social_media");

      const fields = [
        "fb_link",
        "twitter_link",
        "tiktok_link",
        "insta_link",
        "linkedin_link",
        "extra_links",
      ];

      fields.forEach((field) => {
        body.append(field, formState[field] || "");
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

// Thunk to handle accreditations submission
export const updateSellerAccreditations = createAsyncThunk(
  "myProfile/updateSellerAccreditations",
  async (accordionGroups, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("type", "Accreditations");

      accordionGroups.forEach((group) => {
        group.accreditations.forEach((name) => {
          formData.append("accre_name[]", name);
        });
        if (group.accreImage) {
          formData.append("accre_image[]", group.accreImage);
        }
      });

      const response = await axiosInstance.post(
        "https://localists.zuzucodes.com/admin/api/users/update-seller-profile",
        formData,
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
    // New for photo upload
    photoUpdateSuccess: false,
    photoUpdateError: null, 

    //New for social media links 
    socialUpdateSuccess: false,
  socialUpdateError: null, 

//New for Accreditations
  accreditationsUpdateSuccess: false,
  accreditationsUpdateError: null,
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
    },
    clearPhotoUpdateStatus(state) {
      state.photoUpdateSuccess = false;
      state.photoUpdateError = null;
    },
    clearSocialUpdateStatus(state) {
      state.socialUpdateSuccess = false;
      state.socialUpdateError = null;
    },
    clearAccreditationsStatus(state) {
      state.accreditationsUpdateSuccess = false;
      state.accreditationsUpdateError = null;
    }
    
    

  },
  extraReducers: (builder) => {
    builder


    // for profile
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
      })


      // for photos
    .addCase(updateSellerPhotos.pending, (state) => {
      state.sellerLoader = true;
      state.photoUpdateSuccess = false;
      state.photoUpdateError = null;
    })
    .addCase(updateSellerPhotos.fulfilled, (state) => {
      state.sellerLoader = false;
      state.photoUpdateSuccess = true;
    })
    .addCase(updateSellerPhotos.rejected, (state, action) => {
      state.sellerLoader = false;
      state.photoUpdateSuccess = false;
      state.photoUpdateError = action.payload;
    })


     // Social media
     .addCase(updateSellerSocialLinks.pending, (state) => {
      state.sellerLoader = true;
      state.socialUpdateSuccess = false;
      state.socialUpdateError = null;
    })
    .addCase(updateSellerSocialLinks.fulfilled, (state) => {
      state.sellerLoader = false;
      state.socialUpdateSuccess = true;
    })
    .addCase(updateSellerSocialLinks.rejected, (state, action) => {
      state.sellerLoader = false;
      state.socialUpdateSuccess = false;
      state.socialUpdateError = action.payload;
    })

    //For Accreditations
    .addCase(updateSellerAccreditations.pending, (state) => {
      state.sellerLoader = true;
      state.accreditationsUpdateSuccess = false;
      state.accreditationsUpdateError = null;
    })
    .addCase(updateSellerAccreditations.fulfilled, (state) => {
      state.sellerLoader = false;
      state.accreditationsUpdateSuccess = true;
    })
    .addCase(updateSellerAccreditations.rejected, (state, action) => {
      state.sellerLoader = false;
      state.accreditationsUpdateSuccess = false;
      state.accreditationsUpdateError = action.payload;
    });
  },
});

export const {
  setGetCustomerLinkData,
  setReviewListLoader,
  setGetReviewData,
  setEditProfileList,
  setSellerUpdateLoader,
  clearUpdateStatus,
  clearPhotoUpdateStatus,
  clearSocialUpdateStatus,
  clearAccreditationsStatus
} = myprofileSlice.actions;

export default myprofileSlice.reducer;

