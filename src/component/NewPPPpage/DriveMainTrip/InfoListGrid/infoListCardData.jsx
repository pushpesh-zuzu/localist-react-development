import InfoOctagonIcon from "../../../../assets/ReactIcons/InfoOctagonIcon";
import CalendarCheckIcon from "../../../../assets/ReactIcons/CalendarCheckIcon";
import CloseSquareIcon from "../../../../assets/ReactIcons/CloseSquareIcon";
import CheckSquareIcon from "../../../../assets/ReactIcons/CheckSquareIcon";

export const maintenanceScheduleData = {
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
};

export const commonMistakesData = {
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
};
