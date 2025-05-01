import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { showToast } from "../../utils";


const initialState = {
    preferenceLoader:false,
    preferenceList:[],
    leadPreferenceLoader:false,
    serviceLoader:false,
    leadPreferenceData:[],
    leadRequestLoader:false,
    leadRequestList:[], 
    getlocationData:[],
    autoBidList:[],
    removeLoader:false,
    bidListLoader:false,
    removeLocationLoader:false,
    serviceWiseData:[],
    autoBidListData:[],
    manualBidLoader:false,
    autobidLoader:false,
    getCreditLoader:false,
    getCreditListData:[],
    filterListData:[],
    profileLeadViewData:{},
    creditPlanList:[],
    saveLaterLoader:false,
    saveForLaterDataList:[],
    totalCredit:[],
    sellerRecommended:[],
    filters:{
      keyword: "",
      unread: false,
      leadSpotlights: [],
      buyerActions: [],
      submittedWhen: "",
      selectedServices: [],
      location: "",
      credits: [],
      contactPreferences: [],
    },
    sevenDaysAutoBidLoader:false,
    sevenDays:[],
    onlineRemote:[]
};


export const getleadPreferencesList = (serviceId) => {
    return async (dispatch) => {
      dispatch(setServiceListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-services`,serviceId);
        if (response) {
          dispatch(setPreferencesList(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setServiceListLoader(false));
      }
    };
  };


  export const leadPreferencesData = (leadPreferencesData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesLoader(true));
      try {
        const response = await axiosInstance.post(`users/lead-preferences`, leadPreferencesData);
  
        if (response) {
            return response.data;
        //   dispatch(setLeadPreferenceData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesLoader(false));
      }
    };
  }
  export const leadPreferences = (leadPreferencesData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-lead-preferences`, leadPreferencesData);
  
        if (response) {
            dispatch(setLeadPreferenceData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const isOnlineRemote = (onlineData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/online-remote-switch`, onlineData);
  
        if (response) {
            dispatch(setOnlineRemoteData(response?.data?.data));
            return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const totalCreditData = (totalCreditData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/total-credit`, totalCreditData);
  
        if (response) {
            dispatch(setTotalCreditData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const getLeadRequestList = (leadRequestData) => {
    return async (dispatch) => {
      dispatch(setLeadListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-lead-request`,leadRequestData);
        if (response) {
          dispatch(setLeadRequestListData(response?.data?.data));
          return response.data
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setLeadListLoader(false));
      }
    };
  };
  export const getLeadFiterApiList = (leadFilterData) => {
    return async (dispatch) => {
      dispatch(setLeadListLoader(true));
      try {
        const response = await axiosInstance.post(`users/sort-by-credit-value`,leadFilterData);
        if (response) {
          dispatch(setLeadRequestListData(response?.data?.data));
          return response.data
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setLeadListLoader(false));
      }
    };
  };
  export const getLeadProfileRequestList = (leadProfileData) => {
    return async (dispatch) => {
      dispatch(setLeadListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-lead-profile`,leadProfileData);
        if (response) {
          dispatch(setProfileLeadRequestListData(response?.data?.data));
          return response.data
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setLeadListLoader(false));
      }
    };
  };
  export const addServiceLead = (ServiceData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/add_service`, ServiceData);
  
        if (response) {
            // dispatch(setLeadPreferenceData(response?.data?.data));
            return response.data
        }
      } catch (error) {
        const errorData = error?.response?.data?.message;
        console.log("Error Data:", errorData);

  
        if (errorData && typeof errorData === "object") {
          Object.values(errorData).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => showToast("error", msg));
            } else {
              showToast("error", messages);
            }
          });
        } else {
          showToast("error", errorData || "Something went wrong. Please try again.");
        }

        return { success: false, error: errorData };
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const addLocationLead = (locationData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
       
        const response = await axiosInstance.post(`users/add_location`, locationData);
        if (response) {
          return response.data;
        }

      } catch (error) {
        const errorData = error?.response?.data?.message;
        console.log("Error Data:", errorData);

  
        if (errorData && typeof errorData === "object") {
          Object.values(errorData).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => showToast("error", msg));
            } else {
              showToast("error", messages);
            }
          });
        } else {
          showToast("error", errorData || "Something went wrong. Please try again.");
        }

        return { success: false, error: errorData };
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  };
  export const editLocationLead = (locationData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
       
        const response = await axiosInstance.post(`users/edit-location`, locationData);
        if (response) {
          return response.data;
        }

      } catch (error) {
        const errorData = error?.response?.data?.message;
        console.log("Error Data:", errorData);

  
        if (errorData && typeof errorData === "object") {
          Object.values(errorData).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => showToast("error", msg));
            } else {
              showToast("error", messages);
            }
          });
        } else {
          showToast("error", errorData || "Something went wrong. Please try again.");
        }

        return { success: false, error: errorData };
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  };
  
  export const getLocationLead = (getlocationData) => {
    return async (dispatch) => {
      dispatch(setleadPreferencesListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get_user_locations`, getlocationData);
  
        if (response) {
            dispatch(setGetLocationData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setleadPreferencesListLoader(false));
      }
    };
  }
  export const getAutoBid = (bidData) => {
    return async (dispatch) => {
      dispatch(setAutoBidListLoader(true));
      try {
        const response = await axiosInstance.post(`users/manual-leads`, bidData);
  
        if (response) {
            dispatch(setAutoBidData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setAutoBidListLoader(false));
      }
    };
  }
  export const getAutoBidData = (autoBidData) => {
    return async (dispatch) => {
      dispatch(setAutoBidLoader(true));
      try {
        const response = await axiosInstance.post(`users/autobid-list`, autoBidData);
  
        if (response) {
            dispatch(setAutoBidListData(response?.data?.data));
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setAutoBidLoader(false));
      }
    };
  }
  export const removeItemData = (removeData) => {
    return async (dispatch) => {
      dispatch(setRemoveListLoader(true));
      try {
        const response = await axiosInstance.post(`users/remove-service`, removeData);
  
        if (response) {
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setRemoveListLoader(false));
      }
    };
  }
  export const getSaveLaterListData = (removeLocationData) => {
    return async (dispatch) => {
      dispatch(setRemoveLocationListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-save-for-later-list`, removeLocationData);
  
        if (response) {
          dispatch(setSaveForLaterData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setRemoveLocationListLoader(false));
      }
    };
  }
  export const removeItemLocationData = (removeLocationData) => {
    return async (dispatch) => {
      dispatch(setRemoveLocationListLoader(true));
      try {
        const response = await axiosInstance.post(`users/remove-location`, removeLocationData);
  
        if (response) {
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setRemoveLocationListLoader(false));
      }
    };
  } 
  export const getServiceWiseLocationData = (serviceWiseLocationData) => {
    return async (dispatch) => {
      dispatch(setRemoveLocationListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-service-wise-location`, serviceWiseLocationData);
  
        if (response) {
          dispatch(setServiceWiseData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setRemoveLocationListLoader(false));
      }
    };
  } 

  export const getAddManualBidData = (manualBidData) => {
    return async (dispatch) => {
      dispatch(setManualBidListLoader(true));
      try {
        const response = await axiosInstance.post(`users/add-manual-bid`, manualBidData);
  
        if (response) {
          dispatch(setServiceWiseData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        
        showToast("error",error?.response?.data?.message)
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setManualBidListLoader(false));
      }
    };
  }
  export const getCreditPlanList = () => {
    return async (dispatch) => {
      dispatch(setGetCreditListLoader(true));
      try {
        const response = await axiosInstance.get(`users/get-plans`);
        if (response) {
          dispatch(setCreditsPlanList(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setGetCreditListLoader(false));
      }
    }
  }
  export const getCreditList = () => {
    return async (dispatch) => {
      dispatch(setGetCreditListLoader(true));
      try {
        const response = await axiosInstance.get(`users/get-credit-list`);
        if (response) {
          dispatch(setCreditsList(response?.data?.data));
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      } finally {
        dispatch(setGetCreditListLoader(false));
      }
    }
  }
  
  export const getAddMultipleManualBidData = (multiplemanualBidData) => {
    return async (dispatch) => {
      dispatch(setManualBidListLoader(true));
      try {
        const response = await axiosInstance.post(`users/add-multiple-manual-bid`, multiplemanualBidData);
  
        if (response) {
          dispatch(setServiceWiseData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        
        showToast("error",error?.response?.data?.message)
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setManualBidListLoader(false));
      }
    };
  }

  export const getfilterListData = (filterData) => {
    return async (dispatch) => {
      dispatch(setManualBidListLoader(true));
      try {
        const response = await axiosInstance.post(`users/leads-by-filter`, filterData);
  
        if (response) {
          dispatch(setFilterWiseData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setManualBidListLoader(false));
      }
    };
  }
  export const saveForLaterApi = (saveForLaterData) => {
    return async (dispatch) => {
      dispatch(setSaveLaterListLoader(true));
      try {
        const response = await axiosInstance.post(`users/save-for-later`, saveForLaterData);
  
        if (response) {
          dispatch(setFilterWiseData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setSaveLaterListLoader(false));
      }
    };
  }
  
  export const getSellerRecommendedApi = (saveForLaterData) => {
    return async (dispatch) => {
      dispatch(setSaveLaterListLoader(true));
      try {
        const response = await axiosInstance.post(`users/get-seller-recommended-leads`, saveForLaterData);
  
        if (response) {
          dispatch(setSellerRecommendedData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setSaveLaterListLoader(false));
      }
    };
  }
  export const getSevenWeekBidApi = (SevenDayData) => {
    return async (dispatch) => {
      dispatch(setSevenDaysAutobidLoader(true));
      try {
        const response = await axiosInstance.post(`users/seven-days-autobid-pause`, SevenDayData);
  
        if (response) {
          dispatch(setSevenDaysData(response?.data?.data))
           return response.data
        }
      } catch (error) {
        //   dispatch(setAuthError(error?.response?.data?.message));
      } finally {
        dispatch(setSevenDaysAutobidLoader(false));
      }
    };
  }
const leadSettingSlice = createSlice({
  name: "leadSetting",
  initialState: initialState,
  reducers: {
    setleadPreferencesListLoader(state,action) {
        state.preferenceLoader = action.payload
    },
    setPreferencesList(state,action) {
        state.preferenceList = action.payload
    },
    setleadPreferencesLoader(state,action){
        state.leadPreferenceLoader = action.payload
    },
    setServiceListLoader(state,action){
        state.serviceLoader = action.payload
    },
    setLeadPreferenceData(state, action) {
        state.leadPreferenceData = action.payload;
      },
      setLeadListLoader(state, action) {
        state.leadRequestLoader = action.payload;
      },
      setLeadRequestListData(state, action) {
        state.leadRequestList = action.payload;
      },
      setGetLocationData(state,action) {
        state.getlocationData = action.payload
      },
      setAutoBidData(state,action){
        state.autoBidList = action.payload
      },
      setRemoveListLoader(state,action) {
        state.removeLoader = action.payload
      },
      setAutoBidListLoader(state,action){
        state.bidListLoader = action.payload
      },
      setRemoveLocationListLoader(state,action) {
        state.removeLocationLoader = action.payload
      },
      setServiceWiseData(state,action){
        state.serviceWiseData = action.payload
      },
      setAutoBidListData(state,action) {
        state.autoBidListData = action.payload
      },
      setManualBidListLoader(state,action){
        state.manualBidLoader = action.payload
      },
      setAutoBidLoader(state,action) {
        state.autobidLoader = action.payload
      },
      setGetCreditListLoader(state,action) {
        state.getCreditLoader = action.payload
      },
      setCreditsList(state,action) {
      state.getCreditListData = action.payload
      },
      setFilterWiseData(state,action) {
        state.filterListData = action.payload
      },
      setProfileLeadRequestListData(state,action){
        state.profileLeadViewData = action.payload
      },
      setCreditsPlanList(state,action) {
        state.creditPlanList = action.payload
      },
      setSaveLaterListLoader(state,action){
        state.saveLaterLoader = action.payload
      },
      setSaveForLaterData(state,action){
        state.saveForLaterDataList = action.payload
      },
      setTotalCreditData(state,action) {
        state.totalCredit = action.payload
      },
      setFilters(state,action) {
        state.filters = action.payload
      },
      setSellerRecommendedData(state,action){
        state.sellerRecommended = action.payload
      },
      setSevenDaysAutobidLoader(state,action){
        state.sevenDaysAutoBidLoader = action.payload
      },
      setSevenDaysData(state,action){
        state.sevenDays= action.payload
      },
      setOnlineRemoteData(state,action){
        state.onlineRemote =action.payload
      }
   
  },
});

export const {setleadPreferencesListLoader,setAutoBidData,setSevenDaysData,setOnlineRemoteData,setCreditsList,setFilters,setSevenDaysAutobidLoader,setSellerRecommendedData,setSaveForLaterData,setTotalCreditData,setSaveLaterListLoader,setCreditsPlanList,setFilterWiseData,setProfileLeadRequestListData,setGetCreditListLoader,setAutoBidLoader,setAutoBidListData,setManualBidListLoader,setServiceWiseData,setRemoveLocationListLoader,setRemoveListLoader,setAutoBidListLoader,setGetLocationData,setPreferencesList,setleadPreferencesLoader,setServiceListLoader,setLeadPreferenceData,setLeadListLoader,setLeadRequestListData} = leadSettingSlice.actions;

export default leadSettingSlice.reducer;
