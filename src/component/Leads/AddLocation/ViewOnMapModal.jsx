import { useEffect, useRef, useState } from "react";
import styles from "./ViewOnMapModal.module.css";
import { googleAPI } from "../../../Api/axiosInstance";

const ViewOnMapModal = ({ open, locationData, onClose }) => {
  console.log("hseewygryrgyergfryyt");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 52.6358,
    lng: -1.1396,
  });

  const drawCircle = (center) => {
    if (!window.google || !mapInstance.current) return;

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    const radiusInMeters = (parseFloat(locationData.miles1) || 1) * 1609.34;

    circleRef.current = new window.google.maps.Circle({
      center,
      radius: radiusInMeters,
      fillColor: "#007BFF",
      fillOpacity: 0.2,
      strokeColor: "#007BFF",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      map: mapInstance.current,
    });

    const bounds = circleRef.current.getBounds();
    if (bounds) {
      mapInstance.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // console.log("jhdygygfygfygfgy");
      if (!window.google) {
        const script = document.createElement("script");

        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
          initMap();
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 10,
      });
    };

    loadGoogleMapsScript();
  }, [open]);

  useEffect(() => {
    const fetchLatLng = async () => {
      if (!mapLoaded || !window.google || !mapInstance.current) return;

      let newCenter;

      if (locationData.type === "Nationwide" && locationData.nation_wide == 1) {
        newCenter = { lat: 22.9734, lng: 78.6569 };
      }

      // else if (locationData?.postcode) {
      //   try {
      //     const coords = await getLatLngFromPincode(locationData.postcode);
      //     console.log(coords, locationData.postcode);
      //     newCenter = { lat: coords.lat, lng: coords.lng };
      //   } catch (error) {
      //     console.error("Error fetching location:", error);
      //     return;
      //   }
      // }

      if (newCenter) {
        setMapCenter(newCenter);
        mapInstance.current.setCenter(newCenter);
        mapInstance.current.setZoom(
          locationData.type === "Nationwide" && locationData.nation_wide == 1
            ? 2
            : 12
        );

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.google.maps.Marker({
          position: newCenter,
          map: mapInstance.current,
        });

        drawCircle(newCenter);
      }
    };

    fetchLatLng();
  }, [mapLoaded, locationData?.postcode, locationData?.type]);

  useEffect(() => {
    if (mapLoaded && locationData.postcode && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          address: locationData.postcode,
          componentRestrictions: { country: "UK" },
        },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const newCenter = { lat, lng };
            setMapCenter(newCenter);

            if (mapInstance.current) {
              mapInstance.current.setCenter(newCenter);
              mapInstance.current.setZoom(12);

              if (markerRef.current) markerRef.current.setMap(null);

              markerRef.current = new window.google.maps.Marker({
                position: newCenter,
                map: mapInstance.current,
              });

              drawCircle(newCenter);
            }
          }
        }
      );
    }
  }, [open, mapLoaded, locationData.postcode, locationData]);

  useEffect(() => {
    if (mapLoaded && mapCenter.lat !== 20.5937) {
      drawCircle(mapCenter);
    }
  }, [locationData.miles1, mapLoaded]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalHeader}>
          <h2>
            {locationData.type === "Nationwide" && locationData.nation_wide == 1
              ? locationData?.type
              : locationData?.city}
          </h2>
        </div>
        <div
          ref={mapRef}
          className={styles.mapContainer}
          style={{
            width: "100%",
            height: "250px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        />

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOnMapModal;
