import DocumentCheckIcon from "../../../../assets/ReactIcons/DocumentCheckIcon";
import VerifiedBadgeIcon from "../../../../assets/ReactIcons/VerifiedBadgeIcon";

export const maintenanceRulesData = {
  title: "Regular Maintenance Schedule",
  icon: <DocumentCheckIcon size={50} />,
  items: [
    {
      heading: "Listed Buildings",
      text: "Always require consent for any external alterations",
    },
    {
      heading: "Conservation Areas",
      text: "May need permission depending on local regulations",
    },
    {
      heading: "Non-Permeable Surfaces Over 5m²",
      text: "Require proper drainage solutions to front gardens",
    },
    {
      heading: "Shared Driveways",
      text: "Need agreement from all parties with access rights",
    },
  ],
};

export const permittedDevelopmentData = {
  title: "Permitted Development Rights",
  icon: <VerifiedBadgeIcon size={50} />,
  items: [
    {
      heading: "No Permission Needed",
      text: "Permeable surfaces like gravel, resin bound, or permeable block paving",
    },
    {
      heading: "Under 5m²",
      text: "Non-permeable surfaces less than 5m² to the front of property",
    },
    {
      heading: "Proper Drainage",
      text: "Any size if water drains to lawn or border instead of highway",
    },
    {
      heading: "Rear Gardens",
      text: "Generally no restrictions on driveways behind the building line",
    },
  ],
};
