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

const HowItWorksData = [
  {
    id: 1,
    title: "Start Search for Local ",
    image: WhatYouNeedIcon,
    heading1: "Start Search for Local ",
    heading2: "Accountant",
    description:
      "We will help you find the best accountants in your area for your needs. Whether you are looking to hire a personal accountant, or a professional for small or large businesses, Localists is here to help. From expert bookkeeping support to finding a trusted tax accountant during tax year, we make it simple. A few quick details are all we need to recommend the best quality local accountants near you.",
  },
  {
    id: 2,
    title: "Request Free Quotes from ",
    image: FreeQuotesIcon,
    heading1: "Request Free Quotes ",
    heading2: "Accountant",
    description:
      "We will match your request with qualified local accountants near you and send you personalised quotes for free. Take your time to review profiles, compare quotes, and ask questions if you need to. There’s no obligation to make a hire until you are sure.",
  },
  {
    id: 3,
    title: "Hire your local",
    image: accountant,
    heading1: "Hire your local ",
    heading2: "Accountant",
    description:
      "When you’ve found the right professional accountant for the job, all that is left to do is hire them directly. Whether it’s one-off advice or ongoing support, managing payroll or long-term financial planning, your local accountant will be ready to support you from day one.",
  },
];

const regionsData = [
  // {
  //   key: 1,
  //   "South East England": [
  //     "Berkshire",
  //     "Buckinghamshire",
  //     "East Sussex",
  //     "Hampshire",
  //     "Isle of Wight",
  //     "Kent",
  //     "Oxfordshire",
  //     "Surrey",
  //     "West Sussex",
  //   ],
  // },
  // {
  //   key: 2,
  //   London: [
  //     "Central London",
  //     "East London",
  //     "London",
  //     "North London",
  //     "South London",
  //     "West London",
  //   ],
  // },
  {
    key: 3,
    "North West England": [
      "Cheshire",
      "Greater Manchester",
      "Lancashire",
      "Merseyside",
    ],
  },
  // {
  //   key: 4,
  //   "East of England": [
  //     "Bedfordshire",
  //     "Cambridgeshire",
  //     "Essex",
  //     "Hertfordshire",
  //     "Norfolk",
  //     "Suffolk",
  //   ],
  // },
  // {
  //   key: 5,
  //   "West Midlands": [
  //     "Herefordshire",
  //     "Shropshire",
  //     "Staffordshire",
  //     "Warwickshire",
  //     "West Midlands",
  //     "Worcestershire",
  //   ],
  // },
  // {
  //   key: 6,
  //   "South West England": [
  //     "Bristol",
  //     "Cornwall",
  //     "Devon",
  //     "Dorset",
  //     "Gloucestershire",
  //     "Somerset",
  //     "Wiltshire",
  //   ],
  // },
  // {
  //   key: 7,
  //   "Yorkshire and the Humber": [
  //     "East Riding of Yorkshire",
  //     "Lincolnshire",
  //     "North Yorkshire",
  //     "South Yorkshire",
  //     "West Yorkshire",
  //   ],
  // },
  // {
  //   key: 8,
  //   Scotland: [
  //     "Aberdeen City",
  //     "Aberdeenshire",
  //     "Angus",
  //     "Argyll and Bute",
  //     "Clackmannanshire",
  //     "Dumfries and Galloway",
  //     "Dundee City",
  //     "East Ayrshire",
  //     "East Dunbartonshire",
  //     "East Lothian",
  //     "East Renfrewshire",
  //     "Edinburgh",
  //     "Falkirk",
  //     "Fife",
  //     "Glasgow City",
  //     "Highland",
  //     "Inverclyde",
  //     "Midlothian",
  //     "Moray",
  //     "Na h-Eileanan Siar",
  //     "North Ayrshire",
  //     "North Lanarkshire",
  //     "Orkney Islands",
  //     "Perth and Kinross",
  //     "Renfrewshire",
  //     "Scottish Borders",
  //     "Shetland Islands",
  //     "South Ayrshire",
  //     "South Lanarkshire",
  //     "Stirling",
  //     "West Dunbartonshire",
  //     "West Lothian",
  //   ],
  // },
  // {
  //   key: 9,
  //   "East Midlands": [
  //     "Derbyshire",
  //     "Leicestershire",
  //     "Northamptonshire",
  //     "Nottinghamshire",
  //     "Rutland",
  //   ],
  // },
  // {
  //   key: 10,
  //   Wales: [
  //     "Blaenau Gwent",
  //     "Bridgend County",
  //     "Caerphilly County",
  //     "Cardiff",
  //     "Carmarthenshire",
  //     "Ceredigion",
  //     "City and County of Swansea",
  //     "Conwy County Borough",
  //     "Denbighshire",
  //     "Flintshire",
  //     "Gwynedd",
  //     "Isle of Anglesey",
  //     "Merthyr Tydfil County Borough",
  //     "Monmouthshire",
  //     "Neath Port Talbot",
  //     "Newport",
  //     "Pembrokeshire",
  //     "Powys",
  //     "Rhondda Cynon Taf",
  //     "Torfaen",
  //     "Vale of Glamorgan",
  //     "Wrexham",
  //   ],
  // },
  // {
  //   key: 11,
  //   "North East England": ["County Durham", "Northumberland", "Tyne and Wear"],
  // },
  // {
  //   key: 12,
  //   "Northern Ireland": [
  //     "Antrim and Newtownabbey",
  //     "Ards and North Down",
  //     "Armagh City, Banbridge and Craigavon",
  //     "Belfast",
  //     "Causeway Coast and Glens",
  //     "Derry City and Strabane",
  //     "Fermanagh and Omagh",
  //     "Lisburn and Castlereagh",
  //     "Mid and East Antrim",
  //     "Mid Ulster",
  //     "Newry, Mourne and Down",
  //   ],
  // },
];

