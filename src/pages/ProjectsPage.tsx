import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import ScrollFadeHeader from "@/src/components/ScrollFadeHeader";
import ProjectSlider from "@/src/components/ProjectSlider";

interface ProjectsPageProps {
  ProjectItem: any;
  projects: any[];
  fadeIn: any;
  heroContainer: any;
  heroItem: any;
}

export default function ProjectsPage({ ProjectItem, projects, fadeIn, heroContainer, heroItem }: ProjectsPageProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale from 20vw down to a smaller size
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  // Move up as we scroll
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -250]);
  // Fade out slightly at the end of the transition
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  // Add blur as we scroll
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 20]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <div className="relative z-10">
      {/* Hero Header with Scroll Animation */}
      <div ref={containerRef} className="h-[120vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.div
            style={{ scale, y, opacity, filter }}
            className="flex flex-col items-center justify-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20vw] font-display tracking-tighter leading-[0.8] text-white uppercase whitespace-nowrap"
            >
              PROJECTS
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="relative z-20">
        <ProjectSlider projects={projects} />
      </div>

      <div className="h-[20vh]" />
    </div>
  );
}
