import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import H5 from "../UITypography/H5";
import Paragraph from "../UITypography/Paragrah";
import InfoGridSection from "./InfoGridSelection/InfoGridSelection";
import InfoCircleIcon from "../../../assets/ReactIcons/InfoCircleIcon";
import {
    maintenanceRulesData,
    permittedDevelopmentData,
} from "./InfoGridSelection/infoGridData";

import styles from "./PlanPermReg.module.css";
import SendArrowIcon from "../../../assets/ReactIcons/SendArrowIcon";

const PlanPermReg = () => {
    return (
        <PaddingWrapper className={styles.customSettings}>
            <div className={styles.headingWrap}>
                <BlueBlackH2Heading blueText="Planning Permission" blackText="& Regulations" />

                <Paragraph className={styles.subText}>
                    What you need to know before starting your driveway project
                </Paragraph>
            </div>

            <div className={styles.gridTwoColumn}>
                <InfoGridSection {...maintenanceRulesData} />
                <InfoGridSection {...permittedDevelopmentData} />
            </div>

            <div className={styles.banner}>
                <div className={styles.bannerHeading}>
                    <InfoCircleIcon size={22} />
                    <H5>Professional contractors will advise you on all planning requirements</H5>
                </div>
                <Paragraph bold={true}>Reputable installers ensure compliance with all local regulations and building codes</Paragraph>
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

export default PlanPermReg