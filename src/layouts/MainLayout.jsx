import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../component/common/navbar/Navbar";
import Footer from "../component/common/footer/Footer";
import MetaHelmet from "../component/common/helmet/metaHelmet";
import { useEffect } from "react";
import ScrollToTop from "../routes/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import {
  addViewProfileList,
  ReviewProfile,
} from "../store/LeadSetting/leadSettingSlice";
// const pageTitles = {
//   "/": "Homepage | Localists",
//   "/login": "Login | Localists",
//   "/category": "Categories | Localists",
//   "/sub-category": "Sub Categories | Localists",
//   "/location": "Locations | Localists",
//   "/how-it-works": "How It Works | Localists",
//   "/sellers/create/": "Create Seller Account | Localists",
//   "/buyers/create": "Create Buyer Account | Localists",
//   "/account/setting": "Account Settings | Localists",
//   "/user/notification": "Buyer Notifications | Localists",
//   "/privacy-policy": "Privacy Policy | Localists",
//   "/sellers/dashboard": "Dashboard | Localists",
//   "/sellers/leads" : "Leads | Localists",
//   "/settings" : "Setting | Localists",
//  "/leads/settings" : "Lead Setting | Locallist" ,
//  "/lead/save-for-later" : "Saved Lead | Locallist",
//  "/lead/save-later": "My Response | Locallist",
//  "/help-center" : "Help | Locallist",
 

// };

const pageTitles = {
 "/": {
   title: "Homepage | Localists",
   description: ""
 },
 "/login": {
   title: "Localists Login | Access Your Account",
   description: "Log in to your Localists account to manage leads, connect with customers, and grow your business with trusted local opportunities."
 },
 "/sellers/dashboard": {
   title: "Localists.com - Connect with Customers & Grow Your Business",
   description: "Join Localists for free and connect with customers actively searching for talented professionals like you. Pitch confidently and grow your business today."
 },
  "/category": {
    title: "Categories | Localists",
    description: ""
  },
  "/view-profile": {
    title: "Localists.com - View Profile",
    description: ""
  },
  "/sub-category": {
    title: "Sub Categories | Localists",
    description: ""
  },
  "/location": {
    title: "Locations | Localists",
    description: ""
  },
  "/how-it-works": {
    title: "How It Works | Localists",
    description: ""
  },

  "/sellers/create/": {
    title: "Join Localists for Professionals | Free Sign-Up",
    description: "Join Localists free as a professional. Get verified leads with no hidden fees. Pay only for the customers you want and keep all your earnings."
  },
  "/buyers/create": {
    title: "Localists.com - Create Your Request",
    description: "Find trusted local service professionals with Localists. Get free quotes quickly for your home, business, garden, or Lesson & trainings needs."
  },
  "/user/settings": {
    title: "Localists.com - Account Settings",
    description: "Update your Localists profile, customize notification preferences, manage security settings, and personalize your experience—your account, your way.”"
  },
  "/user/notification": {
    title: "Localists.com - Notification Settings",
    description: "Manage your Localists notification preferences - choose how you receive updates about leads, alerts, and messages to stay informed your way."
  },
  "/privacy-policy": {
    title: "Localists.com - Privacy Policy",
    description: ""
  },
  "/settings/leads/my-services": {
    title: "Localists.com - Settings - Lead Settings",
    description: "Control how you receive leads on Localists. Adjust preferences, manage notifications, and optimise settings to connect with the right customers."
  },
  "/sellers/leads/save-for-later": {
    title: "Localists.com - Save Leads for Later & Organize Your Leads",
    description: "Keep track of valuable leads by saving them for later on Localists. Return when you're ready and stay organized."
  },
  "/sellers/leads/my-responses": {
    title: "Localists.com - My Responses",
    description: "Manage and track your responses to customer leads on Localists. Review past messages, follow up quickly, and grow your business with timely replies."
  },
  "/sellers/leads": {
    title: "Localists.com - Manage Your Leads & Connect with Customers",
    description: "Access your local leads for free to view, manage, and respond to customer leads efficiently. Manage all your leads effortlessly from one dashboard."
  },
  "/settings": {
    title: "Localists.com - Settings",
    description: "Manage your Localists account preferences—update your profile, notification settings, and more to customize your experience."
  },
  "/settings/profile/my-profile": {
    title: "Localists.com - Settings - My Profile",
    description: "Manage and update your Localists profile. Edit personal details, showcase your expertise, and keep your information accurate to attract more customers."
  },
  "/settings/profile/account-details": {
    title: "Localists.com - Settings - Account Details",
    description: "Easily update your Localists account details. Keep your login, security, and personal information up to date for a seamless experience."
  },
  "/settings/billing/my-credits": {
    title: "Localists.com - Settings - My Credits",
    description: "Track and manage your Localists credits. View balances, monitor usage, and stay in control of your spending while growing your business."
  },
  "/settings/billing/invoice-billing-details": {
    title: "Localists.com - Settings - Invoice Billing Details",
    description: "Access and manage your Localists invoices and billing history. Download receipts, view past payments, and stay organised with your account records."
  },
  "/settings/billing/payment-details": {
    title: "Localists.com - Settings - Payment Details",
    description: "Securely manage your Localists payment methods. Update card information, add new payment options, and ensure smooth transactions every time."
  },
  "/settings/notifications/e-mail-notification": {
    title: "Localists.com - Settings - Email Notification",
    description: "Customise your Localists email notification preferences. Stay updated on leads, messages, and platform updates without overwhelming your inbox."
  },
  "/settings/notifications/browser-notification": {
    title: "Localists.com - Settings - Browser Notification",
    description: "Manage your Localists browser notifications. Choose real-time alerts for new leads and updates, so you never miss an opportunity."
  },
  "/help-center": {
    title: "Localists.com - Help",
    description: ""
  },
  "/feedback/questions": {
    title: "Localists.com - Feedback Questions",
    description: "Explore customer feedback questions on Localists. Review insights, share experiences, and help improve services by engaging with our feedback platform."
  },
  "/feedback/questions/new": {
    title: "Localists.com - Submit a New Feedback Question",
    description: "Share your thoughts and experiences on Localists by submitting a new feedback question. Help shape better services for local professionals and customers."
  },
  "/feedback/questions/edit": {
    title: "Localists.com - Edit Feedback Question",
    description: "Update and refine your existing feedback on Localists. Edit your questions to ensure your voice is heard and your experience is accurately shared."
  },
  "/feedback/questions/remove": {
    title: "Localists.com - Remove Feedback Question",
    description: "Manage your contributions on Localists by removing feedback questions you no longer wish to share. Keep your profile and insights up to date."
  },
};

