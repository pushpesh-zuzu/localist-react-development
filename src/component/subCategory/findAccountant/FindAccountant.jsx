import { color } from "framer-motion";
import AccountFindingInfo from "./AccountFindingInfo";
import styles from "./findaccountant.module.css";
import SearchAccountant from "./SearchAccountant";

const FindAccountant = ({
  title,
  breadcrumb,
  findingHeading,
  level = 1,
  service = false,
  para1,
  para2,
  para3,
  panelImage,
  defaultService,
  isNeedS
}) => {
  const style = {
    backgroundImage: `url(${panelImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "400px",
    color: "white",
  };

  return (
    <>
      {level == 1 && (
        <div className={styles.findAccountantContainer} style={style}>
          <SearchAccountant defaultService={defaultService} title={title} panelImage={panelImage} />
        </div>
      )}
      <div>
        <AccountFindingInfo
          breadcrumb={breadcrumb}
          findingHeading={findingHeading}
          title={title}
          service={service}
          para1={para1}
          para2={para2}
          para3={para3}
          isNeedS={isNeedS}
        />
      </div>
    </>
  );
};

export default FindAccountant;
