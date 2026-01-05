import { Collapse } from "antd";
import styles from "./FAQComponent.module.css";
import ChevronUpIcon from "../../../assets/ReactIcons/ChevronUpIcon";
import ChevronDownIcon from "../../../assets/ReactIcons/ChevronDownIcon";
import H5 from "../UITypography/H5";

const { Panel } = Collapse;
const FAQComponent = ({
    FrequentlyQuestion,
    lang = "en",
    country = "gb",
}) => {
    return (
        <>
            <div className={styles.frequently_container}>
                <div className={styles.frequently_container_wrap}>

                    <div className={styles.frequently_collapse}>
                        <Collapse
                              defaultActiveKey={["1"]}
                            accordion
                            bordered={false}
                            expandIcon={({ isActive }) => (
                                isActive ? <ChevronUpIcon /> : <ChevronDownIcon />
                            )}
                            expandIconPosition="end"
                        >
                            {FrequentlyQuestion?.map((item) => {
                                // replace __LANG__ and __COUNTRY__ dynamically
                                const updatedDescription = item?.description
                                    ?.replace(/__LANG__/g, lang)
                                    ?.replace(/__COUNTRY__/g, country);

                                return (
                                    <Panel header={<H5>{item?.title}</H5>} key={item?.key} style={{ border: "1px solid #D9D9D9", backgroundColor: "#fff" }}>
                                        <div
                                            className={styles.frequently_collapse_description}
                                            dangerouslySetInnerHTML={{ __html: updatedDescription }}
                                        />
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQComponent;
