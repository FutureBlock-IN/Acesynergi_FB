// CurrencyContext - Provides country/city/currency selection across the app
// Used by Header for selection and Schedule page for price formatting
// Persists selection to localStorage for session continuity

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { 
  formatPrice as formatPriceUtil, 
  getCurrencyCode, 
  getCitiesForCountry,
  getAvailableCountries 
} from "./currency";
import { detectCountryFromIP } from "./geolocation";

// Storage keys for localStorage persistence
const STORAGE_KEY_COUNTRY = "acesynergi_country";
const STORAGE_KEY_CITY = "acesynergi_city";

interface CurrencyContextType {
  country: string;
  city: string;
  currencyCode: string;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setLocation: (country: string, city: string) => void;
  formatPrice: (amountInUSD: number) => string;
  getCities: () => string[];
  getCountries: () => string[];
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [country, setCountryState] = useState<string>("");
  const [city, setCityState] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load from localStorage on mount, then auto-detect country if not set
  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem(STORAGE_KEY_COUNTRY) || "";
      const savedCity = localStorage.getItem(STORAGE_KEY_CITY) || "";
      if (savedCountry) {
        setCountryState(savedCountry);
        console.log(`Loaded saved country from localStorage: ${savedCountry}`);
      }
      if (savedCity) {
        setCityState(savedCity);
      }
      
      // Auto-detect country from IP if no saved country
      if (!savedCountry) {
        console.log("No saved country found, detecting from IP address...");
        detectCountryFromIP()
          .then((detectedCountry) => {
            if (detectedCountry) {
              // Verify the detected country is in our available countries list
              const availableCountries = getAvailableCountries();
              if (availableCountries.includes(detectedCountry)) {
                setCountryState(detectedCountry);
                console.log(`Country auto-detected and set: ${detectedCountry}`);
              } else {
                console.warn(`Detected country ${detectedCountry} is not in available countries list`);
              }
            } else {
              console.log("Could not detect country from IP address");
            }
          })
          .catch((error) => {
            // Silently fail - don't break the app if geolocation fails
            console.warn("Auto-detection of country failed:", error);
          });
      }
    } catch (e) {
      // localStorage not available
      console.warn("localStorage not available:", e);
    }
    setIsInitialized(true);
  }, []);
  
  // Persist to localStorage whenever country or city changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (country) {
        localStorage.setItem(STORAGE_KEY_COUNTRY, country);
      } else {
        localStorage.removeItem(STORAGE_KEY_COUNTRY);
      }
    } catch (e) {
      // localStorage not available
    }
  }, [country, isInitialized]);
  
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (city) {
        localStorage.setItem(STORAGE_KEY_CITY, city);
      } else {
        localStorage.removeItem(STORAGE_KEY_CITY);
      }
    } catch (e) {
      // localStorage not available
    }
  }, [city, isInitialized]);
  
  // Derived currency code from country
  const currencyCode = country ? getCurrencyCode(country) : "USD";
  
  // Set country and reset city
  const setCountry = useCallback((newCountry: string) => {
    setCountryState(newCountry);
    setCityState(""); // Reset city when country changes
  }, []);
  
  // Set city directly
  const setCity = useCallback((newCity: string) => {
    setCityState(newCity);
  }, []);
  
  // Set both country and city at once
  const setLocation = useCallback((newCountry: string, newCity: string) => {
    setCountryState(newCountry);
    setCityState(newCity);
  }, []);
  
  // Format price using current currency (defaults to USD if no country selected)
  const formatPrice = useCallback((amountInUSD: number): string => {
    if (!country) {
      // Default to USD formatting when no country selected
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amountInUSD);
    }
    return formatPriceUtil(amountInUSD, country);
  }, [country]);
  
  // Get cities for current country
  const getCities = useCallback((): string[] => {
    return getCitiesForCountry(country);
  }, [country]);
  
  // Get all available countries
  const getCountries = useCallback((): string[] => {
    return getAvailableCountries();
  }, []);
  
  const value: CurrencyContextType = {
    country,
    city,
    currencyCode,
    setCountry,
    setCity,
    setLocation,
    formatPrice,
    getCities,
    getCountries,
  };
  
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

// Export a hook that provides safe defaults when context is not available
export function useCurrencySafe(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  
  // Return safe defaults if context is not available
  if (!context) {
    return {
      country: "",
      city: "",
      currencyCode: "USD",
      setCountry: () => {},
      setCity: () => {},
      setLocation: () => {},
      formatPrice: (amount: number) => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount),
      getCities: () => [],
      getCountries: () => [],
    };
  }
  
  return context;
}
