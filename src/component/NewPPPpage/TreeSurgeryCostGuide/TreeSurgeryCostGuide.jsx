import React from "react";
import styles from "./TreeSurgeryCostGuide.module.css";
import PaddingWrapper from "../PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import GetCTAButton from "../UITypography/GetCTAButton";


function TreeSurgeryCostGuide() {
    const data = [
        {
            service: "Tree pruning / crown reduction",
            price: "£150–£800 per tree",
        },
        {
            service: "Tree removal (small / medium)",
            price: "£250–£1,200+",
        },
        {
            service: "Stump grinding",
            price: "£60–£300 per stump",
        },
        {
            service: "Hedge trimming",
            price: "£40–£500 depending on size",
        },
        {
            service: "Emergency tree work",
            price: "£300–£1,500+",
        },
    ];

    return (
        <PaddingWrapper>
            <div className={styles.heading}>
                <BlueBlackH2Heading
                    blueText="Tree Surgery Services"
                    blackText="Cost Guide"
                />

                <Paragraph className={styles.description}>
                    Understanding the costs involved in driveway installation helps you budget effectively. Prices vary based on material, size, and complexity.
                </Paragraph>
            </div>

            <div className={styles.tableWrapper}>
                <div className={styles.tableHeader}>
                    <span>Service</span>
                    <span>Average Price</span>
                </div>

                {data.map((item, index) => (
                    <div key={index} className={styles.tableRow}>
                        <span className={styles.service}>{item.service}</span>
                        <span className={styles.price}>{item.price}</span>
                    </div>
                ))}
            </div>

            <GetCTAButton
                onClick={() => {
                    handleScrollToBottom();
                }} />
        </PaddingWrapper>
    );
}

export default TreeSurgeryCostGuide;
