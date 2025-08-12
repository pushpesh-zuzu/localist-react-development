import React from "react";
import FindAccountant from "../../subCategory/findAccountant/FindAccountant";
import CloneAccountants from "../accountants/CloneAccountants";

function BannerWithBreadCrum({
  level,
  LevelOneTwoTitle='',
  defaultServiceName,
  panelImage,
  accountHeader,
  breadcrumb,
  title,
  service = false,
  para1,
  para2,
  para3,
  isNeedS
}) {
  return (
    <>
      {level === 2 && (
        <CloneAccountants
          header={accountHeader}
          LevelOneTwoTitle={LevelOneTwoTitle}
          panelImage={panelImage}
          title={title}
          defaultServiceName={defaultServiceName}
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
        panelImage={panelImage}
        isNeedS={isNeedS}
      />
    </>
  );
}

export default BannerWithBreadCrum;
