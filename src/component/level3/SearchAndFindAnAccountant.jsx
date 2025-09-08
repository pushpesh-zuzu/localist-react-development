import styles from "./accountfindinginfolevel3.module.css";
import AccountFindingInfoLevel3 from "./AccountFindingInfoLevel3";
import SearchAccountantLeve3 from "./SearchAccountantLeve3";

const SearchAndFindAnAccountant = ({
  title,
  findingHeading,
  breadcrumb,
  bannerImage,
  para1,
  para2,
  para3,
  para4,
  defaultService,
  isNeedS = false,
}) => {
  const style = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "400px",
    color: "white",
  };

  return (
    <>
      <div className={styles.findAccountantContainer} style={style}>
        <SearchAccountantLeve3
          defaultService={defaultService}
          title={title}
          isNeedS={isNeedS}
        />
      </div>
      <div>
        <AccountFindingInfoLevel3
          breadcrumb={breadcrumb}
          findingHeading={findingHeading}
          para1={para1}
          para2={para2}
          para3={para3}
          para4={para4}
          isNeedS={isNeedS}
        />
      </div>
    </>
  );
};

export default SearchAndFindAnAccountant;
