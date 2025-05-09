import React, { useEffect, useRef, useState } from "react";
import styles from "./TravelTimeModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const TravelTimeModal = ({ onClose,onNext,locationData,setLocationData }) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  // const [locationData, setLocationData] = useState({
  //   postcode: "",
  //   travel_time: "30 minutes",
  //   travel_by: "Driving",
  // });

  const calculateTravelRadius = (time, mode) => {
    const speedMap = {
      Driving: 800,
      "Public Transport": 400,
      Biking: 250,
      Walking: 80,
    };

    let minutes = 30;
    if (time === "1 hour") minutes = 60;
    if (time === "1.5 hours") minutes = 90;
    if (time === "2 hours") minutes = 120;

    return speedMap[mode] * minutes;
  };

  const drawCircle = (center) => {
    if (!window.google || !mapInstance.current) return;

    const radiusInMeters = calculateTravelRadius(
      locationData?.travel_time,
      locationData?.travel_by
    );

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    circleRef.current = new window.google.maps.Circle({
      center,
      radius: radiusInMeters,
      fillColor: "#4285F4",
      fillOpacity: 0.15,
      strokeColor: "#4285F4",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      map: mapInstance.current,
    });

    mapInstance.current.fitBounds(circleRef.current.getBounds());
  };

  const updateMarkerAndCircle = () => {
    if (!mapInstance.current) return;

    // Update marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new window.google.maps.Marker({
      position: mapCenter,
      map: mapInstance.current,
    });

    // Update circle
    drawCircle(mapCenter);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,geometry";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
          initMap();
          initAutocomplete();
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
        initMap();
        initAutocomplete();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });

      if (locationData?.postcode && mapCenter.lat !== 20.5937) {
        updateMarkerAndCircle();
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
        let placeName = place.formatted_address || place.name || "";
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });
        const cityName = place.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;
      

        if (lat && lng) {
          const finalLocation = postalCode || placeName;
          setMapCenter({ lat, lng });
          setLocationData((prev) => ({
            ...prev,
            postcode: finalLocation,
            city: cityName || "",
          }));

          setTimeout(() => {
            mapInstance.current?.setCenter({ lat, lng });
            mapInstance.current?.setZoom(12);
            updateMarkerAndCircle();
          }, 100);
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (mapLoaded && locationData?.postcode && mapCenter.lat !== 20.5937) {
      updateMarkerAndCircle();
    }
  }, [locationData?.travel_time, locationData?.travel_by]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    console.log("Form submitted with data:", locationData);
    onNext(locationData)
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Travel time</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>
          Enter a Postcode or town, the maximum time you'd spend travelling, and
          the mode of transport you'd use.
        </p>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Postcode / City</label>
            <input
              ref={inputRef}
              type="text"
              name="postcode"
              value={locationData?.postcode}
              onChange={onChange}
              placeholder="Enter postcode or city"
              autoComplete="off"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Travel time</label>
            <select
              name="travel_time"
              value={locationData?.travel_time}
              onChange={onChange}
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Travelling by</label>
            <select
              name="travel_by"
              value={locationData?.travel_by}
              onChange={onChange}
            >
              <option value="Driving">Driving</option>
              <option value="Walking">Walking</option>
              <option value="Biking">Biking</option>
              <option value="Public Transport">Public Transport</option>
            </select>
          </div>
        </div>

        <div
          ref={mapRef}
          className={styles.mapContainer}
          style={{
            width: "100%",
            height: "250px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {!mapLoaded && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Loading map...
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelTimeModal;
