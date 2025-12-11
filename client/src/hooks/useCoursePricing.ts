import { useState, useEffect } from "react";
import { useCurrency } from "@/lib/currencyContext";
import {
  fetchCoursePricing,
  getCourseName,
  type CoursePricing,
} from "@/lib/pricing";

/**
 * Hook to fetch and manage course pricing based on selected country
 */
export function useCoursePricing(courseId: string) {
  const { country } = useCurrency();
  const [pricing, setPricing] = useState<CoursePricing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !country) {
      setPricing(null);
      return;
    }

    const loadPricing = async () => {
      setLoading(true);
      setError(null);

      try {
        const coursePricing = await fetchCoursePricing(courseId, country);
        setPricing(coursePricing);
        
        if (!coursePricing) {
          setError(`Pricing not found for ${getCourseName(courseId)} in ${country}`);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load pricing");
        setPricing(null);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, [courseId, country]);

  return { pricing, loading, error };
}

