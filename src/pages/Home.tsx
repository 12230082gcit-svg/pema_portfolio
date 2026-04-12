import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "@/components/LiquidEther";
import GlassSurface from "@/components/GlassSurface";
import ScrollVelocity from "../components/ScrollVelocity";
import BlurText from "@/components/BlurText";

// These components are shared, but for now I'll just import them or define them locally if needed.
// Ideally they should be in separate files.
// Since I'm refactoring, I'll assume they are available or I'll move them to components.

interface HomeProps {
  ScrollFadeHeader: any;
  GlassButton: any;
  DisplaceableLine: any;
  ProjectItem: any;
  fadeIn: any;
  heroContainer: any;
  heroItem: any;
  problems: any[];
  solutions: any[];
  projects: any[];
}

export default function Home({ 
  ScrollFadeHeader, 
  GlassButton, 
  DisplaceableLine, 
  ProjectItem,
  fadeIn,
  heroContainer,
  heroItem,
  problems,
  solutions,
  projects
}: HomeProps) {
  const navigate = useNavigate();
  const problemsRef = useRef(null);
  const solutionsRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress: problemsProgressRaw } = useScroll({
    target: problemsRef,
    offset: ["start 70%", "end 30%"]
  });

  const { scrollYProgress: solutionsProgressRaw } = useScroll({
    target: solutionsRef,
    offset: ["start 70%", "end 30%"]
  });

  const problemsProgress = useSpring(problemsProgressRaw, {
    stiffness: 30,
    damping: 25,
    restDelta: 0.001
  });

  const solutionsProgress = useSpring(solutionsProgressRaw, {
    stiffness: 30,
    damping: 25,
    restDelta: 0.001
  });

  const plusYProblems = useTransform(problemsProgress, [0, 1], ["5%", "95%"]);
  const plusYSolutions = useTransform(solutionsProgress, [0, 1], ["5%", "95%"]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        <motion.div 
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="relative z-10 max-w-[95vw]"
        >
          <div className="flex flex-col">
            <motion.h1 
              variants={heroItem}
              className="text-6xl md:text-[10vw] font-display tracking-tighter leading-[0.9] text-white"
            >
              FROM CONFUSION <br />
              TO CONFIDENT
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] md:gap-x-11 mt-4">
              <div className="flex items-center">
                <motion.h1 
                  variants={heroItem}
                  className="text-6xl md:text-[10vw] font-display tracking-tighter leading-[0.9] text-white"
                >
                  CHOICES
                </motion.h1>
              </div>
              
              <div className="flex items-center">
                <motion.p 
                  variants={heroItem}
                  className="text-[14px] tracking-[0.2em] leading-relaxed max-w-sm text-gray-300 uppercase font-sans font-medium"
                >
                  HELPING BEAUTY E-COMMERCE BRANDS SIMPLIFY ONLINE PURCHASE DECISIONS THROUGH RESEARCH-DRIVEN UI/UX DESIGN.
                </motion.p>
              </div>
              
              <div className="md:col-start-2">
                <motion.div 
                  variants={heroItem}
                  className="flex space-x-2 mt-4"
                >
                  <GlassButton 
                    onClick={() => navigate("/projects")}
                    className="px-6 py-2.5 text-[10px] tracking-widest font-sans font-semibold"
                  >
                    View Projects <ArrowRight className="ml-2 w-3 h-3" />
                  </GlassButton>
                  <GlassButton 
                    onClick={() => {
                      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 text-[10px] tracking-widest font-sans font-semibold"
                  >
                    Contact Me
                  </GlassButton>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problems Section */}
      <section className="py-24 overflow-hidden relative">
        <ScrollFadeHeader>
          ARE YOU ALSO FACING <br />
          THESE PROBLEMS?
        </ScrollFadeHeader>

        <div className="relative flex flex-col items-center max-w-4xl mx-auto px-6">
          <div ref={problemsRef} className="relative w-full py-10">
            <motion.div 
              style={{ top: plusYProblems }}
              className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
              <Plus className="w-6 h-6 text-white/60" strokeWidth={3} />
            </motion.div>
            
            <div className="flex flex-col items-center space-y-2 w-full">
              {problems.map((prob, i) => (
                <DisplaceableLine 
                  key={i} 
                  text={prob.text} 
                  bold={prob.bold} 
                  index={i} 
                  total={problems.length} 
                  containerProgress={problemsProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 overflow-hidden relative">
        <ScrollFadeHeader align="right" slideFrom="right">
          HOW I CAN SOLVE THESE <br />
          CHALLENGES THROUGH <br />
          THOUGHTFUL DESIGN 
        </ScrollFadeHeader>

        <div className="relative flex flex-col items-center max-w-4xl mx-auto px-6">
          <div ref={solutionsRef} className="relative w-full py-12">
            <motion.div 
              style={{ top: plusYSolutions }}
              className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
              <Plus className="w-6 h-6 text-white/60" strokeWidth={3} />
            </motion.div>

            <div className="flex flex-col items-center space-y-2 w-full">
              {solutions.map((sol, i) => (
                <DisplaceableLine 
                  key={i} 
                  text={sol.text} 
                  bold={sol.bold} 
                  index={i} 
                  total={solutions.length} 
                  containerProgress={solutionsProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-60 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <BlurText
            text="LET'S SIMPLIFY YOUR CUSTOMERS' JOURNEY TOGETHER."
            animateBy="words"
            direction="bottom"
            delay={100}
            className="text-4xl md:text-[60px] font-display tracking-tight leading-tight mb-16 text-white text-center justify-center"
          />
          <div className="flex justify-center">
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <GlassButton 
                onClick={() => {
                  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 text-[12px] font-sans font-medium tracking-widest"
              >
                Work with me
              </GlassButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-32">
        <ScrollFadeHeader 
          align="center" 
          slideFrom="none" 
          className="text-[10px] md:text-[12px] tracking-[0.3em] font-medium text-gray-500 !mb-20"
          stayVisible={true}
          noPadding={true}
        >
          PROJECT
        </ScrollFadeHeader>

        <div>
          {projects.map((project, i) => (
            <ProjectItem key={i} project={project} i={i} />
          ))}
        </div>
      </section>

      {/* Approach Section */}
      <section className="relative pt-32 pb-60 px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-full mx-auto">
          
          <div className="space-y-8 mb-16">
            <ScrollVelocity
              texts={[
                "I CREATE INTUITIVE DIGITAL EXPERIENCES",
                "BY COMBINING USER RESEARCH WITH THOUGHTFUL UI/UX DESIGN"
              ]}
              velocity={50}
              className="text-4xl md:text-7xl font-display tracking-tight uppercase text-white"
            />
          </div>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <GlassButton 
              onClick={() => navigate("/about")}
              className="px-6 py-2 text-[10px] tracking-widest font-sans font-semibold"
            >
              About
            </GlassButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
