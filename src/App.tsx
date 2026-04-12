/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "motion/react";
import { Plus, ArrowRight } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import LiquidEther from "@/components/LiquidEther";
import Particles from "@/components/Particles";
import TiltedCard from "@/components/TiltedCard";
import GlassSurface from "@/components/GlassSurface";
import LogoLoop from "@/components/LogoLoop";
import BlurText from "@/components/BlurText";
import ScrollFadeHeader from "@/src/components/ScrollFadeHeader";
import Home from "@/src/pages/Home";
import ProjectsPage from "@/src/pages/ProjectsPage";
import ProjectDetails from "@/src/pages/ProjectDetails";
import About from "@/src/pages/About";

function GlassButton({ children, className = "", ...props }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={50}
        backgroundOpacity={0.1}
        saturation={1}
        borderWidth={0.07}
        brightness={50}
        opacity={0.93}
        blur={11}
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        className={`border border-white hover:bg-white/10 transition-colors ${className}`}
      >
        <button 
          {...props} 
          className="w-full h-full bg-transparent border-none text-inherit cursor-pointer flex items-center justify-center"
        >
          {children}
        </button>
      </GlassSurface>
    </motion.div>
  );
}

function DisplaceableLine({ text, bold, index, total, containerProgress }: { text: string, bold: string, index: number, total: number, containerProgress: any, key?: React.Key }) {
  const ref = useRef(null);
  
  // Calculate the relative position of this line in the list (0 to 1)
  const linePos = (index + 0.5) / total;
  
  // The line should displace when the container's scroll progress matches its position
  const rawDisplacement = useTransform(
    containerProgress, 
    [linePos - 0.1, linePos, linePos + 0.1], 
    [0, 60, 0]
  );
  
  const displacement = useSpring(rawDisplacement, {
    stiffness: 120,
    damping: 20,
    mass: 1
  });

  const leftX = useTransform(displacement, (v) => -v);
  const rightX = useTransform(displacement, (v) => v);

  return (
    <div ref={ref} className="relative flex w-full max-w-md mx-auto text-xl md:text-2xl font-light tracking-tight py-3">
      <div className="w-1/2 text-right pr-2">
        <motion.span style={{ x: leftX, display: "inline-block" }}>
          {text}
        </motion.span>
      </div>
      <div className="w-1/2 text-left pl-2">
        <motion.span style={{ x: rightX, display: "inline-block" }} className="font-bold">
          {bold}
        </motion.span>
      </div>
    </div>
  );
}

function SlidingMenu() {
  const menuVariants = {
    initial: { y: 0 },
    hover: { y: -30 }
  };

  const itemsVariants = {
    initial: { y: 30 },
    hover: { y: 0 }
  };

  return (
    <motion.nav 
      initial="initial"
      whileHover="hover"
      className="fixed top-0 right-0 p-8 z-50 group cursor-pointer"
    >
      <div className="relative overflow-hidden h-6 w-48 flex justify-end">
        {/* Menu Label */}
        <motion.div 
          variants={menuVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 text-[10px] tracking-[0.4em] font-bold text-white"
        >
          MENU
        </motion.div>

        {/* Menu Items */}
        <motion.ul 
          variants={itemsVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 flex space-x-6 text-[10px] tracking-[0.2em] font-medium text-gray-400"
        >
          <li><Link to="/" className="hover:text-white transition-colors uppercase">HOME</Link></li>
          <li><Link to="/projects" className="hover:text-white transition-colors uppercase">PROJECT</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors uppercase">ABOUT</Link></li>
        </motion.ul>
      </div>
    </motion.nav>
  );
}

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    image: string;
  };
  i: number;
  key?: React.Key;
}

