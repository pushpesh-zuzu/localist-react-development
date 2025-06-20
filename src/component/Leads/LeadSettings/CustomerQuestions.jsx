import React, { useEffect, useState } from "react";
import styles from "./CustomerQuestions.module.css";

import CustomerQuestionsImg from "../../../assets/Images/Leads/CustomerQuestionsImg.svg";
import UpArrowIcon from "../../../assets/Images/Leads/UpArrowIcon.svg";
import DownArrowIcon from "../../../assets/Images/Leads/DownArrowIcon.svg";
import LocationIcon from "../../../assets/Images/HowItWorks/locationImg.svg";
import TickIcon from "../../../assets/Images/Leads/TickIcon.svg";
import TrashIcon from "../../../assets/Images/Leads/TrashIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  addLocationLead,
  getExpandRadiusList,
  getleadPreferencesList,
  getleadPrimaryServiceList,
  getLocationLead,
  getServiceWiseLocationData,
  leadPreferences,
  leadPreferencesData,
  removeItemData,
} from "../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../utils";
import { Button, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RemoveServiceModal from "../RemoveModal";
import ServiceSelectionModal from "./ServiceModal";
import LocationModal from "../LocationModal";
import { Link, useNavigate } from "react-router-dom";

const CustomerQuestions = ({ selectedService }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (selectedService) {
      setIsRemoved(false);
    }
  }, [selectedService]);

  const {
    leadPreferenceData,
    leadPreferenceLoader,
    getlocationData,
    removeLoader,
    serviceWiseData,
  } = useSelector((state) => state.leadSetting);
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth);
console.log(leadPreferenceData,selectedService,"leadPreferenceData")
  const [locationData, setLocationData] = useState({
    miles1: "1",
    postcode: "",
  });
  const nationwideShow = serviceWiseData?.map((item) => item?.type )

  const checkedNationWideShow = serviceWiseData?.map((item) => item?.nation_wide == 1 )
  const locationId = serviceWiseData?.map((item) => item?.id)
  const locationTypes = nationwideShow.some((item) => item === "Distance")
  console.log(locationId?.[0],locationTypes,"serviceWiseData")
