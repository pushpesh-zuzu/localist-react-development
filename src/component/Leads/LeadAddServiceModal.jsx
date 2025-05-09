// import React from "react";
// import styles from "./AddServiceModal.module.css";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";
// import iIcon from "../../assets/Images/iIcon.svg";
// import { useSelector } from "react-redux";

// const AddServiceModal = ({
//   isModalOpen,
//   setIsModalOpen,
//   input,
//   setInput,
//   isDropdownOpen,
//   setIsDropdownOpen,
//   service = [],
//   searchServiceLoader = false,
//   handleSelectService,
//   handleSubmitData,
//   // suggestions = [],
// }) => {
//   const suggestions = [
//     { name: "Commercial & Office Cleaning" },
//     { name: "Gutter Cleaning" },
//   ];
//   console.log(service,"service")
//   const { popularList } = useSelector((state)=> state.findJobs)

//   if (!isModalOpen) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button
//           className={styles.closeButton}
//           onClick={() => setIsModalOpen(false)}
//         >
//           ×
//         </button>
//         <h2 className={styles.title}>Add service</h2>
//         <p className={styles.subtitle}>
//           <span className={styles.infoIcon}>
//             <img src={iIcon} alt="" />
//           </span>{" "}
//           Type the name of your service to start searching our thousands of
//           available services.
//         </p>

//         <label className={styles.label}>Service</label>
//         <input
//           type="text"
//           placeholder="Start typing to find services..."
//           className={styles.input}
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             setIsDropdownOpen(!!e.target.value);
//           }}
//         />

//         {isDropdownOpen && service?.length > 0 && (
//           <div className={styles.dropdown}>
//             {searchServiceLoader ? (
//               <Spin indicator={<LoadingOutlined spin />} />
//             ) : (
//               service.map((item) => (
//                 <p
//                   key={item.id}
//                   className={styles.dropdownItem}
//                   onClick={() => handleSelectService(item)}
//                 >
//                   {item.name}
//                 </p>
//               ))
//             )}
//           </div>
//         )}

//         <div className={styles.suggestions}>
//           <label className={styles.label}>Suggestions</label>
//           <p className={styles.suggestionText}>
//             We suggest the following services for you. Click to add:
//           </p>
//           <div className={styles.tags}>
//             {popularList?.map((item, idx) => (
//               <span
//                 key={idx}
//                 className={styles.tag}
//                 onClick={() => handleSelectService(item)}
//               >
//                 + {item.name}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className={styles.actions}>
//           <button
//             className={styles.cancelButton}
//             onClick={() => setIsModalOpen(false)}
//           >
//             Cancel
//           </button>
//           <button className={styles.submitButton} onClick={handleSubmitData}>
//             Add Services
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddServiceModal;


import React, { useState } from "react";
import styles from "./AddServiceModal.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import iIcon from "../../assets/Images/iIcon.svg";
import { useSelector } from "react-redux";

const AddServiceModal = ({
  isModalOpen,
  setIsModalOpen,
  input,
  setInput,
  isDropdownOpen,
  setIsDropdownOpen,
  service = [],
  searchServiceLoader = false,
  handleSelectService,
  handleSubmitData,
}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const { popularList } = useSelector((state) => state.findJobs);

  if (!isModalOpen) return null;

  const handleSelect = (item) => {
    handleSelectService(item);
    if (!selectedServices.some((s) => s.id === item.id)) {
      setSelectedServices([...selectedServices, item]);
    }
  };
  const handleRemoveService = (id) => {
    setSelectedServices((prev) => prev.filter((item) => item.id !== id));
  };
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </button>

        <h2 className={styles.title}>Add service</h2>
        <p className={styles.subtitle}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>{" "}
          Type the name of your service to start searching our thousands of
          available services.
        </p>

        <label className={styles.label}>Service</label>
        <input
          type="text"
          placeholder="Start typing to find services..."
          className={styles.input}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
          }}
        />

        {isDropdownOpen && service?.length > 0 && (
          <div className={styles.dropdown}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              service.map((item) => (
                <p
                  key={item.id}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        )}

        <div className={styles.suggestions}>
          <label className={styles.label}>Suggestions</label>

          {selectedServices.length > 0 && (
  <div className={styles.selectedSection}>
   
    <div className={styles.selectedTags}>
      {selectedServices.map((item) => (
        <span key={item.id} className={styles.selectedTag}>
          {item.name}
          <button
            className={styles.removeIcon}
            onClick={() => handleRemoveService(item.id)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  </div>
)}


          <p className={styles.suggestionText}>
            We suggest the following services for you. Click to add:
          </p>
          <div className={styles.tags}>
            {popularList?.map((item, idx) => (
              <span
                key={idx}
                className={styles.tag}
                onClick={() => handleSelect(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>

     
       

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className={styles.submitButton} onClick={handleSubmitData}>
            Add Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
