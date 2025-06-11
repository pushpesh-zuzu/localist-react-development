import HouseCleaning from "../assets/Images/ServicePanel/HouseCleaning.svg";
import LifeCoaching from "../assets/Images/ServicePanel/LifeCoaching.svg";
import WebDesign from "../assets/Images/ServicePanel/WebDesign.svg";
import GeneralPhotography from "../assets/Images/ServicePanel/GeneralPhotography.svg";
import WebDevelopment from "../assets/Images/ServicePanel/WebDevelopment.svg";
import SocialMediaMarketing from "../assets/Images/ServicePanel/SocialMediaMarketing.svg";
import BookkeepingServices from "../assets/Images/ServicePanel/BookkeepingServices.svg";
import GeneralBuilders from "../assets/Images/ServicePanel/GeneralBuilders.svg";
import GraphicDesign from "../assets/Images/ServicePanel/GraphicDesign.svg";
import PersonalTrainers from "../assets/Images/ServicePanel/PersonalTrainers.svg";
import Gardening from "../assets/Images/ServicePanel/Gardening.svg";
import CommercialAndOfficeCleaning from "../assets/Images/ServicePanel/CommercialAndOfficeCleaning.svg";
import GetQualityLeads from "../assets/Images/ServicePanel/GetQualityLeads.png";
import WinNewClients from "../assets/Images/ServicePanel/WinNewClients.png";
import GrowYourBusiness from "../assets/Images/ServicePanel/GrowYourBusiness.png";
import StefanWesley from "../assets/Images/ServicePanel/StefanWesley.png";
import LeanneOsbourne from "../assets/Images/ServicePanel/LeanneOsbourne.png";
import RichardGray from "../assets/Images/ServicePanel/RichardGray.png";

const PopularServiceData = [
  {
    id: 1,
    title: "House Cleaning",
    image: HouseCleaning,
  },
  {
    id: 2,
    title: "Life Coaching",
    image: LifeCoaching,
  },
  {
    id: 3,
    title: "Web Design",
    image: WebDesign,
  },
  {
    id: 4,
    title: "General Photography",
    image: GeneralPhotography,
  },
  {
    id: 5,
    title: "Web Development",
    image: WebDevelopment,
  },
  {
    id: 6,
    title: "Social Media Marketing",
    image: SocialMediaMarketing,
  },
  {
    id: 7,
    title: "Graphic Design",
    image: GraphicDesign,
  },
  {
    id: 8,
    title: "Bookkeeping Services",
    image: BookkeepingServices,
  },
  {
    id: 9,
    title: "General Builders",
    image: GeneralBuilders,
  },
  {
    id: 10,
    title: "Personal Trainers",
    image: PersonalTrainers,
  },
  {
    id: 11,
    title: "Gardening",
    image: Gardening,
  },
  {
    id: 12,
    title: "Commercial & Office Cleaning",
    image: CommercialAndOfficeCleaning,
  },
];

const GrowthStepsData = [
  {
    id: 1,
    image: GetQualityLeads,
    title1: "Get quality",
    title2: "leads",
    Description1: "View leads locally or nationwide",
    Description2: "Review leads for free",
    Description3: "Get leads sent to you in real time",
    button: "How it works",
    path:"/how-it-works"
  },
  {
    id: 2,
    image: WinNewClients,
    title1: "Win new",
    title2: "clients",
    Description1: "Pick the best leads for your business",
    Description2: "Unlock verified contact details",
    Description3: "Call or email them to win the job",
    button: "See an example lead",
  },
  {
    id: 3,
    image: GrowYourBusiness,
    title1: "Grow your",
    title2: "Business",
    Description1: "Keep 100% of what you earn",
    Description2: "No commission or hidden fees",
    Description3: "Get Hired Guarantee on first leads",
    button: "See more about pricing",
     path: "/pricing"
  },
];

const CustomerSuccessStoriesData = [
  {
    id: 1,
    image: StefanWesley,
    description:
      "Our biggest client contacted us through Bark and we’ll continue to bring on new clients through the platform.",
    name: "Stefan Wesley",
    company: "Sigma Digital",
  },
  {
    id: 2,
    image: LeanneOsbourne,
    description:
      "We get 82% of our clients through Bark. They are coming to us and we can choose who we want to take on.",
    name: "Leanne Osbourne",
    company: "Paradigm Cleaning Solution",
  },
  {
    id: 3,
    image: RichardGray,
    description:
      "Bark has been far the most effective website I’ve used. It gives me a solid flow of potential work.",
    name: "Richard Gray",
    company: "Rugfoot Photography",
  },
];

export { PopularServiceData, GrowthStepsData, CustomerSuccessStoriesData };
