import { useState, useEffect } from "react";
import { useCurrency } from "@/lib/currencyContext";
import { useCart } from "@/lib/cartContext";
import {
  fetchCoursePricing,
  getTaxBreakdown,
  type CoursePricing,
  type TaxBreakdown,
} from "@/lib/pricing";

/**
 * Hook to fetch pricing for all cart items and calculate taxes
 */
export function useCartPricing() {
  const { items } = useCart();
  const { country } = useCurrency();
  const [pricingData, setPricingData] = useState<Map<string, CoursePricing>>(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country || items.length === 0) {
      setPricingData(new Map());
      return;
    }

    const loadPricing = async () => {
      setLoading(true);
      const pricingMap = new Map<string, CoursePricing>();

      // Fetch pricing for each cart item that has a courseId
      const promises = items
        .filter(item => item.courseId)
        .map(async (item) => {
          try {
            const pricing = await fetchCoursePricing(item.courseId!, country);
            if (pricing) {
              pricingMap.set(item.id, pricing);
            }
          } catch (error) {
            console.error(`Error fetching pricing for ${item.courseId}:`, error);
          }
        });

      await Promise.all(promises);
      setPricingData(pricingMap);
      setLoading(false);
    };

    loadPricing();
  }, [items, country]);

  /**
   * Get tax breakdown for all cart items
   */
  const getTotalTaxBreakdown = (): TaxBreakdown[] => {
    const taxMap = new Map<string, { label: string; amount: number; percent?: number }>();

    items.forEach((item) => {
      const pricing = pricingData.get(item.id);
      if (pricing) {
        const taxes = getTaxBreakdown(pricing);
        taxes.forEach((tax) => {
          const key = tax.label;
          const existing = taxMap.get(key);
          if (existing) {
            taxMap.set(key, {
              ...existing,
              amount: existing.amount + (tax.amount * item.quantity),
            });
          } else {
            taxMap.set(key, {
              label: tax.label,
              amount: tax.amount * item.quantity,
              percent: tax.percent,
            });
          }
        });
      }
    });

    return Array.from(taxMap.values());
  };

  /**
   * Calculate total tax amount
   */
  const getTotalTax = (): number => {
    const breakdown = getTotalTaxBreakdown();
    return breakdown.reduce((sum, tax) => sum + tax.amount, 0);
  };

  return {
    pricingData,
    loading,
    getTotalTaxBreakdown,
    getTotalTax,
  };
}

