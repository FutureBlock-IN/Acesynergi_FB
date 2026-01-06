export type CourseId =
  | "pmp"
  | "pmi-acp"
  | "pmipba"
  | "capm"
  | "cbap"
  | "ecba"
  | "ccba";

export type PricingCountry = "India" | "USA" | "UK";

export interface HardcodedCoursePricing {
  courseId: CourseId;
  courseName: string;
  country: PricingCountry;
  currency: "INR" | "USD" | "GBP";
  virtualLearningPrice: number;
  classroomLearningPrice: number;
  selfLearningPrice: number;
}

function key(courseId: string, country: string) {
  return `${courseId}__${country}`;
}

export function normalizePricingCountry(input?: string | null): PricingCountry | null {
  if (!input) return null;
  const c = input.trim().toLowerCase();
  if (c === "india" || c === "in" || c === "ind") return "India";
  if (c === "usa" || c === "us" || c === "united states" || c === "united states of america")
    return "USA";
  if (c === "uk" || c === "united kingdom" || c === "great britain") return "UK";
  return null;
}

export const HARDCODED_COURSE_PRICING: Record<string, HardcodedCoursePricing> = {
  // INDIA (INR)
  [key("pmp", "India")]: {
    courseId: "pmp",
    courseName: "PMP Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 10999,
    classroomLearningPrice: 13999,
    selfLearningPrice: 7999,
  },
  [key("pmi-acp", "India")]: {
    courseId: "pmi-acp",
    courseName: "PMI-ACP Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 14999,
    classroomLearningPrice: 14999,
    selfLearningPrice: 9999,
  },
  [key("pmipba", "India")]: {
    courseId: "pmipba",
    courseName: "PMI PBA Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 14999,
    classroomLearningPrice: 14999,
    selfLearningPrice: 7999,
  },
  [key("capm", "India")]: {
    courseId: "capm",
    courseName: "CAPM Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 10999,
    classroomLearningPrice: 10999,
    selfLearningPrice: 8999,
  },
  [key("cbap", "India")]: {
    courseId: "cbap",
    courseName: "CBAP Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 14999,
    classroomLearningPrice: 14999,
    selfLearningPrice: 8999,
  },
  [key("ecba", "India")]: {
    courseId: "ecba",
    courseName: "ECBA Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 13999,
    classroomLearningPrice: 13999,
    selfLearningPrice: 5999,
  },
  [key("ccba", "India")]: {
    courseId: "ccba",
    courseName: "CCBA Certification Training",
    country: "India",
    currency: "INR",
    virtualLearningPrice: 14999,
    classroomLearningPrice: 13999,
    selfLearningPrice: 5999,
  },

  // USA (USD)
  [key("pmp", "USA")]: {
    courseId: "pmp",
    courseName: "PMP Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1799,
    selfLearningPrice: 399,
  },
  [key("pmi-acp", "USA")]: {
    courseId: "pmi-acp",
    courseName: "PMI-ACP Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 599,
    classroomLearningPrice: 1799,
    selfLearningPrice: 399,
  },
  [key("pmipba", "USA")]: {
    courseId: "pmipba",
    courseName: "PMI PBA Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1699,
    selfLearningPrice: 399,
  },
  [key("capm", "USA")]: {
    courseId: "capm",
    courseName: "CAPM Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 399,
  },
  [key("cbap", "USA")]: {
    courseId: "cbap",
    courseName: "CBAP Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },
  [key("ecba", "USA")]: {
    courseId: "ecba",
    courseName: "ECBA Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },
  [key("ccba", "USA")]: {
    courseId: "ccba",
    courseName: "CCBA Certification Training",
    country: "USA",
    currency: "USD",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },

  // UK (GBP)
  [key("pmp", "UK")]: {
    courseId: "pmp",
    courseName: "PMP Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1799,
    selfLearningPrice: 399,
  },
  [key("pmi-acp", "UK")]: {
    courseId: "pmi-acp",
    courseName: "PMI-ACP Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 599,
    classroomLearningPrice: 1799,
    selfLearningPrice: 399,
  },
  [key("pmipba", "UK")]: {
    courseId: "pmipba",
    courseName: "PMI PBA Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1699,
    selfLearningPrice: 399,
  },
  [key("capm", "UK")]: {
    courseId: "capm",
    courseName: "CAPM Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 399,
  },
  [key("cbap", "UK")]: {
    courseId: "cbap",
    courseName: "CBAP Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 699,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },
  [key("ecba", "UK")]: {
    courseId: "ecba",
    courseName: "ECBA Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },
  [key("ccba", "UK")]: {
    courseId: "ccba",
    courseName: "CCBA Certification Training",
    country: "UK",
    currency: "GBP",
    virtualLearningPrice: 499,
    classroomLearningPrice: 1499,
    selfLearningPrice: 499,
  },
};

export function getHardcodedCoursePricing(
  courseId: string,
  country: string
): HardcodedCoursePricing | null {
  const normalized = normalizePricingCountry(country);
  if (!normalized) return null;
  return HARDCODED_COURSE_PRICING[key(courseId, normalized)] || null;
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}


