// import React, { useEffect, useRef } from "react";
// import styles from "./LocationModal.module.css";
// import { showToast } from "../../utils";
// import iIcon from "../../assets/Images/iIcon.svg";

// const LocationModal = ({
//   open,
//   isEditing,
//   locationData,
//   onChange,
//   onCancel,
//   onNext,
// }) => {
//   const inputRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;

//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places";
//         script.async = true;
//         script.defer = true;
//         script.onload = initAutocomplete;
//         document.body.appendChild(script);
//       } else {
//         initAutocomplete();
//       }
//     };

//     const initAutocomplete = () => {
//       if (!inputRef.current) return;

//       const autocomplete = new window.google.maps.places.Autocomplete(
//         inputRef.current,
//         {
//           types: ["geocode"],
//           componentRestrictions: { country: "IN" },
//         }
//       );

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         if (!place.address_components) return;

//         let postalCode = "";
//         let lat = place.geometry?.location?.lat();
//         let lng = place.geometry?.location?.lng();

//         place.address_components.forEach((component) => {
//           if (component.types.includes("postal_code")) {
//             postalCode = component.long_name;
//           }
//         });

//         if (postalCode) {
//           onChange({ target: { name: "postcode", value: postalCode } });
//           inputRef.current.value = postalCode;

//           if (mapRef.current && lat && lng) {
//             const map = new window.google.maps.Map(mapRef.current, {
//               center: { lat, lng },
//               zoom: 12,
//             });

//             new window.google.maps.Marker({
//               position: { lat, lng },
//               map,
//             });
//           }
//         } else {
//           showToast("No PIN code found! Please try again.");
//         }
//       });
//     };

//     loadGoogleMapsScript();
//   }, [open, onChange]);

//   if (!open) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>
//           <h2>Distance</h2>
//           <button className={styles.closeButton} onClick={onCancel}>
//             &times;
//           </button>
//         </div>

//         <div className={styles.infoBox}>
//           <img src={iIcon} alt="" />
//           <span>Enter a ZIP code or town and the distance around it.</span>
//         </div>

//         <div className={styles.inputRow}>
//           <div className={styles.inputField}>
//             <label>ZIP Code / City</label>
//             <input
//               ref={inputRef}
//               type="text"
//               name="postcode"
//               value={locationData.postcode}
//               onChange={onChange}
//               placeholder="Enter ZIP or City"
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label>Distance</label>
//             <select
//               name="miles1"
//               value={locationData.miles1}
//               onChange={onChange}
//             >
//               <option value="1">1 mile</option>
//               <option value="5">5 miles</option>
//               <option value="10">10 miles</option>
//               <option value="30">30 miles</option>
//               <option value="50">50 miles</option>
//               <option value="100">100 miles</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.modalFooter}>
//           <button className={styles.cancelBtn} onClick={onCancel}>
//             Cancel
//           </button>
//           <button className={styles.nextBtn} onClick={onNext}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationModal;

import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationModal.module.css";
import { showToast } from "../../utils";
import iIcon from "../../assets/Images/iIcon.svg";

const LocationModal = ({
  open,
  isEditing,
  locationData,
  onChange,
  onCancel,
  onNext,
}) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937, // Default center (India)
    lng: 78.9629,
  });

  useEffect(() => {
    if (!open) return;

    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
          initAutocomplete();
          initMap();
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
        initAutocomplete();
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });

      // Add a marker if we have a specific location
      if (locationData.postcode && mapCenter.lat !== 20.5937) {
        new window.google.maps.Marker({
          position: mapCenter,
          map,
        });
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "IN" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        let postalCode = "";
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        if (postalCode) {
          onChange({ target: { name: "postcode", value: postalCode } });
          inputRef.current.value = postalCode;

          if (lat && lng) {
            setMapCenter({ lat, lng });
            
            if (mapRef.current) {
              const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom: 12,
              });

              new window.google.maps.Marker({
                position: { lat, lng },
                map,
              });
            }
          }
        } else {
          showToast("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [open, onChange, locationData.postcode, mapCenter]);

  // If a postcode is already set when opening the modal, try to geocode it
  useEffect(() => {
    if (open && mapLoaded && locationData.postcode && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: locationData.postcode, componentRestrictions: { country: "IN" } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            setMapCenter({ lat, lng });
          }
        }
      );
    }
  }, [open, mapLoaded, locationData.postcode]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Distance</h2>
          <button className={styles.closeButton} onClick={onCancel}>
            &times;
          </button>
        </div>

        <div className={styles.infoBox}>
          <img src={iIcon} alt="" />
          <span>Enter a ZIP code or town and the distance around it.</span>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputField}>
            <label>ZIP Code / City</label>
            <input
              ref={inputRef}
              type="text"
              name="postcode"
              value={locationData.postcode}
              onChange={onChange}
              placeholder="Enter ZIP or City"
            />
          </div>
          <div className={styles.inputField}>
            <label>Distance</label>
            <select
              name="miles1"
              value={locationData.miles1}
              onChange={onChange}
            >
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="30">30 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
          </div>
        </div>

        {/* Google Map Container */}
        <div 
          ref={mapRef} 
          className={styles.mapContainer}
          style={{ width: "100%", height: "250px", marginTop: "20px", borderRadius: "8px" }}
        />

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.nextBtn} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;