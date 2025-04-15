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
      { path: "/buyers/create", element: <BuyerPanelPage /> },
      { path: "/account/setting", element: <BuyerAccountSettings /> },
      { path: "/user/notification", element: <BuyerNotification /> },
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
      { path: "/leads/settings", element: <LeadSetting /> },
      { path: "/bids-list/:requestId", element: <BidsList /> },
      { path: "/help-center", element: <HelpCenterPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/feedback/questions", element: <SuggestQuestions /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
