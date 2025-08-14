import { createSlice, current } from "@reduxjs/toolkit";
import axiosInstance, { baseURL } from "../../Api/axiosInstance";
import {
  clearAuthToken,
  clearBuyerRegisterFormData,
  clearServiceFormData,
  setAuthToken,
  setRegisterData,
  setRegisterStep,
  setRegisterToken,
  setSelectedServiceId,
  setselectedServices,
  setService,
} from "../FindJobs/findJobSlice";
import { setCreateRequestToken, setRequestData } from "../Buyer/BuyerSlice";
import { clearCompanyData } from "../Company/companyLookup";

const userToken = JSON.parse(localStorage.getItem("barkUserToken"));
const initialState = {
  adminToken: localStorage.getItem("barkToken")
    ? JSON.parse(localStorage.getItem("barkToken"))
    : null,
  userToken: localStorage.getItem("barkUserToken")
    ? JSON.parse(localStorage.getItem("barkUserToken"))
    : null,
  loginLoader: false,
  logoutLoader: false,
  switchUserLoader: false,
  passwordlessLoader: false, // ✅ Added loader for passwordless login
  currentUser: userToken?.active_status || null,
};

export const userLogin = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginLoader(true));
    try {
      const response = await axiosInstance.post(`users/login`, loginData);

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
        dispatch(setUserToken(response?.data?.data));
        dispatch(setCurrentUser(response?.data?.data?.user_type));
        dispatch(setAuthToken(response?.data?.data?.remember_tokens));
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoginLoader(false));
    }
  };
};

// export const sendPasswordlessLink = (data) => {
//   return async (dispatch) => {
//     dispatch(setPasswordlessLoader(true));
//     try {
//       // Magic link send API call
//       const response = await axiosInstance.post(
//         `/users/create-login-magic-link`,
//         data
//       );

//       if (!response?.data?.success) {
//         throw new Error(response?.data?.message || "Failed to send magic link");
//       }

//       return {
//         success: true,
//         message: response?.data?.message || "Magic link sent successfully",
//       };
//     } catch (error) {
//       console.error("sendPasswordlessLink error:", error);
//       throw new Error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "An error occurred while sending magic link"
//       );
//     } finally {
//       dispatch(setPasswordlessLoader(false));
//     }
//   };
// };

export const sendPasswordlessLink = (data) => {
  return async (dispatch) => {
    dispatch(setPasswordlessLoader(true));

    try {
      // Step 1: Magic link API call
      const response = await axiosInstance.post(
        `/users/create-login-magic-link`,
        data
      );

      console.log("Magic link API full response:", response?.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to send magic link");
      }

      // Agar backend magic link return kare to log karo
      if (response?.data?.data?.magic_link) {
        console.log(
          "Generated magic link from backend:",
          response?.data?.data?.magic_link
        );
      } else {
        console.warn("⚠️ Backend did not return magic link in response.");
      }

      // Final return — abhi profile API call nahi kar rahe
      return {
        success: true,
        message: response?.data?.message || "Magic link sent successfully",
        magicLinkData: response?.data,
      };
    } catch (error) {
      console.error("sendPasswordlessLink error:", error);
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while sending magic link"
      );
    } finally {
      dispatch(setPasswordlessLoader(false));
    }
  };
};

// export const fetchProfileFromMagicLink = () => {
//   return async (dispatch) => {
//     try {
//       // URL se client_id nikaalna
//       const urlParams = new URLSearchParams(window.location.search);
//       const clientIdBase64 = urlParams.get("client_id");

//       if (!clientIdBase64) {
//         throw new Error("client_id not found in URL");
//       }

//       // Decode helper
//       const decodeBase64 = (str) => {
//         try {
//           const decodedUrlPart = decodeURIComponent(str);
//           return atob(decodedUrlPart);
//         } catch (err) {
//           console.error("Base64 decode failed:", err);
//           return null;
//         }
//       };

//       const decodedClientId = decodeBase64(clientIdBase64);
//       if (!decodedClientId) {
//         throw new Error("Invalid client_id format");
//       }

