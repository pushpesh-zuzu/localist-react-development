import React, { useEffect, useRef, useState } from "react";
import styles from "./WhatServiceYouNeed.module.css";
import { getPopularServiceList, searchService, setService } from "../../../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { questionAnswerData } from "../../../../../store/Buyer/BuyerSlice";

const WhatServiceYouNeed = ({ nextStep }) => {
  const [Input,setInput] = useState("")
   const [selectedService, setSelectedService] = useState(null);
   const [pincode,setPincode] = useState()
   const {searchServiceLoader,service} = useSelector((state)=>state.findJobs)
  const dispatch = useDispatch()
  const inputRef = useRef(null);
   useEffect(() => {
      return () => {
        dispatch(setService([])); 
        
      };
    }, []);
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (typeof Input === "string" && Input.trim() !== "") {
          dispatch(searchService({ search: Input}));
        }
      }, 500);
  
      return () => clearTimeout(delayDebounce);
    }, [Input, dispatch]);
    const handleSelectService = (item) => {
      setInput(item.id);
      setSelectedService(item);
    };
    const handleContinue = () => {
      const data = {
        service_id:selectedService?.id
      }
        dispatch(questionAnswerData(data))
        nextStep()
    }
   
    
    
      useEffect(() => {
        // Load Google Places API script dynamically
        const loadGoogleMapsScript = () => {
          if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initAutocomplete;
            document.body.appendChild(script);
          } else {
            initAutocomplete();
          }
        };
        const initAutocomplete = () => {
          if (!inputRef.current) return;
      
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            componentRestrictions: { country: "IN" },
          });
      
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;
      
            let postalCode = "";
            place.address_components.forEach((component) => {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name; 
              }
            });
      
            if (postalCode) {
              setPincode(postalCode);
              inputRef.current.value = postalCode; 
            } else {
              alert("No PIN code found! Please try again.");
            }
          });
        };
      
        loadGoogleMapsScript();
      }, []);
      

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What service do you need?</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>What service do you need?</label>
        <input
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
            if (!e.target.value) {
              dispatch(setService([]));
            }
            setSelectedService(null);
          }}
          value={Input}
        />

        {service?.length > 0 && (
          <div className={styles.searchResults}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              <>
                {" "}
                {service?.map((item) => (
                  <p
                    key={item.id}
                    className={styles.searchItem}
                    onClick={() => handleSelectService(item)}
                  >
                    {item.name}
                  </p>
                ))}
              </>
            )}
          </div>
        )}
      
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Where do you need it?</label>
        <input
          type="text"
          placeholder="Enter your ZIP code or town"
          className={styles.input}
          ref={inputRef}
          name="pincode"
          value={pincode || ""}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WhatServiceYouNeed;
