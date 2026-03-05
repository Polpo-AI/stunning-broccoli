'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, Brain, FileText, CircleCheck as CheckCircle, Send } from 'lucide-react';

const steps = [
  { icon: Mail, label: 'Email arriva', color: '#22d3ee' },
  { icon: Brain, label: 'AI legge e capisce', color: '#06b6d4' },
  { icon: FileText, label: 'Crea bozza', color: '#0ea5e9' },
  { icon: CheckCircle, label: 'Tu approvi', color: '#22d3ee' },
  { icon: Send, label: 'Invio', color: '#06b6d4' },
];

export default function ExampleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The scroll target is the container of the section.
  // offset 'start 0.8' means the animation starts when the top of the section is at 80% viewport height.
  // offset 'end 0.4' means it finishes when the bottom of the section is at 40% viewport height.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  return (
    <section id="esempio" ref={containerRef} className="relative py-24 bg-[#07091A]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase opacity-80">
            Esempio di Assistente AI
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Come lavora il tuo agente AI.
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
            Prendi le email: le gestisce da solo, tu controlli solo il risultato finale.
          </p>
        </div>

        {/* Scroll-driven Steps Container */}
        <div className="relative w-full max-w-4xl mx-auto z-10">

          {/* DESKTOP LAYOUT (Horizontal) */}
          <div className="hidden md:flex items-start justify-between relative">

            {/* Background passive Line */}
            {/* spans from center of 1st column (10%) to center of 5th column (90%) */}
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-800/40 -z-10" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;

              // Illumination Math:
              // Total scroll = 1. Divided into 5 windows of 0.2.
              // Step box illuminates in the first 0.1 of its window.
              // Connection bar illuminates in the second 0.1 of its window.
              const stepStart = idx * 0.2;
              const stepEnd = stepStart + 0.1;
              const stepProgress = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);

              const barStart = stepEnd;
              const barEnd = (idx + 1) * 0.2;
              const barProgress = useTransform(scrollYProgress, [barStart, barEnd], [0, 1]);

              // Map properties based on stepProgress
              const opacity = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.3, 1]);
              const scale = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.95, 1.05]);
              const glow = prefersReducedMotion
                ? `0 0 24px ${step.color}66`
                : useTransform(stepProgress, [0, 1], ["0 0 0px rgba(0,0,0,0)", `0 0 24px ${step.color}66`]);
              const borderColor = prefersReducedMotion
                ? `${step.color}88`
                : useTransform(stepProgress, [0, 1], ["rgba(255,255,255,0.05)", `${step.color}88`]);
              const iconOpacity = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.5, 1]);

              const barWidth = prefersReducedMotion ? "100%" : useTransform(barProgress, [0, 1], ["0%", "100%"]);

              return (
                <div key={step.label} className="relative flex flex-col items-center flex-1">
                  {/* Step Box */}
                  <motion.div
                    style={{ opacity, scale }}
                    className="relative z-10 flex flex-col items-center gap-4"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#0A0F1E] border transition-colors duration-300"
                      style={{
                        boxShadow: glow,
                        borderColor: borderColor,
                        backgroundColor: useTransform(stepProgress, [0, 1], ["#0A0F1E", "#0c152a"]),
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `radial-gradient(circle at center, ${step.color}44, transparent)`,
                          opacity: useTransform(stepProgress, [0, 1], [0, 1])
                        }}
                      />
                      <motion.div style={{ opacity: iconOpacity }} className="relative z-10">
                        <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>

                    <motion.span
                      style={{ opacity }}
                      className="text-xs font-semibold text-slate-300 text-center max-w-[90px] leading-tight"
                    >
                      {step.label}
                    </motion.span>
                  </motion.div>

                  {/* Active Bar filling up to the next step */}
                  {!isLast && (
                    <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 z-0">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: barWidth,
                          background: `linear-gradient(90deg, ${step.color}, ${steps[idx + 1].color})`,
                          boxShadow: `0 0 10px ${step.color}55`
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE LAYOUT (Vertical Stack) */}
          <div className="flex md:hidden flex-col items-start px-2 sm:px-8 relative">

            {/* Background passive vertical line (from center of first icon to center of last icon) */}
            <div className="absolute top-8 bottom-8 left-[2.5rem] sm:left-[4rem] -ml-px w-0.5 bg-slate-800/40 -z-10" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;

              const stepStart = idx * 0.2;
              const stepEnd = stepStart + 0.1;
              const stepProgress = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);

              const barStart = stepEnd;
              const barEnd = (idx + 1) * 0.2;
              const barProgress = useTransform(scrollYProgress, [barStart, barEnd], [0, 1]);

              // Values
              const opacity = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.3, 1]);
              const scale = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.95, 1.05]);
              const glow = prefersReducedMotion
                ? `0 0 24px ${step.color}66`
                : useTransform(stepProgress, [0, 1], ["0 0 0px rgba(0,0,0,0)", `0 0 24px ${step.color}66`]);
              const borderColor = prefersReducedMotion
                ? `${step.color}88`
                : useTransform(stepProgress, [0, 1], ["rgba(255,255,255,0.05)", `${step.color}88`]);
              const iconOpacity = prefersReducedMotion ? 1 : useTransform(stepProgress, [0, 1], [0.5, 1]);

              const barHeight = prefersReducedMotion ? "100%" : useTransform(barProgress, [0, 1], ["0%", "100%"]);

              return (
                <div key={step.label} className={`relative flex items-start gap-6 w-full ${isLast ? '' : 'pb-14'}`}>
                  {/* Step Box */}
                  <motion.div
                    style={{ opacity, scale }}
                    className="relative z-10 w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-[#0A0F1E] border transition-colors duration-300"
                  // Inline styles on the wrapper to keep the glow on the element correctly
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl w-full h-full"
                      style={{
                        boxShadow: glow,
                        borderColor: borderColor,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        backgroundColor: useTransform(stepProgress, [0, 1], ["#0A0F1E", "#0c152a"]),
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at center, ${step.color}44, transparent)`,
                        opacity: useTransform(stepProgress, [0, 1], [0, 1])
                      }}
                    />
                    <motion.div style={{ opacity: iconOpacity }} className="relative z-10">
                      <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>

                  {/* Label next to the icon */}
                  <motion.div style={{ opacity }} className="pt-5">
                    <span className="text-base font-semibold text-slate-200 leading-tight">
                      {step.label}
                    </span>
                  </motion.div>

                  {/* Active Bar filling downwards to the next step */}
                  {!isLast && (
                    <div className="absolute top-[4rem] bottom-0 left-[2rem] -ml-px w-0.5 z-0">
                      <motion.div
                        className="w-full rounded-full"
                        style={{
                          height: barHeight,
                          background: `linear-gradient(180deg, ${step.color}, ${steps[idx + 1].color})`,
                          boxShadow: `0 0 10px ${step.color}55`
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STATS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 rounded-2xl border border-cyan-500/10 bg-white/[0.02] p-8 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {[
              { value: '-80%', label: 'tempo su email' },
              { value: '0', label: 'errori di distrazione' },
              { value: '100%', label: 'controllo tuo' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-extrabold text-cyan-400">{stat.value}</span>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 mt-8 max-w-lg mx-auto leading-relaxed">
            Risparmi tempo, fai meno errori e hai sempre il controllo. Il tuo AI agent fa il lavoro duro, tu prendi le decisioni.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
