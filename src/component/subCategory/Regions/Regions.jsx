import { Collapse } from "antd";
import styles from "./Regions.module.css";
const { Panel } = Collapse;
import { DownOutlined } from "@ant-design/icons";
import mapIcon from "../../../assets/Icons/map-pin.svg";
import arrowDownIcon from "../../../assets/Icons/arrow-down.svg";
import arrowIcon from "../../../assets/Images/subcategory/arrowicon.svg";
import arrowDownIconBlue from "../../../assets/Icons/arrow-down-blue.svg";
import { useEffect, useState } from "react";

const RegionsComponent = ({ regionsData, heading = "" }) => {
  const [activeKey, setActiveKey] = useState(regionsData?.[0]?.key || []);

  useEffect(() => {
    if (regionsData && regionsData.length > 0) {
      setActiveKey([regionsData[0].key]);
    }
  }, [regionsData]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.blueTitle}>
          {heading ? heading : "Regions"}
        </span>
        {heading ? "Places" : "we work in"}{" "}
        {heading ? "" : <img src={arrowDownIcon} width={44} />}
      </h2>
      {regionsData?.map((category, index) => {
        const categoryName = category.title;
        const services = category.items;

        return (
          <Collapse
            activeKey={activeKey}
            bordered={false}
            key={index}
            expandIcon={({ isActive }) => (
              <img
                src={arrowIcon}
                alt="Custom Icon"
                style={{
                  width: "17px",
                  height: "17px",
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            )}
            expandIconPosition="end"
            className={styles.subcategory_collapse}
            onChange={(keys) => {
              // Accordion behavior - only one panel open at a time
              setActiveKey(keys.length > 0 ? [keys[keys.length - 1]] : []);
            }}
          >
            <Panel
              className={styles.categoryTitle}
              header={heading ? "" : categoryName}
              key={category?.key}
              showArrow={true}
            >
              <div key={index} className={styles.categoryContainer}>
                <div className={styles.servicesContainer}>
                  {services?.map((service, idx) => (
                    <span key={idx} className={styles.serviceItem}>
                      <img src={mapIcon} width={24} />
                      {service.path ? (
                        <a style={{ color: "#000" }} href={service.path}>
                          {service.name}
                        </a>
                      ) : (
                        service?.name
                      )}
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
