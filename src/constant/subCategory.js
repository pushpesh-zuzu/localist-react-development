import london from "../assets/Images/subcategory/london.svg";
import birmingham from "../assets/Images/subcategory/brimingham.svg";
import liverpool from "../assets/Images/subcategory/liverpool.svg";
import WhatYouNeedIcon from "../assets/Icons/WhatYouNeedIcon.png";
import FreeQuotesIcon from "../assets/Icons/FreeQuotesIcon.png";
import accountant from "../assets/Images/subcategory/accountant.png";
import TaxPreparationImg from "../assets/Images/subcategory/tax-pre.png";
import TaxResolutionImg from "../assets/Images/subcategory/tax-res.png";
import PayrollServicesImg from "../assets/Images/subcategory/payroll.png";
import TaxReturn from "../assets/Images/subcategory/tax-return-uk.png";
import AccountentBusiness from "../assets/Images/subcategory/accountant-business.png";
import BasicAccounting from "../assets/Images/subcategory/basic-accounting.png";
import AccountingCost from "../assets/Images/subcategory/accounting-cost.png";
import TaxAccountent from "../assets/Images/subcategory/tax-acc-cost.png";
import FinancialCost from "../assets/Images/subcategory/financial-cost.png";
import ReviewsImage from "../assets/Images/subcategory/reviews_girl.png";
import Builders from "../assets/Images/servicesLevels/Builders.jpg";
import Driveway from "../assets/Images/servicesLevels/Driveway-Installation.jpg";
import fenchinstal from "../assets/Images/servicesLevels/Fence-&-Gate-Installation.jpg";
import Home from "../assets/Images/servicesLevels/Home.jpg";
import Landscaping from "../assets/Images/servicesLevels/Landscaping.jpg";
import Patio from "../assets/Images/servicesLevels/Patio-Services.jpg";
import ArtificialGrass from "../assets/Images/servicesLevels/ArtificialGrass.jpg";

const POPULAR_CITIES = [
  {
    city_image: london,
    city_name: "London",
  },
  {
    city_image: birmingham,
    city_name: "Birmingham",
  },
  {
    city_image: liverpool,
    city_name: "Liverpool",
  },
];
export const POPULARCITY = {
  "fence-installers": [
    { id: 1, title: "Liverpool", image: london },
    { id: 2, title: "Manchester", image: birmingham },
    { id: 3, title: "Chester", image: liverpool },
    { id: 4, title: "Warrington", image: london },
    { id: 5, title: "Ellesmere Port", image: london },
  ],
};

const HowItWorksData = {
  "fence-installers": [
    {
      id: 1,
      title: "Find Expert Fencers Near You",
      image: WhatYouNeedIcon,
      heading1: "Find Expert Fencers Near You",
      description:
        "Share what you need and where you need it, and we’ll introduce you to local fencing specialists. Whether you’re after stylish picket fencing, secure garden panels, or a custom gate, we have trusted professionals ready to get started quickly.",
    },
    {
      id: 2,
      title: "Get Free Quotes – Fast",
      image: FreeQuotesIcon,
      heading1: "Get Free Quotes – Fast",
      description:
        "We’ll match you with vetted fencing and gate installation experts based on your requirements. You’ll receive tailored quotes from local professionals – at no cost. You can choose to get instant notifications or review your quotes whenever it suits you.",
    },
    {
      id: 3,
      title: "Choose the Right Fencer",
      image: accountant, // Note: You might want to rename this variable to 'fencher' or similar
      heading1: "Choose the Right Fencer",
      description:
        "View detailed profiles, browse previous work, and read verified reviews – all in one place. Once you’ve found your perfect match, simply get in touch and finalise the job. Finding and hiring a fencer has never been easier.",
    },
  ],
};

const regionsData = {
  "fence-installers": [
    {
      id: 3,
      title: "North West England",
      items: ["Cheshire", "Greater Manchester", "Lancashire", "Merseyside"],
    },
  ],
};

const AVERAGE_PRICE = {
  "fence-installers": [
    {
      Region: "Nationwide",
      "Great Value": "£150",
      Average: "£200",
      Premium: "£400",
    },
    {
      Region: "East Midlands",
      "Great Value": "£150",
      Average: "£150",
      Premium: "£350",
    },
    {
      Region: "East of England",
      "Great Value": "£150",
      Average: "150",
      Premium: "£375",
    },
  ],
};

const TAXRETURNDATA = {
  "fence-installers": {
    key: "1",
    heading1: "What is involve with fence and gate installation",
    heading2: "fence and gate installation",
    shortDes:
      "Get the low-down on what's involved in a fence and gate installation project",
    name: "Alex, Staff Writer",
    date: "2025-11-15",
  },
};

