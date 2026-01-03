import styles from "./CompareDriveWay.module.css";
import H2 from "../UITypography/H2";
import Paragraph from "../UITypography/Paragrah";
import DrivewayComparisonTable from "./DrivewayComparisonTable";
import SendArrowIcon from "../../../assets/ReactIcons/SendArrowIcon";
import { handleScrollToBottom } from "../../../utils/scroll";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import GetCTAButton from "../UITypography/GetCTAButton";

const CompareDriveWay = ({
  heading1 = "Comparing Driveway",
  heading2 = "Materials",
  description = `Make an informed decision with our comprehensive material comparison
        guide`,
  drivewayTableData = [],
  drivewayTableHeaders = [],
}) => {
  return (
    <div className={`${styles.CompareDriveWayContainer}`}>
      <H2 className={`Inter ${styles.CompDriveWayInstHeading}`}>
        {heading1}
        <span>{heading2}</span>
      </H2>

      <Paragraph className={`${styles.ParaText}`} bold={false}>
        {description}
      </Paragraph>

      <DrivewayComparisonTable
        drivewayTableData={drivewayTableData}
        drivewayTableHeaders={drivewayTableHeaders}
      />

      {/* <button className={`${styles.primaryBtn}`}>
                <span>Get A Free Quotes Now</span>
                <SendArrowIcon size={18} />
            </button> */}
      {/* <div className={styles.cta}>
        <Button1 onClick={()=>{handleScrollToBottom()}} className={styles.button} variant="warning">
         Get A Free Quotes Now <GetQuotesIcon color="white" />
        </Button1>
      </div> */}
      <GetCTAButton
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </div>
  );
};

export default CompareDriveWay;
