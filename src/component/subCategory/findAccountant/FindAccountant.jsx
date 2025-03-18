import AccountFindingInfo from "./AccountFindingInfo";
import styles from "./findaccountant.module.css";
import SearchAccountant from "./SearchAccountant";

const FindAccountant = () => {
  return (
    <>
      <div className={styles.findAccountantContainer}>
        <SearchAccountant />
      </div>
      <div>
        <AccountFindingInfo />
      </div>
    </>
  );
};

export default FindAccountant;
