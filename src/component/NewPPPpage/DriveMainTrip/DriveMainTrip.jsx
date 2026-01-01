import styles from './DriveMainTrip.module.css';
import H2 from '../UITypography/H2';
import Paragraph from '../UITypography/Paragrah';
import SendArrowIcon from '../../../assets/ReactIcons/SendArrowIcon';
import InfoListCard from "./InfoListGrid/InfoListCard";
import {
  maintenanceScheduleData,
  commonMistakesData,
} from "./InfoListGrid/infoListCardData";

const DriveMainTrip = () => {
  return (
    <div className={`${styles.Container}`}>
      <H2 className={`Inter ${styles.Heading}`}>
        <span>Driveway</span> Maintenance Tips
      </H2>

      <Paragraph className={`${styles.ParaText}`} bold={false}>Extend the life of your driveway with proper maintenance</Paragraph>

      <div className={`${styles.gridTwoColumn}`}>
        <InfoListCard {...maintenanceScheduleData} />
        <InfoListCard {...commonMistakesData} />
      </div>

      <button className={`${styles.primaryBtn}`}>
        <span>Get A Free Quotes Now</span>
        <SendArrowIcon size={18} />
      </button>
    </div>
  )
}

export default DriveMainTrip;