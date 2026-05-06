export default function MarqueeV2() {
  const Strip = () => (
    <span className="inline-flex items-center gap-12">
      su misura <Dot/> al posto tuo <Dot/> H24 <Dot/> in italiano <Dot/> senza fronzoli <Dot/> con cura
    </span>
  );
  return (
    <section className="py-8 border-y border-white/[0.06] bg-[#0A0F1C] relative z-10 overflow-hidden">
      <div className="marquee-track">
        <Strip /><Strip />
      </div>
    </section>
  );
}
const Dot = () => <span className="w-2 h-2 rounded-full bg-magenta inline-block" />;
