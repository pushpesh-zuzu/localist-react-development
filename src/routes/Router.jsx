import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/authentication/LoginPage";
import Homepage from "../pages/Homepage";
import Category from "../pages/Category";
import SubCategoryPage from "../pages/SubCategoryPage";
import LocationPage from "../pages/LocationPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import ServicePanelPage from "../pages/ServicePanelPage";
import ServiceCreateAccount from "../component/servicePanel/FindLocalJobs/ServiceCreateAccount/ServiceCreateAccount";
import Dashboard from "../component/dashboard/dashboard";
import ProtectedRoute from "./Protected";
import BuyerPanelPage from "../pages/BuyerPanelPage";
import BuyerRegistration from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import BuyerAccountSettings from "../component/buyerAccountSettings/BuyerAccountSettings";
import BuyerNotification from "../component/buyerPanel/buyerNotification/BuyerNotification";
import PrivacyPolicy from "../component/common/privacyPolicy/PrivacyPolicys";
import Leads from "../component/Leads/Leads";
import Settings from "../component/settings/Settings";
import LeadSetting from "../component/Leads/LeadSetting";
import BidsList from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList";
import ProtectedLogin from "./ProtectedLogin";
import HelpCenterPage from "../pages/HelpCenterPage";
import SuggestQuestions from "../component/Leads/LeadSettings/SuggestQuestions/SuggestQuestions";
import PricingPage from "../pages/PricingPage";
import NewQuestion from "../component/Leads/LeadSettings/SuggestQuestions/NewQuestion/NewQuestion";
import EditQuestion from "../component/Leads/LeadSettings/SuggestQuestions/EditQuestion/EditQuestion";
import RemoveQuestion from "../component/Leads/LeadSettings/SuggestQuestions/RemoveQuestion/RemoveQuestion";
import ManualBidList from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/ManualBidList/ManualBidList";
import LeadProfileData from "../component/Leads/LeadLists/LeadProfileView/LeadProfileView";
import MyResponse from "../component/myResponses/MyResponse";
import SaveForLater from "../component/saveForLater/SaveForLater";
import ViewProfile from "../component/myResponses/ViewProfile/viewProfile";
import MyProfile from "../component/MyProfile/MyProfile";
import AccountDetails from "../component/AccountDetails/AccountDetails";
import MyCredit from "../component/MyCredit/MyCredit";
import ViewProfiles from "../component/ViewProfile";
import MyCredits from "../component/MyCredit/MyCredit/MyCredit";
import InvoiceAndBilling from "../component/MyCredit/InvoiceAndBilling/InvoiceAndBilling";
import MyPaymentDetails from "../component/MyCredit/MyPaymentDetails/MyPaymentDetails";
import EmailNotification from "../component/SellerNotification/EmailNotification/EmailNotification";
import BrowserNotification from "../component/SellerNotification/BrowserNotification/BrowserNotification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/login", element: <ProtectedLogin /> },
      { path: "/category", element: <Category /> },
      { path: "/category/:serviceName", element: <Category /> },
      { path: "/sub-category", element: <SubCategoryPage /> },
      { path: "/sub-category/:serviceSubName", element: <SubCategoryPage /> },
      { path: "/location", element: <LocationPage /> },
      { path: "/how-it-works", element: <HowItWorksPage /> },
      { path: "/sellers/create", element: <ServicePanelPage /> },
      {
        path: "/sellers/create-account/:serviceTitle",
        element: <ServiceCreateAccount />,
      },
      {
        path: "/buyers/create",
        element: (
          <ProtectedRoute>
            <BuyerPanelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/setting",
        element: (
          <ProtectedRoute>
            <BuyerAccountSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/notification",
        element: (
          <ProtectedRoute>
            <BuyerNotification />
          </ProtectedRoute>
        ),
      },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leads",
        element: (
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/my_profile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/account_details",
        element: (
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leads/settings",
        element: (
          <ProtectedRoute>
            <LeadSetting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bids-list/:requestId",
        element: (
          <ProtectedRoute>
            <BidsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bids-list/reply/:requestId",
        element: (
          <ProtectedRoute>
            <ManualBidList />
          </ProtectedRoute>
        ),
      },
      { path: "/help-center", element: <HelpCenterPage /> },
      { path: "/pricing", element: <PricingPage /> },
      {
        path: "/feedback/questions",
        element: (
          <ProtectedRoute>
            <SuggestQuestions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/feedback/questions/new",
        element: (
          <ProtectedRoute>
            <NewQuestion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/feedback/questions/edit",
        element: (
          <ProtectedRoute>
            <EditQuestion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/feedback/questions/remove",
        element: (
          <ProtectedRoute>
            <RemoveQuestion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lead/profile-view/:profileId",
        element: (
          <ProtectedRoute>
            <LeadProfileData />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lead/save-later",
        element: (
          <ProtectedRoute>
            <MyResponse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lead/save-for-later",
        element: (
          <ProtectedRoute>
            <SaveForLater />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pending/view-profile/:profileId",
        element: (
          <ProtectedRoute>
            <ViewProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mycredit",
        element: (
          <ProtectedRoute>
           <MyCredit/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/mycredits",
        element: (
          <ProtectedRoute>
           <MyCredits/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoice-billing",
        element: (
          <ProtectedRoute>
         <InvoiceAndBilling/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-details",
        element: (
          <ProtectedRoute>
        <MyPaymentDetails/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-profile/:sellerId",
        element: (
          <ProtectedRoute>
          <ViewProfiles/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/review/:profileId",
        element: (
          // <ProtectedRoute>
          <ViewProfiles/>
          // </ProtectedRoute>
        ),
      },
      {
        path: "/e-mail-notification",
        element: (
          <ProtectedRoute>
         <EmailNotification/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/browser-notification",
        element: (
          <ProtectedRoute>
          <BrowserNotification/>
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
