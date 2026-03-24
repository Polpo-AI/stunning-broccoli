'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  delay: number; // in seconds
}

interface WhatsAppMockupProps {
  messages: Message[];
}

export default function WhatsAppMockup({ messages }: WhatsAppMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-[320px] rounded-[2.5rem] border-[8px] border-[#1f2937] bg-[#ece5dd] shadow-2xl overflow-hidden h-[550px] flex flex-col">
      {/* Notch / Top Bar */}
      <div className="absolute top-0 inset-x-0 h-6 bg-[#1f2937] rounded-b-xl z-20 flex justify-center">
        <div className="w-20 h-4 bg-black rounded-b-xl" />
      </div>

      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white p-4 pt-8 flex items-center gap-3 shadow-md z-10 relative">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
          <Image src="/logo a.jpg" alt="Bot Avatar" width={40} height={40} className="object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-[15px] leading-tight flex items-center gap-1.5">
            Assistente AI
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </h4>
          <p className="text-xs text-white/80">Sempre online</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, scale: 0.8, x: msg.sender === 'bot' ? -20 : 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: msg.delay,
            }}
            className={`max-w-[85%] rounded-2xl p-3 text-[14px] leading-relaxed relative shadow-sm ${
              msg.sender === 'bot'
                ? 'bg-white text-slate-800 self-start rounded-tl-sm'
                : 'bg-[#dcf8c6] text-slate-800 self-end rounded-tr-sm'
            }`}
          >
            {msg.text}
            <span className="block text-[10px] text-slate-400 mt-1 text-right">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center shadow-sm">
          <span className="text-slate-400 text-sm">Scrivi un messaggio...</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#128c7e] flex items-center justify-center text-white shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
