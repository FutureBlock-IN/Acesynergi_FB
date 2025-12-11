# Excel-Based Course Pricing System

## Overview

The application now uses an Excel file to store and manage course pricing. This allows administrators to easily update prices without modifying code.

## Excel File Structure

### Location
The Excel file should be placed in one of these locations (checked in order):
1. `data/course_pricing.xlsx` (recommended)
2. `server/data/course_pricing.xlsx`
3. `course_pricing.xlsx` (root directory)

### File Format

The Excel file must have the following columns in the first sheet:

#### Required Columns (All Countries)

| Column Name | Description | Example | Required |
|------------|-------------|---------|----------|
| **Course Name** | Full name of the course | PMP Certification Training | Yes |
| **Country** | Country name | India, USA, UK, Canada, Singapore, UAE | Yes |
| **Amount** | Base price (before tax) | 999, 13000 | Yes |
| **Country Currency** | Currency code | USD, INR, GBP, CAD, SGD, AED | Yes |
| **Total** | Total price (Amount + All Taxes) | 1089, 15340 | Yes |

#### Country-Specific Tax Columns

**For India:**
- **SGST (IND)** - State Goods and Services Tax amount (e.g., 1170)
- **CGST (IND)** - Central Goods and Services Tax amount (e.g., 1170)
- **SGST Percent (IND)** - SGST percentage (e.g., 9)
- **CGST Percent (IND)** - CGST percentage (e.g., 9)

**For USA:**
- **Sales Tax (US)** - Sales Tax amount (e.g., 90)
- **Sales Tax Percent (US)** - Sales Tax percentage (e.g., 9)

**For UK:**
- **VAT (UK)** - Value Added Tax amount (e.g., 158)
- **VAT Percent (UK)** - VAT percentage (e.g., 20)

**For Canada, Singapore, UAE:**
- **Tax (Canada, Singapore, UAE)** - Tax amount (e.g., 67)
- **Service Tax (Canada, Singapore, UAE)** - Service Tax amount (e.g., 54)
- **Tax Percent (Canada, Singapore, UAE)** - Tax percentage (e.g., 5)
- **Service Tax Percent (Canada, Singapore, UAE)** - Service Tax percentage (e.g., 4)

> **Note:** The system also accepts column names without country suffixes (e.g., "SGST" instead of "SGST (IND)") for backward compatibility.

> **Note:** Only include tax columns relevant to each country. Leave other tax columns empty or omit them.

### Sample Data

#### India Example (SGST + CGST)
```
Course Name                | Country | Amount | Country Currency | SGST | CGST | SGST Percent | CGST Percent | Total
---------------------------|---------|--------|------------------|------|------|--------------|--------------|-------
PMP Certification Training | India   | 13000  | INR              | 1170 | 1170 | 9            | 9            | 15340
```

#### USA Example (Sales Tax)
```
Course Name                | Country | Amount | Country Currency | Sales Tax | Sales Tax Percent | Total
---------------------------|---------|--------|------------------|-----------|-------------------|-------
PMP Certification Training | USA     | 999    | USD              | 90        | 9                 | 1089
```

#### UK Example (VAT)
```
Course Name                | Country | Amount | Country Currency | VAT | VAT Percent | Total
---------------------------|---------|--------|------------------|-----|--------------|-------
PMP Certification Training | UK      | 789    | GBP              | 158 | 20           | 947
```

#### Canada/Singapore/UAE Example (Tax + Service Tax)
```
Course Name                | Country   | Amount | Country Currency | Tax | Service Tax | Tax Percent | Service Tax Percent | Total
---------------------------|-----------|--------|------------------|-----|--------------|-------------|---------------------|-------
PMP Certification Training | Canada    | 1349   | CAD              | 67  | 54           | 5           | 4                   | 1470
PMP Certification Training | Singapore | 1349   | SGD              | 67  | 54           | 5           | 4                   | 1470
PMP Certification Training | UAE       | 3670   | AED              | 184 | 147          | 5           | 4                   | 4001
```

## Creating the Excel File

