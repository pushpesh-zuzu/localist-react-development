import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import ContactUs from "./component/ContactUs/ContactUs";
import ProtectedLogin from "./routes/ProtectedLogin";
import Category from "./pages/Category";
import InProgressPage from "./pages/InProgressPage";
import CloneCatrgory from "./pages/CloneCatrgory";
import CloneSubTwoCategory from "./pages/CloneSubTwoCategory";
import CloneSubCategoryTwoGardening from "./component/Level2/CloneSubCategoryTwoGardening";
import CloneSubThreeCategory from "./pages/CloneSubThreeCategory";
import SubCategoryPage from "./pages/SubCategoryPage";
import LocationPage from "./pages/LocationPage";
import SublocationPage from "./pages/SublocationPage";
import ServicePanelPage from "./pages/ServicePanelPage";
import ServiceCreateAccount from "./component/servicePanel/FindLocalJobs/ServiceCreateAccount/ServiceCreateAccount";
import BuyerPanelPage from "./pages/BuyerPanelPage";
import BuyerAccountSettings from "./component/buyerAccountSettings/BuyerAccountSettings";
import BuyerNotification from "./component/buyerPanel/buyerNotification/BuyerNotification";
import PrivacyPolicy from "./component/common/privacyPolicy/PrivacyPolicys";
import Dashboard from "./component/dashboard/dashboard";
import Leads from "./component/Leads/Leads";
import Settings from "./component/settings/Settings";
import MyProfile from "./component/MyProfile/MyProfile";
import AccountDetails from "./component/AccountDetails/AccountDetails";
import LeadSetting from "./component/Leads/LeadSetting";
import BidsList from "./component/buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList";
import ManualBidList from "./component/buyerPanel/PlaceNewRequest/BuyerRegistration/ManualBidList/ManualBidList";
import HelpCenterPage from "./pages/HelpCenterPage";
import PricingPage from "./pages/PricingPage";
import SuggestQuestions from "./component/Leads/LeadSettings/SuggestQuestions/SuggestQuestions";
import NewQuestion from "./component/Leads/LeadSettings/SuggestQuestions/NewQuestion/NewQuestion";
import EditQuestion from "./component/Leads/LeadSettings/SuggestQuestions/EditQuestion/EditQuestion";
import RemoveQuestion from "./component/Leads/LeadSettings/SuggestQuestions/RemoveQuestion/RemoveQuestion";
import LeadProfileData from "./component/Leads/LeadLists/LeadProfileView/LeadProfileView";
import MyResponse from "./component/myResponses/MyResponse";
import SaveForLater from "./component/saveForLater/SaveForLater";
import ViewProfile from "./component/myResponses/ViewProfile/viewProfile";
import MyCredit from "./component/MyCredit/MyCredit";
import MyCredits from "./component/MyCredit/MyCredit/MyCredit";
import InvoiceAndBilling from "./component/MyCredit/InvoiceAndBilling/InvoiceAndBilling";
import MyPaymentDetails from "./component/MyCredit/MyPaymentDetails/MyPaymentDetails";
import ViewProfiles from "./component/ViewProfile";
import EmailNotification from "./component/SellerNotification/EmailNotification/EmailNotification";
import BrowserNotification from "./component/SellerNotification/BrowserNotification/BrowserNotification";
import BuyerFirstStep from "./component/buyerPanel/buyerClose/buyerCloseStep/buyerFirstStep";
import BuyerSecondStep from "./component/buyerPanel/buyerClose/buyerSecondStep/BuyerSecond";
import NotFound from "./pages/NotFound";
import AboutUs from "./component/AboutUs/AboutUs";
import ProtectedRoute from "./routes/Protected";
import HowItWorksCustomerPage from "./pages/HowItWorksPageCustomers";
import HowItWorkSeller from "./component/HowItWorkSeller/HowItWorkSeller";


