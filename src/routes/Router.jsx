import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/authentication/LoginPage";
import Homepage from "../pages/Homepage";
import Category from "../pages/Category";
import SubCategoryPage from "../pages/SubCategoryPage";
import LocationPage from "../pages/LocationPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import ServicePanel from "../component/servicePanel";
import ServicePanelPage from "../pages/ServicePanelPage";
import ServiceCreateAccount from "../component/servicePanel/FindLocalJobs/ServiceCreateAccount/ServiceCreateAccount";

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

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
