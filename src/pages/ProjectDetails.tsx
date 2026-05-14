import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TiltedCard from "@/components/TiltedCard";
import GradualBlur from "../components/GradualBlur";

interface ProjectDetailsProps {
  projects: any[];
  GlassButton: any;
  fadeIn: any;
}

export default function ProjectDetails({ projects, GlassButton, fadeIn }: ProjectDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id) || projects[0];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to active section index (0: Problem, 1: Solution, 2: Result)
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2]);
  
  // We need a state-like value that updates on scroll to trigger AnimatePresence
  const [currentIdx, setCurrentIdx] = useState(0);
  
  useEffect(() => {
    return activeIndex.on("change", (latest) => {
      setCurrentIdx(Math.round(latest));
    });
  }, [activeIndex]);

  const isDutyFree = project.title.toLowerCase().includes("duty free");
  const isUnravel = project.title.toLowerCase().includes("unravel");
  const isRenting = project.title.toLowerCase().includes("renting");

  const getRole = () => {
    if (isDutyFree) return "User Researcher, UI UX Designer";
    if (isUnravel) return "UI UX Designer";
    return project.roles;
  };

  const getDescription = () => {
    if (isDutyFree) {
      return "The Duty Free Bhutan platform is reimagined to create a more seamless and user-friendly retail experience. By simplifying navigation and refining the overall structure, the design improves clarity and accessibility while guiding users effortlessly through the platform. The result is a smoother, more intuitive shopping journey.";
    }
    if (isUnravel) {
      return "Unravel introduces a more interactive way to engage with history, moving beyond static content into a game-driven experience. With a focus on clarity, flow, and usability, the design guides users naturally through content while keeping them engaged. The result is a learning experience that feels both intuitive and dynamic.";
    }
    if (isRenting) {
      return "RentEase simplifies the rental experience by bringing together search, discovery, and management into one seamless platform. With a focus on usability and clarity, the experience is designed to guide users effortlessly through each step—making the process of finding and renting spaces more intuitive and efficient.";
    }
    return "Based on extensive research and user testing, this project focuses on streamlining complex digital workflows into intuitive, human-centered experiences.";
  };

  const getProjectLink = () => {
    if (isDutyFree) return "https://www.figma.com/proto/sPV8kY4BiVXKaw2yXz49Kc/Dashboard-Design--Design-Guide---Community-?node-id=491-236&t=h6VPtTPvaJRc8jEy-0&scaling=min-zoom&content-scaling=fixed&page-id=270%3A2&starting-point-node-id=491%3A236";
    if (isUnravel) return "https://www.figma.com/proto/HJjDSqB5ycunUg5IAR4RCy/PrJ-Unravel?node-id=1966-10975&t=sL33P1k6N893mW9L-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1276%3A5164";
    if (isRenting) return "https://rentease-2-z2b3.onrender.com/";
    return "#";
  };

  const narrativeData = [
    {
      label: "THE PROBLEM",
      title: isDutyFree ? "Identifying Friction" : (isUnravel ? "Fragmented Narratives" : (isRenting ? "Complex Systems" : "Identifying Friction")),
      description: isDutyFree 
        ? "The Duty Free Bhutan platform was experiencing usability challenges, where users faced unclear navigation and a fragmented browsing experience. Key actions required to complete a purchase were not always intuitive, leading to friction in the overall shopping journey. This created a need for a more structured and user-friendly flow."
        : isUnravel
        ? "History is often perceived as a collection of static facts and dates, making it difficult for modern audiences to truly engage and connect with the past. This lack of interactivity often leads to a fragmented understanding of historical events and a lack of emotional connection to the narrative."
        : isRenting
        ? "The rental process is often scattered across multiple platforms, creating a fragmented experience for both renters and property managers. Unclear information and complex discovery flows make finding the right space a stressful and inefficient task for many users."
        : "This project addressed significant usability challenges identified through user research, focusing on resolving friction points and streamlining complex workflows into intuitive digital experiences.",
      image: isDutyFree 
        ? "https://lh3.googleusercontent.com/d/1xJUb3Rd7H9ZDcUVxpp41qyCwm-BMufM7" 
        : isUnravel 
        ? "https://lh3.googleusercontent.com/d/1P_GEJPzsspK2iYDpL4tsE09hiNUiSS2Y"
        : isRenting
        ? "https://lh3.googleusercontent.com/d/1jGu6rXfHh84gqmDcmuU8UrMIHoS7hJ5p"
        : `https://picsum.photos/seed/${project.id}-problem/1200/900`
    },
    {
      label: "THE SOLUTION",
      title: isDutyFree ? "Rethinking the Experience" : (isUnravel ? "Interactive Timelines" : (isRenting ? "Streamlined Analytics" : "Rethinking the Experience")),
      description: isDutyFree
        ? "The experience was rethought with a focus on simplifying navigation and improving overall clarity. Information hierarchy was refined to make browsing more intuitive, and key interactions were streamlined to reduce unnecessary steps. The goal was to guide users smoothly from discovery to checkout with minimal effort."
        : isUnravel
        ? "Unravel introduces a more interactive way to engage with history, moving beyond static content into a game-driven experience. With a focus on clarity, flow, and usability, the design guides users naturally through content while keeping them engaged. The result is a learning experience that feels both intuitive and dynamic."
        : isRenting
        ? "RentEase simplifies the rental experience by bringing together search, discovery, and management into one seamless platform. With a focus on usability and clarity, the experience is designed to guide users effortlessly through each step—making the process of finding and renting spaces more intuitive and efficient."
        : "The final solution focuses on clarity, flow, and usability, guiding users naturally through content while keeping them engaged. The result is an experience that feels both intuitive and dynamic.",
      image: isDutyFree 
        ? "https://lh3.googleusercontent.com/d/1I8XXviGxyL_njLAjSeFZcRvPZ5_1fr86" 
        : isUnravel 
        ? "https://lh3.googleusercontent.com/d/1Wdx49YZPgVQRrYpG-_YpX4jPS9LCCawe"
        : isRenting
        ? "https://lh3.googleusercontent.com/d/1CJV7K5DpfNGvVLkgbJccKo1K7EKblxn1"
        : `https://picsum.photos/seed/${project.id}-solution/1200/900`
    },
    {
      label: "THE RESULT",
      title: isDutyFree ? "A Seamless Outcome" : (isUnravel ? "Unified History" : (isRenting ? "Optimized Performance" : "A Seamless Outcome")),
      description: isDutyFree
        ? "The redesigned experience offers a more seamless and structured retail journey. Users can now navigate and explore products with greater ease and clarity. The improved flow reduces friction and creates a more intuitive and accessible shopping experience overall."
        : isUnravel
        ? "The final experience transforms history into a more interactive and immersive journey. Instead of simply reading, users are encouraged to explore and engage with content in a more meaningful way. This shift creates a smoother, more engaging learning experience that feels natural and rewarding."
        : isRenting
        ? "The final experience simplifies the rental journey by making it more organized and efficient. Users can easily browse, compare, and proceed through listings without unnecessary complexity. This creates a smoother and more confident decision-making process overall."
        : "The final result is a polished, user-centric platform that successfully bridges the gap between complex functionality and intuitive design, delivering measurable improvements in user engagement and satisfaction.",
      image: isDutyFree 
        ? "https://lh3.googleusercontent.com/d/1ZkuKizfjPUUELRzeAF9RhksAyCcIeFlK" 
        : isUnravel 
        ? "https://lh3.googleusercontent.com/d/12Qnqd1NSnzhUU9vDBY5Gm6Adtc0pA4Ni"
        : isRenting
        ? "https://lh3.googleusercontent.com/d/1WHqAa5Xm77VK_Ggtxllh7JJsCk5gs0TJ"
        : `https://picsum.photos/seed/${project.id}-result/1200/900`
    }
  ];

  const nextProject = projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length];

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 relative z-10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40 px-6 md:px-20">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[10px] tracking-[0.3em] font-bold text-gray-500 hover:text-white transition-colors mb-12 uppercase group"
          >
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK
          </button>

          <div className="flex space-x-12 mb-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] font-bold text-gray-500 mb-2 uppercase">ROLE</p>
              <p className="text-sm font-medium text-white uppercase">
                {getRole()}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] font-bold text-gray-500 mb-2 uppercase">YEAR</p>
              <p className="text-sm font-medium text-white uppercase">{project.year}</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-display tracking-tighter leading-[0.9] text-white mb-12 uppercase">
            {project.title}
          </h1>

          <div className="space-y-6 mb-12 max-w-md">
            <p className="text-gray-400 leading-relaxed font-sans text-sm md:text-base">
              {getDescription()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["UI DESIGN", "UX RESEARCH", "PROTOTYPING"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-[9px] tracking-widest text-gray-400 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Image/Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] w-full cursor-pointer group"
          onClick={() => window.open(getProjectLink(), "_blank")}
        >
          <TiltedCard
            imageSrc={project.image}
            altText={project.title}
            captionText="VIEW PROJECT"
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={true}
          />
          
          {/* Project Number Indicator (Top Right) */}
          <div className="absolute -top-10 right-0 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
            <span className="text-[10px] tracking-[0.4em] font-bold text-gray-500 uppercase">N°{project.id}</span>
          </div>
        </motion.div>
      </div>

            {/* Video Section for Duty Free */}
      {isDutyFree && (
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-40">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/dutyfree.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Video Section for History Unravelled */}
      {isUnravel && (
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-40">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/unravel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Video Section for Effortless Renting */}
      {isRenting && (
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-40">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/rentease.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Sticky Narrative Section */}
      <div ref={containerRef} className="relative h-[300vh] w-full px-6 md:px-20">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left - Image (Changes on scroll) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentIdx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <TiltedCard
                    imageSrc={narrativeData[currentIdx].image}
                    altText={narrativeData[currentIdx].title}
                    captionText={narrativeData[currentIdx].title}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1}
                    showMobileWarning={false}
                    showTooltip={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right - Content (Changes on scroll) */}
            <div className="flex flex-col justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[10px] tracking-[0.3em] font-bold text-gray-500 mb-6 uppercase">
                    {narrativeData[currentIdx].label}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-display tracking-tighter leading-tight text-white mb-8 uppercase">
                    {narrativeData[currentIdx].title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed font-sans text-sm md:text-base max-w-md">
                    {narrativeData[currentIdx].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Indicator */}
              <div className="mt-12 flex space-x-4">
                {narrativeData.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-[2px] transition-all duration-500 ${i === currentIdx ? 'w-12 bg-white' : 'w-4 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Next Project Section */}
      <div 
        className="mt-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-black"
      >
        <GradualBlur position="top" height="12rem" strength={3} animated="scroll" duration="1s" />
        <GradualBlur position="bottom" height="12rem" strength={3} animated="scroll" duration="1s" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[10px] tracking-[0.4em] font-bold text-white/50 mb-8 uppercase">NEXT PROJECT</p>
          <button 
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/projects/${nextProject.id}`);
            }}
            className="group block"
          >
            <h2 className="text-6xl md:text-9xl font-display tracking-tighter leading-none text-white mb-12 uppercase group-hover:text-white/60 transition-colors duration-500">
              {nextProject.title}
            </h2>
            <div className="flex items-center justify-center space-x-4 text-white group-hover:translate-x-4 transition-transform duration-500">
              <span className="text-xs tracking-[0.3em] font-bold uppercase">VIEW CASE STUDY</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
