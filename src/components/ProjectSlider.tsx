import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import TiltedCard from "@/components/TiltedCard";

interface Project {
  id: string;
  title: string;
  client: string;
  roles: string;
  year: string;
  image: string;
}

interface ProjectSliderProps {
  projects: Project[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active project index based on scroll
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);
  
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest) => {
      const rounded = Math.round(latest);
      if (rounded !== index) {
        setIndex(rounded);
      }
    });
    return () => unsubscribe();
  }, [activeIndex, index]);

  const currentProject = projects[index] || projects[0];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 md:p-12">
        
        {/* Main Content */}
        <div 
          onClick={() => navigate(`/projects/${currentProject.id}`)}
          className="relative w-full max-w-5xl flex flex-col items-center justify-center z-10 cursor-pointer group"
        >
          
          {/* Image Container with TiltedCard */}
          <div className="relative w-full aspect-[16/9] flex items-center justify-center">
            <TiltedCard
              imageSrc={currentProject.image}
              altText={currentProject.title}
              captionText={currentProject.title}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`overlay-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <p className="text-white text-xs tracking-widest uppercase font-medium">
                      {currentProject.client}
                    </p>
                  </motion.div>
                </AnimatePresence>
              }
            />
          </div>

          {/* Large Title */}
          <div className="absolute -bottom-12 md:-bottom-16 w-full text-center pointer-events-none px-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${index}`}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-[5vw] font-display tracking-tighter leading-[0.9] text-white uppercase max-w-4xl mx-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
              >
                {currentProject.title}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
