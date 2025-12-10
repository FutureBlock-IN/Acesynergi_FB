import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import FeaturedCourses from "@/components/FeaturedCourses";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCourses />
        {/* <CategoriesCarousel /> */}
        <TestimonialsCarousel />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
