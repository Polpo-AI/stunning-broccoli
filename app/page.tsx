import ServicesSection from '@/components/landing/ServicesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CTASection from '@/components/landing/CTASection';
import CleanHero from '@/components/landing/CleanHero';

export default function Home() {
  return (
    <div className="relative -mt-[72px]">
      <CleanHero />
      {/* below-fold: il browser salta rendering finché non vicino al viewport */}
      <div className="below-fold"><ServicesSection /></div>
      <div className="below-fold"><HowItWorksSection /></div>
      <div className="below-fold"><BenefitsSection /></div>
      <div className="below-fold"><CTASection /></div>
    </div>
  );
}
