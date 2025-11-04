import styles from "./LandingNewPPC.module.css";
import BuyerRegistrationForLandscapingPPC from "../BuyerRegistrationForLandscapingPPC/BuyerRegistrationForLandscapingPPC";
import VerfifiedIcon from "../../../assets/Icons/VerfifiedIcon.svg";
import CheckRight from "../../../assets/Icons/CheckRight.svg";
import AllUsers from "../../../assets/Icons/AllUsers.svg";
import Icon from "../../../assets/Icons/Icon.png";
import topBigArrow from "../../../assets/Icons/topBigArrow.png";
import { Helmet } from "react-helmet-async";
<<<<<<< HEAD
=======
import NavigationDetectorWithConfirmations from "../../common/navigationDetected/NavigationDetectorWithConfirmations";
import { useDispatch, useSelector } from "react-redux";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";
import { setbuyerRequestData } from "../../../store/Buyer/BuyerSlice";
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
const LandingNewPPC = ({
  title = "",
  subHeading = "",
  serviceId,
  serviceName = "",
}) => {
<<<<<<< HEAD
=======
  const dispatch = useDispatch();

  //     const { buyerRequest } =
  //       useSelector((state) => state.buyer);
  //  const [hasMountedDetector, setHasMountedDetector] = useState(false);

  // useEffect(() => {
  //   if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
  //     setHasMountedDetector(true);
  //   }
  //   // ❌ Don't depend on buyerRequest.questions
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasMountedDetector]);
  useEffect(() => {
    dispatch(setbuyerRequestData({ service_id: serviceId }));
  }, []);

>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CalonicalTags />
      <div className={styles.pageWrapper}>
        <BuyerRegistrationForLandscapingPPC
          serviceId={serviceId}
          serviceName={serviceName}
        />

        <div className={styles.secondColumn}>
          <div className={styles.verifiedRowCompletMobile}>
            <img
              className={styles.topBigArrow}
              // style={{position:'absolute',left:'35%',bottom:'50%'}}
              src={topBigArrow}
              alt="leftbigArrow"
            />
            <p className={styles.paragraphTextMobile}>
              Complete the form now to find the ideal local professional for
              your requirements
            </p>
          </div>
          <h1 className={styles.heading}>Looking for {title} in your area?</h1>
          <p className={styles.paragraph}>
            Find a local {subHeading} on Localists in seconds
          </p>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              We only use verified and vetted professionals
            </p>
          </div>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              Compare prices from multiple professionals
            </p>
          </div>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              Hire the one thats right for you
            </p>
          </div>
          <div className={styles.verifiedRowComplet}>
            <img
              className={styles.leftbigArrow}
              src={Icon}
              alt="leftbigArrow"
            />

            <p className={styles.paragraphTextDesktop}>
              Complete the form now to find the ideal local professional for
              your requirements
              {/* <br />
              <span>for your requirements</span> */}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.statsWrapper}>
        <div className={styles.statBox}>
          <img
            style={{ height: "20px", width: "20px" }}
            src={VerfifiedIcon}
            alt="VerfifiedIcon"
          />
          <div>
            <p style={{ textAlign: "left" }}>250,000 projects</p>
            <p>completed and counting</p>
          </div>
        </div>

        <div className={styles.statBox}>
          <img
            style={{ height: "20px", width: "20px" }}
            src={AllUsers}
            alt="AllUsers"
          />
          <div>
            <p style={{ textAlign: "left" }}>10,000 customers </p>
            <p>connected to pros everyday</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingNewPPC;
