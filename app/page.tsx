import Navbar from '@/components/landing/Navbar';
import TentacleCurtainHero from '@/components/landing/TentacleCurtainHero';
import ProblemSection from '@/components/landing/ProblemSection';
import ServicesSection from '@/components/landing/ServicesSection';
import ExampleStepsLiquidPinned from '@/components/landing/ExampleStepsLiquidPinned';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TrustSection from '@/components/landing/TrustSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="bg-[#070B14] min-h-screen">
      <Navbar />
      <TentacleCurtainHero />
      <ProblemSection />
      <ServicesSection />
      <ExampleStepsLiquidPinned />
      <BenefitsSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </main>
  );
}
