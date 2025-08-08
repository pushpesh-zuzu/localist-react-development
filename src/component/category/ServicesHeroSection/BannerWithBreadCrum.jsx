import React from "react";
import FindAccountant from "../../subCategory/findAccountant/FindAccountant";
import CloneAccountants from "../accountants/CloneAccountants";
import styles from "../../../component/subCategory/findAccountant/findaccountant.module.css";

function BannerWithBreadCrum({
  level,
  header,
  subHeader,
  panelImage,
  accountHeader,
  breadcrumb,
  title,
  service = false,
  para1,
  para2,
  para3,
}) {
  return (
    <>
      {level === 2 && (
        <CloneAccountants
          header={accountHeader}
          subHeader={subHeader}
          panelImage={panelImage}
        />
      )}

      <FindAccountant
        level={level}
        title={title}
        breadcrumb={breadcrumb}
        service={service}
        para1={para1}
        para2={para2}
        para3={para3}
      />
    </>
  );
}

export default BannerWithBreadCrum;
