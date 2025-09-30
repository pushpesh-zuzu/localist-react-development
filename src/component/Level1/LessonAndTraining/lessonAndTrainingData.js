import {
  PhysicsMathsSlider,
  TutorsServiceSlider,
} from "../../level3/imagesServices";
import {
  BusinessProfessionalsIcon,
  FreeQuotesIcon,
  WhatYouNeedIcon,
} from "../images";

const LessionAndTrainingHowItWork = [
  {
    id: 1,
    title: "the Best Match",
    image: WhatYouNeedIcon, // Same icon as business
    heading1: "Find the ",
    heading2: "best match",
    description:
      "Share your requirements with us, and we’ll connect you with skilled local tutors, instructors, and trainers who specialise in your area of interest.",
  },
  {
    id: 2,
    title: "Free Quotes",
    image: FreeQuotesIcon, // Same icon as business
    heading1: "Request ",
    heading2: "free quotes",
    description:
      "Receive free quotes from multiple training professionals near you. Compare profiles, reviews, and services before deciding who’s right for you.",
  },
  {
    id: 3,
    title: "Start Your Training ",
    image: BusinessProfessionalsIcon, // Same icon as business
    heading1: "Start your  ",
    heading2: "training ",
    description:
      "Once you’ve found the perfect match, contact them directly to discuss your schedule, confirm details, and start your learning journey with confidence.",
  },
];
const LessionAndTrainingPopularCategory = [
  {
    id: 1,
    title: "Tutoring",
    image: TutorsServiceSlider,
    path: "tutors-near-me",
  },
  {
    id: 2,
    image: PhysicsMathsSlider,
    title: "Physics and Maths",
    path: "physics-maths-tutors-near-me",
  },
];
export { LessionAndTrainingHowItWork, LessionAndTrainingPopularCategory };
