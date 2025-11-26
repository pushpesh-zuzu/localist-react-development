import React, { useEffect, useState } from "react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userConsent = localStorage.getItem("user-consent");

    if (!userConsent) {
      setShow(true);
    }
    window.uetq = window.uetq || [];
    window.uetq.push("consent", "default", { ad_storage: "denied" });
  }, []);

  const handleConsent = (value) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("user-consent", value);

    window.uetq = window.uetq || [];
    window.uetq.push("consent", "update", { ad_storage: value });

    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 99998,
        }}
      />

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "350px",
          padding: "15px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 99999,
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "12px", fontSize: "14px" }}>
          We use cookies for analytics and ads.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => handleConsent("granted")}
            style={{
              padding: "8px 14px",
              background: "#00afe3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Accept
          </button>

          <button
            onClick={() => handleConsent("denied")}
            style={{
              padding: "8px 14px",
              background: "rgb(157 148 148)",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
