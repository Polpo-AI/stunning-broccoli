import dynamic from 'next/dynamic';
import ProblemSection from '@/components/landing/ProblemSection';
import ServicesSection from '@/components/landing/ServicesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TrustSection from '@/components/landing/TrustSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Navbar = dynamic(() => import('@/components/landing/Navbar'), { ssr: false });

const TentacleCurtainHero = dynamic(() => import('@/components/landing/TentacleCurtainHero'), {
  ssr: true,
  loading: () => <div className="h-screen bg-[#070B14]" />
});

const ExampleStepsLiquidPinned = dynamic(() => import('@/components/landing/ExampleStepsLiquidPinned'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="bg-[#070B14] min-h-screen relative">
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