const MainLayout = () => {
 const location = useLocation();
   const { requestId } = useParams();
  const { profileId } = useParams();

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { viewProfileData } = useSelector((state) => state.leadSetting);
  const { reviewProfileData } = useSelector((state) => state.leadSetting);
  const dispatch = useDispatch();
  useEffect(() => {
    const sellerData = {
      seller_id: requestId,
      buyer_id: userToken?.id ? userToken?.id : registerData?.id,
      lead_id: requestId,
    };
    profileId && dispatch(ReviewProfile(profileId));
    requestId && dispatch(addViewProfileList(sellerData));
  }, []);


 // Support localized URLs by stripping "/:lang/:country" before lookup
 const stripLocalePrefix = (path) => {
   const m = path.match(/^\/[a-z]{2}\/[a-z]{2}(\/.*)?$/);
   if (m) {
     const rest = m[1] || "/";
     return rest;
   }
   return path;
 };
 function getServiceNames(userData) {
    if (!userData.services || userData.services.length === 0) {
      return "";
    }

    return userData.services
      .map((service) => service.user_services?.[0]?.name)
      .filter(Boolean)
      .join(" | ");
  }
 const lookupPath = stripLocalePrefix(location.pathname);
 let meta = pageTitles[lookupPath];

 // Handle dynamic route for /view-profile/:companyName/:id
 if (!meta && lookupPath.startsWith("/view-profile") && requestId) {
    const parts = location.pathname.split("/");
    const companyName = decodeURIComponent(parts[2] || "");
    meta = {
      title: `${
        viewProfileData?.company_name || viewProfileData?.name || companyName
      } | Localists`,
      description: `Discover more about ${
        viewProfileData?.company_name || viewProfileData?.name || companyName
      }  on Localists. View company details, services, and connect directly.`,
    };
 }
  
 if (!meta && lookupPath.startsWith("/review") && profileId) {
    console.log(reviewProfileData, "rr");
    meta = {
      title: `${
        reviewProfileData?.company_name || profileId
      }  | Localists Profile & Reviews `,
      description: `Discover more about ${
        reviewProfileData?.company_name
      }  is ${getServiceNames(
        reviewProfileData
      )} on Localists, serving customers nationwide. Check out their Localists profile and leave a review now.`,
    };
  }

 const { title, description } = meta || {
   title: "Localists",
   description: "Discover and connect with local businesses on Localists."
 };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <MetaHelmet title={title} description={description} />
      <main style={{ minHeight: "50vh" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
