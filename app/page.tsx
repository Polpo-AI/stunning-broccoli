import DockNav from '@/components/dock-nav';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import StorytellingSection from '@/components/storytelling-section';
import ChiSiamoSection from '@/components/chi-siamo-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';
import LiquidBackground from '@/components/effects/liquid-bg';
import GrainyOverlay from '@/components/effects/grainy-overlay';
import TechDecoratives from '@/components/effects/tech-decoratives';

export default function Home() {
  return (
    <>
      <LiquidBackground />
      <GrainyOverlay />
      <TechDecoratives />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <DockNav />
        <HeroSection />
        <ServicesSection />
        <StorytellingSection />
        <ChiSiamoSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