const AVERAGE_PRICE = [
  {
    Region: "Nationwide",
    "Great Value": "£150",
    Average: "£200",
    Premium: "£400",
  },
  {
    Region: "East Midlands",
    "Great Value": "£150",
    Average: "£175",
    Premium: "£350",
  },
  {
    Region: "East of England",
    "Great Value": "£150",
    Average: "£200",
    Premium: "£350",
  },
  {
    Region: "London",
    "Great Value": "£150",
    Average: "£225",
    Premium: "£450",
  },
  {
    Region: "North East England",
    "Great Value": "£125",
    Average: "£165",
    Premium: "£200",
  },
  {
    Region: "North West England",
    "Great Value": "£125",
    Average: "£175",
    Premium: "£420",
  },
  {
    Region: "Scotland",
    "Great Value": "£125",
    Average: "£180",
    Premium: "£350",
  },
  {
    Region: "South East England",
    "Great Value": "£150",
    Average: "£240",
    Premium: "£500",
  },
  {
    Region: "South West England",
    "Great Value": "£150",
    Average: "£200",
    Premium: "£450",
  },
  {
    Region: "West Midlands",
    "Great Value": "£130",
    Average: "£200",
    Premium: "£350",
  },
  {
    Region: "Yorkshire and the Humber",
    "Great Value": "£125",
    Average: "£200",
    Premium: "£400",
  },
];

