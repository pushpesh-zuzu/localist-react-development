import AccountFindingInfo from "./AccountFindingInfo";
import styles from "./findaccountant.module.css";
import SearchAccountant from "./SearchAccountant";

const FindAccountant = ({title,breadcrumb,findingHeading}) => {
  return (
    <>
      <div className={styles.findAccountantContainer}>
        <SearchAccountant title={title}/>
      </div>
      <div>
        <AccountFindingInfo breadcrumb={breadcrumb} findingHeading={findingHeading} title={title} />
      </div>
    </>
  );
};

export default FindAccountant;
