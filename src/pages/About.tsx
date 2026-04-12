import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import TiltedCard from "@/components/TiltedCard";
import ScrollVelocity from "../components/ScrollVelocity";

interface AboutProps {
  fadeIn: any;
  GlassButton: any;
}

export default function About({ fadeIn, GlassButton }: AboutProps) {
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
              ABOUT
            </motion.h1>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-20 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
          >
            <TiltedCard
              imageSrc="https://lh3.googleusercontent.com/d/18_XiH4Q4gKAHGd48a2c7uzdCPOE4Fjaf"
              altText="Pema Seldyen"
              captionText="Pema Seldyen"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.02}
              showMobileWarning={false}
              showTooltip={false}
            />
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-6 uppercase">ABOUT ME</p>
            
            <p className="text-white leading-relaxed font-sans text-base md:text-lg max-w-xl mb-8">
              Hi, I’m Pema Seldyen, a UI/UX designer who helps beauty e-commerce brands make online shopping easier and less overwhelming. I use research-driven design to create experiences that feel simple, clear, and enjoyable.
            </p>

            <div className="space-y-12 mb-12">
              <div className="pt-8 border-t border-white/10">
                <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-8 uppercase">MY APPROACH</p>
                <div className="space-y-4">
                  {[
                    "Clarity-First Design Framework",
                    "Understand User Friction",
                    "Simplify Decision Paths",
                    "Guide with Intention",
                    "Build Purchase Confidence"
                  ].map((item, index) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                      <p className="text-sm md:text-base font-medium text-white uppercase tracking-wider">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex flex-wrap gap-4">
                <GlassButton 
                  onClick={() => window.open('https://drive.google.com/drive/folders/1I3GPm2ee30e02tuKq9dJiPWMZrfFhD_X', '_blank')}
                  className="px-6 py-2.5 text-[10px] tracking-widest font-sans font-semibold"
                >
                  Download CV
                </GlassButton>
                <GlassButton 
                  onClick={() => window.open('https://drive.google.com/drive/folders/1ugiucyfvV8bExzJkDQrJyaFmiUkhw-uG', '_blank')}
                  className="px-6 py-2.5 text-[10px] tracking-widest font-sans font-semibold"
                >
                  Download Resume
                </GlassButton>
              </div>
            </div>
        </motion.div>
      </div>

      {/* Skills & Hobbies Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 pt-20 border-t border-white/5"
      >
        {/* Skills Column */}
        <div className="md:col-span-2">
          <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-10 uppercase">TECHNICAL SKILLS</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "UI/UX Design", 
              "User Research", 
              "Interaction Design", 
              "Prototyping", 
              "Photography", 
              "Videography", 
              "UX Writing",
              "Wireframing",
              "Usability Testing",
              "User Behavior Analysis",
              "Responsive Design",
              "Design Systems"
            ].map((skill) => (
              <span key={skill} className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] tracking-widest text-gray-300 uppercase hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-center flex items-center justify-center">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies Column */}
        <div>
          <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-10 uppercase">HOBBIES</p>
          <div className="space-y-6">
            {[
              { label: "Reading", icon: "📚", desc: "Exploring design theory & fiction" },
              { label: "Photography", icon: "📸", desc: "Capturing moments in time" },
              { label: "Hiking", icon: "🥾", desc: "Finding inspiration in nature" }
            ].map((hobby) => (
              <div key={hobby.label} className="group flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300">
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">{hobby.icon}</span>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{hobby.label}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{hobby.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  </div>

  {/* Values Section */}
  <section className="relative mt-40 mb-20 overflow-hidden">
    <div className="space-y-8 mb-16">
      <ScrollVelocity
        texts={[
          "Clean Interfaces • Clarity first • Smooth User Journeys",
          "Smart UX Decisions • Empathy in Design • Design with Purpose"
        ]}
        velocity={50}
        className="text-4xl md:text-7xl font-display tracking-tight uppercase text-white"
      />
    </div>
  </section>
</div>
  );
}
