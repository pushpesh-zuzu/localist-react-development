import businessProfessionals from "../../src/assets/Images/BusinessProfessionals.svg";
import WhatYouNeedIcon from "../assets/Icons/WhatYouNeedIcon.png";
import FreeQuotesIcon from "../assets/Icons/FreeQuotesIcon.png";
import BusinessProfessionalsIcon from "../assets/Icons/BusinessProfessionalsIcon.png";
import AccountingImage from "../assets/Images/AccountingImage.svg";
import gen_acc_img from "../assets/Images/gen_acc_img.svg";
import BookkeepingImage from "../assets/Images/BookkeepingImage.svg";
import SocialMediaImage from "../assets/Images/SocialMediaImage.svg";
import BusinessConsulting from "../assets/Images/business_consulting.svg";
import { ArtificialGrassSlider, DrivewayInstallationSlider, FenceAndGateInsallationSlider, LandscapingSlider, PatioServicesSlider, TreesugeonSlider } from "../component/level3/imagesServices";

const CATEGORIES = [
  {
    title: "Business Professionals",
    image: businessProfessionals,
  },
];

const HowItWorksData = {
  // Business category data
  business: [
    {
      id: 1,
      title: "the Best Match",
      image: WhatYouNeedIcon,
      heading1: "Find ",
      heading2: "the Best Match",
      description:
        "We will help you find quality Business Professionals in your local area. Let us know your requirements, and Localists will match you with the best service provider to help you.",
    },
    {
      id: 2,
      title: "Free Quotes",
      image: FreeQuotesIcon,
      heading1: "Request ",
      heading2: "Free Quotes",
      description:
        "We will send you quotes from local Business Professionals for free. You can then compare profiles from Business Professionals near you, read verified reviews, see what makes them stand out, and pick the best Business Professional for you.",
    },
    {
      id: 3,
      title: "Business Professional",
      image: BusinessProfessionalsIcon,
      heading1: "Work With Your ",
      heading2: "Business Professional",
      description:
        "Once you've found the right Business Professional, you can contact them straight away. Discuss your project, ask questions, and get things moving with confidence.",
    },
  ],

  // Home category data
  home: [
    {
      id: 1,
      title: "the Best Match",
      image: WhatYouNeedIcon, // Same icon as business
      heading1: "Find the ",
      heading2: "best match",
      break: true,

      description:
        "We’ll help you find quality Home & Garden professionals in your local area. Just let us know your requirements, and Localists will match you with the best service providers to help you",
    },
    {
      id: 2,
      title: "Free Quotes",
      image: FreeQuotesIcon, // Same icon as business
      heading1: "Request ",
      heading2: "free quotes",
      break: true,

      description:
        "We’ll send you free quotes from local Home & Garden professionals. Compare profiles, read verified reviews, see what makes each provider stand out, and choose the right one for you.",
    },
    {
      id: 3,
      title: "Home & Garden Professional",
      image: BusinessProfessionalsIcon, // Same icon as business
      heading1: "Work with your ",
      heading2: "home & garden ",
      heading3: "professional",
      break: false,
      description:
        "Once you’ve found the right professional, you can contact them straight away. Discuss your project, ask questions, and move forward with confidence.",
    },
  ],
};

const PopularCategoriesData = [
  {
    id: 1,
    availableOnline: true,
    title: "Accounting",
    image: AccountingImage,
  },

  {
    id: 2,
    title: "Bookkeeping Services",
    image: BookkeepingImage,
  },
  {
    id: 3,
    title: "Fence & Gate Installation",
    image: FenceAndGateInsallationSlider,
    path: "fencing-contractors-near-me",
  },
  {
    id: 4,
    title: "Driveway Installation",
    path: "driveway-installers-near-me",
    image: DrivewayInstallationSlider, // apna image import karke lagao
  },

  {
    id: 5,
    title: "Business Consulting",
    image: BusinessConsulting,
  },
  {
    id: 6,
    title: "Social Media Marketing",
    image: SocialMediaImage,
  },

  {
    id: 7,
    availableOnline: true,
    title: "General Accounting",
    image: gen_acc_img,
  },

  {
    id: 8,
    title: "Patio Services",
    image: PatioServicesSlider,
    path: "patio-layers-near-me",
  },
  {
    id: 9,
    title: "Landscaping",
    path: "landscape-gardeners-near-me",

    image: LandscapingSlider,
  },
  {
    id: 10,
    title: "Artificial Grass Installation",
    path: "artificial-grass-installers-near-me",

    image: ArtificialGrassSlider,
  },
    {
    id: 11,
    title: "Tree Surgeons",
    image: TreesugeonSlider,
    path: "tree-surgeon-near-me",
  },
];
const categoryRoutes = {
  Builders: "/builders",
  "Gardening & Landscaping": "/gardening-landscaping",
};
const serviceRoutes = {
  "Fence & Gate Installation": "/fence-installers",
  "Driveway Installation": "/driveway-installers",
  "Patio Services": "/patio-services",
  Landscaping: "/landscaping",
  "Artificial Grass Installation": "/artificial-grass-installation",
};

const AllServicesData = [
  {
    key: 13,
    "Financial and Accounting": [
      "Accounting",
      "general Accounting",
      "Bookkeeping Services",
    ],
  },
  {
    key: 13,
    "Office and Business": ["Business Consulting"],
  },
  {
    key: 13,
    Marketing: ["Social Media Marketing"],
  },
  {
    key: 32,
    Builders: [
      "Fence & Gate Installation",
      "Driveway Installation",
      "Patio Services",
    ],
  },
  {
    key: 33,
    "Gardening & Landscaping": ["Landscaping", "Artificial Grass Installation"],
  },
  {
    key: 34,
    "Financial & Accounting": ["Accounting", "Bookkeeping Services"],
  },
  {
    key: 35,
    "Business Services": [
      "Accounting",
      "Bookkeeping Services",
      "Business Consulting",
      "Social Media Marketing",
    ],
  },
];

export {
  CATEGORIES,
  HowItWorksData,
  PopularCategoriesData,
  AllServicesData,
  categoryRoutes,
  serviceRoutes,
};
