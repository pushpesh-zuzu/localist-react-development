// src/utils/geo.js
import { useEffect, useState } from "react";

export async function getUserCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_code.toLowerCase(); // e.g. "in", "gb"
  } catch (error) {
    console.error("Geo lookup failed:", error);
    return "in"; // fallback to India as requested
  }
}

export function getUserLanguage() {
  // Detect browser language (optional)
  const lang = typeof navigator !== "undefined" && navigator.language
    ? navigator.language.split("-")[0] // e.g. "en"
    : "en";
  return lang || "en";
}

export function useUserGeo(defaultCountry = "in", defaultLang = "en") {
  const [country, setCountry] = useState(defaultCountry);
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    async function fetchGeo() {
      try {
        const detectedCountry = await getUserCountry();
        setCountry(detectedCountry);
      } catch {
        setCountry(defaultCountry);
      }

      const detectedLang = getUserLanguage();
      setLang(detectedLang);
    }

    fetchGeo();
  }, [defaultCountry, defaultLang]);

  return { country, lang };
}

