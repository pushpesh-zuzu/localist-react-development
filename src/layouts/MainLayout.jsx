import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/common/navbar/Navbar";
import Footer from "../component/common/footer/Footer";
import MetaHelmet from "../component/common/helmet/metaHelmet";
import { useEffect } from "react";
import ScrollToTop from "../routes/ScrollToTop";

const pageTitles = {
  "/": "Homepage | Localists",
  "/login": "Login | Localists",
  "/category": "Categories | Localists",
  "/sub-category": "Sub Categories | Localists",
  "/location": "Locations | Localists",
  "/how-it-works": "How It Works | Localists",
  "/sellers/create/": "Create Seller Account | Localists",
  "/buyers/create": "Create Buyer Account | Localists",
  "/account/setting": "Account Settings | Localists",
  "/user/notification": "Buyer Notifications | Localists",
  "/privacy-policy": "Privacy Policy | Localists",
  "/dashboard": "Dashboard | Localists",
  "/leads" : "Leads | Localists",
  "/settings" : "Setting | Localists",
 "/leads/settings" : "Lead Setting | Locallist" ,
 
  
};

const MainLayout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Localists";

  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <MetaHelmet title={title} />
      <main style={{ minHeight: "50vh" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
