import React, { useEffect, useState } from 'react';
import styles from './BuyerFirstStep.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAutoBidData } from '../../../../store/LeadSetting/leadSettingSlice';

const BuyerFirstStep = () => {
    const navigate = useNavigate();
     const { autoBidList,autoBidListData,addSubmitLeadLoader } = useSelector((state) => state.leadSetting);
const { userToken } = useSelector((state) => state.auth)
const { registerData } = useSelector((state) => state.findJobs);
 const [options, setOptions] = useState([]);
   const [selected, setSelected] = useState("");
const id = useParams()
const dispatch = useDispatch();
const leadIdData = autoBidListData?.[0]?.lead_id
   console.log(autoBidListData,options,leadIdData,"autoBidListData")
const userData = userToken?.user_id || userToken?.id || registerData?.user_id || registerData?.id;
      useEffect(()=>{
         
         const data = {
           user_id: userData,
           lead_id: id,
         };
         dispatch(getAutoBidData(data));
       },[])
         useEffect(() => {
           // Set options based on API data (autoBidList)
           if (autoBidListData && Array.isArray(autoBidListData)) {
             const formattedOptions = autoBidListData?.map((item) => ({
               id: item.id,
               name: item.name,
             }));
             setOptions(formattedOptions);
           }
           else{
             setOptions([])
           }
          
          
         }, [autoBidListData]);
   const handleNext = () => {
  navigate('/buyer-second-step', {
    state: {
      leadId: leadIdData,
      sellerId: selected,
    },
  });
};
    const handleCancel = () => {
      navigate("/buyers/create")
    }
  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <p>
         Thank you for using <a href='#' className={styles.textcolor}>Localists.com</a>{" "} to find your local professional. 
         To help improve our platform and to provide you with the most accurate matches in future we would be grateful 
         if you could confirm the following pieces of information:
        </p>
      </div>
      <h2 className={styles.question}>Which professional did you hire?</h2>
     <div className={styles.options}>
              {options.map((option) => (
                <label key={option.id} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hired"
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => setSelected(option.id)}
                  />
                  {option.name}
                </label>
              ))}
            </div>
      <div className={styles.buttonGroup}>
        <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        <button className={styles.nextBtn} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BuyerFirstStep;