//       console.log("Decoded Client ID:", decodedClientId);

//       // Profile API call
//       const profileResponse = await axiosInstance.post(
//         `/users/get-seller-profile`,
//         { params: { client_id: decodedClientId } }
//       );

//       if (!profileResponse?.data?.success) {
//         throw new Error(
//           profileResponse?.data?.message || "Failed to get seller profile"
//         );
//       }

//       // Redux store update
//       dispatch(setUserProfile(profileResponse.data.data));

//       return {
//         success: true,
//         profileData: profileResponse.data.data,
//       };
//     } catch (error) {
//       console.error("fetchProfileFromMagicLink error:", error);
//       throw new Error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "An error occurred while fetching profile"
//       );
//     }
//   };
// };

// export const sendPasswordlessLink = (data) => {
//   return async (dispatch) => {
//     dispatch(setPasswordlessLoader(true));
//     try {
//       const response = await axiosInstance.post(
//         `/users/create-login-magic-link`,
//         data
//       );

//       if (response?.data?.success) {
//         // Decode base64 client_id
//         const clientIdBase64 = response?.data?.data?.client_id;
//         // const decodedClientId = atob(clientIdBase64);
//         console.log("Decoded Client ID:", response);
//         return response?.data;
//       } else {
//         throw new Error(response?.data?.message || "Failed to send magic link");
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       dispatch(setPasswordlessLoader(false));
//     }
//   };
// };

// export const sendPasswordlessLink = (data) => {
//   return async (dispatch) => {
//     dispatch(setPasswordlessLoader(true));
//     try {
//       const response = await axiosInstance.post(
//         `/users/create-login-magic-link`,
//         data
//       );

//       if (response?.data?.success) {
//         const clientIdBase64 = response?.data?.data?.client_id;

//         let decodedClientId;
//         try {
//           decodedClientId = atob(clientIdBase64);
//         } catch (decodeErr) {
//           console.error("Base64 decode error:", decodeErr);
//           throw new Error("Invalid client_id format");
//         }

//         console.log("Decoded Client ID:", decodedClientId);

//         // Get seller profile
//         const profileResponse = await axiosInstance.get(
//           `/users/get-seller-profile`,
//           { params: { client_id: decodedClientId } }
//         );

//         if (!profileResponse?.data?.success) {
//           throw new Error(
//             profileResponse?.data?.message || "Failed to get profile"
//           );
//         }

//         // Redux me user data set
//         dispatch(setUserProfile(profileResponse.data.data));

//         return {
//           success: true,
//           message:
//             response?.data?.message || "Magic link sent & profile loaded",
//           magicLinkData: response?.data,
//           profileData: profileResponse?.data,
//         };
//       } else {
//         throw new Error(response?.data?.message || "Failed to send magic link");
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       dispatch(setPasswordlessLoader(false));
//     }
//   };
// };

// export const userLogout = () => {
//   return async (dispatch) => {
//     dispatch(setLogoutLoader(true));
//     try {
//       const response = await axiosInstance.post("users/logout");

//       if (response) {
//         dispatch(setToken(null));
//         dispatch(setUserToken(null))
//         dispatch(setRegisterToken(null))
//         dispatch(setRegisterData(null))
//         dispatch(setSelectedServiceId(null))
//         return true;
//       }
//     } catch (error) {

//     } finally {
//       dispatch(setLogoutLoader(false));
//     }
//   };
// };

let magicLinkProcessed = false; // guard to prevent multiple calls

