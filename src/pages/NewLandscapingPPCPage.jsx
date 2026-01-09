import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSectionNewPPC from "../component/NewPPPpage/HeroSection/HeroSectionNewPPC";
import HowItWorkNewPPC from "../component/NewPPPpage/HowItWorkNewPPC/HowItWorkNewPPC";
import PopularServicesTypes from "../component/NewPPPpage/PopularServicesTypes/PopularServicesTypes";
import TarmacIcon from "../assets/ReactIcons/TarmacIcon";
import ThrashIcon from "../assets/ReactIcons/ThrashIcon";
import DesignComplecityIcon from "../assets/ReactIcons/DesignComplecityIcon";
import DriveWaysSize from "../assets/ReactIcons/DriveWaysSize";
import GroundPreparationIcon from "../assets/ReactIcons/GroundPreparationIcon";
import LocationIcon from "../assets/ReactIcons/LocationIcon";
import BlockPalvingSmallIcon from "../assets/ReactIcons/BlockPalvingSmallIcon";
import TarmacSmallIcon from "../assets/ReactIcons/TarmacSmallIcon";
import ResinBoundSmallIcon from "../assets/ReactIcons/ResinBoundSmallIcon";
import GravelDriveaysSmallIcon from "../assets/ReactIcons/GravelDriveaysSmallIcon";
import ProfessionalServiceInstallation from "../component/NewPPPpage/ProffessionalServiceInstallation/ProfessionalServiceInstallation";
import SettingIcon from "../assets/ReactIcons/SettingIcon";
import FAQSection from "../component/NewPPPpage/FAQSection/FAQSection";

import InfoOctagonIcon from "../assets/ReactIcons/InfoOctagonIcon";
import CalendarCheckIcon from "../assets/ReactIcons/CalendarCheckIcon";
import CloseSquareIcon from "../assets/ReactIcons/CloseSquareIcon";
import CheckSquareIcon from "../assets/ReactIcons/CheckSquareIcon";
import CompetitivePricingIcon from "../assets/ReactIcons/CompetitivePricingIcon";
import QuicAlarmIcon from "../assets/ReactIcons/QuicAlarmIcon";
import FloatingButton from "../component/NewPPPpage/UITypography/FloatingButton/FloatingButton";
import TreeSurgeryRegionalGuide from "../component/NewPPPpage/TreeSurgeryRegionalGuide/TreeSurgeryRegionalGuide";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";
import FullLandscapingRedesignIcon from "../assets/ReactIcons/FullLandscapingRedesignIcon ";
import PatioPavingIcon from "../assets/ReactIcons/PatioPalvingIcon";
import GuaranteedWorkIcon from "../assets/ReactIcons/GuaranteedWorkIcon";
import DrivewaysAccess from "../assets/ReactIcons/DrivewaysAccess";
import StepEdgingGardeningIcon from "../assets/ReactIcons/StepEdgingGardeningIcon";
import DrainageAndLandIcon from "../assets/ReactIcons/DrainageAndLandIcon";
import RetailWallIcon from "../assets/ReactIcons/RetailWallIcon";
import VotedProfessionIcon from "../assets/ReactIcons/VettedProffessionIcon";
import LandscapingQuotesGuid from "../component/NewPPPpage/LandscapingQuotesGuid/LandscapingQuotesGuid";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";
import useRegistrationRedirect from "../hooks/useRegistrationRedirect";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";
// import {
//   drivewayTableHeaders,
//   drivewayTableData,
// } from "../component./";
// import { DRIVE_MAIN_TRIP } from "./externalData";

