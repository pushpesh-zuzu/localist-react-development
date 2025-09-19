import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import React, { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/authentication/LoginPage";
import Homepage from "../pages/Homepage";
import Category from "../pages/Category";
import InProgressPage from "../pages/InProgressPage";
import CloneCatrgory from "../pages/CloneCatrgory";
import SubCategoryPage from "../pages/SubCategoryPage";
import LocationPage from "../pages/LocationPage";
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
import BuyerFirstStep from "../component/buyerPanel/buyerClose/buyerCloseStep/buyerFirstStep";
import BuyerSecondStep from "../component/buyerPanel/buyerClose/buyerSecondStep/BuyerSecond";
const CloneSubThreeCategory = lazy(() =>
  import("../pages/CloneSubThreeCategory")
);
import CloneSubTwoCategory from "../pages/CloneSubTwoCategory";
import CloneSubCategoryTwoGardening from "../component/Level2/CloneSubCategoryTwoGardening";
import SublocationPage from "../pages/SublocationPage";
import ContactUs from "../component/ContactUs/ContactUs";
import AboutUs from "../component/AboutUs/AboutUs";
import HowItWorkSeller from "../component/HowItWorkSeller/HowItWorkSeller";
import HowItWorksCustomerPage from "../pages/HowItWorksPageCustomers";
import WhatServiceYouNeed from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/WhatServiceYouNeed/WhatServiceYouNeed";

import LocaleRedirect from "./LocaleRedirect";
import ConversionRedirect from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/ConversionRedirect/ConversionRedirect";
import FullScreenSpinner from "../component/common/fullScreenSpinner/FullScreenSpinner";
import { landingPages } from "./landingPages";
import Transport from "../component/Level1/Transport/Transport";
import { levelThreePagesRoutes } from "./leverThreeRoute";

// Build routes once and reuse for both client and server routers
const routes = [
  // localized routes
  {
    path: "/:lang/:country",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <LocaleRedirect>
            <Homepage />
          </LocaleRedirect>
        ),
      },
      // {
      //   path: "conversion/:requestId",
      //   element: (
      //     // <LocaleRedirect>
      //     <ConversionRedirect />
      //     // </LocaleRedirect>
      //   ),
      // },
      {
        path: "contact-us",
        element: (
          <LocaleRedirect>
            <ContactUs />
          </LocaleRedirect>
        ),
      },
      {
        path: "about-us",
        element: (
          <LocaleRedirect>
            <AboutUs />
          </LocaleRedirect>
        ),
      },
      {
        path: "login",
        element: (
          <LocaleRedirect>
            <ProtectedLogin />
          </LocaleRedirect>
        ),
      },
      {
        path: "passwordless_login",
        element: (
          <LocaleRedirect>
            <ProtectedLogin />
          </LocaleRedirect>
        ),
      },
      {
        path: "home",
        element: (
          <LocaleRedirect>
            <CloneCatrgory
              routeName="home"
              accountHeader="Home & Garden"
              bestText={`It's super fast and easy!`}
            />
          </LocaleRedirect>
        ),
      },
      {
        path: "transportation-services",
        element: (
          <LocaleRedirect>
            <Transport />
          </LocaleRedirect>
        ),
      },
      {
        path: "builders/",
        element: (
          <LocaleRedirect>
            <CloneSubTwoCategory
              routeName="Home & Garden / Builders"
              accountHeader="Builders"
              subHeader="builder"
            />
          </LocaleRedirect>
        ),
      },
      {
        path: "gardening-landscaping/",
        element: (
          <LocaleRedirect>
            <CloneSubCategoryTwoGardening
              routeName="gardening-landscaping"
              accountHeader="Gardening & Landscaping"
              subHeader="Gardening & Landscaping"
            />
          </LocaleRedirect>
        ),
      },
      {
        path: "business/",
        element: (
          <LocaleRedirect>
            <CloneCatrgory
              routeName="business"
              accountHeader="Business"
              subHeader="Busines"
            />
          </LocaleRedirect>
        ),
      },
      {
        path: "financial-and-accounting/",
        element: (
          <LocaleRedirect>
            <CloneCatrgory
              accountHeader="Financial & Accounting"
              subHeader="Financial Accountant"
            />
          </LocaleRedirect>
        ),
      },
      {
        path: "accountants/",
        element: (
          <LocaleRedirect>
            <CloneCatrgory accountHeader="Accountants" subHeader="Accountant" />
          </LocaleRedirect>
        ),
      },
      {
        path: "bookkeeping-services/",
        element: (
          <LocaleRedirect>
            <CloneCatrgory accountHeader="Bookkeepers" subHeader="Bookkeeper" />
          </LocaleRedirect>
        ),
      },
      {
        path: ":slug/",
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <CloneSubThreeCategory
                routeName="Home & Garden / Gardening & Landscaping"
                accountHeader="General Accounting"
                subHeader="General Accountant"
              />
            </React.Suspense>
          </LocaleRedirect>
        ),
      },
      {
        path: ":service/:location",
        element: (
          <LocaleRedirect>
            <LocationPage />
          </LocaleRedirect>
        ),
      },
      {
        path: ":service/:location/:subLocation",
        element: (
          <LocaleRedirect>
            <SublocationPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "how-it-works-for-customers",
        element: (
          <LocaleRedirect>
            <HowItWorksCustomerPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "how-it-works-for-sellers",
        element: (
          <LocaleRedirect>
            <HowItWorkSeller />
          </LocaleRedirect>
        ),
      },
      {
        path: "sellers/create",
        element: (
          <LocaleRedirect>
            <ServicePanelPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "sellers/create-account/:serviceTitle",
        element: (
          <LocaleRedirect>
            <ServiceCreateAccount />
          </LocaleRedirect>
        ),
      },
      ...landingPages.map(({ path, Component }) => ({
        path,
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <Component />
            </React.Suspense>
          </LocaleRedirect>
        ),
      })),
      ...levelThreePagesRoutes.map(({ path, Component }) => ({
        path,
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <Component />
            </React.Suspense>
          </LocaleRedirect>
        ),
      })),
    ],
  },

  // non-localized routes
  {
    path: "/",
    element: <MainLayout />, // or another layout if needed
    children: [
      // Redirect bare homepage to localized homepage (e.g., /en/in)
      {
        index: true,
        element: (
          <LocaleRedirect>
            <Homepage />
          </LocaleRedirect>
        ),
      },
      // Localized login routes when accessed without locale prefix
      {
        path: "/login",
        element: (
          <LocaleRedirect>
            <ProtectedLogin />
          </LocaleRedirect>
        ),
      },
      {
        path: "/passwordless_login",
        element: (
          <LocaleRedirect>
            <ProtectedLogin />
          </LocaleRedirect>
        ),
      },
      {
        path: "conversion/:requestId",
        element: (
          // <LocaleRedirect>
          <ConversionRedirect />
          // </LocaleRedirect>
        ),
      },
      {
        path: "contact-us",
        element: (
          <LocaleRedirect>
            <ContactUs />
          </LocaleRedirect>
        ),
      },
      {
        path: "/about-us",
        element: (
          <LocaleRedirect>
            <AboutUs />
          </LocaleRedirect>
        ),
      },
      {
        path: "/how-it-works-for-customers",
        element: (
          <LocaleRedirect>
            <HowItWorksCustomerPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "/how-it-works-for-sellers",
        element: (
          <LocaleRedirect>
            <HowItWorkSeller />
          </LocaleRedirect>
        ),
      },
      {
        path: "/:lang/:country/sellers/pricing",
        element: (
          <LocaleRedirect>
            <PricingPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "/sellers/create",
        element: (
          <LocaleRedirect>
            <ServicePanelPage />
          </LocaleRedirect>
        ),
      },
      {
        path: "/sellers/create-account/:serviceTitle",
        element: (
          <LocaleRedirect>
            <ServiceCreateAccount />
          </LocaleRedirect>
        ),
      },

      { path: "/category", element: <Category /> },
      { path: "/inprogress", element: <InProgressPage /> },
      { path: "/category/:serviceName", element: <Category /> },
      { path: "/sub-category", element: <SubCategoryPage /> },
      { path: "/sub-category/:serviceSubName", element: <SubCategoryPage /> },
      {
        path: "/buyers/create",
        element: (
          <ProtectedRoute>
            <BuyerPanelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/settings",
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
      // { path: "/privacy-policy", element: <PrivacyPolicy /> },
      {
        path: "sellers/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "sellers/leads",
        element: (
          <ProtectedRoute>
            <Leads />
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
        path: "/settings/profile/my-profile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/profile/account-details",
        element: (
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/leads/my-services",
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
        path: "/sellers/leads/my-responses",
        element: (
          <ProtectedRoute>
            <MyResponse />
          </ProtectedRoute>
        ),
      },
      {
        path: "sellers/leads/save-for-later",
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
            <MyCredit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/billing/my-credits",
        element: (
          <ProtectedRoute>
            <MyCredits />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/billing/invoice-billing-details",
        element: (
          <ProtectedRoute>
            <InvoiceAndBilling />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/billing/payment-details",
        element: (
          <ProtectedRoute>
            <MyPaymentDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-profile/:company_name/:requestId",
        element: (
          // <ProtectedRoute>
          <ViewProfiles />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/review/:profileId",
        element: (
          // <ProtectedRoute>
          <ViewProfiles />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/settings/notifications/e-mail-notification",
        element: (
          <ProtectedRoute>
            <EmailNotification />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings/notifications/browser-notification",
        element: (
          <ProtectedRoute>
            <BrowserNotification />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inprogress",
        element: (
          <ProtectedRoute>
            <InProgressPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/buyer-close/:id",
        element: (
          <ProtectedRoute>
            <BuyerFirstStep />
          </ProtectedRoute>
        ),
      },
      {
        path: "/buyer-second-step",
        element: (
          <ProtectedRoute>
            <BuyerSecondStep />
          </ProtectedRoute>
        ),
      },
      {
        path: "/whats-service",
        element: (
          <ProtectedRoute>
            <WhatServiceYouNeed />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

// Create a router suitable for the current environment
export function createAppRouter(initialUrl) {
  if (typeof window === "undefined") {
    // Server-side: use memory router seeded with the incoming URL
    return createMemoryRouter(routes, {
      initialEntries: [initialUrl || "/"],
    });
  }
  // Client-side
  return createBrowserRouter(routes);
}

// Default export is the factory for flexibility
export default createAppRouter;
