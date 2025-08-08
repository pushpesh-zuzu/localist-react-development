import businessProfessionals from "../../src/assets/Images/BusinessProfessionals.svg";
import WhatYouNeedIcon from "../assets/Icons/WhatYouNeedIcon.png";
import FreeQuotesIcon from "../assets/Icons/FreeQuotesIcon.png";
import BusinessProfessionalsIcon from "../assets/Icons/BusinessProfessionalsIcon.png";
import AccountingImage from "../assets/Images/AccountingImage.svg";
import general_accouting from "../assets/Images/general_accouting.svg";
import gen_acc_img from "../assets/Images/gen_acc_img.svg";
import BookkeepingImage from "../assets/Images/BookkeepingImage.svg";
import DebtRecoveryImage from "../assets/Images/DebtRecoveryImage.svg";
import MobileDevelopmentImage from "../assets/Images/MobileDevelopmentImage.svg";
import SEOImage from "../assets/Images/SEOImage.svg";
import SecurityServicesImage from "../assets/Images/SecurityServicesImage.svg";
import SocialMediaImage from "../assets/Images/SocialMediaImage.svg";
import TaxPreparationImage from "../assets/Images/TaxPreparationImage.svg";
import WebDesignImage from "../assets/Images/WebDesignImage.svg";
import BusinessConsulting from "../assets/Images/business_consulting.svg";
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
        heading1: "Find ",
        heading2: "the Best Match",
        description:
          "We will help you find quality Home & Garden Professionals in your local area. Let us know your requirements, and Localists will match you with the best service provider to help you.",
      },
      {
        id: 2,
        title: "Free Quotes",
        image: FreeQuotesIcon, // Same icon as business
        heading1: "Request ",
        heading2: "Free Quotes",
        description:
          "We will send you quotes from local Home & Garden Professionals for free. You can then compare profiles from House & Home Professionals near you, read verified reviews, see what makes them stand out, and pick the best Home & Garden Professional for you.",
      },
      {
        id: 3,
        title: "Home & Garden Professional",
        image: BusinessProfessionalsIcon, // Same icon as business
        heading1: "Work With Your ",
        heading2: "Home & Garden Professional",
        description:
          "Once you've found the right Home & Garden Professional, you can contact them straight away. Discuss your project, ask questions, and get things moving with confidence.",
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
  // {
  //   id: 3,
  //   availableOnline: true,
  //   title: "Debt Recovery & Collection",
  //   image: DebtRecoveryImage,
  // },
  // {
  //   id: 4,
  //   title: "Mobile Software Development",
  //   image: MobileDevelopmentImage,
  // },
  // {
  //   id: 5,
  //   title: "Search Engine Optimization(SEO) Specialists",
  //   image: SEOImage,
  // },
  // {
  //   id: 6,
  //   title: "Security Guard Services",
  //   image: SecurityServicesImage,
  // },
  {
    id: 10,
    title: "Business Consulting",
    image: BusinessConsulting,
  },
  {
    id: 7,
    title: "Social Media Marketing",
    image: SocialMediaImage,
  },
  // {
  //   id: 8,
  //   availableOnline: true,
  //   title: "Tax Preparation",
  //   image: TaxPreparationImage,
  // },
  // {
  //   id: 9,
  //   title: "Web Design",
  //   image: WebDesignImage,
  // },
  {
    id: 10,
    availableOnline: true,
    title: "General Accounting",
    image: gen_acc_img,
  },
  {
    id: 11,
    title: "Architectural Services",
    image: BusinessConsulting,
  }, 
  {
    id: 12,
    title: "Property Extensions",
    image: TaxPreparationImage,
  },
  {
    id: 13,
    title: "Patio Services",
    image: SecurityServicesImage,
  },
];

