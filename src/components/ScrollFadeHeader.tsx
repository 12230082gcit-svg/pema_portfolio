import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollFadeHeaderProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  slideFrom?: "left" | "right" | "none";
  stayVisible?: boolean;
  noPadding?: boolean;
}

export default function ScrollFadeHeader({ 
  children, 
  className = "", 
  align = "left", 
  slideFrom = "left",
  stayVisible = true,
  noPadding = false
}: ScrollFadeHeaderProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  // If stayVisible is true, we don't fade out at the end
  const opacityRange = stayVisible ? [0, 1, 1] : [0, 1, 1, 0];
  const opacitySteps = stayVisible ? [0, 0.3, 1] : [0, 0.3, 0.7, 1];
  
  const opacity = useTransform(scrollYProgress, opacitySteps, opacityRange);
  
  const startX = slideFrom === "left" ? -100 : slideFrom === "right" ? 100 : 0;
  const x = useTransform(scrollYProgress, [0, 0.4], [startX, 0]);

  const alignmentClasses = noPadding 
    ? (align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center")
    : (align === "left" ? "text-left pl-12 md:pl-32" : align === "right" ? "text-right pr-12 md:pr-32" : "text-center px-6");

  return (
    <motion.h2 
      ref={ref}
      style={{ opacity, x }}
      className={`text-3xl md:text-5xl font-display tracking-tight leading-tight uppercase mb-12 text-white ${alignmentClasses} ${className}`}
    >
      {children}
    </motion.h2>
  );
}
