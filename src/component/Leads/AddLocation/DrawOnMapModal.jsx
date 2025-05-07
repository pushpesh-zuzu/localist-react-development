
import React, { useEffect, useRef, useState } from "react";
import styles from "./DrawOnMapModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const DrawOnMapModal = ({ onClose }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Load Google Maps API if not already loaded
    const loadGoogleMapsScript = () => {
      if (!window.google || !window.google.maps || !window.google.maps.drawing) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places,drawing,geometry&callback=initMap";
        script.async = true;
        script.defer = true;
        
        // Define the callback globally
        window.initMap = () => {
          if (mapRef.current) {
            initializeMap();
          }
        };
        
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const center = { lat: 20.5937, lng: 78.9629 }; // Center of India
      const mapOptions = {
        center,
        zoom: 5,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      };
      
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      
      // Initialize DrawingManager but don't activate it yet
      const manager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null, // Start with no drawing mode active
        drawingControl: false, // Hide the default drawing controls
        polygonOptions: {
          fillColor: "#4285F4",
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeColor: "#4285F4",
          clickable: true,
          editable: false,
          zIndex: 1,
        },
      });
      
      setDrawingManager(manager);
      
      // Add listener for polygon completion
      window.google.maps.event.addListener(manager, "overlaycomplete", (event) => {
        if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
          const polygon = event.overlay;
          
          // Add this polygon to our state
          setPolygons((prev) => [...prev, polygon]);
          
          // Extract coordinates
          const path = polygon.getPath();
          const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
            const point = path.getAt(i);
            return { lat: point.lat(), lng: point.lng() };
          });
          
          console.log("Polygon coordinates:", coordinates);
          
          // Turn off drawing mode after completion
          manager.setDrawingMode(null);
          setIsDrawingActive(false);
        }
      });
    };

    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
      }
      if (polygons.length > 0) {
        polygons.forEach(polygon => polygon.setMap(null));
      }
    };
  }, []);
  
  // Setup map click listener when edit mode or map changes
  useEffect(() => {
    if (!map) return;
    
    // Create a click listener for polygon selection
    const clickListener = window.google.maps.event.addListener(map, 'click', (event) => {
      // If we're not in edit mode, don't do anything
      if (!isEditMode) return;
      
      let polygonClicked = false;
      
      // Check if the click is on a polygon
      for (let i = 0; i < polygons.length; i++) {
        try {
          // First check using point in polygon (if geometry library is available)
          if (window.google.maps.geometry && window.google.maps.geometry.poly) {
            if (window.google.maps.geometry.poly.containsLocation(event.latLng, polygons[i])) {
              selectPolygon(i);
              polygonClicked = true;
              break;
            }
          } else {
            // Fallback: use bounds checking (less accurate but works without geometry library)
            const bounds = new window.google.maps.LatLngBounds();
            const path = polygons[i].getPath();
            path.forEach(point => bounds.extend(point));
            
            if (bounds.contains(event.latLng)) {
              selectPolygon(i);
              polygonClicked = true;
              break;
            }
          }
        } catch (error) {
          console.error("Error checking polygon:", error);
          continue;
        }
      }
      
      // If click wasn't on a polygon, deselect current polygon
      if (!polygonClicked && selectedPolygonIndex !== null) {
        deselectPolygon();
      }
    });
    
    // Cleanup listener on unmount or when dependencies change
    return () => {
      window.google.maps.event.removeListener(clickListener);
    };
  }, [map, isEditMode, polygons, selectedPolygonIndex]);
  
  // Make each polygon clickable when created
  useEffect(() => {
    polygons.forEach((polygon, index) => {
      // Add click listener to each polygon
      window.google.maps.event.clearListeners(polygon, 'click');
      
      window.google.maps.event.addListener(polygon, 'click', () => {
        if (isEditMode) {
          selectPolygon(index);
        }
      });
    });
  }, [polygons, isEditMode]);

  // Function to check if a location is on a polygon
  const isLocationOnPolygon = (location, polygon) => {
    try {
      // First check if the geometry library is loaded
      if (!window.google.maps.geometry || !window.google.maps.geometry.poly) {
        console.error("Google Maps Geometry library not loaded");
        return false;
      }
      
      return window.google.maps.geometry.poly.containsLocation(location, polygon);
    } catch (error) {
      console.error("Error checking if location is on polygon:", error);
      return false;
    }
  };
  
  // Function to select a polygon for editing or removal
  const selectPolygon = (index) => {
    // First deselect any currently selected polygon
    deselectPolygon();
    
    // Then select the new one
    setSelectedPolygonIndex(index);
    
    // Make the polygon editable
    polygons[index].setOptions({
      editable: true,
      fillColor: "#FF5722", // Change color to indicate selection
      strokeColor: "#FF5722"
    });
  };
  
  // Function to deselect the currently selected polygon
  const deselectPolygon = () => {
    if (selectedPolygonIndex !== null && polygons[selectedPolygonIndex]) {
      polygons[selectedPolygonIndex].setOptions({
        editable: false,
        fillColor: "#4285F4",
        strokeColor: "#4285F4"
      });
      setSelectedPolygonIndex(null);
    }
  };
  
  const handleAddArea = () => {
    if (!map || !drawingManager) {
      console.error("Map or drawing manager not initialized");
      return;
    }
    
    // Exit edit mode if it was active
    if (isEditMode) {
      setIsEditMode(false);
      deselectPolygon();
    }

    // Set the drawing manager on the map
    drawingManager.setMap(map);
    drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
    setIsDrawingActive(true);
    
    // Show instructions to the user
    console.log("Click on the map to start drawing a polygon");
  };
  
  // Handle Edit Area Mode
  const handleEditAreaMode = () => {
    setIsEditMode(!isEditMode);
    
    if (isEditMode) {
      // Exiting edit mode, deselect any polygon
      deselectPolygon();
    } else {
      // Entering edit mode
      if (drawingManager) {
        drawingManager.setDrawingMode(null);
        drawingManager.setMap(null);
      }
      setIsDrawingActive(false);
      
      // Show instruction to the user
      console.log("Click on a polygon to edit it");
    }
  };

  const handleRemoveArea = () => {
    if (polygons.length === 0) return;

    if (selectedPolygonIndex !== null) {
      // Remove the selected polygon
      polygons[selectedPolygonIndex].setMap(null);
      
      // Update state
      setPolygons(prevPolygons => 
        prevPolygons.filter((_, index) => index !== selectedPolygonIndex)
      );
      
      // Reset selection
      setSelectedPolygonIndex(null);
    } else {
      // If no polygon is selected, remove the last one
      const lastPolygon = polygons[polygons.length - 1];
      lastPolygon.setMap(null);
      
      // Update state
      setPolygons(prevPolygons => prevPolygons.slice(0, -1));
    }
    
    // Exit edit mode if it was active
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const handleSubmit = () => {
    // Collect all polygon coordinates
    const allPolygonData = polygons.map(polygon => {
      const path = polygon.getPath();
      return Array.from({ length: path.getLength() }, (_, i) => {
        const point = path.getAt(i);
        return { lat: point.lat(), lng: point.lng() };
      });
    });
    
    console.log("All polygons data:", allPolygonData);
    
    // Here you would send the data to your backend
    // sendToBackend(allPolygonData);
    
    // Close modal
    onClose();
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
            <img src={iIcon} alt="Info" />
          </span>
          You can add multiple drawn areas to define the specific places you
          provide services.
        </p>

        <div className={styles.areaButtonGroup}>
          <button 
            className={`${styles.areaButton} ${isDrawingActive ? styles.activeButton : ''}`} 
            onClick={handleAddArea}
            disabled={isEditMode}
          >
            + Add new area
          </button>
          <button 
            className={`${styles.areaButton} ${isEditMode ? styles.activeButton : ''}`}
            onClick={handleEditAreaMode}
            disabled={polygons.length === 0}
          >
            🖉 Edit an area
          </button>
          <button 
            className={styles.areaButton} 
            onClick={handleRemoveArea}
            disabled={polygons.length === 0}
          >
            ⬤ Remove an area {selectedPolygonIndex !== null ? '(Selected)' : ''}
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
          <button 
            className={styles.nextButton} 
            onClick={handleSubmit}
            disabled={polygons.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawOnMapModal;