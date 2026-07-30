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
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] origin-left bg-[var(--color-secondary)] shadow-[0_0_10px_rgba(45,122,45,0.7)]"
      style={{ scaleX }}
    />
  );
}
