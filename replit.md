# AceSynergi Learning Platform

## Project Overview
AceSynergi is a professional EdTech learning platform featuring IT certification courses, corporate training programs, and expert consultations.

## Design System
- **Primary Color**: Deep Blue (#1E40AF)
- **Secondary Color**: Cyan (#06B6D4)
- **Accent Color**: Amber (#F59E0B) - used sparingly for badges/highlights
- **Footer Background**: Dark Navy (#0F172A)
- **Typography**: Inter/Poppins
- **Design Principles**: NO black borders anywhere (use shadows only), white card surfaces, minimal animations

## Key Features
- Course browsing with detailed course pages
- Training schedule with enrollment functionality
- Shopping cart with quantity management
- Contact form and corporate training inquiry form
- Testimonials section (3-card grid layout)
- Book a Consultation page with Calendly integration
- Responsive design across all breakpoints

## Pages
1. **Home** - Hero, About, Categories, Featured Courses, Testimonials, CTA
2. **Courses** - Course grid with filtering
3. **Course Details** - Tabs (Overview/Curriculum/FAQs), sidebar features
4. **Schedule** - Training calendar with enrollment
5. **Cart** - Shopping cart with checkout
6. **Contact** - Contact form
7. **Corporate** - Corporate training inquiry form
8. **Book Consultation** - Sai Ram's profile + Calendly booking

## Email Integration Notes
- User dismissed Replit's Resend integration
- Email forms (Contact, Corporate) need to send to: emmanuel012k@gmail.com
- TODO: Implement email using backend service (Nodemailer with SMTP) or alternative approach
- Store email credentials as environment secrets if needed

## Recent Changes
- Added "Book a Consultation" navigation link
- Created BookConsultation page with Sai Ram's profile and Calendly embed (https://calendly.com/emmanuelg7)
- Footer redesigned with dark navy background (#0F172A)
- Testimonials completely redesigned to modern 3-card grid
- Removed ALL black borders platform-wide, replaced with shadows
- Changed ALL orange buttons to Deep Blue (#1E40AF)
- Header already includes responsive hamburger menu for mobile

## Completed Features (November 3, 2025)
✅ Book Consultation page with Sai Ram's profile and Calendly integration
✅ Email functionality for Contact and Corporate forms (sends to emmanuel012k@gmail.com)
✅ Responsive design verified across all pages and breakpoints
✅ Comprehensive DEVELOPER_HANDOVER.txt documentation created
✅ All features tested and working correctly

## Email Configuration
- Backend API: POST /api/contact and POST /api/corporate
- Emails send to: emmanuel012k@gmail.com
- Development mode: Logs emails to console (configure EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS for production)
- Success/error messages displayed to users
- Loading states during form submission

## How to Enable Production Email
Set these environment variables in Replit Secrets:
- EMAIL_SERVICE: gmail (or other SMTP service)
- EMAIL_USER: your-email@gmail.com
- EMAIL_PASS: your-app-password (Google App Password for Gmail)

Without these variables, emails are logged to the console for testing.

## Currency System (November 27, 2025)
The platform includes a global currency management system:

### Features
- Country/City selection in Header with 10 countries
- Automatic currency conversion based on selected country
- All base prices stored in USD
- Exchange rates: INR (83.12), GBP (0.79), EUR (0.92), AUD (1.53), etc.
- Locale-aware number formatting (Indian numbering for INR)

### Implementation Files
- `client/src/lib/currencyContext.tsx` - Global state provider
- `client/src/lib/currency.ts` - Exchange rates and formatting utilities
- Header component has country/city dropdown
- Schedule and Cart pages use formatPrice() for all prices

### Tax Handling
- India: SGST + CGST (9% each = 18% total)
- USA: Sales Tax (9%)
- UK: VAT (20%)
- Others: Generic tax (18%)

### Countries Supported
India, USA, UK, Germany, France, Australia, Canada, Japan, Singapore, UAE
