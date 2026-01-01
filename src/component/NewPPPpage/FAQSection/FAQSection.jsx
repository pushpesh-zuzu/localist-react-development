import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import styles from "./FAQSection.module.css";
import FAQComponent from "./FAQComponent"
import SendArrowIcon from "../../../assets/ReactIcons/SendArrowIcon";

const FrequentlyQuestion =
    [
        {
            key: "1",
            title: "How long does driveway installation take?",
            description: `Installation time varies by material and size. Tarmac driveways typically take 2-3 days, block paving 4-7 days, and resin bound 3-4 days. This includes excavation, base preparation, and surface installation. Weather conditions and ground complexity can affect timelines.`,
        },
        {
            key: "2",
            title: "What is the best material for a driveway?",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        },
        {
            key: "3",
            title: "Do I need planning permission for a new driveway?",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        },
        {
            key: "4",
            title: "How long will my new driveway last?",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        },
        {
            key: "5",
            title: "Can I install a driveway myself?",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        }
    ]


const FAQSection = () => {
    return (
        <PaddingWrapper className={styles.customWapper}>
            <div className={styles.headingWrap}>
                <BlueBlackH2Heading blueText="Frequently " blackText="Asked Questions" />

                <Paragraph className={styles.subText}>
                    Get answers to common driveway installation questions
                </Paragraph>
            </div>

            <FAQComponent FrequentlyQuestion={FrequentlyQuestion} />

            <div className={styles.btnWrapper}>
                <button className={`${styles.primaryBtn}`}>
                    <span>Get A Free Quotes Now</span>
                    <SendArrowIcon size={18} />
                </button>
            </div>

        </PaddingWrapper>
    )
}

export default FAQSection