### Option 1: Use the API Endpoint (Development)

```bash
# Start the server
npm run dev

# Create sample Excel file
curl -X POST http://localhost:5000/api/pricing/create-sample
```

This will create a sample Excel file at `data/course_pricing.xlsx` with example data.

### Option 2: Create Manually

1. Open Microsoft Excel, Google Sheets, or LibreOffice Calc
2. Create a new spreadsheet
3. Add the header row with these exact column names (in order):
   - **Required for all countries:**
     - Course Name
     - Country
     - Amount
     - Country Currency
     - Total
   - **For India only:**
     - SGST
     - CGST
     - SGST Percent
     - CGST Percent
   - **For USA only:**
     - Sales Tax
     - Sales Tax Percent
   - **For UK only:**
     - VAT
     - VAT Percent
   - **For Canada, Singapore, UAE:**
     - Tax
     - Service Tax
     - Tax Percent
     - Service Tax Percent
4. Fill in your course pricing data (only include tax columns relevant to each country)
5. Save as `course_pricing.xlsx` (Excel format)
6. Place it in the `data/` directory

> **Tip:** You can include all columns in the header row, but only fill in the tax columns that apply to each country. The system will automatically ignore empty tax columns.

## Maintaining Prices

### Adding a New Course

1. Open `data/course_pricing.xlsx`
2. Add a new row for each country where the course is available
3. Fill in all required columns
4. Save the file
5. The application will automatically reload the pricing (no restart needed)

### Updating Existing Prices

1. Open `data/course_pricing.xlsx`
2. Find the row for the course and country
3. Update the Amount, relevant tax columns (SGST/CGST for India, Sales Tax for USA, etc.), and Total
4. Update tax percentages if they have changed
5. Save the file
6. The application will automatically reload the pricing

> **Note:** When updating prices, ensure that Total = Amount + Sum of all applicable taxes

### Adding a New Country

