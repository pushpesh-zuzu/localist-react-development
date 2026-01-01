import styles from './RegionalGuide.module.css';
import H2 from '../UITypography/H2';
import H4 from '../UITypography/H4';
import Paragraph from '../UITypography/Paragrah';
import SendArrowIcon from '../../../assets/ReactIcons/SendArrowIcon';
import RegionPricing from './RegionPricing';

const RegionalGuide = () => {
    return (
        <div className={`${styles.RegGuideContainer}`}>
            <H2 className={`Inter ${styles.RegGuideHeading}`}>
                <span>Regional</span> Pricing Guide
            </H2>

            <Paragraph className={`${styles.ParaText}`} bold={false}>Make an informed decision with our comprehensive material comparison guide</Paragraph>

            <RegionPricing />

            <div className={styles.banner}>
                <H4>UK Average for Standard Driveway (50m²)</H4>
                <H2 lassName={styles.price}>£4,500</H2>
                <Paragraph bold={true}>Budget: £3,800 | Premium: £8,800</Paragraph>
            </div>

            <button className={`${styles.primaryBtn}`}>
                <span>Get A Free Quotes Now</span>
                <SendArrowIcon size={18} />
            </button>
        </div>
    )
}

export default RegionalGuide;