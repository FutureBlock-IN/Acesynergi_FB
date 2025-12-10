// Updated: Uses native HTML selects to avoid Radix UI runtime errors
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useCurrency } from "@/lib/currencyContext";
import { getCitiesForCountry, getAvailableCountries } from "@/lib/currency";
import { useToast } from "@/hooks/use-toast";

interface SubMenuItem {
  name: string;
  href: string;
}

interface CourseCategory {
  name: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const courseCategories: CourseCategory[] = [
  { 
    name: "All Courses", 
    href: "/courses" 
  },
  { 
    name: "Project Management", 
    subItems: [
      { name: "Project Management Professional (PMP)", href: "/courses/pmp" },
      { name: "PMI Agile Certified Practitioner (PMI-ACP)", href: "/courses/pmi-acp" },
      { name: "PMI Certified Associate in Project Management (CAPM)", href: "/courses/capm" },
      { name: "PMI Profession in Project Management (PMI-PBA)", href: "/courses/pmipba" },
      // { name: "CAPM Certification Training", href: "/courses/capm" },
      // { name: "PMI PBA Certification Training", href: "/courses/pmipba" },
      // { name: "Foundation Certification", href: "/courses/foundation" },
      // { name: "Practitioner Certification", href: "/courses/practitioner" },
      // { name: "Foundation and Practitioner Certification", href: "/courses/fp" },
      // { name: "Agile® Foundation & Practitioner", href: "/courses/agilefp" },
    ] 
  },
  { 
    name: "Business Management", 
    subItems: [
      { name: "CBAP", href: "/courses/cbap" },      
      { name: "CCBA", href: "/courses/ccba" },
      { name: "ECBA", href: "/courses/ecba" },
      // { name: "CCBA Prep Course", href: "/courses/ccba-prep" },
    ]
  },
  // { 
  //   name: "Agile and Scrum", 
  //   subItems: [
  //     { name: "CSM Certification", href: "/courses/cbap" },
  //     { name: "CSPO Certification", href: "/courses/ecba" },
  //     { name: "PMI-ACP Certification", href: "/courses/ccba" },
  //     { name: "Agile Scrum Master Training", href: "/courses/ccba-prep" },
  //   ] 
  // },
  // { 
  //   name: "Gen AI Courses", 
  //   subItems: [
  //     { name: "Scrum Master", href: "/courses/genai-scrum-master" },
  //     { name: "Project Managers", href: "/courses/genai-project-managers" },
  //     { name: "Product Owner", href: "/courses/genai-product-owner" },
  //     { name: "Business Analysts", href: "/courses/genai-business-analysts" },
  //     { name: "Interview Prep for Scrum Masters", href: "/courses/genai-interview-prep" },
  //   ]
  // },
  // { 
  //   name: "Quality Management", 
  //    subItems: [
  //     { name: "Lean Six Sigma Green Belt Certification Training", href: "/courses/genai-scrum-master" },
  //     { name: "Lean Six Sigma Black Belt Certification Training", href: "/courses/genai-project-managers" },
  //     { name: "Certified Process Mapping Practitioner", href: "/courses/genai-product-owner" },  
  //   ] 
  // },
  // { 
  //   name: "Skills Training", 
  //    subItems: [
  //     { name: "Conflict Management Training", href: "/courses/genai-scrum-master" },
  //     { name: "Management Skills Training", href: "/courses/genai-project-managers" },
  //     { name: "Leadership skills", href: "/courses/genai-product-owner" },
  //     { name: "Agile Scrum Methodology & Practice", href: "/courses/genai-business-analysts" },
  //     { name: "Bundled Skill Courses", href: "/courses/genai-interview-prep" },
  //   ]
  // },
  // { 
  //   name: "IT Service Management", 
  //   href: "/courses" 
  // },
  // { 
  //   name: "DevOps", 
  //   href: "/courses" 
  // },
  
  // { 
  //   name: "Cyber Security", 
  //   href: "/courses" 
  // },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState<string[]>([]);
  const [, setLocation] = useLocation();
  
  // Use CurrencyContext for country/city state (shared across app)
  const { country: selectedCountry, city: selectedCity, setCountry, setCity, currencyCode } = useCurrency();
  const { toast } = useToast();
  
  // Get available countries and cities (null-safe)
  const availableCountries = getAvailableCountries();
  const availableCities = selectedCountry ? getCitiesForCountry(selectedCountry) : [];
  
  const coursesRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
        setActiveSubmenu(null);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Submit handler outputs selection object with country, city, and currency
  const handleCountrySubmit = () => {
    if (selectedCountry && selectedCity) {
      const selection = {
        country: selectedCountry,
        city: selectedCity,
        currency: currencyCode,
      };
      console.log("Location selected:", selection);
      toast({
        title: "Location Updated",
        description: `${selectedCity}, ${selectedCountry} (${currencyCode})`,
        duration: 3000,
      });
      setIsCountryModalOpen(false);
    } else {
      toast({
        title: "Selection Required",
        description: "Please select both country and city",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Safe country change handler - resets city when country changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setCountry(value);
      setCity(""); // Reset city when country changes
    }
  };
  
  // Safe city change handler
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setCity(value);
    }
  };

  const handleCategoryClick = (category: CourseCategory) => {
    if (category.href) {
      setLocation(category.href);
      setIsCoursesOpen(false);
    }
  };

  const toggleMobileCategory = (categoryName: string) => {
    setMobileExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl md:text-3xl font-bold cursor-pointer">
              <span className="text-primary">Acesynergi</span>
              {/* <span className="text-secondary">synergi</span> */}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                Home
              </span>
            </Link>

            {/* <Link href="/about">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                About
              </span>
            </Link> */}

            {/* <div ref={coursesRef} className="relative group">
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="dropdown-courses"
              >
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50"
                  >
                    {courseCategories.map((category) => (
                      <div
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => category.subItems && setActiveSubmenu(category.name)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {category.subItems ? (
                          <div className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors">
                            <span className="font-medium">{category.name}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleCategoryClick(category)}
                            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
                          >
                            <span className="font-medium">{category.name}</span>
                          </div>
                        )}

                        {category.subItems && activeSubmenu === category.name && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-2xl py-2 ml-1"
                          >
                            {category.subItems.map((subItem) => (
                              <Link key={subItem.name} href={subItem.href}>
                                <span
                                  onClick={() => setIsCoursesOpen(false)}
                                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors font-medium"
                                >
                                  {subItem.name}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            <div 
  ref={coursesRef} 
  className="relative group"
  onMouseEnter={() => setIsCoursesOpen(true)}
  onMouseLeave={() => {
    setIsCoursesOpen(false);
    setActiveSubmenu(null);
  }}
>
  <button
    className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
    data-testid="dropdown-courses"
  >
    Courses
    <ChevronDown className={`w-4 h-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
  </button>

  <AnimatePresence>
    {isCoursesOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50"
      >
        {courseCategories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => category.subItems && setActiveSubmenu(category.name)}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            {category.subItems ? (
              <div className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors">
                <span className="font-medium">{category.name}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            ) : (
              <div
                onClick={() => {
                  handleCategoryClick(category);
                  setIsCoursesOpen(false);
                }}
                className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
              >
                <span className="font-medium">{category.name}</span>
              </div>
            )}

            {category.subItems && activeSubmenu === category.name && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-2xl py-2 ml-1"
              >
                {category.subItems.map((subItem) => (
                  <Link key={subItem.name} href={subItem.href}>
                    <span
                      onClick={() => setIsCoursesOpen(false)}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors font-medium"
                    >
                      {subItem.name}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>

            {/* <Link href="/training-schedule">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                Training Schedule
              </span>
            </Link> */}

            <Link href="/corporate">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                Corporate
              </span>
            </Link>

            <Link href="/contact">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                Contact Us
              </span>
            </Link>

            <div ref={countryRef} className="relative">
              <button
                onClick={() => setIsCountryModalOpen(!isCountryModalOpen)}
                className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium py-2"
                data-testid="dropdown-country"
              >
                <Globe className="w-4 h-4" />
                Country
                <ChevronDown className={`w-4 h-4 transition-transform ${isCountryModalOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCountryModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl p-5 z-50"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-800">Select Location</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label 
                          htmlFor="country-select" 
                          className="block text-sm font-medium text-gray-600 mb-1.5"
                        >
                          Country
                        </label>
                        <select
                          id="country-select"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="w-full h-10 px-3 rounded-md bg-white text-gray-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          style={{ border: '1px solid #e5e7eb' }}
                          data-testid="select-country"
                        >
                          <option value="">-- Select Country --</option>
                          {availableCountries.map((countryName) => (
                            <option key={countryName} value={countryName}>
                              {countryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* <div>
                        <label 
                          htmlFor="city-select" 
                          className="block text-sm font-medium text-gray-600 mb-1.5"
                        >
                          City
                        </label>
                        <select
                          id="city-select"
                          value={selectedCity}
                          onChange={handleCityChange}
                          disabled={!selectedCountry}
                          className="w-full h-10 px-3 rounded-md bg-white text-gray-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ border: '1px solid #e5e7eb' }}
                          data-testid="select-city"
                        >
                          <option value="">{selectedCountry ? "-- Select City --" : "Select country first"}</option>
                          {availableCities.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      </div> */}

                      {/* <Button
                        onClick={handleCountrySubmit}
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={!selectedCountry || !selectedCity}
                        data-testid="button-country-submit"
                      >
                        Submit
                      </Button> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/book-consultation">
              <Button className="bg-primary hover:bg-primary/90 text-white px-5">
                Book Consultation
              </Button>
            </Link>
          </nav>

          <Button
            size="icon"
            className="lg:hidden bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <nav className="px-6 py-4 space-y-1">
              <Link href="/">
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 hover:text-primary font-medium transition-colors"
                >
                  Home
                </span>
              </Link>

              {/* <Link href="/about">
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 hover:text-primary font-medium transition-colors"
                >
                  About
                </span>
              </Link> */}

              <div>
                <button
                  onClick={() => toggleMobileCategory('courses')}
                  className="flex items-center justify-between w-full py-3 text-left font-medium text-gray-800"
                >
                  Courses
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedCategories.includes('courses') ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileExpandedCategories.includes('courses') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {courseCategories.map((category) => (
                        <div key={category.name}>
                          {category.subItems ? (
                            <>
                              <button
                                onClick={() => toggleMobileCategory(category.name)}
                                className="flex items-center justify-between w-full py-2 text-left text-gray-600"
                              >
                                <span>{category.name}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                              </button>
                              <AnimatePresence>
                                {mobileExpandedCategories.includes(category.name) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pl-4 space-y-1"
                                  >
                                    {category.subItems.map((subItem) => (
                                      <Link key={subItem.name} href={subItem.href}>
                                        <span
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block py-2 text-gray-500 hover:text-primary transition-colors"
                                        >
                                          {subItem.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link href={category.href || "/courses"}>
                              <span
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-gray-600 hover:text-primary transition-colors"
                              >
                                {category.name}
                              </span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* <Link href="/training-schedule">
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 hover:text-primary font-medium transition-colors"
                >
                  Training Schedule
                </span>
              </Link> */}

              <Link href="/corporate">
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 hover:text-primary font-medium transition-colors"
                >
                  Corporate
                </span>
              </Link>

              <Link href="/contact">
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 hover:text-primary font-medium transition-colors"
                >
                  Contact Us
                </span>
              </Link>

              <div className="border-t border-gray-100 pt-2 mt-2">
                <button
                  onClick={() => toggleMobileCategory('country-mobile')}
                  className="flex items-center justify-between w-full py-3 text-left font-medium text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Country
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedCategories.includes('country-mobile') ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileExpandedCategories.includes('country-mobile') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-2 py-3 space-y-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <label 
                          htmlFor="mobile-country-select" 
                          className="block text-sm font-medium text-gray-600 mb-1.5"
                        >
                          Country
                        </label>
                        <select
                          id="mobile-country-select"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="w-full h-10 px-3 rounded-md bg-white text-gray-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          style={{ border: '1px solid #e5e7eb' }}
                        >
                          <option value="">-- Select Country --</option>
                          {availableCountries.map((countryName) => (
                            <option key={countryName} value={countryName}>
                              {countryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* <div>
                        <label 
                          htmlFor="mobile-city-select" 
                          className="block text-sm font-medium text-gray-600 mb-1.5"
                        >
                          City
                        </label>
                        <select
                          id="mobile-city-select"
                          value={selectedCity}
                          onChange={handleCityChange}
                          disabled={!selectedCountry}
                          className="w-full h-10 px-3 rounded-md bg-white text-gray-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ border: '1px solid #e5e7eb' }}
                        >
                          <option value="">{selectedCountry ? "-- Select City --" : "Select country first"}</option>
                          {availableCities.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      </div> */}

                      <Button
                        onClick={handleCountrySubmit}
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={!selectedCountry || !selectedCity}
                      >
                        Submit
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-100">
                <Link href="/book-consultation">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
