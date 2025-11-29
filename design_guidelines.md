# Design Guidelines - AceSynergi Learning Platform

## Design Approach
**Theme**: Professional EdTech platform with Deep Blue + Cyan color scheme, emphasizing trust, professionalism, and modern learning. Clean, polished aesthetic matching premium platforms like Coursera, Udemy, and LinkedIn Learning.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Deep Blue**: #1E40AF (rgb(30, 64, 175)) - Main brand color for buttons, headings, navbar
- **Cyan**: #06B6D4 (rgb(6, 182, 212)) - Secondary color for links, accents, highlights
- **Amber**: #F59E0B (rgb(245, 158, 11)) - Accent for badges, star ratings, highlights

**Background Colors:**
- **White**: #FFFFFF - Card backgrounds, primary sections
- **Light Gray**: #F8FAFC - Alternating section backgrounds
- **Lighter Gray**: #F3F4F6 - Subtle variations

**Text Colors:**
- **Dark Gray**: #1F2937 - Headings and important text
- **Medium Gray**: #4B5563 - Body text
- **Light Gray**: #6B7280 - Secondary text

**Semantic Colors:**
- **Light Gray Border**: #E5E7EB - Subtle borders when needed (barely visible)
- **Success**: #10B981 - Success states
- **Warning**: #F59E0B - Warning states (same as Amber)
- **Error**: #EF4444 - Error states

**Color Usage:**
- Headers/Navigation: White background with Deep Blue text
- Hero Banners: Deep Blue to Cyan gradient
- Buttons: Deep Blue primary, Cyan secondary
- Links: Cyan color with hover effects
- Badges: Amber background
- Card backgrounds: White with subtle shadows (NO black borders)
- Text: Dark gray for headings, medium gray for body

### B. Typography
**Font Family:**
- **Primary**: 'Inter', sans-serif (import from Google Fonts)
- **Alternative**: 'Poppins', sans-serif
- **Apply to**: ALL text elements across the entire website

**Type Scale:**
- **H1 (Main headings)**: 32-36px (text-3xl), font-weight: 700 (bold)
- **H2 (Section headings)**: 28-32px (text-2xl/3xl), font-weight: 600
- **H3 (Card titles)**: 24px (text-xl), font-weight: 600
- **H4 (Subheadings)**: 20px (text-lg), font-weight: 600
- **Body text**: 16px (text-base), font-weight: 400, line-height: 1.6
- **Small text**: 14px (text-sm), font-weight: 400
- **Button text**: 16px (text-base), font-weight: 600