const FREQUENTLY_DATA = [
  {
    key: "1",
    title: "What is the difference between an accountant and chartered accountant?",
    description:
      "The main difference between a general accountant and a chartered accountant lies in their level of qualification, accreditation, and the scope of services they provide. While a general accountant can be highly skilled in tasks like bookkeeping, payroll, and managing financial records, they may not always hold a formal certification. For general accountants, their expertise is often suitable for day-to-day financial management in smaller businesses or sole trader operations.\n\nOn the other hand, a chartered accountant is a finance professional who has undergone extensive training and is formally accredited by internationally recognised professional bodies such as ACCA or ICAS. Typically, chartered accountants are called upon when it has to do with complex financial tasks, including audit, tax planning, compliance, strategic advice, and forensic accounting.\n\nHowever, it ultimately comes down to your specific need. Simply start your search today, let us know requirements, and we will match you with the right financial accountant near you."
  },
  {
    key: "2",
    title: "How to change your accountant?",
    description:
      "If you're no longer satisfied with your current service provider or simply looking for a better fit, making the switch doesn't have to be complicated. At Localists, we make the transition easy by connecting you with qualified accounting professionals near you. Whether you prefer an online accountant or someone local, you will find one here.\n\nThe first step, however, is to inform your current accounting professional of your decision to move on. Next, gather all the information you need, from financial records to reports and account details. This way, the transition is smooth, and your new accountant can access all previous financial records."
  },
  {
    key: "3",
    title: "How to choose an accountant in the UK?",
    description:
      "To find a qualified accountant in the UK, start by researching and comparing local accountancy firms or accounting professionals near you. Look for candidates with strong client reviews and ask for recommendations when possible. Also ensure they are registered under the right professional body.\n\nLocalists will connect you with the best quality professionals, whether you're looking for support with your personal finances or a qualified accountant for your small business, we’ve got you covered."
  },
  {
    key: "4",
    title: "How much do accountants charge for self-assessment in the UK?",
    description:
      "Depending on the complexity of your self-assessment tax return, charges may vary. However, the average cost of hiring an accountant in the UK typically ranges anywhere from £150 to over £300. Other factors such as, level of experience and hourly rates, can also determine what cost you will incur for these professional services.\n\nStart your search now and obtain free quotes from quality accounting professionals anywhere you are in the UK."
  }
];


const OTHER_SERVICES_DATA = [
  {
    id: 1,
    image: TaxPreparationImg,
    description: "Tax Preparation",
    availableOnline: true,
  },
  {
    id: 2,
    image: TaxResolutionImg,
    description: "Tax Resolution",
  },
  {
    id: 3,
    image: PayrollServicesImg,
    description: "Payroll Services",
    availableOnline: true,
  },
  {
    id: 4,
    image: TaxResolutionImg,
    description: "Tax Resolution",
  },
];

const RELATED_SERVICES_DATA = [
  {
    id: 1,
    title: "Accounting",
    image: TaxReturn,
    description: "Your 2025 tax return: Everything you need to know in the UK",
    availableOnline: true,
  },
  {
    id: 2,
    title: "Accounting",
    image: AccountentBusiness,
    description: "Here's why you need an accountant for your new business",
  },
  {
    id: 3,
    title: "Accounting",
    image: BasicAccounting,
    description: "What are the basics of Accounting?",
    availableOnline: true,
  },
  {
    id: 4,
    title: "Accounting",
    image: AccountentBusiness,
    description: "Here's why you need an accountant for your new business",
  },
];

const RELATED_PRICE_DATA = [
  {
    id: 1,
    title: "Accounting",
    image: AccountingCost,
    description: "How much does an accountant cost?",
    availableOnline: true,
  },
  {
    id: 2,
    title: "Tax Preparation",
    image: TaxAccountent,
    description: "How much does a Tax Accountant cost in 2025?",
  },
  {
    id: 3,
    title: "Payroll Services",
    image: FinancialCost,
    description: "How much does Business Financial Planning cost?",
    availableOnline: true,
  },
  {
    id: 4,
    title: "Accounting",
    image: AccountentBusiness,
    description: "Here's why you need an accountant for your new business",
  },
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Cara",
    title: "( Loram Text)",
    date: "13 Feb 2025",
    image: ReviewsImage,
    description:
      "I highly recommend 123 Bookkeeping and accountancy. Monica Tangen worked at our dental practice for nearly 3 years. During that time, she ran the day to day book keeping and accounting and acted as our finance manager for the business. She carried out her work with excellence, managing the day to day cashflow and banking of the practice and filing accounts promptly and efficiently. She also dealt with our staff payroll, pensions and our suppliers. Thanks to Monica, our business cashflow was always in good order. I highly recommend her services.",
  },
  {
    id: 1,
    name: "Rome",
    title: "( Loram Text )",
    date: "13 Feb 2025",
    image: ReviewsImage,
    description:
      "I highly recommend 123 Bookkeeping and accountancy. Monica Tangen worked at our dental practice for nearly 3 years. During that time, she ran the day to day book keeping and accounting and acted as our finance manager for the business. She carried out her work with excellence, managing the day to day cashflow and banking of the practice.",
  },
];

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
};
