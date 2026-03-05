'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, Brain, FileText, CircleCheck as CheckCircle, Send, ArrowDown } from 'lucide-react';

const steps = [
    { icon: Mail, label: 'Email arriva' },
    { icon: Brain, label: 'AI legge e capisce' },
    { icon: FileText, label: 'Crea bozza' },
    { icon: CheckCircle, label: 'Tu approvi' },
    { icon: Send, label: 'Invio' },
];

const ACCENT_COLOR = '#00FFC6';
const ACCENT_COLOR_TRANSPARENT = 'rgba(0, 255, 198, 0.15)';
const DIM_COLOR = '#1e293b';

export default function ExampleStepsPinnedScroll() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Mappa l'intero wrapper: inizia quando il top del wrapper tocca il top della viewport,
    // finisce quando il bottom del wrapper tocca il bottom della viewport.
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    });

    // Salta animazione
    const handleSkip = () => {
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const offset = rect.bottom + window.scrollY - window.innerHeight;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    const globalProgressScaleX = prefersReducedMotion ? 1 : scrollYProgress;

    return (
        <section ref={wrapperRef} id="esempio" className="relative h-[300vh] bg-[#07091A]">

            {/* Sticky Inner Container */}
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center">

                {/* Global Progress Bar at the top of the sticky UI */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800 z-50">
                    <motion.div
                        className="h-full origin-left"
                        style={{
                            backgroundColor: ACCENT_COLOR,
                            scaleX: globalProgressScaleX
                        }}
                    />
                </div>

                {/* Skip button area */}
                <div className="absolute top-6 right-6 z-50">
                    <button
                        onClick={handleSkip}
                        className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md transition-colors"
                    >
                        Salta animazione <ArrowDown className="inline w-3 h-3 ml-1" />
                    </button>
                </div>

                <div className="relative max-w-6xl mx-auto px-6 w-full mt-10 md:mt-0">
                    <div className="text-center mb-16 md:mb-24">
                        <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase opacity-80" style={{ color: ACCENT_COLOR }}>
                            Esempio di Assistente AI
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
                            Come lavora il tuo agente.
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
                            Scorri per completare il processo dall'arrivo dell'email fino all'invio.
                        </p>
                    </div>

                    {/* DESKTOP LAYOUT (Horizontal) */}
                    <div className="hidden md:flex items-start justify-between relative max-w-5xl mx-auto">

                        {/* Base passive Line between all steps */}
                        <div className="absolute top-8 left-[10%] right-[10%] h-1 bg-slate-800 -z-20" />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isLast = idx === steps.length - 1;

                            // 5 blocks di scroll.
                            // Block i: da idx * 0.2 a (idx + 1) * 0.2
                            const blockStart = idx * 0.2;
                            const blockEnd = blockStart + 0.2;

                            const stepProgress = useTransform(scrollYProgress, [blockStart, blockEnd], [0, 1]);

                            // Stato colori in base al progress del blocco
                            const borderColor = prefersReducedMotion ? ACCENT_COLOR : useTransform(stepProgress, [0, 1], [DIM_COLOR, ACCENT_COLOR]);
                            const iconColor = prefersReducedMotion ? ACCENT_COLOR : useTransform(stepProgress, [0.5, 1], ['#64748b', ACCENT_COLOR]); // slate-500 -> accent

                            return (
                                <div key={step.label} className="relative flex flex-col items-center flex-1">
                                    {/* Step Box */}
                                    <div className="relative z-10 flex flex-col items-center gap-4">
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#0A0F1E] border-[2px] overflow-hidden relative"
                                            style={{
                                                borderColor,
                                            }}
                                        >
                                            {/* Fill interno che cresce dal basso */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 origin-bottom"
                                                style={{
                                                    backgroundColor: ACCENT_COLOR_TRANSPARENT,
                                                    scaleY: prefersReducedMotion ? 1 : stepProgress,
                                                    height: '100%'
                                                }}
                                            />

                                            <motion.div className="relative z-10" style={{ color: iconColor }}>
                                                <Icon className="w-7 h-7" strokeWidth={2} />
                                            </motion.div>
                                        </motion.div>

                                        <motion.span
                                            style={{
                                                color: prefersReducedMotion ? '#ffffff' : useTransform(stepProgress, [0, 1], ['#64748b', '#ffffff'])
                                            }}
                                            className="text-sm font-bold text-center max-w-[100px] leading-tight transition-colors"
                                        >
                                            {step.label}
                                        </motion.span>
                                    </div>

                                    {/* Active Bar filling up to the next step (fills CONCURRENTLY with the next step's box) */}
                                    {!isLast && (
                                        <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-1 z-0">
                                            <motion.div
                                                className="h-full origin-left"
                                                style={{
                                                    backgroundColor: ACCENT_COLOR,
                                                    scaleX: prefersReducedMotion ? 1 : useTransform(scrollYProgress, [(idx + 1) * 0.2, (idx + 2) * 0.2], [0, 1])
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* MOBILE LAYOUT (Vertical Stack) */}
                    <div className="flex md:hidden flex-col items-start px-4 max-w-sm mx-auto relative mt-8">

                        {/* Background passive vertical line */}
                        <div className="absolute top-8 bottom-8 left-[3.25rem] -ml-[2px] w-1 bg-slate-800 -z-20" />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isLast = idx === steps.length - 1;

                            const blockStart = idx * 0.2;
                            const blockEnd = blockStart + 0.2;

                            const stepProgress = useTransform(scrollYProgress, [blockStart, blockEnd], [0, 1]);

                            const borderColor = prefersReducedMotion ? ACCENT_COLOR : useTransform(stepProgress, [0, 1], [DIM_COLOR, ACCENT_COLOR]);
                            const iconColor = prefersReducedMotion ? ACCENT_COLOR : useTransform(stepProgress, [0.5, 1], ['#64748b', ACCENT_COLOR]);

                            return (
                                <div key={step.label} className={`relative flex items-center gap-6 w-full ${isLast ? '' : 'pb-12'}`}>
                                    {/* Step Box */}
                                    <motion.div
                                        className="relative z-10 w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-[#0A0F1E] border-[2px] overflow-hidden"
                                        style={{ borderColor }}
                                    >
                                        {/* Fill interno che cresce dal basso */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 origin-bottom"
                                            style={{
                                                backgroundColor: ACCENT_COLOR_TRANSPARENT,
                                                scaleY: prefersReducedMotion ? 1 : stepProgress,
                                                height: '100%'
                                            }}
                                        />

                                        <motion.div className="relative z-10" style={{ color: iconColor }}>
                                            <Icon className="w-7 h-7" strokeWidth={2} />
                                        </motion.div>
                                    </motion.div>

                                    {/* Label */}
                                    <motion.div
                                        style={{ color: prefersReducedMotion ? '#ffffff' : useTransform(stepProgress, [0, 1], ['#64748b', '#ffffff']) }}
                                        className="text-base font-bold leading-tight"
                                    >
                                        {step.label}
                                    </motion.div>

                                    {/* Active Bar filling downwards to the next step */}
                                    {!isLast && (
                                        <div className="absolute top-[4rem] bottom-0 left-[2rem] ml-[-2px] w-1 z-0">
                                            <motion.div
                                                className="w-full origin-top"
                                                style={{
                                                    backgroundColor: ACCENT_COLOR,
                                                    scaleY: prefersReducedMotion ? 1 : useTransform(scrollYProgress, [(idx + 1) * 0.2, (idx + 2) * 0.2], [0, 1]),
                                                    height: '100%'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <motion.div
                        style={{ opacity: prefersReducedMotion ? 1 : scrollYProgress }}
                        className="mt-16 text-center"
                    >
                        {/* Text revealed at the very end */}
                        <div className="inline-block px-6 py-3 rounded-xl border border-[#00FFC6]/20 bg-[#00FFC6]/5 text-[#00FFC6] font-semibold">
                            Processo completato senza sforzo manuale.
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
