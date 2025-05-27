// import React from "react"

// import styles from "./InvoiceAndBilling.module.css"
// import iIcon from "../../../assets/Images/iIcon.svg";


// const InvoiceAndBilling = () => {
//     return (
//         <div className={styles.container}>
//              <div className={styles.backText}>← Setting</div>
//              <h1 className={styles.heading}>Invoices and billing details</h1>
//              <div className={styles.manageWrapper}>
//                <span className={styles.infoIcon}>
//                  <img src={iIcon} alt="iIcon" />
//                </span>
//                <p className={styles.description}>
//                We’ll use these account details to contact you but won’t share them with customers. You can control the contact details that customers see for your business in {" "}
//                  <a href="#" className={styles.link}>
//                    My Profile
//                  </a>
//                  .
//                </p>
//              </div>
       
//              <div className={styles.card}>
//                <h3 className={styles.subHeading}>Billing address</h3>
//                <p className={styles.note}>
//                Your business address for billing & invoicing
//                </p>
       
//                <label className={styles.label}>Contact name</label>
//                <input
//                  type="text"
//                  className={styles.input}
//                  value="chander"
//                 //  onChange={()=> e.target.value}
//                />
       
//                <label className={styles.label}>Address line 2</label>
//                <input type="text" className={styles.input} />
//        <div>
//        <label className={styles.label}>City</label>
//        <input type="text" className={styles.input} />
//        <label className={styles.label}>Postcode</label>
//                <input type="text" className={styles.input} />
//        </div>
//                <label className={styles.label}>Phone number</label>
//                <input type="text" className={styles.input} />
//              </div>
       
        
//            </div>
//     )
//     }
// export default InvoiceAndBilling

import React, { useState } from "react";
import styles from "./InvoiceAndBilling.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddSellerBillingDetailsApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const InvoiceAndBilling = () => {
    const dispatch = useDispatch();
    const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const { sellerBillingLoader } = useSelector((state) => state.myCredit);
  const [formData, setFormData] = useState({
    contactName: "",
    addressLine1:"",
    addressLine2: "",
    city: "",
    postcode: "",
    phoneNumber: "",
    vatRegister: 1
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBack =()=>{
    navigate("/settings");
}
const handleSaveData = () => {
    const data = {
        user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
        billing_contact_name: formData.contactName,
        billing_address1: formData.addressLine1,
        billing_address2: formData.addressLine2,
        billing_city: formData.city,
        billing_postcode: formData.postcode,
        billing_phone: formData.phoneNumber,
        billing_vat_register: formData.vatRegister || "",
    }
    dispatch(AddSellerBillingDetailsApi(data))
    .then((result) => {  
        if(result) {
            showToast("success", result?.message);
            setFormData({
                contactName: "",
                addressLine1:"",
                addressLine2: "",
                city: "",
                postcode: "",
                phoneNumber: "",
                vatRegister:""
            });     
        } 
       
    })
}

  return (
    <>
    <div className={styles.container}>
      <div className={styles.backText} onClick={handleBack}>← Setting</div>
      <h1 className={styles.heading}>Invoices and billing details</h1>

      <div className={styles.manageWrapper}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="iIcon" />
        </span>
        <p className={styles.description}>
          We’ll use these account details to contact you but won’t share them
          with customers. You can control the contact details that customers see
          for your business in{" "}
          <a href="#" className={styles.link}>
            My Profile
          </a>
          .
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.subHeading}>Billing address</h3>
        <p className={styles.note}>
          Your business address for billing & invoicing
        </p>

        <label className={styles.label}>Contact name</label>
        <input
          type="text"
          name="contactName"
          className={styles.input}
          value={formData.contactName}
          onChange={handleChange}
        />
 <label className={styles.label}>Address line 1</label>
        <input
          type="text"
          name="addressLine1"
          className={styles.input}
          value={formData.addressLine1}
          onChange={handleChange}
        />
        <label className={styles.label}>Address line 2</label>
        <input
          type="text"
          name="addressLine2"
          className={styles.input}
          value={formData.addressLine2}
          onChange={handleChange}
        />

        {/* City + Postcode in one row */}
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Postcode</label>
            <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} className={styles.input} />
          </div>
        </div>

        <label className={styles.label}>Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          className={styles.input}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <div className={styles.saveButtonBox}>
           
              <button className={styles.saveButton} onClick={() => handleSaveData()}>
              {sellerBillingLoader ?  <Spin
                         indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                       /> : "Save"} </button>
        </div>
      </div>
    <InvoiceTable/>
    </div>
    </>
  );
};

export default InvoiceAndBilling;
