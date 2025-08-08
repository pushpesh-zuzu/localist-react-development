import AccountFindingInfo from "./AccountFindingInfo";
import styles from "./findaccountant.module.css";
import SearchAccountant from "./SearchAccountant";

const FindAccountant = ({ title, breadcrumb, findingHeading, level = 1,service }) => {
  return (
    <>
      {level == 1 && (
        <div className={styles.findAccountantContainer}>
          <SearchAccountant title={title}  />
        </div>
      )}
      <div>
        <AccountFindingInfo
          breadcrumb={breadcrumb}
          findingHeading={findingHeading}
          title={title}
          service ={service}
        />
      </div>
    </>
  );
};

export default FindAccountant;
