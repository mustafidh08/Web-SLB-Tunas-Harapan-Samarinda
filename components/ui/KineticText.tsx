"use client";

import { motion, Variants } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
  defaultColorClass?: string;
}

const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

export default function KineticText({
  text,
  className = "",
  as: Component = "h2",
  delay = 0,
  highlightWords = [],
  highlightClass = "text-[var(--color-accent)]",
  defaultColorClass = "",
}: KineticTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      rotateX: -30,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  const MotionComponent = motionComponents[Component] || motion.h2;

  return (
    <MotionComponent
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "");
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase() || word.toLowerCase().includes(hw.toLowerCase())
        );

        const wordClass = isHighlighted ? highlightClass : (defaultColorClass || "text-inherit");

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block transform-gpu ${wordClass}`}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}
