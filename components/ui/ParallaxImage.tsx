"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative overflow-hidden rounded-2xl",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <motion.div
      ref={containerRef}
      className={containerClassName}
      initial={{ opacity: 0, clipPath: "inset(10% 0 10% 0 round 1rem)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0 round 1rem)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y, scale }} className="w-full h-full relative min-h-[ inherit]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />
      </motion.div>
    </motion.div>
  );
}
