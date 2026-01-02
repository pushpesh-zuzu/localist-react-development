import styles from './DriveMainTrip.module.css';
import H2 from '../UITypography/H2';
import Paragraph from '../UITypography/Paragrah';
import SendArrowIcon from '../../../assets/ReactIcons/SendArrowIcon';
import InfoListCard from "./InfoListGrid/InfoListCard";
import {
  maintenanceScheduleData,
  commonMistakesData,
} from "./InfoListGrid/infoListCardData";

import PaddingWrapper from '../PaddingWrapper/PaddingWrapper';
import BlueBlackH2Heading from '../UITypography/BlueBlackH2Heading';

const DriveMainTrip = ({ data }) => {
  return (

    <PaddingWrapper className={styles.customSettings} background="#FCFCFC">
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading blueText={data.blueText} blackText={data.blackText} />

        <Paragraph className={styles.subText}>
          {data.subHeading}
        </Paragraph>
      </div>

      <div className={`${styles.gridTwoColumn}`}>
        <InfoListCard {...(data.maintenanceScheduleData)} />
        <InfoListCard {...(data.commonMistakesData)} />
      </div>

      <div className={styles.btnWrapper}>
        <button className={`${styles.primaryBtn}`}>
          <span>Get A Free Quotes Now</span>
          <SendArrowIcon size={18} />
        </button>
      </div>
    </PaddingWrapper>
  )
}

export default DriveMainTrip;