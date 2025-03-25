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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/category", element: <Category /> },
      { path: "/sub-category", element: <SubCategoryPage /> },
      { path: "/location", element: <LocationPage /> },
      { path: "/how-it-works", element: <HowItWorksPage /> },
      { path: "/sellers/create", element: <ServicePanelPage /> },
      {
        path: "/sellers/create-account/:serviceTitle",
        element: <ServiceCreateAccount />,
      },
      { path: "/buyers/create", element: <BuyerPanelPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
