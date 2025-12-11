# Course Pricing Integration Guide

## Overview

The Excel-based pricing system is now set up. This guide explains how to integrate it into your frontend components.

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install the `xlsx` library for reading Excel files.

### 2. Create Sample Excel File

```bash
npm run create-pricing-excel
```

This creates a sample Excel file at `data/course_pricing.xlsx` with example pricing data.

### 3. Update Excel File with Your Prices

1. Open `data/course_pricing.xlsx`
2. Update prices for your courses and countries
3. Save the file
4. The system will automatically reload pricing (no restart needed)

## Frontend Integration

### Using the Pricing Hook

The easiest way to use pricing in your components is with the `useCoursePricing` hook:

```typescript
import { useCoursePricing } from "@/hooks/useCoursePricing";
import { getFormattedPrice, getTaxBreakdown } from "@/lib/pricing";
import { useCurrency } from "@/lib/currencyContext";

function CourseCard({ courseId }: { courseId: string }) {
  const { pricing, loading, error } = useCoursePricing(courseId);
  const { formatPrice, country } = useCurrency();

  if (loading) {
    return <div>Loading price...</div>;
  }

  if (error || !pricing) {
    return <div>Price not available</div>;
  }

  // Get tax breakdown for display
  const taxes = getTaxBreakdown(pricing);

  return (
    <div>
      <div>Base Price: {formatPrice(pricing.amount)}</div>
      {taxes.map((tax, index) => (
        <div key={index}>
          {tax.label}: {formatPrice(tax.amount)}
        </div>
      ))}
      <div>Total: {formatPrice(pricing.total)}</div>
    </div>
  );
}
```

### Manual API Calls

You can also fetch pricing manually:

```typescript
import { fetchCoursePricing, getFormattedPrice } from "@/lib/pricing";

async function loadPrice(courseId: string, country: string) {
  const pricing = await fetchCoursePricing(courseId, country);
  if (pricing) {
    const formatted = getFormattedPrice(pricing);
    console.log(formatted); // e.g., "$1,089.00" or "₹97,940"
  }
}
```

## Components to Update

### 1. FeaturedCourses Component ✅ (Already Updated)

The FeaturedCourses component on the home page now uses currency formatting. To use Excel pricing:

```typescript
// In FeaturedCourses.tsx
import { useCoursePricing } from "@/hooks/useCoursePricing";
import { getFormattedPrice } from "@/lib/pricing";

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const { pricing, loading } = useCoursePricing(course.id);
  
  // Use pricing from Excel if available, otherwise fallback to course.price
  const displayPrice = pricing ? pricing.total : course.price;
  const displayOriginalPrice = pricing ? (pricing.amount + pricing.countryTax) : course.originalPrice;
  
  // ... rest of component
}
```

### 2. Schedule Page

Update `client/src/pages/Schedule.tsx` to fetch prices from API:

```typescript
import { useCoursePricing } from "@/hooks/useCoursePricing";
import { getFormattedPrice } from "@/lib/pricing";

// In the schedule card component
function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const { pricing, loading } = useCoursePricing(schedule.courseId);
  
  // Use Excel pricing if available
  const price = pricing ? pricing.total : schedule.price;
  const originalPrice = pricing ? (pricing.amount + pricing.countryTax) : schedule.originalPrice;
  
  // ... rest of component
}
```

### 3. Course Details Page

Update `client/src/pages/CourseDetails.tsx`:

```typescript
import { useCoursePricing } from "@/hooks/useCoursePricing";

export default function CourseDetails() {
  const { id } = useParams();
  const { pricing, loading } = useCoursePricing(id || "");
  
  // Use pricing.total for enrollment price
  // ... rest of component
}
```

### 4. Cart and Checkout Pages ✅ (Already Updated)

The Cart and Checkout pages now automatically fetch pricing from Excel and display country-specific tax breakdowns:

```typescript
import { useCartPricing } from "@/hooks/useCartPricing";

function Cart() {
  const { items } = useCart();
  const { getTotalTaxBreakdown, getTotalTax } = useCartPricing();
  
  const taxBreakdown = getTotalTaxBreakdown();
  // taxBreakdown will contain country-specific taxes (SGST/CGST for India, etc.)
  
  // Display taxes with percentages
  taxBreakdown.map((tax) => (
    <div key={tax.label}>
      {tax.label}: {formatPrice(tax.amount)}
    </div>
  ));
}
```

### 5. Courses Page

Update `client/src/pages/Courses.tsx` to fetch prices for each course.

## Course ID to Course Name Mapping

The system uses course IDs internally but Excel uses full course names. The mapping is:

| Course ID | Excel Course Name |
|-----------|-------------------|
| `pmp` | PMP Certification Training |
| `pmi-acp` | PMI-ACP Certification Training |
| `capm` | CAPM Certification Training |
| `pmipba` | PMI PBA Certification Training |
| `cbap` | CBAP Certification Training |
| `ccba` | CCBA Certification Training |
| `ecba` | ECBA Certification Training |

## API Endpoints

### Get Pricing for Course and Country
```
GET /api/pricing/:courseName/:country
```

Example:
```javascript
fetch('/api/pricing/PMP%20Certification%20Training/United%20States')
  .then(res => res.json())
  .then(data => console.log(data));
```

