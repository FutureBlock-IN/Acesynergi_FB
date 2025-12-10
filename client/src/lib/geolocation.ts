// Geolocation service - Detects user's country based on IP address
// Uses ipapi.co free API for IP-based geolocation

interface GeolocationResponse {
  country_name: string;
  country_code: string;
  city?: string;
}

// Map API country names to our app's country names
// Only includes countries that are available in the app
const countryNameMap: Record<string, string> = {
  "United States": "USA",
  "United Kingdom": "UK",
  "Canada": "Canada",
  "Australia": "Australia",
  "India": "India",
  "Singapore": "Singapore",
  "France": "France",
  "Germany": "Germany",
  "Japan": "Japan",
  "United Arab Emirates": "UAE",
};

/**
 * Detect user's country based on IP address
 * Returns the country name that matches our app's country list, or null if not found/error
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
    
    if (!data.country_name) {
      return null;
    }

    // Map API country name to our app's country name
    const mappedCountry = countryNameMap[data.country_name];
    
    // Only return if the country is available in our app
    if (!mappedCountry) {
      return null;
    }
    
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