export const fetchProfileFromMagicLink = () => {
  return async (dispatch, getState) => {
    try {
      // Guard: agar pehle hi process ho chuka hai, to skip
      if (magicLinkProcessed) return;
      magicLinkProcessed = true;

      // Agar profile pehle se store me hai, skip
      const { user } = getState();
      if (user?.profile) return;

      // URL se client_id nikaalna
      const urlParams = new URLSearchParams(window.location.search);
      const clientIdBase64 = urlParams.get("client_id");

      if (!clientIdBase64) {
        throw new Error("client_id not found in URL");
      }

      // Decode helper
      const decodeBase64 = (str) => {
        try {
          const base64Decoded = atob(str);

          return decodeURIComponent(base64Decoded);
        } catch (err) {
          console.error("Base64 decode failed:", err);
          return null;
        }
      };

      const decodedClientId = decodeBase64(clientIdBase64);
      console.log("Decoded Client ID:", decodedClientId);
      if (!decodedClientId) {
        throw new Error("Invalid client_id format");
      }

      // Profile API call (params ko config me bhejna)
      // const profileResponse = await axiosInstance.post(
      //   `/users/get-seller-profile?client_id=313|uTApWD0iF7DehXBthwKPZ3NDyx7b8xRdB0mlMdt593e76905`,
      //   undefined
      // );

      // const profileResponse = await fetch(
      //   `${baseURL}users/get-seller-profile?client_id=312|GbIJPAipis61y2XQn4OYSZkLHsutEwo669OqVNJj8eaec68b`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       // Agar token chahiye to add:
      //       // Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      //     },
      //     body: null, // POST request me empty body
      //   }
      // );
      // const profileResponse = await axiosInstance.post(
      //   `users/get-seller-profile`,
      //   {
      //     client_id: "317|0v0XdJQVku2sWbu0N13dvWA7xKLN5DLExKqc2789050efaa2",
      //   }
      // );
      const api =
        "https://localists.zuzucodes.com/admin/api/users/get-seller-profile";

      const res = await fetch(api, {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${decodedClientId}`,
        },
        body: null,
      });

      // Parse JSON
      const profileResponse = await res.json();

      console.log("📩 Raw API response success:",  profileResponse.success);

      if (!profileResponse?.success) {
        throw new Error(
          profileResponse?.message || "Failed to get seller profile"
        );
      }

      // Agar API token bhi bhejti hai to store kar lo
      if (profileResponse.data.token) {
        localStorage.setItem("auth_token", profileResponse.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${profileResponse.data.token}`;
      }

      // Redux store update
      dispatch(setUserProfile(profileResponse.data.data));

      return {
        success: true,
        profileData: profileResponse.data.data,
      };
    } catch (error) {
      console.error("fetchProfileFromMagicLink error:", error);
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while fetching profile"
      );
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(setLogoutLoader(true));
    try {
      const response = await axiosInstance.post("users/logout");

      if (response) {
        // Clear Redux states
        dispatch(setToken());
        dispatch(setUserToken());
        dispatch(setRegisterToken());
        dispatch(setRegisterData());
        dispatch(setSelectedServiceId());
        dispatch(clearServiceFormData());
        dispatch(setselectedServices([]));
        dispatch(clearBuyerRegisterFormData());
        dispatch(setCreateRequestToken());
        dispatch(clearAuthToken());
        dispatch(setRequestData());
        dispatch(setRegisterStep(0));
        dispatch(clearCompanyData());

        // ✅ Clear relevant localStorage items
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
        localStorage.removeItem("createRequest");
        return true;
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(setLogoutLoader(false));
    }
  };
};

export const switchUser = (switchData) => {
  return async (dispatch) => {
    dispatch(setSwitchUserLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/switch_user`,
        switchData
      );

      if (response?.data?.success) {
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Switch User failed");
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(setSwitchUserLoader(false));
    }
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.adminToken = action.payload;
      localStorage.setItem("barkToken", JSON.stringify(action.payload));
    },
    setLoginLoader(state, action) {
      state.loginLoader = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem("barkUserToken", JSON.stringify(action.payload));
    },
    setLogoutLoader(state, action) {
      state.logoutLoader = action.payload;
    },
    setSwitchUserLoader(state, action) {
      state.switchUserLoader = action.payload;
    },
    setPasswordlessLoader(state, action) {
      // ✅ Added reducer for passwordless loader
      state.passwordlessLoader = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const {
  setToken,
  setLoginLoader,
  setUserToken,
  setLogoutLoader,
  setSwitchUserLoader,
  setCurrentUser,
  setPasswordlessLoader,
} = authSlice.actions;

export default authSlice.reducer;
