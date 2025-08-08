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
  breadcrumb = " Home & Garden / Builders / Fence & Gate Installation",
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

      <FindAccountant level={level} title={"Fencer"} breadcrumb={breadcrumb} />
    </>
  );
}

export default BannerWithBreadCrum;
