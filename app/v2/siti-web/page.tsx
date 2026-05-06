import SitiHeroV2 from '@/components/pages/v2/SitiHeroV2';
import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';

export const metadata = { title: 'Siti web su misura · PolpoAI' };

export default function SitiPage() {
  return (
    <>
      <SitiHeroV2 />
      <CTAFinalV2 heading={<>Pronti a <em className="italic text-magenta">essere trovati?</em></>} />
    </>
  );
}