export const NEW_PPC_POPULUAR_SERVICE_TYPE = [
  {
    icon: <PatioPavingIcon bgColor="white" strokeColor="#00AFE3" />,
    inActiveIcon: <PatioPavingIcon bgColor="#00AFE3" strokeColor="white" />,
    title: "Patios & Paving",
    description:
      "Installation of durable patio and paving surfaces using porcelain, natural stone, or concrete. Proper sub-base preparation ensures a level, weather-resistant finish designed to last.",
    points: [
      { text: "Durable surface materials" },
      { text: "Proper sub-base preparation" },
      { text: "Weather-resistant finish" },
    ],
  },
  {
    icon: (
      <DrivewaysAccess
        bgColor="white"
        fillColor="#00AFE3"
        dashColor="#FFFFFF"
      />
    ),
    inActiveIcon: <DrivewaysAccess bgColor="#00AFE3" fillColor="white" />,
    title: "Driveways & Access Paths",
    description:
      "Construction of functional and attractive driveways and walkways with correct drainage, load-bearing foundations, and clean edging for everyday use.",
    points: [
      { text: "Correct drainage design" },
      { text: "Load-bearing foundations" },
      { text: "Clean, defined edging" },
    ],
  },
  {
    icon: <RetailWallIcon bgColor="white" strokeColor="#00AFE3" />,
    inActiveIcon: <RetailWallIcon bgColor="#00AFE3" strokeColor="white" />,
    title: "Retaining Walls & Raised Beds",
    description:
      "Structural walls and raised planting areas built to manage changes in ground levels, improve drainage, and add definition to outdoor spaces.",
    points: [
      { text: "Structural ground support" },
      { text: "Improved water management" },
      { text: " Clear space definition" },
    ],
  },
  {
    icon: (
      <DrainageAndLandIcon
        bgColor="white"
        fillColor="#00AFE3"
        strokeColor="#00AFE3"
      />
    ),
    inActiveIcon: <DrainageAndLandIcon />,
    title: "Drainage & Land Levelling",
    description:
      "Correction of poor drainage, water pooling, and uneven ground using proper falls, soakaways, and levelling techniques to protect your property.",
    points: [
      { text: "Effective water runoff" },
      { text: "Even ground correction" },
      { text: " Property protection" },
    ],
  },
  {
    icon: <StepEdgingGardeningIcon bgColor="white" fillColor="#00AFE3" />,
    inActiveIcon: (
      <StepEdgingGardeningIcon bgColor="#00AFE3" fillColor="white" />
    ),
    title: "Steps, Edging & Garden Structures",
    description:
      "Installation of steps, borders, sleepers, and structural features that improve access, safety, and visual flow throughout the landscape.",
    points: [
      { text: "Improved access & safety" },
      { text: "Strong structural features" },
      { text: "Enhanced visual flow" },
    ],
  },
  {
    icon: (
      <FullLandscapingRedesignIcon
        bgColor="white"
        strokeColor="#00aef0"
        fillColor="#00aef0"
      />
    ),
    inActiveIcon: (
      <FullLandscapingRedesignIcon strokeColor="white" fillColor="white" />
    ),
    title: "Full Landscape Redesign & Rebuilds",
    description:
      "Complete transformation projects combining groundworks, hard landscaping, and structural features to rebuild outdoor spaces from the ground up.",
    points: [
      { text: "Complete groundworks" },
      { text: "Integrated hard landscaping" },
      { text: "End-to-end transformation" },
    ],
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
    prop: { background: "white", color: "#00AFE3", strokColor: "#00AFE3" },
  },

  {
    icon: "tarmac",
    title: "Tarmac",
    price: "£40–£70/m²",
    description: "Cost-effective and durable. Quick installation in 2–3 days.",
    prop: { background: "white", color: "#00AFE3", strokColor: "#00AFE3" },
  },
  {
    icon: "resin",
    title: "Resin Bound",
    price: "£60–£120/m²",
    description:
      "Premium quality with extensive design options. Installation typically takes 5-7 days.",
    prop: { background: "white", color: "#00AFE3", strokColor: "#00AFE3" },
  },
  {
    icon: "gravel",
    title: "Gravel",
    price: "£25–£50/m²",
    description:
      "Most affordable option with good drainage. 1–2 days to complete.",
    prop: { background: "white", color: "#00AFE3", strokColor: "#00AFE3" },
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
    icon: <VotedProfessionIcon />,
    title: "Qualified & Experienced",
    text: "Expert knowledge of all kinds of landscaping projects including patios, paving, drainage, retaining walls, and full groundworks etc.",
  },
  {
    icon: <GuaranteedWorkIcon />,
    title: "Guaranteed Work",
    text: "Up to price10-year guarantees on workmanship and materials where applicable, giving you long-term confidence in the finished result.",
  },
  {
    icon: <CompetitivePricingIcon />,
    title: "Competitive Pricing",
    text: "Clear, itemised, competitive quotes from vetted local experts near you, so you can compare properly and choose the best value for your project and budget.",
  },
  {
    icon: <QuicAlarmIcon />,
    title: "Quick Turnaround",
    text: "Work completed with clear timelines, minimum disruption, all without compromising the quality and standard of delivery.",
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
  blackText: "Maintenance Tips",
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
      {
        text: "Allowing oil spills to sit – clean immediately to prevent staining",
      },
      { text: "Using harsh chemical cleaners not designed for driveways" },
      { text: "Ignoring small cracks – repair quickly to prevent spreading" },
      { text: "Power washing at too high pressure – can damage surfaces" },
      { text: "Neglecting edge restraints – causes material spreading" },
    ],
  },
};

