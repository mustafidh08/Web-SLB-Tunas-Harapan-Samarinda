"use client";

import { MessageCircle, MapPin, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Tampilkan floating bar setelah pengguna scroll 180px dari atas
      if (window.scrollY > 180) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <div className="bg-[#161F2E]/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border border-gray-700/50 dark:border-[#222F43] p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-2 text-white">
            <a
              href="https://wa.me/6285250402074"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 !text-white font-bold text-xs rounded-xl shadow-md transition-all min-h-[44px]"
              style={{ color: "#ffffff" }}
              aria-label="Hubungi WhatsApp Admin Sekolah"
            >
              <MessageCircle size={16} className="text-white" />
              <span style={{ color: "#ffffff" }}>WhatsApp Admin</span>
            </a>

            <a
              href="/kontak"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] active:scale-95 !text-white font-bold text-xs rounded-xl shadow-md transition-all min-h-[44px]"
              style={{ color: "#ffffff" }}
              aria-label="Konsultasi Pendaftaran PPDB"
            >
              <PhoneCall size={16} className="text-white" />
              <span style={{ color: "#ffffff" }}>Konsultasi PPDB</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
