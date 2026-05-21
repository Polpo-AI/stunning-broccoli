'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle } from 'lucide-react';
import NewVersion from './NewVersion';
import OldVersion from './OldVersion';

/* ─── Sito Avv. Giulia Bianchi · TOGGLE vecchio ↔ nuovo ────────────────────
   Pulsante in alto a destra che fa switchare tra:
   - NUOVO: corporate premium moderno (default)
   - VECCHIO: anni 2010 brutto (per mostrare l'effetto "1000 volte meglio") */

export default function LiberoProfessionistaSite() {
  const [showOld, setShowOld] = useState(false);

  return (
    <div className="relative">
      {/* Toggle floating in alto a destra */}
      <button
        onClick={() => setShowOld((v) => !v)}
        className="fixed top-4 right-4 z-[9999] inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
        style={
          showOld
            ? {
                background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(34,211,238,0.4)',
              }
            : {
                background: 'rgba(11,18,40,0.95)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(16px)',
              }
        }
        aria-label="Toggle vecchio/nuovo sito"
      >
        {showOld ? (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mostra il nuovo</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Vedi com'era prima 😅</span>
          </>
        )}
      </button>

      {/* Crossfade tra vecchio e nuovo */}
      <AnimatePresence mode="wait">
        {showOld ? (
          <motion.div
            key="old"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OldVersion />
          </motion.div>
        ) : (
          <motion.div
            key="new"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NewVersion />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
