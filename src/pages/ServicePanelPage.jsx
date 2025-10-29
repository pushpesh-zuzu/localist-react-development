import React, { useEffect } from "react";
import ServicePanel from "../component/servicePanel";
import CalonicalTags from "../component/common/CalonicalTags/CalonicalTags";
import useUserInfo from "../utils/getUserIp";
import { useDispatch } from "react-redux";
import { setSelectedServiceFormData } from "../store/FindJobs/findJobSlice";

const ServicePanelPage = () => {
  const dispatch = useDispatch();
  const { ip, url } = useUserInfo();

  useEffect(() => {
    if (ip && url) {
      dispatch(
        setSelectedServiceFormData({
          entry_url: url,
          user_ip_address: ip,
        })
      );
    }
  }, [ip, url, dispatch]);
  return (
    <>
      <CalonicalTags />
      <ServicePanel />
    </>
  );
};

export default ServicePanelPage;
