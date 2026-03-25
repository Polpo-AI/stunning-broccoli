'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';
import { Mail, Brain, FileText, CircleCheck as CheckCircle, Send } from 'lucide-react';

const steps = [
    { icon: Mail, label: 'Email arriva' },
    { icon: Brain, label: 'AI legge e capisce' },
    { icon: FileText, label: 'Crea bozza' },
    { icon: CheckCircle, label: 'Tu approvi' },
    { icon: Send, label: 'Invio' },
];

const ACCENT_COLOR = '#00FFC6';
const DIM_COLOR = '#1e293b';

export default function ExampleStepsLiquidPinned() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Scroll bidirezionale legato matematicamente al wrapper per la massima fluidità.
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    });

    // Applichiamo una fisica a molla (spring) per ammorbidire lo scroll, creando l'effetto "liquido" meno scattoso.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, // Più basso = più morbido
        damping: 30,    // Resistenza per evitare overshooting
        restDelta: 0.001
    });

    // Dividiamo 0->1 in 9 segmenti: 5 quadrati e 4 linee.
    // Segmento = 1 / 9 = 0.1111...
    const SEGMENT = 1 / 9;

    // Mouse proximity tracking for interactive glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        // Wrapper molto alto per consumare scroll. Mobile richiede un po' più di spazio per la lettura verticale.
        <section
            ref={wrapperRef}
            id="esempio"
            onMouseMove={handleMouseMove}
            className="relative min-h-[240vh] md:min-h-[250vh] bg-[#07091A]"
        >

            {/* Sticky Inner Container */}
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center">

                <div className="relative max-w-6xl mx-auto px-6 w-full">
                    <div className="text-center mb-24 md:mb-32">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase opacity-80" style={{ color: ACCENT_COLOR }}>
                            Esempio di Assistente AI
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
                            Come lavora il tuo agente.
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
                            Scorri verso il basso per completare il processo dall'arrivo dell'email fino all'invio.
                        </p>
                    </div>

                    {/* DESKTOP LAYOUT (Horizontal) */}
                    <div className="hidden md:flex items-start justify-between relative max-w-5xl mx-auto">

                        {/* Passive Line base fra tutti gli step */}
                        <div className="absolute top-8 left-[10%] right-[10%] h-1 bg-slate-800 -z-20" />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isLast = idx === steps.length - 1;

                            // Calcolo per questo box (segmento idx * 2)
                            const boxStart = idx * 2 * SEGMENT;
                            const boxEnd = boxStart + SEGMENT;
                            const boxProgress = useTransform(smoothProgress, [boxStart, boxEnd], [0, 1]);

                            // Condizione: se fill > 10%, attivi gli accenti
                            const isActive = useTransform(boxProgress, (val: number) => val > 0.1);

                            const isDone = useTransform(boxProgress, (val: number) => val >= 0.99);

                            const borderColor = useTransform(isActive, (active: boolean) => active ? ACCENT_COLOR : DIM_COLOR);
                            const iconColor = useTransform(isActive, (active: boolean) => active ? '#ffffff' : '#64748b');
                            const iconOpacity = useTransform(isActive, (active: boolean) => active ? 1 : 0.5);

                            // Calcolo per la linea di connessione successiva (segmento idx * 2 + 1)
                            const lineStart = boxEnd;
                            const lineEnd = lineStart + SEGMENT;
                            const lineProgress = useTransform(smoothProgress, [lineStart, lineEnd], [0, 1]);

                            return (
                                <div key={step.label} className="relative flex flex-col items-center flex-1">

                                    {/* Step Box */}
                                    <div className="relative z-10 flex flex-col items-center gap-4 group">
                                        <motion.div
                                            className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-transparent border-[2px] transition-all duration-300 overflow-hidden relative"
                                            style={{
                                                borderColor,
                                                boxShadow: isActive.get() ? `0 0 15px -8px ${ACCENT_COLOR}44` : 'none'
                                            }}
                                            whileHover={{ scale: 1.05, boxShadow: `0 0 25px -2px ${ACCENT_COLOR}88` }}
                                        >
                                            {/* Safe zone buffer background */}
                                            <div className="absolute inset-0 bg-[#07091A]" />

                                            {/* Ripple Pulse Overlay */}
                                            <motion.div
                                                className="absolute inset-0 bg-white/10 opacity-0"
                                                animate={isActive.get() ? {
                                                    opacity: [0, 0.1, 0],
                                                    scale: [0.9, 1.1, 1],
                                                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                                } : {}}
                                            />

                                            {/* Bordo curvo simulato per l'effetto liquido usando un border-radius custom sul content interno */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 origin-bottom"
                                                style={{
                                                    backgroundColor: ACCENT_COLOR,
                                                    scaleY: boxProgress,
                                                    height: '100%',
                                                    borderTopLeftRadius: '4px',
                                                    borderTopRightRadius: '4px',
                                                }}
                                            />

                                            <motion.div className="relative z-10 transition-colors duration-200" style={{ color: iconColor, opacity: iconOpacity }}>
                                                <Icon className="w-7 h-7" strokeWidth={2} />
                                            </motion.div>
                                        </motion.div>

                                        <motion.span
                                            style={{ color: iconColor }}
                                            className="text-sm font-bold text-center max-w-[100px] leading-tight transition-colors duration-200 group-hover:text-white"
                                        >
                                            {step.label}
                                        </motion.span>
                                    </div>

                                    {/* Linea orizzontale di riempimento continuo verso il prossimo step */}
                                    {!isLast && (
                                        <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-1 z-0 pointer-events-none">
                                            {/* Passive background line */}
                                            <div className="absolute inset-0 bg-slate-800" />

                                            {/* Active progress line */}
                                            <motion.div
                                                className="absolute inset-0 origin-left bg-[#00FFC6]"
                                                style={{ scaleX: lineProgress }}
                                            />

                                            {/* Ripple moving along the active segment */}
                                            <motion.div
                                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                                style={{ left: '-10%' }}
                                                animate={isActive.get() ? {
                                                    left: ['-20%', '120%'],
                                                    opacity: [0, 0.6, 0],
                                                    transition: {
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                        delay: idx * 0.8
                                                    }
                                                } : { opacity: 0 }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* MOBILE LAYOUT (Vertical Stack) */}
                    <div className="flex md:hidden flex-col items-start px-4 max-w-sm mx-auto relative mt-8">

                        {/* Base passive vertical line */}
                        <div className="absolute top-8 bottom-8 left-[3.25rem] -ml-[2px] w-1 bg-slate-800 -z-20" />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isLast = idx === steps.length - 1;

                            // Calcolo block timing esattamente uguale per mobile
                            const boxStart = idx * 2 * SEGMENT;
                            const boxEnd = boxStart + SEGMENT;
                            const boxProgress = useTransform(smoothProgress, [boxStart, boxEnd], [0, 1]);

                            const isActive = useTransform(boxProgress, (val: number) => val > 0.1);

                            const borderColor = useTransform(isActive, (active: boolean) => active ? ACCENT_COLOR : DIM_COLOR);
                            const iconColor = useTransform(isActive, (active: boolean) => active ? '#ffffff' : '#64748b');
                            const iconOpacity = useTransform(isActive, (active: boolean) => active ? 1 : 0.5);

                            // Linea progressiva per mobile
                            const lineStart = boxEnd;
                            const lineEnd = lineStart + SEGMENT;
                            const lineProgress = useTransform(smoothProgress, [lineStart, lineEnd], [0, 1]);

                            return (
                                <div key={step.label} className={`relative flex items-center gap-6 w-full ${isLast ? '' : 'pb-14'}`}>

                                    {/* Step Box */}
                                    <motion.div
                                        className="relative z-10 w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-transparent border-[2px] transition-colors duration-200 overflow-hidden"
                                        style={{ borderColor }}
                                    >
                                        {/* Effetto Liquido Mobile */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 origin-bottom"
                                            style={{
                                                backgroundColor: ACCENT_COLOR,
                                                scaleY: boxProgress,
                                                height: '100%',
                                                borderTopLeftRadius: '4px',
                                                borderTopRightRadius: '4px',
                                            }}
                                        />

                                        <motion.div className="relative z-10 transition-colors duration-200" style={{ color: iconColor, opacity: iconOpacity }}>
                                            <Icon className="w-7 h-7" strokeWidth={2} />
                                        </motion.div>
                                    </motion.div>

                                    {/* Label */}
                                    <motion.div
                                        style={{ color: iconColor }}
                                        className="text-base font-bold leading-tight transition-colors duration-200"
                                    >
                                        {step.label}
                                    </motion.div>

                                    {/* Active Bar filling downwards to the next step */}
                                    {!isLast && (
                                        <div className="absolute top-[4rem] bottom-0 left-[2rem] ml-[-2px] w-1 z-0 pointer-events-none">
                                            <motion.div
                                                className="w-full origin-top bg-[#00FFC6]"
                                                style={{ scaleY: lineProgress, height: '100%' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <motion.div
                        style={{ opacity: smoothProgress }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-block px-6 py-3 rounded-xl border border-white/10 text-white font-semibold">
                            Tutto avviene in automatico.
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
