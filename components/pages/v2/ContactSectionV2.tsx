'use client';

import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';

export default function ContactSectionV2() {
  return (
    <CTAFinalV2
      heading={<>Mandaci <em className="italic text-magenta">due righe.</em></>}
      subheading="Una persona vera ti risponde entro 24 ore. Niente form a 12 campi, niente call automatiche."
      ctaLabel="Invia"
    />
  );
}
