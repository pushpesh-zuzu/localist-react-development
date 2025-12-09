import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";
import CookiesConsentPreference from "./CookiesConsentPreference";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userConsent = localStorage.getItem("user-consent");

    if (!userConsent) {
      setTimeout(() => {
        setShowBanner(true);
      }, 6000);
    }

    window.uetq = window.uetq || [];
    window.uetq.push("consent", "default", { ad_storage: "denied" });
  }, []);

  const handleAcceptAll = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user-consent", "granted");
    window.uetq.push("consent", "update", { ad_storage: "granted" });
    setShowBanner(false);
    setShowPreferences(false);
  };

  // Save Preferences
  const handleSavePreferences = ({ essential, nonEssential }) => {
    const finalValue = nonEssential ? "granted" : "denied";
    if (typeof window === "undefined") return;
    localStorage.setItem("user-consent", finalValue);
    window.uetq.push("consent", "update", { ad_storage: finalValue });

    setShowPreferences(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className={styles.overlay} />

      <div className={`${styles.container} ${showBanner ? styles.show : ""}`}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <h3 className={styles.title}>
                Tailor my experience with cookies
              </h3>
              <p className={styles.text}>
                Localists uses cookies and similar technologies to personalise
                my experience, serve me relevant content, and improve Localists
                products and services. By clicking ‘Accept’ I agree to this, as
                further described in the Localists Cookie Policy. I can reject
                non-essential cookies by clicking ‘Manage Preferences’.
                {/* <a 
                  href="http://localists.com/en/gb/cookie-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Localists Cookie Policy
                </a>
                . */}
              </p>
            </div>

            <div className={styles.rightSection}>
              <button onClick={handleAcceptAll} className={styles.acceptButton}>
                Accept All Cookies
              </button>

              <button
                onClick={() => setShowPreferences(true)}
                className={styles.rejectButton}
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showPreferences && (
        <CookiesConsentPreference
          onClose={() => setShowPreferences(false)}
          onSave={handleSavePreferences}
        />
      )}
    </>
  );
};

export default CookieConsent;
