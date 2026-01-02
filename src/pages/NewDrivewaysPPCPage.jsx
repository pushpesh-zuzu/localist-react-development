import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSectionNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionNewPPC";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import PopularServicesTypes from "../component/NewPPPpage/PopularServicesTypes/PopularServicesTypes";
import BlockPalvingIcon from "../assets/ReactIcons/BlockPalvingIcon";
import CheckCircleIcon from "../assets/ReactIcons/CheckCircleIcon";
import GetQuotesIcon from "../assets/ReactIcons/GetQuotesIcon";
import TarmacIcon from "../assets/ReactIcons/TarmacIcon";
import ResinBoundIcon from "../assets/ReactIcons/ResinBoundIcon";
import GravelDrivewaysIcon from "../assets/ReactIcons/GravelDrivewaysIcon";
import ExpertInstallationIcon from "../assets/ReactIcons/ExpertInstallationIcon";
import PatternImplementedIcon from "../assets/ReactIcons/PatternImplementedIcon";
import ThrashIcon from "../assets/ReactIcons/ThrashIcon";
import DesignComplecityIcon from "../assets/ReactIcons/DesignComplecityIcon";
import DriveWaysSize from "../assets/ReactIcons/DriveWaysSize";
import CostGuide from "../component/NewPPPpage/CostGuide/CostGuide";
import GroundPreparationIcon from "../assets/ReactIcons/GroundPreparationIcon";
import LocationIcon from "../assets/ReactIcons/LocationIcon";
import BlockPalvingSmallIcon from "../assets/ReactIcons/BlockPalvingSmallIcon";
import TarmacSmallIcon from "../assets/ReactIcons/TarmacSmallIcon";
import ResinBoundSmallIcon from "../assets/ReactIcons/ResinBoundSmallIcon";
import GravelDriveaysSmallIcon from "../assets/ReactIcons/GravelDriveaysSmallIcon";
import ProfessionalServiceInstallation from "../component/NewPPPpage/ProffessionalServiceInstallation/ProfessionalServiceInstallation";
import SettingIcon from "../assets/ReactIcons/SettingIcon";
import DriveWayInstallationProcessFirst from "../component/NewPPPpage/DriveWayInstallationProcessFirst/DriveWayInstallationProcessFirst";
import RegionalGuide from "../component/NewPPPpage/RegionalGuide/RegionalGuide";
import CompareDriveWay from "../component/NewPPPpage/CompareDriveWay/CompareDriveWay";
import DriveMainTrip from "../component/NewPPPpage/DriveMainTrip/DriveMainTrip";
import PlanPermReg from "../component/NewPPPpage/PlanPermiReg/PlanPermReg";
import FAQSection from "../component/NewPPPpage/FAQSection/FAQSection";

import InfoOctagonIcon from "../assets/ReactIcons/InfoOctagonIcon";
import CalendarCheckIcon from "../assets/ReactIcons/CalendarCheckIcon";
import CloseSquareIcon from "../assets/ReactIcons/CloseSquareIcon";
import CheckSquareIcon from "../assets/ReactIcons/CheckSquareIcon";

