import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    alert("Message sent! (Mock)");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Decorative gradient blur */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display tracking-tight text-white mb-2 uppercase">Get in touch</h2>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">I'd love to hear from you</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase ml-1">Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase ml-1">Email</label>
                    <input 
                      required
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-white text-black rounded-xl font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 group"
                  >
                    <span>Send Message</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