const handleUpdateService = () => {
  
  const data = {
    service_id:selectedService?.id
  }
  dispatch(getleadPrimaryServiceList(data)).then((result) => {
    if(result) {
      showToast("success",result?.message)
       dispatch(
          leadPreferences({
            user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
            service_id: selectedService?.id,
          })
        );
         dispatch(
                  getleadPreferencesList({ user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens })
                );
    }
  })
}


  useEffect(() => {
    if (leadPreferenceData?.length) {
      const initialAnswers = {};

      // This variable will track if the user has already saved preferences for this service
      const hasUserSavedData = leadPreferenceData.some(
        (item) => item.answers !== item.answer
      );

      leadPreferenceData.forEach((item) => {
        if (hasUserSavedData && item.answers) {
          // If user has saved answers, use the "answers" key
          const savedOptions = item.answers.split(",").map((a) => a.trim());
          initialAnswers[item.id] = savedOptions;
        } else if (item.answer) {
          // For first time visit, use "answer" key
          const options = item.answer.split(",").map((a) => a.trim());
          initialAnswers[item.id] = options;
        }
      });

      setSelectedAnswers(initialAnswers);
    }
  }, [leadPreferenceData]);

  useEffect(() => {
    const locationWise = {
      user_id: userToken?.remember_tokens,
      service_id: selectedService?.id,
    };
    dispatch(getServiceWiseLocationData(locationWise));
  }, [selectedService?.id]);

  const handleSubmitData = () => {
    const hasEmptyAnswers = leadPreferenceData.some((item) => {
      const selected = selectedAnswers[item.id];
      return !selected || selected.length === 0;
    });

    if (hasEmptyAnswers) {
      showToast(
        "error",
        "At least one option must be selected for each question."
      );
      return;
    }

    const questionIds = Object.keys(selectedAnswers);
    const answers = Object.values(selectedAnswers).map((ans) =>
      Array.isArray(ans) ? ans.join(",") : ans
    );

    const data = {
      user_id: userToken?.remember_tokens,
      service_id: selectedService?.id,
      question_id: questionIds,
      answers: answers,
    };

    dispatch(leadPreferencesData(data)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message || "Data submitted successfully");

        // Reload the leadPreferenceData to get updated "answers" values
        dispatch(
          leadPreferences({
            user_id: userToken?.remember_tokens,
            service_id: selectedService?.id,
          })
        );
      }
    });
  };

  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const handleNext = () => {
    // Optional: Validate the locationData here
    if (!locationData.postcode || !locationData.miles1) {
      message.warning("Please fill in both fields");
      return;
    }

    // Close current modal
    setIsLocationModalOpen(false);

    // Open next modal
    setIsNextModalOpen(true); // make sure you have this state defined

    // You can pass data as props or store in shared state
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = (data) => {
    const serviceIds = data.join(",");
   
    const locationdata = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1,
      postcode: locationData.postcode,
      service_id: serviceIds,
      type:nationwideShow[0],
      city:locationData?.city,
      coordinates:locationData?.coordinates??[]
    };

    dispatch(addLocationLead(locationdata)).then((result) => {
      if (result?.success) {
        const data = { user_id: userToken?.remember_tokens };
        dispatch(getLocationLead(data));
        dispatch(getleadPreferencesList(data));
        setIsLocationModalOpen(false);
        const locationWise = {
          user_id: userToken?.remember_tokens,
          service_id: selectedService?.id,
        };
        dispatch(getServiceWiseLocationData(locationWise));
      }
    });

    setIsNextModalOpen(false);
  };
  const handleLocationSubmit = () => {
    const data = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1,
      postcode: locationData.postcode,
      service_id: selectedService?.id,
    };

    dispatch(addLocationLead(data)).then((result) => {
      if (result?.success) {
        dispatch(getLocationLead({ user_id: userToken?.remember_tokens }));
        setIsLocationModalOpen(false);
      }
    });
  };

  const handleRemove = () => {
    const user_id =
      userToken?.active_status === 1
        ? userToken?.remember_tokens
        : registerData?.active_status === 1
        ? registerData?.remember_tokens
        : null;

    if (user_id && selectedService?.id) {
      dispatch(
        removeItemData({ user_id, service_id: selectedService?.id })
      ).then((result) => {
        if (result?.success) {
          showToast(
            "success",
            result?.message || "Service removed successfully"
          );
          setShow(false);
          dispatch(
            getleadPreferencesList({ user_id: userToken?.remember_tokens })
          );
          setIsRemoved(true);
        }
      });
    }
  };

  if (isRemoved) return null;
  const handleRemoveModal = () => {
    setShow(true);
  };
  const onHandleCancel = () => {
    setShow(false);
  };
  const handleRedirctSuggest = () => {
    navigate("/feedback/questions", {
      state: { serviceId: selectedService?.id },
    });
  };
  const handleExpandRadius = (item) => {
    console.log(item,"item")
    const radiusData = {
      location_id:item?.id
    }
    dispatch(getExpandRadiusList(radiusData)).then((result) =>{
      if(result){
        showToast("success",result?.message)
         const locationWise = {
          user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
          service_id: selectedService?.id,
        };
        dispatch(getServiceWiseLocationData(locationWise));
      }
    })
  }
  return (
    <>
      <div className={styles.modal}>
        <div>
          <div className={styles.header}>
            <h1 className={styles.title}>{selectedService?.name}</h1>
          </div>

          <div className={styles.subHeader}>
            <span className={styles.icon}>
              <img src={CustomerQuestionsImg} alt="" />
            </span>
            Customer questions
          </div>

          <p className={styles.description}>
            Every customer answers this series of questions, allowing you to
            define exactly which type of leads you see.
          </p>

          {leadPreferenceData?.map((item) => {
            const options = item.answer?.split(",") || [];
            const isOpen = openQuestionId === item.id;

            return (
              <div key={item.id} className={styles.questionBox}>
                <p
                  className={styles.questionTitle}
                  onClick={() =>
                    setOpenQuestionId((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                >
                  {item.questions}
                  <img
                    src={isOpen ? UpArrowIcon : DownArrowIcon}
                    alt="Toggle Icon"
                    className={styles.arrowIcon}
                  />
                </p>

                <div
                  className={`${styles.options} ${
                    isOpen ? styles.showOptions : ""
                  }`}
                >
                  {/* {options.map((opt) => (
                    <label key={opt} className={styles.option}>
                      <input
                        type="checkbox"
                        name={`question-${item.id}`}
                        value={opt}
                        checked={selectedAnswers[item.id]?.includes(opt)}
                        onChange={() => {
                          setSelectedAnswers((prev) => {
                            const current = prev[item.id] || [];
                            const updated = current.includes(opt)
                              ? current.filter((o) => o !== opt) // remove if already selected
                              : [...current, opt]; // add if not selected
                            return {
                              ...prev,
                              [item.id]: updated,
                            };
                          });
                        }}
                      />

                      {opt}
                    </label>
                  ))} */}
                  {/* {options.map((opt) => (
                    <label key={opt} className={styles.option}>
                      <input
                        type="checkbox"
                        name={`question-${item.id}`}
                        value={opt}
                        checked={selectedAnswers[item.id]?.includes(opt)}
                        onChange={() => {
                          setSelectedAnswers((prev) => {
                            const current = prev[item.id] || [];
                            const updated = current.includes(opt)
                              ? current.filter((o) => o !== opt) // remove if already selected
                              : [...current, opt]; // add if not selected
                            return {
                              ...prev,
                              [item.id]: updated,
                            };
                          });
                        }}
                      />
                      {opt}
                    </label>
                  ))} */}

                  <label className={styles.optionSelect}>
  <input
    type="checkbox"
    checked={
      options.every((opt) => selectedAnswers[item.id]?.includes(opt)) // All selected
    }
    onChange={(e) => {
      const isChecked = e.target.checked;
      setSelectedAnswers((prev) => ({
        ...prev,
        [item.id]: isChecked ? [...options] : [],
      }));
    }}
  />
  Select All
</label>

{options.map((opt) => (
  <label key={opt} className={styles.option}>
    <input
      type="checkbox"
      name={`question-${item.id}`}
      value={opt}
      checked={selectedAnswers[item.id]?.includes(opt)}
      onChange={() => {
        setSelectedAnswers((prev) => {
          const current = prev[item.id] || [];
          const updated = current.includes(opt)
            ? current.filter((o) => o !== opt)
            : [...current, opt];

          return {
            ...prev,
            [item.id]: updated,
          };
        });
      }}
    />
    {opt}
  </label>
))}

                </div>
              </div>
            );
          })}

          <div className={styles.suggestion}>
            <span>Something missing?</span>
            <div className={styles.suggestLink} onClick={handleRedirctSuggest}>
              Suggest a question
            </div>
          </div>

          <div
            className={styles.locations}
            onClick={() => setIsLocationModalOpen(true)}
          >
            <span className={styles.locationIcon}>
              <img src={LocationIcon} alt="" /> Your locations
            </span>
            <a href="#" className={styles.addLinkLocation}>
              + Add a location
            </a>
          </div>
           {selectedService?.primaryService != selectedService?.id && <div
            className={styles.locations}
            
          >
            <span className={styles.locationIcon}>
              Make this service as primary
            </span>
            <button className={styles.addUpdateLocation} onClick={handleUpdateService}>
             Update
            </button>
          </div>}
          <div className={styles.rangerBox}>
            <div className={styles.ranger}>
          
              {serviceWiseData?.map((item, idx) => (
                <div className={styles.mainBox}>
                <div>
                {item?.type === "Distance" ? <div className={styles.range} key={idx}>
                  <span>
                    <img src={TickIcon} alt="" /> Within
                  </span>{" "}
                  <span>
                    {/* <p className=""><b>{item?.miles} miles </b> of <b>{item?.postcode ? item?.postcode : item?.city}</b> </p> */}
                  <strong>{item?.miles} miles {" "}</strong> of{" "}
                  <strong>{item?.postcode ? item?.postcode : item?.city}</strong></span>
                </div> : item?.type === "Travel Time" ?  <div className={styles.range} key={idx}> <span>
                    <img src={TickIcon} alt="" /> {" "} Within
                  </span>{" "}
                  <div>
                  <strong>{item?.travel_by} {item?.travel_time}</strong> of{" "}
                  <strong>{item?.postcode ? item?.postcode : item?.city}</strong></div></div> : item?.type === "Draw on Map"  ? <div className={styles.range} key={idx}> <span>
                    <img src={TickIcon} alt="" />  Draws area near
                  </span>{" "}
                  <div>
                  <strong>{item?.city}</strong> of{" "}
                  <strong>{item?.postcode ? item?.postcode : item?.city}</strong></div> </div> : item?.nation_wide === 0 ? <div className={styles.range} key={idx}>
                  <span>
                    <img src={TickIcon} alt="" /> Within
                  </span>{" "}
                  <div>
                  <strong>{item?.miles} miles</strong> of{" "}
                  <strong>{item?.postcode ? item?.postcode : item?.city}</strong></div>
                </div>  : item?.nation_wide === 1 ?  <p style={{marginTop:"18px"}}>
                <label style={{color:"black",fontSize:"14px"}}> 
                <img src={TickIcon} alt="" />   Nationwide</label>
                                  </p>  : ""}
                                  </div>
                                  <div>
                                    {item?.type=='Distance'? <a href="#" className={styles.addLocation} onClick={() => handleExpandRadius(item)}>
              {/* Change Your Radius */} Expand Radius
            </a>:null}
                                  </div>
                </div>
              ))}
            </div>

           {/* {serviceWiseData?.map((item)=> {return <>
           
           </>})} */}
          </div>

          
        </div>

        <div className={styles.footer}>
          <button
            className={styles.removeService}
            onClick={handleRemoveModal}
            disabled={leadPreferenceLoader}
          >
            <img src={TrashIcon} alt="" /> Remove this service
          </button>
          <button className={styles.saveButton} onClick={handleSubmitData}>
            {leadPreferenceLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      {isLocationModalOpen && (
        <LocationModal
          open={isLocationModalOpen}
          // isEditing={isEditingLocation}
          locationData={locationData}
          onChange={handleLocationChange}
          onClose={() => {
            setIsLocationModalOpen(false);
            setIsEditingLocation(false);
            setEditLocationId(null);
            setLocationData({ miles1: "", postcode: "" });
          }}
          onNext={handleNext}
        />
      )}
      {show && (
        <RemoveServiceModal
          open={show}
          onCancel={onHandleCancel}
          onConfirm={handleRemove}
          loading={removeLoader}
          serviceName={selectedService?.name}
        />
      )}
      {isNextModalOpen && (
        <ServiceSelectionModal
          isOpen={isNextModalOpen}
          onClose={() => setIsNextModalOpen(false)}
          onConfirm={handleConfirm}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      )}
    </>
  );
};

export default CustomerQuestions;
