import { Collapse } from "antd";
// import { regionsData? } from "../../../constant/subCategory";
import styles from "./Regions.module.css";
const { Panel } = Collapse;
import { DownOutlined } from "@ant-design/icons";
import mapIcon from "../../../assets/Icons/map-pin.svg";
import arrowDownIcon from "../../../assets/Icons/arrow-down.svg";
import arrowIcon from "../../../assets/Images/subcategory/arrowicon.svg";
import arrowDownIconBlue from "../../../assets/Icons/arrow-down-blue.svg";

const RegionsComponent = ({ regionsData, heading = "" }) => {
  const allPanelKeys = regionsData?.map((panel) => panel.key);

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
        const isNorthWestEngland = categoryName === "North West England";

        return (
          <Collapse
            defaultActiveKey={allPanelKeys}
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
                  visibility: isNorthWestEngland ? "hidden" : "visible",
                }}
              />
            )}
            expandIconPosition="end"
            className={styles.subcategory_collapse}
            activeKey={allPanelKeys.filter(
              (key) => key !== "north-west-england" // prevent this from opening
            )}
            onChange={(keys) => {
              // prevent "North West England" panel from opening
              const filteredKeys = keys.filter(
                (key) => key !== "north-west-england"
              );
            }}
          >
            <Panel
              className={`${styles.categoryTitle} ${
                isNorthWestEngland ? styles.nonInteractive : ""
              }`}
              header={heading ? "" : categoryName}
              key={category?.key}
              showArrow={!isNorthWestEngland}
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