const AllServicesData = [
  // {
  //   key: 1,
  //   "Advertising and Media Buying": [
  //     "Advertising",
  //     "Advertising Copywriting",
  //     "Online Media Buying",
  //     "Print Media Purchasing",
  //     "Radio Airtime Purchasing",
  //     "Straplines and Slogans",
  //     "TV Media Buying",
  //   ],
  // },
  // {
  //   key: 2,
  //   Branding: [
  //     "Business Stationery Design",
  //     "Email Template Design",
  //     "Flyer & Leaflet Design",
  //     "Logo Design",
  //   ],
  // },
  // {
  //   key: 3,
  //   "Business Essentials": [
  //     "Auditing Services",
  //     "Branded Merchandise",
  //     "Data Analytics",
  //     "Debt Recovery & Collection",
  //     "Machine Learning & AI Experts",
  //     "Payroll Services",
  //     "Recovery and Repossession Services",
  //     "Statistical Analysis",
  //     "Tax Preparation",
  //     "Tax Resolution",
  //     "Telephone System Services",
  //     "Vehicle Tracking",
  //   ],
  // },
  // {
  //   key: 4,
  //   "Commercial Law": [
  //     "Commercial Legal Services",
  //     "Debt Recovery & Collection",
  //     "Franchising",
  //     "Intellectual Property & Patent Lawyer",
  //     "Merger & Acquisition Lawyers",
  //     "Trademark Lawyers",
  //   ],
  // },
  // {
  //   key: 5,
  //   "Copywriting Services": [
  //     "Advertising Copywriting",
  //     "Articles and Report Writing",
  //     "Brochure Copywriting",
  //     "Case Study Copywriting",
  //     "Email Copywriting",
  //     "Marketing Copywriting",
  //     "PPC Advert Copywriting",
  //     "Script Writing Services",
  //     "SEO Copywriting and Content",
  //     "Website Copywriting",
  //   ],
  // },
  // {
  //   key: 6,
  //   "Development and Software": [
  //     "AI Development",
  //     "Coding Tuition",
  //     "Database Development",
  //     "General Software Development",
  //     "Mobile Software Development",
  //     "Software Testing",
  //     "Web Development",
  //   ],
  // },
  // {
  //   key: 7,
  //   "Digital Marketing Services": [
  //     "Email Marketing",
  //     "Other Digital Marketing Services",
  //     "Paid Search (PPC) Specialists",
  //     "Search Engine Optimization (SEO) Specialists",
  //     "Social Media Marketing",
  //   ],
  // },
  // {
  //   key: 8,
  //   "Employment Law": ["Arbitration Services", "Employment Law Specialists"],
  // },
  // {
  //   key: 9,
  //   "Event and Travel Services": [
  //     "Commercial Catering",
  //     "Commercial Event Planning",
  //     "Corporate Coach and Minibus Hire",
  //     "Corporate Event Entertainment",
  //     "Corporate Event Photography",
  //     "Corporate Event Venue Hire",
  //     "Security Guard Services",
  //   ],
  // },
  // {
  //   key: 10,
  //   "Financial and Tax": ["Pensions and Incentives", "Tax Lawyer"],
  // },
  // {
  //   key: 11,
  //   "Financial Planning": [
  //     "Budgeting and Forecasting Services",
  //     "Business Financial Planning",
  //     "Business Modelling Services",
  //     "Valuations",
  //     "Venture Capital",
  //   ],
  // },
  // {
  //   key: 12,
  //   "Accounting": [
  //     "Accounting",
  //     "general Accounting",
  //     "Bookkeeping Services",
  //     "Social Media Marketing",
  //     "Business Consulting",
  //     // "Business Accounting Services",
  //     // "Card Processing",
  //     // "EPOS",
  //     // "Invoice Finance",
  //     // "Small Business Loans",
  //   ],
  // },
  {
    key: 13,
    "Financial and Accounting": [
      "Accounting",
      "general Accounting",
      "Bookkeeping Services",
      // "Social Media Marketing",
      // "Business Consulting",
      // "Business Accounting Services",
      // "Card Processing",
      // "EPOS",
      // "Invoice Finance",
      // "Small Business Loans",
    ],
  },
  {
    key: 13,
    "Office and Business": [
      // "Accounting",
      // "general Accounting",
      // "Bookkeeping Services",
      // "Social Media Marketing",
      "Business Consulting",
      // "Business Accounting Services",
      // "Card Processing",
      // "EPOS",
      // "Invoice Finance",
      // "Small Business Loans",
    ],
  },
  {
    key: 13,
    Marketing: [
      // "Accounting",
      // "general Accounting",
      // "Bookkeeping Services",
      "Social Media Marketing",
      // "Business Consulting",
      // "Business Accounting Services",
      // "Card Processing",
      // "EPOS",
      // "Invoice Finance",
      // "Small Business Loans",
    ],
  },
  // {
  //   key: 13,
  //   "Digital Marketing Services": [
  //     "Accounting",
  //     "general Accounting",
  //     "Bookkeeping Services",
  //     "Social Media Marketing",
  //     "Business Consulting",
  //     // "Business Accounting Services",
  //     // "Card Processing",
  //     // "EPOS",
  //     // "Invoice Finance",
  //     // "Small Business Loans",
  //   ],
  // },

  // {
  //   key: 13,
  //   "HR and Recruitment Services": [
  //     "Background Screening",
  //     "HR and Payroll Services",
  //     "HR Services",
  //     "Occupational Health & Safety",
  //     "Recruitment Services",
  //   ],
  // },
  // {
  //   key: 14,
  //   "Insurance Services": [
  //     "Business Interruption Insurance",
  //     "Car and Fleet Insurance",
  //     "Directors Liability Insurance",
  //     "Health Insurance",
  //     "Insurers",
  //     "Key Person Insurance",
  //     "Life Insurance",
  //     "Property Insurance",
  //     "Public Liability Insurance",
  //     "Stock Insurance",
  //   ],
  // },
  // {
  //   key: 15,
  //   "Logistic Services": [
  //     "Couriers",
  //     "Leaflet Delivery",
  //     "Mail Delivery",
  //     "Parcel Delivery",
  //   ],
  // },
  // {
  //   key: 16,
  //   "Market Research": ["Market Analysis", "Market Research Surveys"],
  // },
  // {
  //   key: 17,
  //   "Marketing Services": [
  //     "Branded Merchandise",
  //     "Branding & Brand Management",
  //     "Direct Mail Marketing Production",
  //     "Email Management",
  //     "Email Marketing",
  //     "Marketing Agencies",
  //     "Marketing Strategy Consulting",
  //     "Mobile Marketing",
  //     "Other Digital Marketing Services",
  //     "Paid Search (PPC) Specialists",
  //     "Public Relations Agency",
  //     "Search Engine Optimization (SEO) Specialists",
  //     "Social Media Marketing",
  //     "Telemarketing",
  //   ],
  // },
  // {
  //   key: 18,
  //   "Networking and Infrastructure": [
  //     "Hardware Infrastructure",
  //     "Hosting & Cloud Services",
  //     "Managed IT Services",
  //     "Network Infrastructure",
  //   ],
  // },
  // {
  //   key: 19,
  //   "Office and Business Services": [
  //     "Business Consulting",
  //     "Business Registration",
  //     "Coffee Machines",
  //     "Commercial Government Licensing",
  //     "Commercial Paint Spraying",
  //     "Commercial Waste",
  //     "Data Entry",
  //     "Interpreters",
  //     "Office Moving",
  //     "Office Space Rental",
  //     "Personal Government Licensing",
  //     "Translation",
  //     "Virtual Personal Assistant",
  //     "Water Coolers",
  //   ],
  // },
  // {
  //   key: 20,
  //   "Online Content": [
  //     "Blog Writing Services",
  //     "Email Copywriting",
  //     "PPC Advert Copywriting",
  //     "SEO Copywriting and Content",
  //     "Website Copywriting",
  //   ],
  // },
  // {
  //   key: 21,
  //   "PR Content": ["Freelance Journalists", "Press Release Creation"],
  // },
  // {
  //   key: 22,
  //   "Printing Services": [
  //     "Branded Clothing",
  //     "Brochure Printing",
  //     "Business Card Printing",
  //     "Canvas Printing",
  //     "General Printing",
  //     "Leaflet Printing",
  //     "NCR Printing",
  //     "Office Stationery",
  //     "Postcard Printing",
  //     "Poster Printing",
  //     "Screen Printing",
  //     "Spot Colour Printing",
  //     "T-shirt and Clothes Printing",
  //   ],
  // },
  // {
  //   key: 23,
  //   Product: [
  //     "Packaging Design",
  //     "Packaging Production",
  //     "Point of Sale Design",
  //     "Product Design",
  //     "Prototype Design",
  //   ],
  // },
  // {
  //   key: 24,
  //   "Security and Backup": [
  //     "Data backup",
  //     "Data Destruction",
  //     "Database security",
  //     "Document Destruction",
  //     "Network security",
  //     "Overall System Security",
  //   ],
  // },
  // {
  //   key: 25,
  //   "Specialist Design": [
  //     "Graphic Design",
  //     "Infographics",
  //     "UX & UI Design",
  //     "Web Design",
  //   ],
  // },
  // {
  //   key: 26,
  //   "Specialist Law": [
  //     "International Law Specialists",
  //     "Property Law and Conveyancing",
  //   ],
  // },
  // {
  //   key: 27,
  //   "Technical Writing": [
  //     "Data Sheets",
  //     "User Documentation",
  //     "White Paper Writing",
  //   ],
  // },
  // {
  //   key: 28,
  //   "Telecommunication Services": [
  //     "Business Mobile Services",
  //     "Internet Service Provider",
  //     "Leased Lines",
  //     "Network Installation and Cabling",
  //     "Office Phone Systems",
  //     "Video Conferencing",
  //   ],
  // },
  // {
  //   key: 29,
  //   "Telephone System Services": ["Managed IT Services"],
  // },
  // {
  //   key: 30,
  //   "Training Services": [
  //     "Management Training",
  //     "Motivational Speaking",
  //     "Prince2 Training",
  //     "Sales Training",
  //     "Six Sigma Training",
  //   ],
  // },
  // {
  //   key: 31,
  //   Video: [
  //     "Explainer Video Services",
  //     "Promotional Video Production",
  //     "Training Video Production",
  //     "Video Design & Production",
  //   ],
  // },
    {
    key: 32,
    "Builders": [
      "Fence & Gate Installation",
      "Driveway Installation",
      "Patio Services"
    ]
  },
  {
    key: 33,
    "Gardening & Landscaping": [
      "Landscaping",
      "Artificial Grass Installation"
    ]
  },
  {
    key: 34,
    "Financial & Accounting": [
      "Accounting",
      "Bookkeeping Services"
    ]
  },
  {
    key: 35,
    "Business Services": [
      "Accounting",
      "Bookkeeping Services",
      "Business Consulting",
      "Social Media Marketing"
    ]
  }

];

export { CATEGORIES, HowItWorksData, PopularCategoriesData, AllServicesData };