const FREQUENTLY_DATA = {
  "fence-installers": [
    {
      key: "1",
      title: "How long does it take to install automatic gates?",
      description:
        "Usually 2–3 days, depending on the size and complexity of the gates",
    },
    {
      key: "2",
      title: "How long does it take to install fences?",
      description: "Most standard fences can be installed in 1–3 days.",
    },
    {
      key: "3",
      title: "Do I need planning permission for driveway gates?",
      description:
        " Yes, if the gate will be taller than 1 metre and is next to a public road or footpath.",
    },
    {
      key: "4",
      title: " Do I need planning permission for fences?",
      description:
        "Yes, if the fence is more than 2 metres high, or over 1 metre and next to a road or footpath.",
    },
  ],
};

const OTHER_SERVICES_DATA = {
  "fence-installers": [
    {
      id: 1,
      image: Driveway, // Original image kept
      description: "Driveway Installation",
      availableOnline: true,
    },
    {
      id: 2,
      image: Patio, // Original image kept
      description: "Patio Services",
    },
    {
      id: 3,
      image: Landscaping, // Original image kept
      description: "Landscaping",
      availableOnline: true,
    },
    {
      id: 4,
      image: ArtificialGrass, // Original image kept
      description: "Artificial Grass Installation",
    },
  ],
};

const RELATED_SERVICES_DATA = {
  "fence-installers": [
    {
      id: 1,
      title: "Fence Installation",
      image: fenchinstal, // Original image kept
      description:
        "Your 2025 fence installation guide: Everything you need to know in the UK",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Fence Repair",
      image: fenchinstal, // Original image kept
      description: "Here's why you need professional fence maintenance",
    },
    {
      id: 3,
      title: "Fence Materials",
      image: fenchinstal, // Original image kept
      description: "What are the best materials for fencing?",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Garden Fencing",
      image: fenchinstal, // Original image kept
      description: "Complete guide to choosing garden fencing",
    },
  ],
};

const RELATED_PRICE_DATA = {
  "fence-installers": [
    {
      id: 1,
      title: "Fence Installation",
      image: fenchinstal, // Original image kept
      description: "How much does fence installation cost?",
      availableOnline: true,
    },
    {
      id: 2,
      title: "Wood Fencing",
      image: fenchinstal, // Original image kept
      description: "How much does wood fencing cost in 2025?",
    },
    {
      id: 3,
      title: "Chain Link Fencing",
      image: fenchinstal, // Original image kept
      description: "How much does chain link fence installation cost?",
      availableOnline: true,
    },
    {
      id: 4,
      title: "Fence Repair",
      image: fenchinstal, // Original image kept
      description: "Here's why you need professional fence maintenance",
    },
  ],
};

const REVIEWS_DATA = {
  "fence-installers": [
    {
      id: 1,
      name: "Daniel Kennedy",
      title: "(Residential Fencing)",
      date: "13 Feb 2025",
      image: ReviewsImage, // Original image kept
      description:
        "Great job on my fence! He did exactly what I wanted. Definitely recommend. I am going to use them on my next property.",
    },
    {
      id: 2,
      name: "Fatima H.",
      title: "(Commercial Fencing)",
      date: "13 Feb 2025",
      image: ReviewsImage, // Original image kept
      description:
        "Great job on my fence! He did exactly what I wanted. Definitely recommend. I am going to use them on my next property.",
    },
    {
      id: 3,
      name: "James Wilson",
      title: "(Garden Fencing)",
      date: "15 Mar 2025",
      image: ReviewsImage, // Original image kept
      description:
        "Professional fence installation with excellent results. Will hire again for future projects!",
    },
  ],
};
const CONTENT_CONFIG = {
  "fence-installers": {
    para1:
      "Find skilled fencing professionals in your area with Localists.com – and get free, no-obligation quotes in minutes.",
    para2:
      "Not sure where to begin? Just tell us a little about your project, and we’ll connect you with reliable fencing experts near you. There’s no pressure to hire – you can compare profiles, read genuine customer reviews, and request extra details before making your choice.",
    para3: "It's super fast and easy!",
  },
};
const BREADCRUMB_CONFIG = {
  "fence-installers": [
    { title: "Home & Garden", path: "/home-garden" },
    { title: "Builders", path: "/home-garden/builders" },
    { title: "Fence & Gate Installation", path: "/fence-install" },
  ],
};
export {
  POPULAR_CITIES,
  regionsData,
  AVERAGE_PRICE,
  HowItWorksData,
  FREQUENTLY_DATA,
  OTHER_SERVICES_DATA,
  RELATED_SERVICES_DATA,
  RELATED_PRICE_DATA,
  REVIEWS_DATA,
  TAXRETURNDATA,
  CONTENT_CONFIG,
  BREADCRUMB_CONFIG,
};
