import dynamic from 'next/dynamic';
import ServicesSection from '@/components/landing/ServicesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CTASection from '@/components/landing/CTASection';

const HomeHero = dynamic(() => import('@/components/landing/TentacleCurtainHero'), {
  ssr: true,
  loading: () => <div className="h-dvh bg-[#070B14]" />,
});

export default function Home() {
  return (
    <div className="bg-[var(--bg-base)] relative -mt-[72px]">
      <HomeHero />
      <ServicesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}