const FrequentlyQuestion = [
  {
    key: "1",
    title: "What does a professional landscaping expert do?",
    description: `A landscaping expert handles the construction-focused parts of outdoor projects -  like patios, paths, retaining walls, groundworks, drainage, and full landscape builds. They go beyond simple gardening by preparing the ground, installing hard surfaces, managing levels and water flow, and delivering long-lasting outdoor structures.`,
  },
  {
    key: "2",
    title: "How do I find reliable landscaping experts near me?",
    description: `Start by comparing multiple local professionals. Check reviews and past project photos, ask for detailed written quotes, and confirm insurance and experience. Getting at least three quotes and speaking to each specialist about their approach helps ensure quality and peace of mind before work begins. You can start now to get free quotes here on Get 24/7.`,
  },
  {
    key: "3",
    title: "How much do landscaping projects cost?",
    description: `Landscaping costs vary widely based on project size, materials, and complexity — small jobs might be a few hundred pounds, while full design and build for a medium outdoor space often runs into several thousand. It’s best to get multiple tailored quotes so you know exactly what’s included.`,
  },
  {
    key: "4",
    title: "Do landscaping experts handle permits and planning?",
    description: `Many landscaping specialists can help with regulatory requirements like council permits or compliance checks, especially when your project involves structural work (e.g., retaining walls). Always ask during your consultation so you’re clear who arranges what.`,
  },
  {
    key: "5",
    title: "When is the best time to start a landscaping project?",
    description: `Spring and autumn are often ideal because the soil is easier to work with and plants establish well. However, landscaping experts can work year-round depending on weather, scope, and readiness of your project plan. Planning ahead helps secure your preferred schedule.`,
  },
  // {
  //   key: "6",
  //   title: "Why hire a professional instead of doing landscaping yourself?",
  //   description: `DIY landscaping can be challenging and costly if mistakes occur with drainage, foundations, or levels. Professional landscapers have the experience, tools, and technical knowledge to deliver durable, safe, and visually appealing results. Hiring an expert often saves time, money, and future repair costs.`,
  // },
];
export const landscapingRegionalPricing = [
  {
    region: "Nationwide",
    prices: [{ label: "Standard Rate", value: "£8,500" }],
    description:
      "Typical medium-sized landscaping projects across the UK. Prices shown are national averages and intended as general guidance.",
  },
  {
    region: "London",
    prices: [{ label: "Standard Rate", value: "£9,500" }],
    description:
      "Expect higher rates due to increased labour, access, and logistics costs. Projects benefit from highly experienced landscaping professionals.",
  },
  {
    region: "South East / South West",
    prices: [{ label: "Standard Rate", value: "£8,800" }],
    description:
      "Moderately higher costs compared with the Midlands or North, reflecting regional demand, materials, and project scope.",
  },
  {
    region: "East Midlands",
    prices: [{ label: "Standard Rate", value: "£8,000" }],
    description:
      "Average pricing for medium landscaping projects, balancing labour costs, materials, and site accessibility.",
  },
  {
    region: "North West / Scotland / Wales",
    prices: [{ label: "Standard Rate", value: "£7,800" }],
    description:
      "Generally more affordable landscaping rates while still maintaining professional standards and quality workmanship.",
  },
];

