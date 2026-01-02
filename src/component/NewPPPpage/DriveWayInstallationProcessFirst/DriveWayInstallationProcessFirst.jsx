import styles from "./DriveWayInstallationProcessFirst.module.css";
import ProcessSteps from './ProcessSteps/ProcessSteps';
import H2 from '../UITypography/H2';
import Paragraph from '../UITypography/Paragrah';
import SendArrowIcon from '../../../assets/ReactIcons/SendArrowIcon';


const DriveWayInstallationProcessFirst = () => {
  return (
    <div className={`${styles.DriveWayInstallationProcessFirstContainer}`}>

      <H2 className={`Inter ${styles.DriveWayInstHeading}`}>
        The Driveway Installation <span>Process</span>
      </H2>

      <Paragraph className={`${styles.ParaText}`} bold={false} >Understanding each step ensures a smooth project from start to finish</Paragraph>

      <ProcessSteps />

      <button className={`${styles.primaryBtn}`}>
        <span>Get A Free Quotes Now</span>
        <SendArrowIcon size={18} />
      </button>
    </div>
  )
}

export default DriveWayInstallationProcessFirst