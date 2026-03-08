import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";

import ProblemSection from "@/components/sections/problem-section";
import FeaturesSection from "@/components/sections/features-section";
import HowItWorks from "@/components/sections/how-it-works";
import RolesSection from "@/components/sections/roles-section";

import ProductPreview from "@/components/sections/product-preview";
import TestimonialSection from "@/components/sections/testimonial-section";
import MidCTA from "@/components/sections/mid-cta";
import SecuritySection from "@/components/sections/security-section";
import FAQSection from "@/components/sections/faq-section";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <RolesSection />

        <ProductPreview />
        <TestimonialSection />
        <MidCTA />
        <SecuritySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