const CostGuidData = [
  {
    service: "Smaller hard landscaping projects ",
    price: "£1,500 – £3,500",
    description: "such as patios, paths, or raised beds Typically start from ",
  },
  {
    service: "Medium landscaping builds ",
    price: "£5,000 – £9,000",
    description:
      "involving multiple features (paving, walls, levelling) often range from ",
  },
  {
    service: "Large or full landscape rebuilds",
    price: "£12,000+",
    description:
      "including groundworks, drainage, and structural elements Can exceed",
  },
];
const landscapingQuotesStep = [
  {
    icon: <SettingIcon />,
    text: "Site survey and measurements",
  },
  {
    icon: <SettingIcon />,
    text: "Groundworks and excavation",
  },
  {
    icon: <SettingIcon />,
    text: "Sub-base and drainage preparation",
  },
  {
    icon: <SettingIcon />,
    text: "Materials (paving, stone, concrete, timber, etc.)",
  },
  {
    icon: <SettingIcon />,
    text: "Labour and machinery",
  },
  {
    icon: <SettingIcon />,
    text: "Waste removal and site clearance",
  },
];
function NewLandscapingPPCPage() {
  useRegistrationRedirect();
  return (
    <FloatingButtonWrapper>
      {(heroRef, sectionsStartRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
          <CalonicalTags isRequiredjsonLd={false} />
          <div ref={heroRef}>
            <HeroSectionNewPPC
             heading0="Find"
              heading1="Landscaping"
              heading2="Experts Near You"
              quoteText="Find Landscaping Experts Near You"
              questionDescription="To find the ideal landscaping specialist for your project, simply complete the quick form below."
              serviceId={43}
            />
          </div>
          <div ref={sectionsStartRef}>
            <HowItWorkNewPPC />
          </div>
          <PopularServicesTypes
            heading1="Landscaping"
            heading2="Services"
            description="Experts on hard landscaping and structural outdoor work, for both residential and commercial proje"
            data={NEW_PPC_POPULUAR_SERVICE_TYPE}
          />
          <TreeSurgeryCostGuide
            description=""
            heading1="Landscaping Services  "
            headding2="Cost Guide"
            CostGuidData={CostGuidData}
            maxWidth="1200px"
          />
          <LandscapingQuotesGuid
            heading1="What’s Included in"
            heading2="Landscaping Quotes"
            description=""
          />
          <ProfessionalServiceInstallation
            heading="Landscape Gardeners"
            topCards={PSI_TOP}
          />

          <TreeSurgeryRegionalGuide
            heading2="Landscaping Costs"
            pricingData={landscapingRegionalPricing}
          />
          {/* <DriveWayInstallationProcessFirst /> */}

          {/* <RegionalGuide heading2="Landscaping Costs" regionPricingData={regionPricingData} /> */}
          {/* <DriveMainTrip data={DRIVE_MAIN_TRIP} />
      <PlanPermReg /> */}
          <FAQSection
            FrequentlyQuestion={FrequentlyQuestion}
            style={{ marginBottom: "40px" }}
            description="Get answers to common landscaping installation questions"
          />
        </>
      )}
    </FloatingButtonWrapper>
  );
}

export default NewLandscapingPPCPage;