Response (USA):
```json
{
  "courseName": "PMP Certification Training",
  "country": "USA",
  "amount": 999,
  "countryCurrency": "USD",
  "salesTax": 90,
  "salesTaxPercent": 9,
  "total": 1089
}
```

Response (India):
```json
{
  "courseName": "PMP Certification Training",
  "country": "India",
  "amount": 13000,
  "countryCurrency": "INR",
  "sgst": 1170,
  "cgst": 1170,
  "sgstPercent": 9,
  "cgstPercent": 9,
  "total": 15340
}
```

Response (UK):
```json
{
  "courseName": "PMP Certification Training",
  "country": "UK",
  "amount": 789,
  "countryCurrency": "GBP",
  "vat": 158,
  "vatPercent": 20,
  "total": 947
}
```

Response (Canada/Singapore/UAE):
```json
{
  "courseName": "PMP Certification Training",
  "country": "Canada",
  "amount": 1349,
  "countryCurrency": "CAD",
  "tax": 67,
  "serviceTax": 54,
  "taxPercent": 5,
  "serviceTaxPercent": 4,
  "total": 1470
}
```

### Get All Pricing for a Course
```
GET /api/pricing/:courseName
```

### Get All Pricing for a Country
```
GET /api/pricing/country/:country
```

## Tax Breakdown Display

The system automatically displays country-specific tax breakdowns:

### Using getTaxBreakdown()

```typescript
import { getTaxBreakdown } from "@/lib/pricing";

const pricing = await fetchCoursePricing(courseId, country);
const taxes = getTaxBreakdown(pricing);

// taxes will be an array like:
// India: [{ label: "SGST (9%)", amount: 1170, percent: 9 }, { label: "CGST (9%)", amount: 1170, percent: 9 }]
// USA: [{ label: "Sales Tax (9%)", amount: 90, percent: 9 }]
// UK: [{ label: "VAT (20%)", amount: 158, percent: 20 }]
// Canada/Singapore/UAE: [{ label: "Tax (5%)", amount: 67, percent: 5 }, { label: "Service Tax (4%)", amount: 54, percent: 4 }]
```

### In Cart/Checkout

The `useCartPricing` hook automatically aggregates taxes for all cart items:

```typescript
import { useCartPricing } from "@/hooks/useCartPricing";

const { getTotalTaxBreakdown } = useCartPricing();
const taxBreakdown = getTotalTaxBreakdown();

// Display all taxes with percentages
taxBreakdown.forEach((tax) => {
  console.log(`${tax.label}: ${tax.amount}`);
});
```

## Fallback Behavior

If pricing is not found in Excel:
1. The API returns `404` or `null`
2. Components should fall back to hardcoded prices
3. Or show "Price not available"
4. Tax calculations fall back to percentage-based calculations (9% for most countries, 20% for UK)

Example fallback:
```typescript
const { pricing } = useCoursePricing(courseId);
const displayPrice = pricing?.total ?? defaultPrice;

// If no Excel pricing, calculate taxes manually
if (!pricing) {
  const taxRate = country === "UK" ? 0.20 : country === "India" ? 0.18 : 0.09;
  const tax = basePrice * taxRate;
}
```

## Testing

1. **Create Excel file**: `npm run create-pricing-excel`
2. **Start server**: `npm run dev`
3. **Test API**: Visit `http://localhost:5000/api/pricing/PMP%20Certification%20Training/United%20States`
4. **Update Excel**: Edit `data/course_pricing.xlsx` and refresh API call
5. **Verify**: Prices should update without server restart

## Troubleshooting

### Prices Not Loading

1. **Check Excel file exists**: `data/course_pricing.xlsx`
2. **Check column names**: Must match exactly (case-sensitive)
3. **Check course name**: Must match mapping in `client/src/lib/pricing.ts`
4. **Check country name**: Must be exactly one of: "India", "USA", "UK", "Canada", "Singapore", "UAE"
5. **Check server logs**: Look for pricing service errors

### API Returns 404

1. Verify course name in Excel matches the mapping
2. Verify country name matches exactly
3. Check for extra spaces or typos
4. Try the API endpoint directly in browser

### Prices Show as 0

1. Check that Amount, Tax, and Total columns contain numbers
2. Remove any text or special characters
3. Ensure decimal values use `.` not `,`

## Tax Display in Cart and Checkout

The Cart and Checkout pages automatically display country-specific tax breakdowns:

- **India:** Shows SGST and CGST separately with percentages
- **USA:** Shows Sales Tax with percentage
- **UK:** Shows VAT with percentage
- **Canada/Singapore/UAE:** Shows Tax and Service Tax separately with percentages

Taxes are automatically calculated from Excel data and displayed with proper labels and percentages.

## Next Steps

1. ✅ Backend pricing service created with country-specific tax support
2. ✅ API endpoints created
3. ✅ Excel template script created with all tax columns
4. ✅ Frontend pricing utilities created
5. ✅ Cart component updated to use Excel pricing and display tax breakdown
6. ✅ Checkout component updated to use Excel pricing and display tax breakdown
7. ✅ useCartPricing hook created for cart tax calculations
8. ⏳ Update FeaturedCourses to use Excel pricing (optional - currently uses currency conversion)
9. ⏳ Update Schedule page to use Excel pricing
10. ⏳ Update Course Details page to show tax breakdown

---

**Last Updated:** December 2024

**Version:** 2.0 - Added country-specific tax columns, tax percentages, and Cart/Checkout integration

