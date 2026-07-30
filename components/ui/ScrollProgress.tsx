"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] origin-left bg-[var(--color-accent)] shadow-[0_0_12px_rgba(245,200,0,0.85)]"
      style={{ scaleX }}
    />
  );
}
