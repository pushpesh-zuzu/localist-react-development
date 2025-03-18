import WhatYouNeedImg from "../assets/Images/location/WhatYouNeedImg.png";
import FreeQuotesImg from "../assets/Images/location/FreeQuotesImg.png";
import AccountantImg from "../assets/Images/location/BusinessProfessionalsImg.png";
import TaxPreparationImg from "../assets/Images/location/TaxPreparation.png";
import TaxResolutionImg from "../assets/Images/location/TaxResolution.png";
import PayrollServicesImg from "../assets/Images/location/PayrollServices.png";
import OakmanorAccountancyImg from "../assets/Images/location/OakmanorAccountancyImg.png";
import TunstallAccountingImg from "../assets/Images/location/TunstallAccountingImg.png";
import OakmanorImg from "../assets/Images/location/OakmanorImg.png";
import NewMillsImg from "../assets/Images/location/NewMillsImg.png";
import PinxtonImg from "../assets/Images/location/PinxtonImg.png";
import KilburnImg from "../assets/Images/location/KilburnImg.png";

const HowWeWorkLocationData = [
  {
    id: 1,
    title: "What you need icon",
    image: WhatYouNeedImg,
    heading1: "Tell us",
    heading2: "what you need",
    description:
      "We’ll help you find Accountants in Derbyshire. Help us refine your search by telling us your requirements and we’ll contact service providers in your area to help you.",
  },
  {
    id: 2,
    title: "Free quotes icon",
    image: FreeQuotesImg,
    heading1: "Receive",
    heading2: "Free Quotes",
    description:
      "You’ll receive free quotes from professionals in Derbyshire and get quick notifications via our website or app. We make sure we do the leg work for you!",
  },
  {
    id: 3,
    title: "Choose your accountant icon",
    image: AccountantImg,
    heading1: "Choose your",
    heading2: "Accountant",
    description:
      "Pick from some of the best providers in your area. With easy access to reviews and direct contact with Accountants, you can be confident with your choice.",
  },
];

const PopularAccountingServicesData = [
  {
    id: 1,
    title: "Tax Preparation",
    image: TaxPreparationImg,
    description: "Tax Preparation",
    availableOnline: true,
  },
  {
    id: 2,
    title: "Tax Resolution",
    image: TaxResolutionImg,
    description: "Tax Resolution",
  },
  {
    id: 3,
    title: "Payroll Services",
    image: PayrollServicesImg,
    description: "Payroll Services",
    availableOnline: true,
  },
];

const PopularAccountantData = [
  {
    id: 1,
    logo: OakmanorAccountancyImg,
    name: "Oakmanor Accountancy",
    stars: 5,
    certificate: "Certificate of Excellence",
    description:
      "We are a small accountancy practice, based in Derby. We offer full accountancy services including but not limited to: personal and business tax, year-end",
    testimonial: {
      name: "Robert Simpson",
      initial: "R",
      stars: 5,
      text: "Highly Professional from the first call till the confirmation of business. Debra was very friendly and loved a nice chat as well.",
    },
  },
  {
    id: 2,
    logo: TunstallAccountingImg,
    name: "Tunstall Accounting Limited",
    stars: 5,
    description:
      "Fully qualified Chartered accountant dedicated to providing a friendly and straight forward service bespoke to the needs of each and every client.",
    testimonial: {
      name: "Tokyo Matilda",
      initial: "T",
      stars: 5,
      text: "Really nice place, Julie who works for one of the departments inside is very lovely, always very smiley and happy!",
    },
  },
  {
    id: 3,
    logo: OakmanorImg,
    name: "Oakmanor Accountancy",
    stars: 5,
    certificate: "Certificate of Excellence",
    description:
      "Brand Accountancy are an award-winning firm of Chartered accountants who embrace new technologies to help support our clients in understanding their",
    testimonial: {
      name: "Jade Marie",
      initial: "J",
      stars: 5,
      text: "100% recommend Daniel. Helped made everything so much clearer with my accounts.",
    },
  },
];

const PopularCitiesData = [
  {
    city_image: NewMillsImg,
    city_name: "New Mills",
  },
  {
    city_image: PinxtonImg,
    city_name: "Pinxton",
  },
  {
    city_image: KilburnImg,
    city_name: "Kilburn",
  },
];

export {
  HowWeWorkLocationData,
  PopularAccountingServicesData,
  PopularAccountantData,
  PopularCitiesData,
};
