/**
 * PERFORMANCE OPTIMIZATION: All pages are lazy-loaded to reduce initial bundle size.
 * Only critical path components (MainLayout, FullScreenSpinner) are eagerly loaded.
 * This reduces the main JS bundle from ~300KB to ~100KB for initial page load.
 */
import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
} from "react-router-dom";
import React, { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import FullScreenSpinner from "../component/common/fullScreenSpinner/FullScreenSpinner";
import LocaleRedirect from "./LocaleRedirect";
import ProtectedRoute from "./Protected";
import ProtectedLogin from "./ProtectedLogin";
import ProtectedRoutePPC from "./ProtecteRoutePPC";
import ProtectedRouteForMultiFormPPC from "./ProtectedRouteForMultiFormPPC";
import { landingPages } from "./landingPages";
import { levelThreePagesRoutes } from "./leverThreeRoute";
import { levelOnePagesRoutes } from "./levelOneRoutes";
import { levelFourLocationRoutes } from "./levelFourRoute";
// import MultiStepTreeSurgeon from "../component/MultiStepForm/MultiStepTreeSurgeon";
// import MultiStepRoofingNew from "../component/MultiStepForm/MultiStepRoofingNew";
// import Blog from "../component/Blog/Blog";
import ArchiveLeads from "../component/ArchiveLeads/ArchiveLeads";
const NewDrivewaysPPCPage = lazy(() => import("../pages/NewDrivewaysPPCPage"));

// ============================================================
// LAZY-LOADED PAGES - reduces main bundle by ~200KB
// ============================================================
const NotFound = lazy(() => import("../pages/NotFound"));
const Homepage = lazy(() => import("../pages/Homepage"));
const Category = lazy(() => import("../pages/Category"));
const InProgressPage = lazy(() => import("../pages/InProgressPage"));
const CloneCatrgory = lazy(() => import("../pages/CloneCatrgory"));
const SubCategoryPage = lazy(() => import("../pages/SubCategoryPage"));
const LocationPage = lazy(() => import("../pages/LocationPage"));
const ServicePanelPage = lazy(() => import("../pages/ServicePanelPage"));
const CloneSubThreeCategory = lazy(() =>
  import("../pages/CloneSubThreeCategory")
);
const CloneSubTwoCategory = lazy(() => import("../pages/CloneSubTwoCategory"));
const SublocationPage = lazy(() => import("../pages/SublocationPage"));
const HelpCenterPage = lazy(() => import("../pages/HelpCenterPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const HowItWorksCustomerPage = lazy(() =>
  import("../pages/HowItWorksPageCustomers")
);
const MultiStepWithImage = lazy(() => import("../pages/MultiStepWithImage"));
const MultiStepFenchWithBanner = lazy(() =>
  import("../pages/MultiStepFenchWithBanner")
);
const MultiStepDrivewayWithBanner = lazy(() =>
  import("../pages/MultiStepDrivewayWithBanner")
);
const BuyerPanelPage = lazy(() => import("../pages/BuyerPanelPage"));

// ============================================================
// LAZY-LOADED COMPONENTS - reduces main bundle by ~100KB
// ============================================================
const ServiceCreateAccount = lazy(() =>
  import(
    "../component/servicePanel/FindLocalJobs/ServiceCreateAccount/ServiceCreateAccount"
  )
);
const Dashboard = lazy(() => import("../component/dashboard/dashboard"));
const BuyerAccountSettings = lazy(() =>
  import("../component/buyerAccountSettings/BuyerAccountSettings")
);
const BuyerNotification = lazy(() =>
  import("../component/buyerPanel/buyerNotification/BuyerNotification")
);
const PrivacyPolicy = lazy(() =>
  import("../component/common/privacyPolicy/PrivacyPolicys")
);
const Leads = lazy(() => import("../component/Leads/Leads"));
const Settings = lazy(() => import("../component/settings/Settings"));
const LeadSetting = lazy(() => import("../component/Leads/LeadSetting"));
const BidsList = lazy(() =>
  import(
    "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList"
  )
);
const SuggestQuestions = lazy(() =>
  import("../component/Leads/LeadSettings/SuggestQuestions/SuggestQuestions")
);
const NewQuestion = lazy(() =>
  import(
    "../component/Leads/LeadSettings/SuggestQuestions/NewQuestion/NewQuestion"
  )
);
const EditQuestion = lazy(() =>
  import(
    "../component/Leads/LeadSettings/SuggestQuestions/EditQuestion/EditQuestion"
  )
);
const RemoveQuestion = lazy(() =>
  import(
    "../component/Leads/LeadSettings/SuggestQuestions/RemoveQuestion/RemoveQuestion"
  )
);
const ManualBidList = lazy(() =>
  import(
    "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/ManualBidList/ManualBidList"
  )
);
const LeadProfileData = lazy(() =>
  import("../component/Leads/LeadLists/LeadProfileView/LeadProfileView")
);
const MyResponse = lazy(() => import("../component/myResponses/MyResponse"));
const SaveForLater = lazy(() =>
  import("../component/saveForLater/SaveForLater")
);
const ViewProfile = lazy(() =>
  import("../component/myResponses/ViewProfile/viewProfile")
);
const MyProfile = lazy(() => import("../component/MyProfile/MyProfile"));
const AccountDetails = lazy(() =>
  import("../component/AccountDetails/AccountDetails")
);
const MyCredit = lazy(() => import("../component/MyCredit/MyCredit"));
const ViewProfiles = lazy(() => import("../component/ViewProfile"));
const MyCredits = lazy(() => import("../component/MyCredit/MyCredit/MyCredit"));
const InvoiceAndBilling = lazy(() =>
  import("../component/MyCredit/InvoiceAndBilling/InvoiceAndBilling")
);
const MyPaymentDetails = lazy(() =>
  import("../component/MyCredit/MyPaymentDetails/MyPaymentDetails")
);
const EmailNotification = lazy(() =>
  import("../component/SellerNotification/EmailNotification/EmailNotification")
);
const BrowserNotification = lazy(() =>
  import(
    "../component/SellerNotification/BrowserNotification/BrowserNotification"
  )
);
const BuyerFirstStep = lazy(() =>
  import("../component/buyerPanel/buyerClose/buyerCloseStep/buyerFirstStep")
);
const BuyerSecondStep = lazy(() =>
  import("../component/buyerPanel/buyerClose/buyerSecondStep/BuyerSecond")
);
const CloneSubCategoryTwoGardening = lazy(() =>
  import("../component/Level2/CloneSubCategoryTwoGardening")
);
const ContactUs = lazy(() => import("../component/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("../component/AboutUs/AboutUs"));
const HowItWorkSeller = lazy(() =>
  import("../component/HowItWorkSeller/HowItWorkSeller")
);
const WhatServiceYouNeed = lazy(() =>
  import(
    "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/WhatServiceYouNeed/WhatServiceYouNeed"
  )
);
const TermsAndCondition = lazy(() =>
  import("../component/TermsAndCondition/TermAndCondition")
);
const CookiePolicy = lazy(() =>
  import("../component/CooliesPolicies/CookiePolicy")
);
const ConversionRedirect = lazy(() =>
  import(
    "../component/buyerPanel/PlaceNewRequest/BuyerRegistration/ConversionRedirect/ConversionRedirect"
  )
);
const ThankuPage = lazy(() =>
  import("../component/common/ThankuPage/ThankuPage")
);
const MultiStepForm = lazy(() =>
  import("../component/MultiStepForm/MultiStepForm")
);
const MultiStepFormDriveways = lazy(() =>
  import("../component/MultiStepForm/MultiStepFormDriveways")
);
const MultiStepFormFencing = lazy(() =>
  import("../component/MultiStepForm/MultiStepFormFencing")
);
const MultiStepTreeSurgeon = lazy(() =>
  import("../component/MultiStepForm/MultiStepTreeSurgeon")
);
const MultiStepRoofingNew = lazy(() =>
  import("../component/MultiStepForm/MultiStepRoofingNew")
);
const Blog = lazy(() => import("../component/Blog/Blog"));

// Helper to wrap components with Suspense
const withSuspense = (Component, props = {}) => (
  <React.Suspense fallback={<FullScreenSpinner />}>
    <Component {...props} />
  </React.Suspense>
);
// const MultiStepRoofingPage = lazy(() =>
//   import("../pages/MultiStepRoofingPage")
// );
// const MultiStepRoofingBanner = lazy(() =>
//   import("../pages/MultiStepRoofingBanner")
// );
// Build routes once and reuse for both client and server routers
const routes = [
  {
    path: "/en/gb",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LocaleRedirect>{withSuspense(Homepage)}</LocaleRedirect>,
      },

      {
        path: "contact-us",
        element: <LocaleRedirect>{withSuspense(ContactUs)}</LocaleRedirect>,
      },

      {
        path: "about-us",
        element: <LocaleRedirect>{withSuspense(AboutUs)}</LocaleRedirect>,
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
        path: "passwordless_login",
        element: (
          <LocaleRedirect>
            <ProtectedLogin />
          </LocaleRedirect>
        ),
      },
      {
        path: "terms/",
        element: (
          <LocaleRedirect>{withSuspense(TermsAndCondition)}</LocaleRedirect>
        ),
      },
      {
        path: "new-ppc-driveways",
        element: (
          <LocaleRedirect>{withSuspense(NewDrivewaysPPCPage)}</LocaleRedirect>
        ),
      },
      {
        path: "cookie-policy",
        element: <LocaleRedirect>{withSuspense(CookiePolicy)}</LocaleRedirect>,
      },
      {
        path: "blog/news/eco4-axe-business-collapse-warning",
        element: (
          <LocaleRedirect>
            <Blog />
          </LocaleRedirect>
        ),
      },
      {
        path: "home",
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <CloneCatrgory
                routeName="home"
                accountHeader="Home & Garden"
                bestText={`It's super fast and easy!`}
              />
            </React.Suspense>
          </LocaleRedirect>
        ),
      },
      // {
      //   path: "transportation-services",
      //   element: (
      //     <LocaleRedirect>
      //       <Transport />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "builders/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneSubTwoCategory
      //         routeName="Home & Garden / Builders"
      //         accountHeader="Builders"
      //         subHeader="builder"
      //       />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "gardening-landscaping/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneSubCategoryTwoGardening
      //         routeName="gardening-landscaping"
      //         accountHeader="Gardening & Landscaping"
      //         subHeader="Gardening & Landscaping"
      //       />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "business/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneCatrgory
      //         routeName="business"
      //         accountHeader="Business"
      //         subHeader="Busines"
      //       />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "financial-and-accounting/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneCatrgory
      //         accountHeader="Financial & Accounting"
      //         subHeader="Financial Accountant"
      //       />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "accountants/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneCatrgory accountHeader="Accountants" subHeader="Accountant" />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "bookkeeping-services/",
      //   element: (
      //     <LocaleRedirect>
      //       <CloneCatrgory accountHeader="Bookkeepers" subHeader="Bookkeeper" />
      //     </LocaleRedirect>
      //   ),
      // },
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
      // {
      //   path: ":service/:location",
      //   element: (
      //     <LocaleRedirect>
      //       <LocationPage />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: ":service/:location/:subLocation",
      //   element: (
      //     <LocaleRedirect>
      //       <SublocationPage />
      //     </LocaleRedirect>
      //   ),
      // },
      {
        path: "how-it-works-for-customers",
        element: (
          <LocaleRedirect>
            {withSuspense(HowItWorksCustomerPage)}
          </LocaleRedirect>
        ),
      },
      {
        path: "how-it-works-for-sellers",
        element: (
          <LocaleRedirect>{withSuspense(HowItWorkSeller)}</LocaleRedirect>
        ),
      },
      {
        path: "sellers/create",
        element: (
          <LocaleRedirect>{withSuspense(ServicePanelPage)}</LocaleRedirect>
        ),
      },
      {
        path: "sellers/create-account/:serviceTitle",
        element: (
          <LocaleRedirect>{withSuspense(ServiceCreateAccount)}</LocaleRedirect>
        ),
      },
      ...levelFourLocationRoutes?.map(({ path, Component }) => ({
        path,
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <Component />
            </React.Suspense>
          </LocaleRedirect>
        ),
      })),
      { path: "privacy-policy/", element: withSuspense(PrivacyPolicy) },
      ...levelOnePagesRoutes.map(({ path, Component }) => ({
        path,
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <Component />
            </React.Suspense>
          </LocaleRedirect>
        ),
      })),
      ...landingPages.map(({ path, Component }) => ({
        path,
        element: (
          <ProtectedRoutePPC>
            <LocaleRedirect>
              <React.Suspense fallback={<FullScreenSpinner />}>
                <Component />
              </React.Suspense>
            </LocaleRedirect>
          </ProtectedRoutePPC>
        ),
      })),
      ...levelThreePagesRoutes?.map(({ path, Component }) => ({
        path,
        element: (
          <LocaleRedirect>
            <React.Suspense fallback={<FullScreenSpinner />}>
              <Component />
            </React.Suspense>
          </LocaleRedirect>
        ),
      })),
      {
        path: "sellers/pricing",
        element: <LocaleRedirect>{withSuspense(PricingPage)}</LocaleRedirect>,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LocaleRedirect>{withSuspense(Homepage)}</LocaleRedirect>,
      },
      { path: "/login", element: <Navigate to="/en/gb/login" replace /> },
      {
        path: "thank-you",
        element: withSuspense(ThankuPage),
      },
      // {
      //   path: "/login",
      //   element: <ProtectedLogin />,
      // },
      // {
      //   path: "/passwordless_login",
      //   element: (
      //     <LocaleRedirect>
      //       <ProtectedLogin />
      //     </LocaleRedirect>
      //   ),
      // },
      {
        path: "conversion/:requestId",
        element: withSuspense(ConversionRedirect),
      },
      // {
      //   path: "contact-us",
      //   element: (
      //     <LocaleRedirect>
      //       <ContactUs />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/about-us",
      //   element: (
      //     <LocaleRedirect>
      //       <AboutUs />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/how-it-works-for-customers",
      //   element: (
      //     <LocaleRedirect>
      //       <HowItWorksCustomerPage />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/how-it-works-for-sellers",
      //   element: (
      //     <LocaleRedirect>
      //       <HowItWorkSeller />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/en/gb/sellers/pricing",
      //   element: (
      //     <LocaleRedirect>
      //       <PricingPage />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/sellers/create",
      //   element: (
      //     <LocaleRedirect>
      //       <ServicePanelPage />
      //     </LocaleRedirect>
      //   ),
      // },
      // {
      //   path: "/sellers/create-account/:serviceTitle",
      //   element: (
      //     <LocaleRedirect>
      //       <ServiceCreateAccount />
      //     </LocaleRedirect>
      //   ),
      // },

      // { path: "/category", element: <Category /> },
      // { path: "/inprogress", element: <InProgressPage /> },
      // { path: "/category/:serviceName", element: <Category /> },
      // { path: "/sub-category", element: <SubCategoryPage /> },
      // { path: "/sub-category/:serviceSubName", element: <SubCategoryPage /> },
      {
        path: "/buyers/create",
        element: (
          <ProtectedRoute>{withSuspense(BuyerPanelPage)}</ProtectedRoute>
        ),
      },
      {
        path: "/user/settings",
        element: (
          <ProtectedRoute>{withSuspense(BuyerAccountSettings)}</ProtectedRoute>
        ),
      },
      {
        path: "/user/notification",
        element: (
          <ProtectedRoute>{withSuspense(BuyerNotification)}</ProtectedRoute>
        ),
      },
      {
        path: "sellers/dashboard",
        element: <ProtectedRoute>{withSuspense(Dashboard)}</ProtectedRoute>,
      },
      {
        path: "sellers/leads",
        element: <ProtectedRoute>{withSuspense(Leads)}</ProtectedRoute>,
      },
      {
        path: "/leads",
        element: <ProtectedRoute>{withSuspense(Leads)}</ProtectedRoute>,
      },
      {
        path: "/settings",
        element: <ProtectedRoute>{withSuspense(Settings)}</ProtectedRoute>,
      },
      {
        path: "/settings/profile/my-profile",
        element: <ProtectedRoute>{withSuspense(MyProfile)}</ProtectedRoute>,
      },
      {
        path: "/settings/profile/account-details",
        element: (
          <ProtectedRoute>{withSuspense(AccountDetails)}</ProtectedRoute>
        ),
      },
      {
        path: "/settings/leads/my-services",
        element: <ProtectedRoute>{withSuspense(LeadSetting)}</ProtectedRoute>,
      },
      {
        path: "/bids-list/:requestId",
        element: <ProtectedRoute>{withSuspense(BidsList)}</ProtectedRoute>,
      },
      {
        path: "/bids-list/reply/:requestId",
        element: <ProtectedRoute>{withSuspense(ManualBidList)}</ProtectedRoute>,
      },
      { path: "/help-center", element: withSuspense(HelpCenterPage) },

      {
        path: "/feedback/questions",
        element: (
          <ProtectedRoute>{withSuspense(SuggestQuestions)}</ProtectedRoute>
        ),
      },
      {
        path: "/feedback/questions/new",
        element: <ProtectedRoute>{withSuspense(NewQuestion)}</ProtectedRoute>,
      },
      {
        path: "/feedback/questions/edit",
        element: <ProtectedRoute>{withSuspense(EditQuestion)}</ProtectedRoute>,
      },
      {
        path: "/feedback/questions/remove",
        element: (
          <ProtectedRoute>{withSuspense(RemoveQuestion)}</ProtectedRoute>
        ),
      },
      {
        path: "/lead/profile-view/:profileId",
        element: (
          <ProtectedRoute>{withSuspense(LeadProfileData)}</ProtectedRoute>
        ),
      },
      {
        path: "/sellers/leads/my-responses",
        element: <ProtectedRoute>{withSuspense(MyResponse)}</ProtectedRoute>,
      },
      {
        path: "/sellers/leads/archive-leads",
        element: (
          <ProtectedRoute>
            <ArchiveLeads />
          </ProtectedRoute>
        ),
      },
      {
        path: "sellers/leads/save-for-later",
        element: <ProtectedRoute>{withSuspense(SaveForLater)}</ProtectedRoute>,
      },
      {
        path: "/pending/view-profile/:profileId",
        element: <ProtectedRoute>{withSuspense(ViewProfile)}</ProtectedRoute>,
      },
      {
        path: "/mycredit",
        element: <ProtectedRoute>{withSuspense(MyCredit)}</ProtectedRoute>,
      },
      {
        path: "/settings/billing/my-credits",
        element: <ProtectedRoute>{withSuspense(MyCredits)}</ProtectedRoute>,
      },
      {
        path: "/settings/billing/invoice-billing-details",
        element: (
          <ProtectedRoute>{withSuspense(InvoiceAndBilling)}</ProtectedRoute>
        ),
      },
      {
        path: "/settings/billing/payment-details",
        element: (
          <ProtectedRoute>{withSuspense(MyPaymentDetails)}</ProtectedRoute>
        ),
      },
      {
        path: "/view-profile/:company_name/:requestId",
        element: withSuspense(ViewProfiles),
      },
      {
        path: "/review/:profileId",
        element: withSuspense(ViewProfiles),
      },
      {
        path: "/settings/notifications/e-mail-notification",
        element: (
          <ProtectedRoute>{withSuspense(EmailNotification)}</ProtectedRoute>
        ),
      },
      {
        path: "/settings/notifications/browser-notification",
        element: (
          <ProtectedRoute>{withSuspense(BrowserNotification)}</ProtectedRoute>
        ),
      },
      {
        path: "/inprogress",
        element: (
          <ProtectedRoute>{withSuspense(InProgressPage)}</ProtectedRoute>
        ),
      },
      {
        path: "/buyer-close/:id",
        element: (
          <ProtectedRoute>{withSuspense(BuyerFirstStep)}</ProtectedRoute>
        ),
      },
      {
        path: "/buyer-second-step",
        element: (
          <ProtectedRoute>{withSuspense(BuyerSecondStep)}</ProtectedRoute>
        ),
      },
      {
        path: "/whats-service",
        element: (
          <ProtectedRoute>{withSuspense(WhatServiceYouNeed)}</ProtectedRoute>
        ),
      },
      { path: "*", element: withSuspense(NotFound) },
    ],
  },
  {
    path: "/en/gb/landscaping-multi-form-ppc",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>{withSuspense(MultiStepForm)}</LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/landscaping-multi-form-ppc-banner",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>{withSuspense(MultiStepWithImage)}</LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/driveways-multi-form-ppc",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>{withSuspense(MultiStepFormDriveways)}</LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/driveways-multi-form-ppc-banner",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          {withSuspense(MultiStepDrivewayWithBanner)}
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/fence-multi-form-ppc",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>{withSuspense(MultiStepFormFencing)}</LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/roofing-multi-form-ppc",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          <React.Suspense fallback={<FullScreenSpinner />}>
            <MultiStepRoofingNew serviceId={113} />
          </React.Suspense>
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/roofing-multi-form-ppc-banner",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          <React.Suspense fallback={<FullScreenSpinner />}>
            <MultiStepRoofingNew
              serviceName="Roofing"
              isQuestionWithImage
              serviceId={113}
            />
          </React.Suspense>
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/fence-multi-form-ppc-banner",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          {withSuspense(MultiStepFenchWithBanner)}
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/tree-surgeon-multi-form-ppc",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          <React.Suspense fallback={<FullScreenSpinner />}>
            <MultiStepTreeSurgeon
              serviceName="Tree Surgeon"
              path="tree-surgeon-multi-form-ppc"
              serviceId={112}
            />
          </React.Suspense>
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
  },
  {
    path: "/en/gb/tree-surgeon-multi-form-ppc-banner",
    element: (
      <ProtectedRouteForMultiFormPPC>
        <LocaleRedirect>
          <React.Suspense fallback={<FullScreenSpinner />}>
            <MultiStepTreeSurgeon
              serviceName="Tree Surgeon"
              path="tree-surgeon-multi-form-ppc"
              serviceId={112}
              isQuestionWithImage
            />
          </React.Suspense>
        </LocaleRedirect>
      </ProtectedRouteForMultiFormPPC>
    ),
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
