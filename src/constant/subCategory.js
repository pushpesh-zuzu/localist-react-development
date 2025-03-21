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
    title: "Find a local Accountant",
    image: WhatYouNeedIcon,
    heading1: "Find a local ",
    heading2: "Accountant",
    description:
      "Are you looking to outsource your accounting, or need some expert advice on your bookkeeping or maybe you simply need a tax accountant? Whether you’re a large or small business, or want a personal accountant, let Bark know what you need. We’ll set about finding the best local chartered accountants.",
  },
  {
    id: 2,
    title: "Get free quotes from",
    image: FreeQuotesIcon,
    heading1: "Get free quotes from ",
    heading2: "Accountant",
    description:
      "From the details you’ve given, we’ll put together a selection of bespoke quotes from trusted accountants near you. You can opt to receive notifications so you stay up to date with your latest quotes, or look over your list when it suits you.",
  },
  {
    id: 3,
    title: "Hire your local Accountant",
    image: accountant,
    heading1: "Hire your local ",
    heading2: "Accountant",
    description:
      "Now all that’s left to do is to choose which professional accountant you’d like to go with. Look over your personal quotes, browse customer feedback, or pose questions to each professional. All the information and resources are there to help you hire your local accountant.",
  },
];

const regionsData = [
  {
    key: 1,
    "South East England": [
      "Berkshire",
      "Buckinghamshire",
      "East Sussex",
      "Hampshire",
      "Isle of Wight",
      "Kent",
      "Oxfordshire",
      "Surrey",
      "West Sussex",
    ],
  },
  {
    key: 2,
    London: [
      "Central London",
      "East London",
      "London",
      "North London",
      "South London",
      "West London",
    ],
  },
  {
    key: 3,
    "North West England": [
      "Cheshire",
      "Cumbria",
      "Greater Manchester",
      "Lancashire",
      "Merseyside",
    ],
  },
  {
    key: 4,
    "East of England": [
      "Bedfordshire",
      "Cambridgeshire",
      "Essex",
      "Hertfordshire",
      "Norfolk",
      "Suffolk",
    ],
  },
  {
    key: 5,
    "West Midlands": [
      "Herefordshire",
      "Shropshire",
      "Staffordshire",
      "Warwickshire",
      "West Midlands",
      "Worcestershire",
    ],
  },
  {
    key: 6,
    "South West England": [
      "Bristol",
      "Cornwall",
      "Devon",
      "Dorset",
      "Gloucestershire",
      "Somerset",
      "Wiltshire",
    ],
  },
  {
    key: 7,
    "Yorkshire and the Humber": [
      "East Riding of Yorkshire",
      "Lincolnshire",
      "North Yorkshire",
      "South Yorkshire",
      "West Yorkshire",
    ],
  },
  {
    key: 8,
    Scotland: [
      "Aberdeen City",
      "Aberdeenshire",
      "Angus",
      "Argyll and Bute",
      "Clackmannanshire",
      "Dumfries and Galloway",
      "Dundee City",
      "East Ayrshire",
      "East Dunbartonshire",
      "East Lothian",
      "East Renfrewshire",
      "Edinburgh",
      "Falkirk",
      "Fife",
      "Glasgow City",
      "Highland",
      "Inverclyde",
      "Midlothian",
      "Moray",
      "Na h-Eileanan Siar",
      "North Ayrshire",
      "North Lanarkshire",
      "Orkney Islands",
      "Perth and Kinross",
      "Renfrewshire",
      "Scottish Borders",
      "Shetland Islands",
      "South Ayrshire",
      "South Lanarkshire",
      "Stirling",
      "West Dunbartonshire",
      "West Lothian",
    ],
  },
  {
    key: 9,
    "East Midlands": [
      "Derbyshire",
      "Leicestershire",
      "Northamptonshire",
      "Nottinghamshire",
      "Rutland",
    ],
  },
  {
    key: 10,
    Wales: [
      "Blaenau Gwent",
      "Bridgend County",
      "Caerphilly County",
      "Cardiff",
      "Carmarthenshire",
      "Ceredigion",
      "City and County of Swansea",
      "Conwy County Borough",
      "Denbighshire",
      "Flintshire",
      "Gwynedd",
      "Isle of Anglesey",
      "Merthyr Tydfil County Borough",
      "Monmouthshire",
      "Neath Port Talbot",
      "Newport",
      "Pembrokeshire",
      "Powys",
      "Rhondda Cynon Taf",
      "Torfaen",
      "Vale of Glamorgan",
      "Wrexham",
    ],
  },
  {
    key: 11,
    "North East England": ["County Durham", "Northumberland", "Tyne and Wear"],
  },
  {
    key: 12,
    "Northern Ireland": [
      "Antrim and Newtownabbey",
      "Ards and North Down",
      "Armagh City, Banbridge and Craigavon",
      "Belfast",
      "Causeway Coast and Glens",
      "Derry City and Strabane",
      "Fermanagh and Omagh",
      "Lisburn and Castlereagh",
      "Mid and East Antrim",
      "Mid Ulster",
      "Newry, Mourne and Down",
    ],
  },
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
    title: "How long have you been in business?",
    description:
      "We’ve been operating as a team of chartered accountants for the last 75 years. Our company is well-established, with some of our clients working with us for over 40 years. This is something that we’re really proud of because we’ve been able to form lasting relationships with our clients. As a result, we’ve built up a reputation for being honest, transparent and efficient.",
  },

  {
    key: "2",
    title: "Will my account be handled by a single person?",
    description:
      "We’ve been operating as a team of chartered accountants for the last 75 years. Our company is well-established, with some of our clients working with us for over 40 years. This is something that we’re really proud of because we’ve been able to form lasting relationships with our clients. As a result, we’ve built up a reputation for being honest, transparent and efficient.",
  },
  {
    key: "3",
    title: "Which accounting system do we need to use?",
    description:
      "We’ve been operating as a team of chartered accountants for the last 75 years. Our company is well-established, with some of our clients working with us for over 40 years. This is something that we’re really proud of because we’ve been able to form lasting relationships with our clients. As a result, we’ve built up a reputation for being honest, transparent and efficient.",
  },
  {
    key: "4",
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "We’ve been operating as a team of chartered accountants for the last 75 years. Our company is well-established, with some of our clients working with us for over 40 years. This is something that we’re really proud of because we’ve been able to form lasting relationships with our clients. As a result, we’ve built up a reputation for being honest, transparent and efficient.",
  },
  {
    key: "5",
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "We’ve been operating as a team of chartered accountants for the last 75 years. Our company is well-established, with some of our clients working with us for over 40 years. This is something that we’re really proud of because we’ve been able to form lasting relationships with our clients. As a result, we’ve built up a reputation for being honest, transparent and efficient.",
  },
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
