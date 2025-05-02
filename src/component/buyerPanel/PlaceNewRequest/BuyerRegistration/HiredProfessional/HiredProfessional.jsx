// import React, { useEffect, useState } from "react";
// import styles from "./HiredProfessional.module.css";
// import { useSelector } from "react-redux";

// const HiredProfessional = ({ closeModal }) => {
//   const [options, setOptions] = useState([]);
//   const [selected, setSelected] = useState("");
//   const { autoBidList } = useSelector((state)=> state.leadSetting)

//   useEffect(() => {
//     // Static options for now
//     const staticOptions = [
//       { id: "1", name: "Electrician" },
//       { id: "2", name: "Plumber" },
//       { id: "3", name: "Carpenter" },
//       { id: "4", name: "Web Developer" },
//     ];
//     setOptions(staticOptions);
//   }, []);

//   const handleSubmit = () => {
//     console.log("Selected Option:", selected);
//     // Add your submit logic here
//     closeModal();
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h3 className={styles.title}>Select Hired Professional</h3>
//         <div className={styles.options}>
//           {options.map((option) => (
//             <label key={option.id} className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="hired"
//                 value={option.id}
//                 checked={selected === option.id}
//                 onChange={() => setSelected(option.id)}
//               />
//               {option.name}
//             </label>
//           ))}
//         </div>
//         <div className={styles.buttonRow}>
//           <button onClick={closeModal} className={styles.cancelBtn}>
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className={styles.submitBtn}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HiredProfessional;

import React, { useEffect, useState } from "react";
import styles from "./HiredProfessional.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAddSumbitLeadDataApi, getAutoBid, getAutoBidData } from "../../../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../../../utils";

const HiredProfessional = ({ closeModal,serviceId }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const { autoBidList,autoBidListData } = useSelector((state) => state.leadSetting);
  const { userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
console.log(options,"options")
  useEffect(() => {
    // Set options based on API data (autoBidList)
    if (autoBidListData && Array.isArray(autoBidListData)) {
      const formattedOptions = autoBidListData?.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setOptions(formattedOptions);
    }
   
  }, [autoBidListData]);
  useEffect(()=>{
    
    const data = {
      user_id: userToken?.remember_tokens,
      lead_id: serviceId,
    };
    dispatch(getAutoBidData(data));
  },[])
  

  // const handleSubmit = () => {
  //   const data = {
  //     lead_id:serviceId,
  //     name:options?.name,
  //     seller_id:options?.id
  //   }
  //   dispatch(getAddSumbitLeadDataApi(data))
  //   closeModal();
  // };
  const handleSubmit = () => {
    let name = "";
    
    if (selected === "someone_else") {
      name = "Someone not on Localist";
    } else {
      // Find the selected professional in the options array
      const selectedOption = options.find(option => option.id === selected);
      name = selectedOption ? selectedOption.name : "";
    }
    
    const data = {
      lead_id: serviceId,
      name: name,
      seller_id: selected === "someone_else" ? 0 : selected
    };
 
    dispatch(getAddSumbitLeadDataApi(data)).then((result)=>{
      if(result){
        showToast("success", result?.message)
        closeModal();
      }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Select Hired Professional</h3>
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
        <div className={styles.options}>
  <label className={styles.radioLabel}>
    <input
      type="radio"
      name="hired"
      value="someone_else"
      checked={selected === "someone_else"}
      onChange={() => setSelected("someone_else")}
    />
    Someone not on Localist
  </label>
</div>
        <div className={styles.buttonRow}>
          <button onClick={closeModal} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HiredProfessional;
