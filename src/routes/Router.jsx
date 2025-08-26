import { createBrowserRouter } from "react-router-dom";
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
import CloneSubThreeCategory from "../pages/CloneSubThreeCategory";
import CloneSubTwoCategory from "../pages/CloneSubTwoCategory";
import CloneSubCategoryTwoGardening from "../component/Level2/CloneSubCategoryTwoGardening";
import SublocationPage from "../pages/SublocationPage";
import ContactUs from "../component/ContactUs/ContactUs";
import AboutUs from "../component/AboutUs/AboutUs";
import HowItWorkSeller from "../component/HowItWorkSeller/HowItWorkSeller";
import HowItWorksCustomerPage from "../pages/HowItWorksPageCustomers";
import WhatServiceYouNeed from "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/WhatServiceYouNeed/WhatServiceYouNeed";
//test en/gb/bookkeeping-services/

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <ProtectedLogin /> },
      { path: "/passwordless_login", element: <ProtectedLogin /> },
      { path: "/category", element: <Category /> },
      { path: "/inprogress", element: <InProgressPage /> },
      {
        path: "/en/gb/home/",
        element: (
          <CloneCatrgory
            routeName="home"
            accountHeader="Home & Garden"
            subHeader="Home & Garden"
            bestText={`It's super fast and easy!`}
          />
        ),
      },
      // { path: "en/gb/gardening-landscaping/", element: <CloneCatrgory routeName='home' accountHeader="Home & Garden" subHeader="Home & Garden" bestText={`It's super fast and easy!`} /> },

      {
        path: "/en/gb/business/",
        element: (
          <CloneCatrgory
            routeName="business"
            accountHeader="Business"
            subHeader="Busines"
          />
        ),
      },
      {
        path: "/en/gb/financial-and-accounting/",
        element: (
          <CloneCatrgory
            accountHeader="Financial & Accounting"
            subHeader="Financial Accountant"
          />
        ),
      },
      {
        path: "/en/gb/accountants/",
        element: (
          <CloneCatrgory accountHeader="Accountants" subHeader="Accountant" />
        ),
      },
      {
        path: "/en/gb/bookkeeping-services/",
        element: (
          <CloneCatrgory accountHeader="Bookkeepers" subHeader="Bookkeeper" />
        ),
      },
      {
        path: "/en/gb/builders/",
        element: (
          <CloneSubTwoCategory
            routeName="Home & Garden / Builders"
            accountHeader="Builders"
            subHeader="builder"
          />
        ),
      },
      {
        path: "/en/gb/gardening-landscaping/",
        element: (
          <CloneSubCategoryTwoGardening
            routeName="gardening-landscaping"
            accountHeader="Gardening & Landscaping"
            subHeader="Gardening & Landscaping"
          />
        ),
      },

      {
        path: "/en/gb/:slug/",
        element: (
          <CloneSubThreeCategory
            routeName="Home & Garden / Gardening & Landscaping"
            accountHeader="General Accounting"
            subHeader="General Accountant"
          />
        ),
      },
      { path: "/category/:serviceName", element: <Category /> },
      { path: "/sub-category", element: <SubCategoryPage /> },
      { path: "/sub-category/:serviceSubName", element: <SubCategoryPage /> },
      { path: "/en/gb/:service/:location", element: <LocationPage /> },
      {
        path: "/en/gb/:service/:location/:subLocation",
        element: <SublocationPage />,
      },
      {
        path: "/en/gb/how-it-works-for-customers",
        element: <HowItWorksCustomerPage />,
      },
      { path: "/en/gb/how-it-works-for-sellers", element: <HowItWorkSeller /> },

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
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
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
      { path: "/sellers/pricing/", element: <PricingPage /> },
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
          <ProtectedRoute>
            <ViewProfiles />
          </ProtectedRoute>
        ),
      },
      {
        path: "/review/:company_name/:profileId",
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

      

      // { path: "/inprogress", element: <InProgressPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
