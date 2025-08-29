// src/utils/geo.js
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
