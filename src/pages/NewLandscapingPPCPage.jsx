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
import VettedProffessionIcon from "../assets/ReactIcons/VettedProffessionIcon";
import CompetitivePricingIcon from "../assets/ReactIcons/CompetitivePricingIcon";
import QuicAlarmIcon from "../assets/ReactIcons/QuicAlarmIcon";
import FloatingButton from "../component/NewPPPpage/UITypography/FloatingButton/FloatingButton";
import { regionPricingData } from "../component/NewPPPpage/RegionalGuide/regionPricingData";
import {
  drivewayTableData,
  drivewayTableHeaders,
} from "../component/NewPPPpage/drivewayTableData";
import TreeSurgeryRegionalGuide from "../component/NewPPPpage/TreeSurgeryRegionalGuide/TreeSurgeryRegionalGuide";
import TreeSurgeryCostGuide from "../component/NewPPPpage/TreeSurgeryCostGuide/TreeSurgeryCostGuide";
import PatioPavingIcon from "../assets/ReactIcons/PatioPalvingIcon";
import DrivewaysAccess from "../assets/ReactIcons/DrivewaysAccess";
import StepEdgingGardeningIcon from "../assets/ReactIcons/StepEdgingGardeningIcon";
import DrainageAndLandIcon from "../assets/ReactIcons/DrainageAndLandIcon";
import RetailWallIcon from "../assets/ReactIcons/RetailWallIcon";
import FullLandscapingRedesignIcon from "../assets/ReactIcons/FullLandscapingRedesignIcon ";
import LandscapingQuotesGuid from "../component/NewPPPpage/LandscapingQuotesGuid/LandscapingQuotesGuid";
import FloatingButtonWrapper from "../component/NewPPPpage/FloatingButtonWrapper";
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
      "Professional installation of patios and paved areas using porcelain, natural stone, or concrete. Each surface is built on a solid sub-base to ensure long-term durability and a clean, level finish.",
    points: [
      { text: "Wide range of paving materials" },
      { text: "Solid sub-base and foundations" },
      { text: "Long-lasting, weather-resistant finish" },
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
      "Design and construction of driveways and access paths built to handle daily use. Correct drainage, strong foundations, and neat edging ensure both functionality and kerb appeal.",
    points: [
      { text: "Effective drainage solutions" },
      { text: "Strong load-bearing base" },
      { text: "Smart, defined edging" },
    ],
  },
  {
    icon: <RetailWallIcon bgColor="white" strokeColor="#00AFE3" />,
    inActiveIcon: <RetailWallIcon bgColor="#00AFE3" strokeColor="white" />,
    title: "Retaining Walls & Raised Beds",
    description:
      "Construction of retaining walls and raised beds to manage changes in ground level, improve stability, and create structured planting areas within your garden.",
    points: [
      { text: "Ground level control" },
      { text: "Improved drainage support" },
      { text: "Defined planting areas" },
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
      "Solutions for water pooling, poor drainage, and uneven ground. Proper levelling, falls, and drainage systems help protect your property and outdoor spaces.",
    points: [
      { text: "Controlled water runoff" },
      { text: "Corrected ground levels" },
      { text: "Reduced risk of water damage" },
    ],
  },
  {
    icon: <StepEdgingGardeningIcon bgColor="#00aef0" fillColor="white" />,
    inActiveIcon: (
      <StepEdgingGardeningIcon bgColor="#00aef0" fillColor="white" />
    ),
    title: "Steps, Edging & Garden Structures",
    description:
      "Installation of steps, edging, sleepers, and structural garden features designed to improve access, safety, and the overall flow of your outdoor space.",
    points: [
      { text: "Safe and practical access" },
      { text: "Strong structural detailing" },
      { text: "Clean and cohesive design" },
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
    title: "Pattern Imprinted Concrete",
    description:
      "Decorative pattern imprinted concrete designed to replicate stone, brick, or slate. A cost-effective solution offering strong durability and modern visual appeal.",
    points: [
      { text: "Decorative concrete finishes" },
      { text: "Durable, low-maintenance surface" },
      { text: "Cost-effective alternative to paving" },
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
    icon: <SettingIcon />,
    title: "Qualified & Experienced",
    text: "Expert knowledge across all types of landscaping projects including patios, paving, drainage, retaining walls, and full groundworks, delivered by skilled professionals using industry-grade tools.",
  },
  {
    icon: <VettedProffessionIcon />,
    title: "Guaranteed Work",
    text: "Up to 10-year guarantees on workmanship and materials where applicable, giving you long-term confidence in the quality and durability of the finished result.",
  },
  {
    icon: <CompetitivePricingIcon />,
    title: "Competitive Pricing",
    text: "Clear, itemised, and competitive quotes from vetted local landscaping experts near you, allowing easy comparison to find the best value for your project and budget.",
  },
  {
    icon: <QuicAlarmIcon />,
    title: "Quick Turnaround",
    text: "Work completed to agreed timelines with minimal disruption, all while maintaining high standards of quality and professional delivery.",
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
    description: `A professional landscaping expert focuses on the construction and structural elements of outdoor spaces. This includes patios, pathways, retaining walls, drainage systems, ground preparation, levelling, and full landscape builds. They go beyond basic gardening by managing water flow, foundations, and long-lasting hard landscaping features.`,
  },
  {
    key: "2",
    title: "How do I find reliable landscaping experts near me?",
    description: `Start by comparing multiple local landscaping specialists. Check online reviews, view past project photos, and ask for detailed written quotes. Always confirm insurance, experience, and guarantees. Getting at least three quotes and discussing each contractor’s approach helps ensure quality workmanship and peace of mind.`,
  },
  {
    key: "3",
    title: "How much do landscaping projects cost?",
    description: `Landscaping costs vary depending on project size, materials, and complexity. Small jobs may cost a few hundred pounds, while full garden design and build projects often run into several thousand. Ground conditions, drainage work, and structural features can also affect pricing. Getting tailored quotes ensures clarity on total costs.`,
  },
  {
    key: "4",
    title: "Do landscaping experts handle permits and planning?",
    description: `Many landscaping experts can assist with permits, council approvals, and compliance checks—especially for structural work like retaining walls, raised patios, or drainage systems. Responsibilities can vary, so it’s important to confirm during your consultation who will manage permissions and inspections.`,
  },
  {
    key: "5",
    title: "When is the best time to start a landscaping project?",
    description: `Spring and autumn are often ideal times for landscaping because soil conditions are easier to work with and plants establish well. However, many landscaping projects can be completed year-round depending on weather, scope, and preparation. Planning early helps secure your preferred start date.`,
  },
  {
    key: "6",
    title: "Why hire a professional instead of doing landscaping yourself?",
    description: `DIY landscaping can be challenging and costly if mistakes occur with drainage, foundations, or levels. Professional landscapers have the experience, tools, and technical knowledge to deliver durable, safe, and visually appealing results. Hiring an expert often saves time, money, and future repair costs.`,
  },
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
  return (
    <FloatingButtonWrapper>
      {(heroRef, sectionsStartRef) => (
        <>
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div ref={heroRef}>
            <HeroSectionNewPPC
              trustedText="Trusted Landscaping Specialists"
              heading1="Landscaping"
              heading2="Services"
              quoteText="Find Expert Landscaping Installation Near You"
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
          />
        </>
      )}
    </FloatingButtonWrapper>
  );
}

export default NewLandscapingPPCPage;
