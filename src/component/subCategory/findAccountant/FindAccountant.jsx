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
}) => {
  return (
    <>
      {level == 1 && (
        <div className={styles.findAccountantContainer}>
          <SearchAccountant title={title} />
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
        />
      </div>
    </>
  );
};

export default FindAccountant;
