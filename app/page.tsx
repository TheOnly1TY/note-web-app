import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import Features from "./_components/Features";
import Benefits from "./_components/Benefits";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";
import LenisWrapper from "./_components/LenisWrapper";

export default function Page() {
  return (
    <div className="bg-neutral-50">
      <LenisWrapper>
        <Navbar />
        <HeroSection />
        <Features />
        <Benefits />
        <Testimonials />
        <FAQ />
        <Footer />
      </LenisWrapper>
    </div>
  );
}
