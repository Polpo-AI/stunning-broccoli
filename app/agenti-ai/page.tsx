import AgentiHeroV2 from '@/components/pages/v2/AgentiHeroV2';
import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';

export const metadata = { title: 'Agenti AI su misura · PolpoAI' };

export default function AgentiPage() {
  return (
    <>
      <AgentiHeroV2 />
      <CTAFinalV2 heading={<>Quale <em className="italic text-magenta">noia</em> automatizziamo?</>} />
    </>
  );
}