function App() {
  const { selectedServiceFormData, registerStep } = useSelector(
    (state) => state.findJobs
  );

  const payloadRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ([1, 2, 3, 4].includes(registerStep)) {
      // Prepare data BEFORE unload
      const formData = new FormData();
      const fields = [
        "name",
        "email",
        "password",
        "postcode",
        "miles1",
        "phone",
        "company_name",
        "company_size",
        "company_sales_team",
        "company_website",
        "is_company_website",
        "new_jobs",
        "social_media",
        "address",
        "coordinates",
        "city",
        "zipcode",
        "service_id",
        "auto_bid",
        "active_status",
        "miles2",
        "user_type",
        "loggedUser",
        "nation_wide",
        "form_status",
        "is_online",
        "company_reg_number",
        "apartment",
        "city_old",
        "country_old",
        "zipcode_old",
      ];

      fields.forEach((field) => {
        formData.append(field, selectedServiceFormData?.[field] ?? "");
      });

      formData.set("auto_bid", selectedServiceFormData?.auto_bid ? 1 : 0);
      formData.set("nation_wide", selectedServiceFormData?.nation_wide ? 1 : 0);
      formData.set("is_online", selectedServiceFormData?.is_online ? 1 : 0);
      formData.set("active_status", 1);
      formData.set("user_type", 1);
      formData.set("loggedUser", 1);
      formData.set("cities", selectedServiceFormData?.city);
      formData.set("form_status", 0);

      // Convert FormData to URLSearchParams (for sendBeacon)
      const params = new URLSearchParams();
      for (let [key, value] of formData.entries()) {
        params.append(key, value);
      }

      payloadRef.current = params;

      const handleBeforeUnload = (event) => {
        const confirmationMessage = "Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      };

      const handleUnload = () => {
        if (params) {
          navigator.sendBeacon(
            "https://localists.zuzucodes.com/admin/api/users/registration",
            params
          );
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("unload", handleUnload);
      };
    }
  }, [registerStep, selectedServiceFormData]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />

          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="login" element={<ProtectedLogin />} />
          <Route path="passwordless_login" element={<ProtectedLogin />} />
          <Route path="category" element={<Category />} />
          <Route path="inprogress" element={<InProgressPage />} />

          <Route
            path="en/gb/home/"
            element={
              <CloneCatrgory
                routeName="home"
                accountHeader="Home & Garden"
                subHeader="Home & Garden"
                bestText={`It's super fast and easy!`}
              />
            }
          />

          <Route
            path="en/gb/business/"
            element={
              <CloneCatrgory
                routeName="business"
                accountHeader="Business"
                subHeader="Busines"
              />
            }
          />

          <Route
            path="en/gb/financial-and-accounting/"
            element={
              <CloneCatrgory
                accountHeader="Financial & Accounting"
                subHeader="Financial Accountant"
              />
            }
          />

          <Route
            path="en/gb/accountants/"
            element={
              <CloneCatrgory
                accountHeader="Accountants"
                subHeader="Accountant"
              />
            }
          />

          <Route
            path="en/gb/bookkeeping-services/"
            element={
              <CloneCatrgory
                accountHeader="Bookkeepers"
                subHeader="Bookkeeper"
              />
            }
          />

          <Route
            path="en/gb/builders/"
            element={
              <CloneSubTwoCategory
                routeName="Home & Garden / Builders"
                accountHeader="Builders"
                subHeader="builder"
              />
            }
          />

          <Route
            path="en/gb/gardening-landscaping/"
            element={
              <CloneSubCategoryTwoGardening
                routeName="gardening-landscaping"
                accountHeader="Gardening & Landscaping"
                subHeader="Gardening & Landscaping"
              />
            }
          />

          <Route
            path="en/gb/:slug/"
            element={
              <CloneSubThreeCategory
                routeName="Home & Garden / Gardening & Landscaping"
                accountHeader="General Accounting"
                subHeader="General Accountant"
              />
            }
          />

          <Route path="category/:serviceName" element={<Category />} />
          <Route path="sub-category" element={<SubCategoryPage />} />
          <Route
            path="sub-category/:serviceSubName"
            element={<SubCategoryPage />}
          />
          <Route path="en/gb/:service/:location" element={<LocationPage />} />

          {/* तुम्हारे कहे अनुसार ये जैसे के तैसे रहेंगे */}
          <Route
            path="en/gb/:service/:location:subLocation"
            element={<SublocationPage />}
          />
          {/* <Route
            path="en/gb/:service/:location:sublocation"
            element={<SubLocationLevel5 />}
          /> */}

          <Route
            path="en/gb/how-it-works-for-customers"
            element={<HowItWorksCustomerPage />}
          />
          <Route
            path="en/gb/how-it-works-for-sellers"
            element={<HowItWorkSeller />}
          />

          <Route path="sellers/create" element={<ServicePanelPage />} />
          <Route
            path="sellers/create-account/:serviceTitle"
            element={<ServiceCreateAccount />}
          />

          <Route
            path="buyers/create"
            element={
              <ProtectedRoute>
                <BuyerPanelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/settings"
            element={
              <ProtectedRoute>
                <BuyerAccountSettings />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/notification"
            element={
              <ProtectedRoute>
                <BuyerNotification />
              </ProtectedRoute>
            }
          />

          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route
            path="sellers/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="sellers/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />
          <Route
            path="leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/n"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/account-details"
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/leads"
            element={
              <ProtectedRoute>
                <LeadSetting />
              </ProtectedRoute>
            }
          />

          <Route
            path="bids-list/:requestId"
            element={
              <ProtectedRoute>
                <BidsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="bids-list/reply/:requestId"
            element={
              <ProtectedRoute>
                <ManualBidList />
              </ProtectedRoute>
            }
          />

          <Route path="help-center" element={<HelpCenterPage />} />
          <Route path="sellers/pricing/" element={<PricingPage />} />

          <Route
            path="feedback/questions"
            element={
              <ProtectedRoute>
                <SuggestQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback/questions/new"
            element={
              <ProtectedRoute>
                <NewQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback/questions/edit"
            element={
              <ProtectedRoute>
                <EditQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback/questions/remove"
            element={
              <ProtectedRoute>
                <RemoveQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="lead/profile-view/:profileId"
            element={
              <ProtectedRoute>
                <LeadProfileData />
              </ProtectedRoute>
            }
          />
          <Route
            path="sellers/leads/my-responses"
            element={
              <ProtectedRoute>
                <MyResponse />
              </ProtectedRoute>
            }
          />
          <Route
            path="sellers/leads/save-for-later"
            element={
              <ProtectedRoute>
                <SaveForLater />
              </ProtectedRoute>
            }
          />

          <Route
            path="pending/view-profile/:profileId"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="mycredit"
            element={
              <ProtectedRoute>
                <MyCredit />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/my-credits"
            element={
              <ProtectedRoute>
                <MyCredits />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/invoice-billing"
            element={
              <ProtectedRoute>
                <InvoiceAndBilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/payment-details"
            element={
              <ProtectedRoute>
                <MyPaymentDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="view-profile/:company_name/:requestId"
            element={
              <ProtectedRoute>
                <ViewProfiles />
              </ProtectedRoute>
            }
          />

          <Route
            path="review/:profileId"
            element={
              <ViewProfiles />
              // ProtectedRoute optional रखा है जैसा तुम्हारे config में था
            }
          />

          <Route
            path="settings/e-mail-notification"
            element={
              <ProtectedRoute>
                <EmailNotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/browser-notification"
            element={
              <ProtectedRoute>
                <BrowserNotification />
              </ProtectedRoute>
            }
          />

          <Route
            path="inprogress"
            element={
              <ProtectedRoute>
                <InProgressPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="buyer-close/:id"
            element={
              <ProtectedRoute>
                <BuyerFirstStep />
              </ProtectedRoute>
            }
          />
          <Route
            path="buyer-second-step"
            element={
              <ProtectedRoute>
                <BuyerSecondStep />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
