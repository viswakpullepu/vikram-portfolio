import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { X, Mail, Check, Send, Coffee } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [sentMessage, setSentMessage] = useState<boolean>(false);
  const [recruiterAgency, setRecruiterAgency] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<string>('Internship / Assistant Role');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vikram.sengupta.photo@gmail.com');
    sound.playFocusTick(1.5);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playShutter();
    setSentMessage(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e0f14] border border-neutral-700/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playFocusTick();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1.5 sm:mb-2">
          <Coffee className="w-3.5 h-3.5" />
          <span>SAY HELLO / GET IN TOUCH</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-cinzel)' }}>
          LET'S TALK
        </h2>

        <p className="text-xs text-neutral-300 mb-4 sm:mb-6 leading-relaxed">
          Whether you have an internship spot, need an assistant on set, or just want to chat about cameras and coffee — my inbox is always open.
        </p>

        {sentMessage ? (
          <div className="bg-emerald-950/60 border border-emerald-500/60 p-5 sm:p-6 rounded-2xl text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-emerald-200 font-mono">Message Sent!</h3>
            <p className="text-xs text-emerald-300/80">
              Thanks so much for reaching out. I check my emails every morning and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSentMessage(false);
                onClose();
              }}
              className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase mb-1">Your Name & Studio / Agency</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Lin · Creative Director, Studio 9"
                value={recruiterAgency}
                onChange={(e) => setRecruiterAgency(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase mb-1">What's on your mind?</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Internship / Assistant Role">Discussing an Internship / Assistant Opportunity</option>
                <option value="15-min Portfolio Review">15-minute Portfolio Review & Feedback</option>
                <option value="Editorial Shoot">Editorial / Commercial Shoot Booking</option>
                <option value="Casual Coffee">Casual Coffee / Mentorship Chat</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase mb-1">Note or message</label>
              <textarea
                rows={3}
                placeholder="Hey Vikram, saw your portfolio. Would love to have a quick chat..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-mono font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Note to Vikram</span>
            </button>
          </form>
        )}

        {/* Direct Email & Instagram Clipboard Strip */}
        <div className="mt-6 pt-4 border-t border-neutral-800 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <a
              href="https://www.instagram.com/rigzz.iii/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram: @rigzz.iii</span>
            </a>
            <span className="text-neutral-500 text-[10px]">DM Open</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-850">
            <div className="text-neutral-400 truncate max-w-[220px]">
              vikram.photo.archive@gmail.com
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
