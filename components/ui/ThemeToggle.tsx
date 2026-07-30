"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-full transition-all duration-300 border border-gray-200 dark:border-[#222F43] bg-gray-100/90 dark:bg-[#161F2E] hover:bg-gray-200 dark:hover:bg-[#1F2C40] text-gray-700 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer shadow-sm ${className}`}
      aria-label={resolvedTheme === "dark" ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      title={resolvedTheme === "dark" ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      id="theme-toggle-btn"
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-amber-400"
          >
            <Sun size={18} className="fill-amber-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-slate-700"
          >
            <Moon size={18} className="fill-slate-700/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