function ProjectItem({ project, i }: ProjectItemProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slightly faster spring for better responsiveness while maintaining smoothness
  const springConfig = { damping: 35, stiffness: 120 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/projects/${project.id}`)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        opacity: { duration: 0.8, delay: i * 0.1 },
        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className="py-16 px-6 md:pl-64 md:pr-20 flex flex-col md:flex-row md:items-baseline border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative z-10"
    >
      {/* Hover Image - Centered behind cursor with slide-up reveal */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          y: isHovered ? "-50%" : "0%", // Slide from lower position up to center
          scale: isHovered ? 1 : 0.9,
        }}
        style={{
          left: x,
          top: y,
          x: "-50%",
        }}
        transition={{ 
          duration: 1.0, 
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a smooth, high-end feel
        }}
        className="absolute pointer-events-none z-0 w-[600px] h-[400px] overflow-hidden rounded-sm shadow-2xl"
      >
        <TiltedCard
          imageSrc={project.image}
          altText={project.title}
          captionText={project.title}
          containerHeight="400px"
          containerWidth="600px"
          imageHeight="400px"
          imageWidth="600px"
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-white text-xs tracking-widest uppercase font-medium">
                {project.id}
              </p>
            </div>
          }
        />
      </motion.div>

      <motion.div 
        variants={{
          hover: { x: -80 }
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-baseline w-full relative z-10 pointer-events-none"
      >
        <span className="text-xs font-medium text-gray-500 mb-4 md:mb-0 md:mr-8">{project.id}</span>
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-4xl font-display tracking-tight text-white mix-blend-difference">
            {project.title}
          </h3>
          <h3 className="text-2xl md:text-4xl font-display tracking-tight text-white mix-blend-difference">
            {project.subtitle}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const heroContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const heroItem = {
    initial: { y: 60, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const problems = [
    { text: "Choice", bold: "Overload" },
    { text: "Product", bold: "Confusion" },
    { text: "Unclear", bold: "Information" },
    { text: "Cluttered", bold: "Interface" },
    { text: "Poor", bold: "Navigation" },
    { text: "Decision", bold: "Fatigue" },
  ];

  const solutions = [
    { text: "Simplified", bold: "Options" },
    { text: "Clear", bold: "Labels" },
    { text: "Structured", bold: "Content" },
    { text: "Minimal", bold: "Design" },
    { text: "Intuitive", bold: "Navigation" },
    { text: "Guided", bold: "Flows" },
  ];

  const projects = [
    { 
      id: "01", 
      title: "Seamless Duty free", 
      client: "DUTY FREE",
      roles: "UI/UX DESIGN · RESEARCH · STRATEGY",
      year: "2024",
      image: "https://lh3.googleusercontent.com/d/1sRM4m7DtwTNAUMFz0MTvhvgl4VBwFGAl"
    },
    { 
      id: "02", 
      title: "History Unravelled", 
      client: "UNRAVEL",
      roles: "PRODUCT DESIGN · MOBILE APP · BRANDING",
      year: "2024",
      image: "https://lh3.googleusercontent.com/d/14kGp-_pSl63Fhgxvcqat0Rd8_DKX6BjX"
    },
    { 
      id: "03", 
      title: "Effortless Renting", 
      client: "RENTEASE",
      roles: "DASHBOARD DESIGN · ANALYTICS · PROTOTYPING",
      year: "2025",
      image: "https://lh3.googleusercontent.com/d/1EduPMaVkOkclaCPQrfttS8KC3Ru9FRq0"
    },
  ];

  const location = useLocation();
  const isProjectsSlider = location.pathname === "/projects";
  const isProjectDetails = location.pathname.startsWith("/projects/");
  const isAboutPage = location.pathname === "/about";
  const useParticlesBackground = isProjectsSlider || isProjectDetails || isAboutPage;

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-orange-900 selection:text-white font-sans relative bg-black text-white">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {useParticlesBackground ? (
            <div className="w-full h-full flex items-center justify-center">
              <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
                <Particles
                  particleCount={200}
                  particleSpread={10}
                  speed={0.1}
                  particleColors={["#ff7b00","#0062ff","#ffffff"]}
                  moveParticlesOnHover
                  particleHoverFactor={1}
                  alphaParticles={false}
                  particleBaseSize={100}
                  sizeRandomness={1}
                  cameraDistance={20}
                  disableRotation={false}
                />
              </div>
            </div>
          ) : (
            <LiquidEther
              mouseForce={20}
              cursorSize={100}
              isViscous={true}
              viscous={30}
              colors={["#5227FF", "#FF9FFC", "#ff9500"]}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              isBounce={false}
              resolution={0.5}
              disableUserInteraction={true}
            />
          )}
        </div>
        <SlidingMenu />

        <Routes>
          <Route path="/" element={
            <Home 
              ScrollFadeHeader={ScrollFadeHeader}
              GlassButton={GlassButton}
              DisplaceableLine={DisplaceableLine}
              ProjectItem={ProjectItem}
              fadeIn={fadeIn}
              heroContainer={heroContainer}
              heroItem={heroItem}
              problems={problems}
              solutions={solutions}
              projects={projects}
            />
          } />
          <Route path="/projects" element={
            <ProjectsPage 
              ProjectItem={ProjectItem}
              projects={projects}
              fadeIn={fadeIn}
              heroContainer={heroContainer}
              heroItem={heroItem}
            />
          } />
          <Route path="/projects/:id" element={
            <ProjectDetails 
              projects={projects}
              GlassButton={GlassButton}
              fadeIn={fadeIn}
            />
          } />
          <Route path="/about" element={
            <About fadeIn={fadeIn} GlassButton={GlassButton} />
          } />
        </Routes>

        {/* Footer */}
        {!isProjectsSlider && !isProjectDetails && (
          <footer id="footer" className="text-white relative bg-black z-10">
            <div className="py-40 px-6 md:px-20 flex flex-col items-center justify-center">
              <motion.h2 
                {...fadeIn}
                className="text-5xl md:text-8xl font-display tracking-tighter mb-20 text-center"
              >
                GET IN TOUCH
              </motion.h2>
              
              <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-sm tracking-widest text-gray-500">
                <a 
                  href="https://www.linkedin.com/in/pemaseldyen?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a href="mailto:pseldyen06@gmail.com" className="hover:text-white transition-colors">Mail</a>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
