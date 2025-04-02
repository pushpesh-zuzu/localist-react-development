import { Collapse } from "antd";
import { regionsData } from "../../../constant/subCategory";
import styles from "./Regions.module.css";
const { Panel } = Collapse;
import { DownOutlined } from "@ant-design/icons";
import mapIcon from "../../../assets/Icons/map-pin.svg";
import arrowDownIcon from "../../../assets/Icons/arrow-down.svg";
import arrowIcon from "../../../assets/Images/subcategory/arrowicon.svg";
import arrowDownIconBlue from "../../../assets/Icons/arrow-down-blue.svg";

const RegionsComponent = () => {
  const allPanelKeys = regionsData?.map((panel) => panel.key);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.blueTitle}>Regions</span>
        We Work In <img src={arrowDownIcon} width={44} />
      </div>
      {regionsData.map((category, index) => {
        const categoryName = Object?.keys(category)[1];
        const services = category[categoryName];
        return (
          <Collapse
            defaultActiveKey={allPanelKeys}
            bordered={false}
            key={index}
            // expandIcon={({ isActive }) => (
            //   <DownOutlined
            //     style={{
            //       transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            //       transition: "transform 0.3s ease",
            //     }}
            //   />
            // )}
             expandIcon={({ isActive }) => (
                            <img
                              src={isActive ? arrowIcon : arrowIcon}
                              alt="Custom Icon"
                              style={{
                                width: "17px", 
                                height: "17px",
                                transform: isActive ? "rotate(180deg)" : "rotate(0deg)", // Rotate effect
                                transition: "transform 0.3s ease",
                              }}
                            />
                          )}
            expandIconPosition="end"
            className={styles.subcategory_collapse}
          >
            <Panel
              className={styles.categoryTitle}
              header={categoryName}
              key={category?.key}
            >
              <div key={index} className={styles.categoryContainer}>
                {/* <div className={styles.categoryTitle}>{categoryName}</div> */}
                {/* <hr className={styles.separator} /> */}
                <div className={styles.servicesContainer}>
                  {services?.map((service, idx) => (
                    <span key={idx} className={styles.serviceItem}>
                      <img src={mapIcon} width={24} /> {service}
                    </span>
                  ))}
                </div>
              </div>
            </Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

export default RegionsComponent;
