'use client';

import ChatbotHeroV2 from './ChatbotHeroV2';
import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';
import PullQuoteV2 from '@/components/landing/v2/PullQuoteV2';

interface Props {
  industryEmoji: string;
  industryLabel: string;
  heroTitle: React.ReactNode;
  heroBody: string;
  quote: React.ReactNode;
  authorInitial: string;
  authorName: string;
  authorRole: string;
}

export default function VerticalChatbotPageV2(p: Props) {
  return (
    <>
      <ChatbotHeroV2
        industryEmoji={p.industryEmoji}
        industryLabel={p.industryLabel}
        title={p.heroTitle}
        body={p.heroBody}
      />
      <PullQuoteV2 chapter="— Voci dal campo" quote={p.quote} authorInitial={p.authorInitial} authorName={p.authorName} authorRole={p.authorRole} />
      <CTAFinalV2 heading={<>Vediamolo <em className="italic text-magenta">sul tuo caso.</em></>} />
    </>
  );
}