// import { DRIVE_MAIN_TRIP } from "./externalData";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <BlockPalvingIcon />,
    title: "Block Paving",
    description:
      "Durable and versatile block paving offers endless design possibilities with various colors, patterns, and textures. Perfect for creating unique driveways that enhance property value.",
    points: [
      {
        icon: <CheckCircleIcon />,
        text: "Wide range of colors",
      },
      { icon: <CheckCircleIcon />, text: "Easy to repair" },

      { icon: <CheckCircleIcon />, text: "25+ years lifespan" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
  {
    icon: <TarmacIcon />,
    title: "Tarmac Driveways",
    description:
      "Cost-effective and quick to install, tarmac driveways provide a smooth, durable surface that requires minimal maintenance. Ideal for those seeking practical solutions.",
    points: [
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Quick installation" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Weather resistant" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Budget-friendly" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
  {
    icon: <ResinBoundIcon />,
    title: "Resin Bound",
    description:
      "Modern and stylish resin bound driveways offer excellent drainage, smooth finish, and UV stability. Low maintenance solution for contemporary homes.",
    points: [
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Preamble surface" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Weed resistant" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Smooth finish" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
  {
    icon: <GravelDrivewaysIcon />,
    title: "Gravel Driveways",
    description:
      "Affordable and charming gravel driveways provide excellent drainage and a distinctive crunchy texture. Perfect for rural and traditional properties.",
    points: [
      {
        icon: <CheckCircleIcon color="#00aef0" />,
        text: "Most affordable option",
      },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Good drainage" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Easy to install" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
  {
    icon: <ExpertInstallationIcon />,
    title: "Expert Installation",
    description:
      "Durable and versatile block paving offers endless design possibilities with various colors, patterns, and textures. Perfect for creating unique driveways that enhance property value.",
    points: [
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Extremely durable" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Low maintenance" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "30+ years lifespan" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
  {
    icon: <PatternImplementedIcon />,
    title: "Pattern Imprinted",
    description:
      "Decorative pattern imprinted concrete mimics natural stone, brick, or slate at a fraction of the cost. Stunning aesthetics with excellent durability.",
    points: [
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Unique patterns" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Cost-effective" },
      { icon: <CheckCircleIcon color="#00aef0" />, text: "Low maintenance" },
    ],
    ctaIcon: <GetQuotesIcon />,
  },
];
export const COST_ICONS = {
  block: BlockPalvingSmallIcon,
  tarmac: TarmacSmallIcon,
  resin: ResinBoundSmallIcon,
  gravel: GravelDriveaysSmallIcon,

  size: DriveWaysSize,
  ground: GroundPreparationIcon,
  location: LocationIcon,
  remove: ThrashIcon,
  design: DesignComplecityIcon,
};
export const COST_PRICING = [
  {
    icon: "block",
    title: "Block Paving",
    price: "£50–£100/m²",
    description:
      "Premium quality with extensive design options. Installation typically takes 5–7 days.",
    prop: { background: "white", color: "00AFE3", strokColor: "00AFE3" },
  },

  {
    icon: "tarmac",
    title: "Tarmac",
    price: "£40–£70/m²",
    description: "Cost-effective and durable. Quick installation in 2–3 days.",
    prop: { background: "white", color: "00AFE3", strokColor: "00AFE3" },
  },
  {
    icon: "resin",
    title: "Resin Bound",
    price: "£60–£120/m²",
    description:
      "Premium quality with extensive design options. Installation typically takes 5-7 days.",
    prop: { background: "white", color: "00AFE3", strokColor: "00AFE3" },
  },
  {
    icon: "gravel",
    title: "Gravel",
    price: "£25–£50/m²",
    description:
      "Most affordable option with good drainage. 1–2 days to complete.",
    prop: { background: "white", color: "00AFE3", strokColor: "00AFE3" },
  },
];

export const COST_FACTORS = [
  {
    icon: "size",
    title: "Driveway Size",
    description:
      "Larger driveways cost more in materials and labor. Average UK driveway is 40-50m².",
  },
  {
    icon: "ground",
    title: "Ground Preparation",
    description:
      "Excavation, drainage, and sub-base work can add £1,000-£3,000 to total costs.",
  },
  {
    icon: "location",
    title: "Location",
    description:
      "Prices vary by region. London and Southeast typically 10-20% higher than national average.",
  },
  {
    icon: "remove",
    title: "Old Driveway Removal",
    description:
      "Removing existing surface costs £500-£2,000 depending on material and size.",
  },
  {
    icon: "design",
    title: "Design Complexity",
    description:
      "Intricate patterns, borders, and curves increase labor costs by 15-30%.",
  },
];

export const PSI_TOP = [
  {
    icon: <SettingIcon />,
    title: "Expert Installation",
    text: "Qualified professionals...",
  },
];

export const PSI_INCLUDED = {
  icon: <TarmacIcon />,
  title: "What's Included in Professional Installation",
  points: [
    "Full site survey and measurement",
    "Ground excavation and preparation",
    "Sub-base installation and compaction",
    "Drainage system installation",
    "Edge restraints and borders",
    "Surface laying and finishing",
    "Clean-up and waste removal",
    "Post-installation care instructions",
  ],
};

export const PSI_AVOID = {
  icon: <TarmacIcon />,
  title: "Avoid DIY Driveway Pitfalls",
  points: [
    "Poor drainage causing damage",
    "Inadequate sub-base cracking",
    "Uneven surface trip hazards",
    "Planning permission issues",
    "Wrong materials for soil",
    "Incorrect slope runoff",
    "Wasted money on repairs",
  ],
};

export const DRIVE_MAIN_TRIP = {
  heading: "Driveway",
  blueText: "Driveway",
  blackText:"Maintenance Tips",
  subHeading: "Extend the life of your driveway with proper maintenance",
  maintenanceScheduleData: {
    theme: "primary",
    title: "Regular Maintenance Schedule",
    icon: <CalendarCheckIcon size={50} />,
    listIcon: <CheckSquareIcon size={20} color="#fff" />,
    items: [
      {
        title: "Weekly: Clean Surface",
        description: "Remove debris, leaves, and dirt to prevent staining",
      },
      {
        title: "Monthly: Weed Control",
        description: "Remove weeds from joints and edges promptly",
      },
      {
        title: "Quarterly: Deep Clean",
        description: "Pressure wash to remove stubborn stains and moss",
      },
      {
        title: "Annually: Professional Seal",
        description: "Resealing protects against weather and wear",
      },
      {
        title: "Bi-annually: Drainage Check",
        description: "Ensure water drains properly to prevent damage",
      },
    ],
  },
  commonMistakesData: {
    theme: "dark",
    title: "Avoid These Common Mistakes",
    icon: <InfoOctagonIcon size={50} />,
    listIcon: <CloseSquareIcon size={26} />,
    items: [
      { text: "Using de-icing salt in winter – damages surface materials" },
      { text: "Parking heavy vehicles regularly on block paving edges" },
      { text: "Allowing oil spills to sit – clean immediately to prevent staining" },
      { text: "Using harsh chemical cleaners not designed for driveways" },
      { text: "Ignoring small cracks – repair quickly to prevent spreading" },
      { text: "Power washing at too high pressure – can damage surfaces" },
      { text: "Neglecting edge restraints – causes material spreading" },
    ],
  }
}

function NewDrivewaysPPCPage() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* <HeroSectionNewPPC />
      <HowItWorkNewPPC />
      <PopularServicesTypes data={NEW_PPC_POPULUAR_SERVICE_TYPE} />
      <CostGuide
        pricing={COST_PRICING}
        factors={COST_FACTORS}
        icons={COST_ICONS}
      />
      <ProfessionalServiceInstallation
        topCards={PSI_TOP}
        avoid={PSI_AVOID}
        included={PSI_INCLUDED}
      /> */}

      {/* <DriveWayInstallationProcessFirst /> */}
      <CompareDriveWay />
      <RegionalGuide />
      <DriveMainTrip data={DRIVE_MAIN_TRIP} />
      <PlanPermReg />
      <FAQSection />
    </>
  );
}

export default NewDrivewaysPPCPage;
