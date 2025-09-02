import { Collapse } from "antd";
import styles from "./Frequently.module.css";
import arrowDownIcon from "../../../assets/Icons/arrow-down.svg";
import arrowDownIconBlue from "../../../assets/Icons/arrow-down-blue.svg";
const { Panel } = Collapse;
const Frequently = ({ FrequentlyQuestion }) => {
  return (
    <>
      <div className={styles.frequently_container}>
        <div className={styles.frequently_container_wrap}>
          <h2 className={styles.frequently_heading}>
            Frequently Asked <b>Questions</b>
          </h2>
          <div className={styles.frequently_collapse}>
            <Collapse
              defaultActiveKey={["1"]}
              accordion
              bordered={false}
              expandIcon={({ isActive }) => (
                <img
                  src={isActive ? arrowDownIconBlue : arrowDownIcon}
                  alt="Custom Icon"
                  style={{
                    width: "24px", // Icon ka size
                    height: "24px",
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)", // Rotate effect
                    transition: "transform 0.3s ease",
                  }}
                />
              )}
              expandIconPosition="end"
            >
              {FrequentlyQuestion?.map((item) => (
                <Panel header={<h4>{item?.title}</h4>} key={item?.key}>
                  <div
                    className={styles.frequently_collapse_description}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export default Frequently;
