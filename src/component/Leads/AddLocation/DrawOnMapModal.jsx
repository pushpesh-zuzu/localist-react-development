// import React, { useEffect, useRef, useState } from "react";
// import styles from "./DrawOnMapModal.module.css";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const DrawOnMapModal = ({ onClose }) => {
//   const mapRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [drawingManager, setDrawingManager] = useState(null);
//   const [polygons, setPolygons] = useState([]);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,drawing";
//         script.async = true;
//         script.defer = true;
//         script.onload = () => initMap();
//         document.body.appendChild(script);
//       } else {
//         initMap();
//       }
//     };

//     const initMap = () => {
//       const center = { lat: 20.5937, lng: 78.9629 };
//       const gMap = new window.google.maps.Map(mapRef.current, {
//         center,
//         zoom: 5,
//       });
//       setMap(gMap);
//     };

//     loadGoogleMapsScript();
//   }, []);

//   const handleAddArea = () => {
//     if (!map || !window.google) return;

//     const drawing = new window.google.maps.drawing.DrawingManager({
//       drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
//       drawingControl: false,
//       polygonOptions: {
//         fillColor: "#4285F4",
//         fillOpacity: 0.3,
//         strokeWeight: 2,
//         clickable: false,
//         editable: false,
//         zIndex: 1,
//       },
//     });

//     drawing.setMap(map);
//     setDrawingManager(drawing);

//     window.google.maps.event.addListener(drawing, "overlaycomplete", (event) => {
//       if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
//         setPolygons((prev) => [...prev, event.overlay]);
//         drawing.setDrawingMode(null);
//         drawing.setMap(null); // disable after drawing
//       }
//     });
//   };

//   const handleRemoveArea = () => {
//     if (polygons.length === 0) return;

//     // Remove last polygon
//     const lastPolygon = polygons[polygons.length - 1];
//     lastPolygon.setMap(null);

//     setPolygons((prev) => prev.slice(0, -1));
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContainer}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>

//         <h2 className={styles.title}>Draw on a map</h2>

//         <p className={styles.description}>
//           <span className={styles.infoIcon}>
//             <img src={iIcon} alt="" />
//           </span>
//           You can add multiple drawn areas to define the specific places you
//           provide services.
//         </p>

//         <div className={styles.areaButtonGroup}>
//           <button className={styles.areaButton} onClick={handleAddArea}>
//             + Add new area
//           </button>
//           <button className={styles.areaButton} disabled>
//             🖉 Edit an area
//           </button>
//           <button className={styles.areaButton} onClick={handleRemoveArea}>
//             ⬤ Remove an area
//           </button>
//         </div>

//         <div
//           ref={mapRef}
//           style={{ width: "100%", height: "400px", margin: "16px 0" }}
//         ></div>

//         <div className={styles.buttonContainer}>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button className={styles.nextButton}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawOnMapModal;

import React, { useEffect, useRef, useState } from "react";
import styles from "./DrawOnMapModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const DrawOnMapModal = ({ onClose }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,drawing";
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const center = { lat: 20.5937, lng: 78.9629 };
      const gMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 5,
      });
      setMap(gMap);
    };

    loadGoogleMapsScript();
  }, []);

  const handleAddArea = () => {
    if (!map || !window.google) return;

    const drawing = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        fillColor: "#4285F4",
        fillOpacity: 0.3,
        strokeWeight: 2,
        clickable: false,
        editable: false,
        zIndex: 1,
      },
    });

    drawing.setMap(map);
    setDrawingManager(drawing);

    window.google.maps.event.addListener(drawing, "overlaycomplete", (event) => {
      if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
        const polygon = event.overlay;
        setPolygons((prev) => [...prev, polygon]);

        // Get the path (latitudes and longitudes) of the polygon
        const path = polygon.getPath();
        const coordinates = path.getArray().map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

        // Store and print the coordinates to console
        console.log("Coordinates of the polygon:", coordinates);

        // Now you can send this data to your backend when needed
        // Example: sendToBackend(coordinates);

        drawing.setDrawingMode(null);
        drawing.setMap(null); // Disable drawing after adding the polygon
      }
    });
  };

  const handleRemoveArea = () => {
    if (polygons.length === 0) return;

    // Remove last polygon
    const lastPolygon = polygons[polygons.length - 1];
    lastPolygon.setMap(null);

    setPolygons((prev) => prev.slice(0, -1));
  };

  // Example function to send data to backend (you can modify based on your API)
  const sendToBackend = (coordinates) => {
    // Your logic to send data to the backend
    fetch("your-backend-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Backend response:", data))
      .catch((error) => console.error("Error sending data to backend:", error));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Draw on a map</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>
          You can add multiple drawn areas to define the specific places you
          provide services.
        </p>

        <div className={styles.areaButtonGroup}>
          <button className={styles.areaButton} onClick={handleAddArea}>
            + Add new area
          </button>
          <button className={styles.areaButton} disabled>
            🖉 Edit an area
          </button>
          <button className={styles.areaButton} onClick={handleRemoveArea}>
            ⬤ Remove an area
          </button>
        </div>

        <div
          ref={mapRef}
          style={{ width: "100%", height: "400px", margin: "16px 0" }}
        ></div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DrawOnMapModal;
