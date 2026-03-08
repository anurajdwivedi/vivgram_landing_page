import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";

/* Code-split below-the-fold sections into separate chunks */
const ProblemSection = dynamic(() => import("@/components/sections/problem-section"));
const FeaturesSection = dynamic(() => import("@/components/sections/features-section"));
const HowItWorks = dynamic(() => import("@/components/sections/how-it-works"));
const RolesSection = dynamic(() => import("@/components/sections/roles-section"));
const ProductPreview = dynamic(() => import("@/components/sections/product-preview"));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section"));
const MidCTA = dynamic(() => import("@/components/sections/mid-cta"));
const SecuritySection = dynamic(() => import("@/components/sections/security-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const CTASection = dynamic(() => import("@/components/sections/cta-section"));
const Footer = dynamic(() => import("@/components/layout/footer"));

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