1. Open `data/course_pricing.xlsx`
2. For each course, add a new row with:
   - Course Name (same as existing)
   - Country (must be one of: India, USA, UK, Canada, Singapore, UAE)
   - Amount (price in that country's currency)
   - Country Currency (currency code: USD, INR, GBP, CAD, SGD, AED)
   - **Country-specific tax columns:**
     - **India:** SGST, CGST, SGST Percent, CGST Percent
     - **USA:** Sales Tax, Sales Tax Percent
     - **UK:** VAT, VAT Percent
     - **Canada/Singapore/UAE:** Tax, Service Tax, Tax Percent, Service Tax Percent
   - Total (Amount + Sum of all applicable taxes)
3. Save the file

> **Important:** Only these 6 countries are supported: India, USA, UK, Canada, Singapore, UAE

## API Endpoints

### Get Pricing for Course and Country
```
GET /api/pricing/:courseName/:country
```
Example: `GET /api/pricing/PMP%20Certification%20Training/United%20States`

Response:
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

**India Example:**
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

**UK Example:**
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

**Canada/Singapore/UAE Example:**
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

### Get All Pricing for a Course (All Countries)
```
GET /api/pricing/:courseName
```
Example: `GET /api/pricing/PMP%20Certification%20Training`

Response:
```json
[
  {
    "courseName": "PMP Certification Training",
    "country": "United States",
    "amount": 999,
    "countryCurrency": "USD",
    "countryTax": 90,
    "total": 1089
  },
  {
    "courseName": "PMP Certification Training",
    "country": "India",
    "amount": 83000,
    "countryCurrency": "INR",
    "countryTax": 14940,
    "total": 97940
  }
]
```

### Get All Pricing for a Country (All Courses)
```
GET /api/pricing/country/:country
```
Example: `GET /api/pricing/country/India`

### Get All Available Courses
```
GET /api/pricing/courses
```

### Get All Available Countries
```
GET /api/pricing/countries
```

## Course Name Mapping

The course names in the Excel file should match the course IDs used in the application:

| Application Course ID | Excel Course Name |
|----------------------|-------------------|
| `pmp` | PMP Certification Training |
| `pmi-acp` | PMI-ACP Certification Training |
| `capm` | CAPM Certification Training |
| `pmipba` | PMI PBA Certification Training |
| `cbap` | CBAP Certification Training |
| `ccba` | CCBA Certification Training |
| `ecba` | ECBA Certification Training |

## Country Name Mapping

The country names in the Excel file must match exactly (case-sensitive):

| Excel Country Name | Currency Code | Supported Tax Types |
|-------------------|---------------|---------------------|
| **India** | INR | SGST + CGST |
| **USA** | USD | Sales Tax |
| **UK** | GBP | VAT |
| **Canada** | CAD | Tax + Service Tax |
| **Singapore** | SGD | Tax + Service Tax |
| **UAE** | AED | Tax + Service Tax |

> **Important:** Only these 6 countries are currently supported. The country name must match exactly (e.g., "USA" not "United States", "UK" not "United Kingdom").

## Important Notes

1. **Case Sensitivity**: Course names and country names are matched case-insensitively, but it's best to use consistent naming.

2. **Currency Codes**: Use standard ISO 4217 currency codes:
   - USD (United States Dollar)
   - INR (Indian Rupee)
   - GBP (British Pound)
   - EUR (Euro)
   - CAD (Canadian Dollar)
   - AUD (Australian Dollar)
   - AED (UAE Dirham)
   - SAR (Saudi Riyal)
   - SGD (Singapore Dollar)

3. **Tax Calculation**: The `Total` column should be `Amount + Sum of all applicable taxes`. 
   - **India:** Total = Amount + SGST + CGST
   - **USA:** Total = Amount + Sales Tax
   - **UK:** Total = Amount + VAT
   - **Canada/Singapore/UAE:** Total = Amount + Tax + Service Tax
   
   The system will use the `Total` value for display and will show individual tax breakdowns in the Cart and Checkout pages.

4. **File Caching**: The system caches the Excel file data. When you update the file, the cache is automatically refreshed based on the file's modification time.

5. **Missing Data**: If pricing is not found for a course/country combination, the system will fall back to default pricing or show an error.

## Troubleshooting

### Prices Not Updating

1. **Check file location**: Ensure the Excel file is in the correct location
2. **Check file format**: Ensure it's saved as `.xlsx` (not `.xls` or `.csv`)
3. **Check column names**: Column names must match exactly (case-sensitive)
4. **Check data types**: Amount, Country Tax, and Total must be numbers
5. **Restart server**: If changes aren't reflected, restart the Node.js server

### Error: "Pricing file not found"

1. Create the `data/` directory in the project root
2. Place `course_pricing.xlsx` in that directory
3. Or use the API endpoint to create a sample file

### Prices Showing as 0 or NaN

1. Check that Amount, tax columns, and Total columns contain valid numbers
2. Remove any text or special characters from numeric columns
3. Ensure decimal values use `.` (period) not `,` (comma)
4. Verify that tax percentages are numbers (not text like "9%")

### Tax Not Displaying Correctly

1. **Check country name:** Must be exactly "India", "USA", "UK", "Canada", "Singapore", or "UAE"
2. **Check tax columns:** Ensure the correct tax columns are filled for each country:
   - India: SGST and CGST (and percentages)
   - USA: Sales Tax (and percentage)
   - UK: VAT (and percentage)
   - Canada/Singapore/UAE: Tax and Service Tax (and percentages)
3. **Check tax percentages:** Should be numbers (e.g., 9, not "9%" or "9.0%")
4. **Verify calculations:** Total should equal Amount + Sum of all taxes

## Best Practices

1. **Backup**: Always keep a backup of your pricing Excel file
2. **Version Control**: Consider using Git to track pricing changes
3. **Validation**: Double-check calculations (Amount + Tax = Total)
4. **Consistency**: Use consistent naming for courses and countries
5. **Documentation**: Document any special pricing rules or exceptions

---

**Last Updated:** December 2024

**Version:** 2.0 - Added country-specific tax columns and percentages

