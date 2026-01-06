// Geolocation service - Detects user's country based on IP address
// Uses ipapi.co free API for IP-based geolocation

interface GeolocationResponse {
  country_name: string;
  country_code: string;
  city?: string;
}

// Map API country names to our app's country names
// Includes all variations that the API might return
const countryNameMap: Record<string, string> = {
  "United States": "USA",
  "United States of America": "USA",
  "USA": "USA",
  "US": "USA",
  "United Kingdom": "UK",
  "UK": "UK",
  "Great Britain": "UK",
  "Britain": "UK",
  "India": "India",
};

// Map country codes (ISO 3166-1 alpha-2) to our app's country names
const countryCodeMap: Record<string, string> = {
  "US": "USA",
  "IN": "India",
  "GB": "UK",
};

/**
 * Detect user's country based on IP address
 * Returns the country name that matches our app's country list, or null if not found/error
 * Priority: country_name mapping > country_code mapping > null
 */
export async function detectCountryFromIP(): Promise<string | null> {
  try {
    // Using ipapi.co free API (no API key required for basic usage)
    // Alternative: ip-api.com or ipgeolocation.io
    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.warn("Geolocation API request failed:", response.status);
      return null;
    }

    const data: GeolocationResponse = await response.json();
    
    let mappedCountry: string | null = null;

    // First, try to map by country name
    if (data.country_name) {
      mappedCountry = countryNameMap[data.country_name] || null;
    }

    // If country name mapping failed, try country code as fallback
    if (!mappedCountry && data.country_code) {
      mappedCountry = countryCodeMap[data.country_code.toUpperCase()] || null;
    }

    // Only return if the country is mapped and available in our app
    // This ensures we only return one of the 3 supported countries: India, USA, UK
    if (!mappedCountry) {
      // Country not in our supported list - return null
      console.log(`Country not supported: ${data.country_name} (${data.country_code})`);
      return null;
    }
    
    // Verify the mapped country is in the allowed list (double-check for safety)
    const allowedCountries = ["India", "USA", "UK"];
    if (!allowedCountries.includes(mappedCountry)) {
      return null;
    }
    
    console.log(`Country detected from IP: ${mappedCountry} (from ${data.country_name || data.country_code})`);
    return mappedCountry;
  } catch (error) {
    // Silently fail - don't break the app if geolocation fails
    console.warn("Geolocation detection failed:", error);
    return null;
  }
}

/**
 * Get user's city from IP address (optional, for future use)
 */
export async function detectCityFromIP(): Promise<string | null> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: GeolocationResponse = await response.json();
    return data.city || null;
  } catch (error) {
    console.warn("City detection failed:", error);
    return null;
  }
}

