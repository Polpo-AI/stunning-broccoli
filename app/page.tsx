import dynamic from 'next/dynamic';
import ServicesSection from '@/components/landing/ServicesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CTASection from '@/components/landing/CTASection';

import CleanHero from '@/components/landing/CleanHero';

export default function Home() {
  return (
    <div className="bg-[var(--bg-base)] relative -mt-[72px]">
      <CleanHero />
      <ServicesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}
