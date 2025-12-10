import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { SiPaypal, SiVisa, SiMastercard } from "react-icons/si";

export default function Footer() {
  const companyLinks = [
    { name: "About", href: "/about-us" },    
    { name: "Blog", href: "/blog" },
  ];

  const serviceLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Corporate Training", href: "/corporate" },
    { name: "Certifications", href: "#certifications" },
  ];

  const socialLinks = [
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/channel/UC6WBKrHkB3HItab3QXg71Ow" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/acesynergisolutions/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/acesynergitrainings" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/acesynergi.trainings" },
  ];

  const topCategories = [
    { name: "Project Management Courses", href: "#" },
    { name: "Agile Management Courses", href: "#" },
    { name: "IT Service Management Courses", href: "#" },
    { name: "Quality Management Courses", href: "#" },
    { name: "Soft Skills Courses", href: "#" },
  ];

  const topCourses = [
    { name: "PMP® Certification", href: "#" },
    { name: "PRINCE2 Foundation and Practitioner Certification", href: "#" },
    { name: "PRINCE2 Agile® Foundation and Practitioner Certification", href: "#" },
    { name: "ITIL 4 Foundation Certification", href: "#" },
    { name: "ITIL 4 Strategist Direct Plan and Improve Certification", href: "#" },
    { name: "CSM Certification", href: "#" },
    { name: "Lean Six Sigma Green Belt Certification", href: "#" },
    { name: "Lean Six Sigma Black Belt Training Certification", href: "#" },
    { name: "CAPM Certification", href: "#" },
    { name: "Project Management Techniques Training", href: "#" },
    { name: "PMI-ACP® Training", href: "#" },
    { name: "Conflict Management Training", href: "#" },
    { name: "Management Skills Training", href: "#" },
    { name: "Leadership Skills Training", href: "#" },
    { name: "Certified Process Mapping Practitioner Training", href: "#" },
    { name: "Agile Scrum Methodology & Practice Training", href: "#" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Rescheduling Policy", href: "/rescheduling-policy" },    
  ];

  return (
    <footer className="bg-[#0F172A] text-white" data-testid="footer" id="contact">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Category Section */}
        <div className="mb-12">
          <h3 className="text-secondary text-lg font-semibold mb-4">Top Category</h3>
          <div className="flex flex-wrap gap-2">
            {topCategories.map((category, index) => (
              <span key={category.name} className="flex items-center">
                <a
                  href={category.href}
                  className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300 text-sm"
                  data-testid={`link-footer-category-${index}`}
                >
                  {category.name}
                </a>
                {index < topCategories.length - 1 && (
                  <span className="text-white/40 mx-2">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Top Courses Section */}
        <div className="mb-12">
          <h3 className="text-secondary text-lg font-semibold mb-4">Top Courses</h3>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {topCourses.map((course, index) => (
              <span key={course.name} className="flex items-center">
                <a
                  href={course.href}
                  className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300 text-sm"
                  data-testid={`link-footer-course-${index}`}
                >
                  {course.name}
                </a>
                {index < topCourses.length - 1 && (
                  <span className="text-white/40 mx-2">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Original Columns + Legal Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-secondary text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-secondary text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-secondary text-lg font-semibold mb-4">Reach Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@acesynergi.com"
                  className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300"
                  data-testid="link-footer-email"
                >
                  info@acesynergi.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300"
                  data-testid="link-footer-phone"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-[#F1F5F9]">
                123 Learning Street
                <br />
                Education City, EC 12345
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#F1F5F9] hover:text-[#22D3EE] transition-all duration-300"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <p className="text-sm text-[#F1F5F9]">
            © 2025 AceSynergi. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#F1F5F9]">We Accept:</span>
            <div className="flex items-center gap-3">
              <SiPaypal className="w-8 h-8 text-[#F1F5F9] hover:text-[#22D3EE] transition-colors" title="PayPal" />
              <SiVisa className="w-10 h-10 text-[#F1F5F9] hover:text-[#22D3EE] transition-colors" title="Visa" />
              <SiMastercard className="w-8 h-8 text-[#F1F5F9] hover:text-[#22D3EE] transition-colors" title="MasterCard" />
              <div className="flex items-center justify-center w-8 h-8 rounded bg-white/10 text-[#F1F5F9] hover:text-[#22D3EE] transition-colors" title="Maestro">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <circle cx="9" cy="12" r="7" fillOpacity="0.8" />
                  <circle cx="15" cy="12" r="7" fillOpacity="0.6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const shouldOpenNewTab = social.name === "LinkedIn" || social.name === "YouTube" || social.name === "Facebook" || social.name === "Instagram";
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                  aria-label={social.name}
                  {...(shouldOpenNewTab && {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  })}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
