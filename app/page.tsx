import HeroV2 from '@/components/landing/v2/HeroV2';
import MarqueeV2 from '@/components/landing/v2/MarqueeV2';
import ServicesSectionV2 from '@/components/landing/v2/ServicesSectionV2';
import PullQuoteV2 from '@/components/landing/v2/PullQuoteV2';
import ProcessSectionV2 from '@/components/landing/v2/ProcessSectionV2';
import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';

export default function Home() {
  return (
    <>
      <HeroV2 />
      <MarqueeV2 />
      <ServicesSectionV2 />
      <PullQuoteV2
        chapter="— Cap. 02 / Voci"
        quote={<>«Il telefono ha smesso di squillare durante il servizio. <em className="italic text-magenta-soft font-light">È rimasta solo la cucina.</em>»</>}
        authorInitial="M"
        authorName="Marco Bianchi"
        authorRole="Padel Roma · cliente da 8 mesi"
      />
      <ProcessSectionV2 />
      <CTAFinalV2 heading={<>Parliamone <em className="italic text-magenta">davanti a un caffè.</em></>} />
    </>
  );
}