**Text Colors by Context:**
- Headings: Deep Blue (#1F2937 or Deep Blue)
- Body: Medium Gray (#4B5563)
- Links: Cyan (#06B6D4)
- On dark backgrounds: White

### C. Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32, 48
- Component padding: p-5 (20px), p-6 (24px), p-8 (32px)
- Section spacing: py-16, py-20, py-24
- Card gaps: gap-6 (24px), gap-8 (32px)
- Container max-width: max-w-7xl
- Margins: 16px, 24px, 32px, 48px

**Grid Systems:**
- Categories: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Featured Courses: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: 3 cards on desktop, 1 on mobile
- Footer: grid-cols-1 md:grid-cols-3

### D. Component Library

**Navigation Header:**
- Background: White (#FFFFFF)
- Text/Links: Deep Blue (#1E40AF)
- Hover: Cyan (#06B6D4)
- Active link: Cyan with underline
- Logo: "AceSynergi" positioned on the left
- Height: h-20
- Sticky on scroll with shadow

**Hero/Banner Section:**
- Layout: Split 50-50 (content left, image right)
- Background: Linear gradient `linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%)`
- Left side: White text, headline (48px bold), subheading (20px), description (16px)
- Buttons: 
  - Primary: White bg with Deep Blue text
  - Secondary: Transparent border with white text
- Right side: Professional learning image (NO animation, static with rounded corners)
- Responsive: Stack vertically on mobile
- Style: Modern, clean like Coursera/LinkedIn Learning

**Card Components:**
- Background: White (#FFFFFF)
- Border: NONE (NO black borders)
- Shadow: `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)`
- Hover shadow: `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12)`
- Border-radius: 12px (rounded-xl)
- Padding: 20px or 24px
- Hover: Slight lift effect with increased shadow
- If border absolutely needed: 1px solid #E5E7EB (barely visible)

**Course Cards:**
- White background with shadow (NO black borders)
- Border-radius: 12px
- Image at top (rounded top corners only)
- Padding: 20px
- Title: 18px bold, Deep Blue
- Rating: Amber stars (#F59E0B), Cyan review count
- Student count & duration: Medium gray icons and text
- Price: Deep Blue, bold
- Button: Full width, Deep Blue bg, white text
- Hover: Card lifts, shadow increases
- Apply to: Featured courses, course listing, schedule page

**Schedule Cards:**
- White background with shadow (NO borders)
- Border-radius: 12px
- Padding: 24px
- Icons: Cyan color (#06B6D4)
- Title: Deep Blue (#1E40AF)
- Details: Medium gray text (#4B5563)
- Price: Deep Blue, bold
- Enroll button: Deep Blue bg, white text
- "More Details" link: Cyan color

**Testimonial Section:**
- Background: Light gray (#F8FAFC)
- Title: "What Our Students Say" (centered, 32px bold, Deep Blue)
- Cards: 
  - White background
  - Shadow (NO black borders)
  - Border-radius: 16px
  - Padding: 32px
- Content:
  - 5-star rating (Amber/yellow stars #F59E0B)
  - Review text (16px italic, medium gray)
  - Student photo (circular, 60px)
  - Name (Deep Blue, bold)
  - Course name (Cyan)
  - Role/title (medium gray)
- Layout: Carousel showing 3 cards on desktop, 1 on mobile
- Navigation: Deep Blue arrows, Cyan dots
- Hover: Slight lift effect
- Style: Professional like Trustpilot

**Buttons - Consistent Style:**
- Primary Button:
  - Background: Deep Blue (#1E40AF)
  - Text: White
  - Hover: Darker blue (#1E3A8A)
  - Border-radius: 8px (rounded-lg)
  - Padding: 12px 24px
  - Font-size: 16px, weight: 600
  - Transition: all 0.3s ease
- Secondary Button:
  - Background: Cyan (#06B6D4)
  - Text: White
  - Hover: Darker cyan (#0891B2)
  - Same styling as primary
- Outlined Button:
  - Border: 2px solid (Deep Blue or Cyan)
  - Text: Matching border color
  - Background: Transparent
  - Hover: Fill with border color, text white
- Apply to: ALL buttons (enroll, talk now, find course, submit, etc.)

**Badges:**
- Background: Amber (#F59E0B)
- Text: White
- Border-radius: 6px
- Padding: 4px 12px
- Font-size: 12px, weight: 600
- Use for: "Best Seller", "Premium", "New", "Popular", etc.

**Footer:**
- Background: Deep Blue (#1E40AF)
- Text: White
- Links: White, hover to Cyan (#06B6D4)
- Social icons: White, hover to Cyan
- Section headings: Cyan color
- Three-column grid layout
- Copyright: White text with reduced opacity

### E. Animations & Interactions

**NO Black Borders:**
- Remove ALL `border: 1px solid black` or `border: 1px solid #000`
- Replace with subtle shadows
- If border needed, use barely visible: `border: 1px solid #E5E7EB`

**Transitions:**
- All interactive elements: `transition: all 0.3s ease`
- Smooth color changes on hover
- Subtle lift effects for cards

**Text/Button Animations:**
- Fade-in effects (0.6-0.8s duration)
- Smooth transitions
- Hover states with color shifts

**Images:**
- NO animations - keep static
- Rounded corners (12px) for depth
- Shadow effects for professionalism
- Course images: Rounded top corners only

**Hover States:**
- Buttons: Color darkens slightly
- Cards: Slight lift with increased shadow
- Links: Color changes from Deep Blue to Cyan

**Card Hover Effect:**
- Transform: `translateY(-4px)`
- Shadow increase: from 0 2px 8px to 0 4px 16px
- Transition: 0.3s ease

## Images

**Hero Image:**
- Professional stock photo of students/online learning
- Treatment: NO animations, static with rounded corners
- Shadow for depth

**Course Thumbnails:**
- High-quality, course-related images
- Consistent aspect ratio (16:9 or 4:3)
- Rounded corners (top only for cards)
- Professional presentation

**Testimonial Photos:**
- Circular headshots (60px diameter)
- Professional but approachable
- Diverse representation

## Theme Consistency

**Applied Everywhere:**
- Deep Blue (#1E40AF) as primary brand color
- Cyan (#06B6D4) for interactive elements and accents
- Amber (#F59E0B) for badges and highlights
- White and light gray backgrounds
- NO black borders - use shadows
- Inter or Poppins font on EVERY element
- Professional shadows instead of borders
- Consistent spacing: 16px, 24px, 32px, 48px
- Smooth transitions (0.3s ease) on all interactions

**Professional EdTech Aesthetic:**
- Clean, modern design
- Premium look like Coursera, Udemy, LinkedIn Learning
- Trustworthy and corporate appearance
- Excellent readability with proper contrast
- Responsive across all devices

## Responsive Behavior
- Mobile-first approach
- Navigation collapses to hamburger below md breakpoint
- Grids stack to single column on mobile
- Touch-friendly button sizes (min 44px)
- Consistent Deep Blue + Cyan theme across all screen sizes
- Hero section stacks vertically on mobile (content then image)
- Testimonial carousel shows 1 card on mobile, 3 on desktop
