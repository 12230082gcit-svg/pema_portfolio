import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, Palette, Code2, Wrench, Sparkles, Download, CheckCircle2 } from "lucide-react";
import TiltedCard from "@/components/TiltedCard";
import ScrollVelocity from "../components/ScrollVelocity";

interface AboutProps {
  fadeIn: any;
  GlassButton: any;
}

export default function About({ fadeIn, GlassButton }: AboutProps) {
  const [activeTab, setActiveTab] = useState("work");
  const [activeSkillTab, setActiveSkillTab] = useState("Design");
  const containerRef = useRef(null);

  const experienceData: any = {
    work: [
      {
        title: "Graphic Designer",
        company: "XCEED STUDIO",
        period: "Dec 2023 - Nov 2024",
        location: "Thimphu, Bhutan",
        description: "Designed visual content for branding, social media, and digital marketing campaigns while collaborating with clients and team members to create engaging and user-focused designs.",
        tags: ["Adobe Illustrator", "Adobe Photoshop", "Photography", "Videography"]
      }
    ],
    education: [
      {
        title: "Bachelor of Interactive Design and Development",
        company: "Gyalpozhing College of Information Technology",
        period: "2023 - 2027",
        location: "Kabjisa, Thimphu",
        description: "Focused on interactive design, user experience, and digital product development with a blend of creative design and technical implementation. Developed skills in UI/UX design, front-end development, user-centered design, and multimedia production through academic and project-based learning.",
        tags: ["UI/UX Design", "Information Design", "Frontend Development", "Backend Development"]
      },
      {
        title: "Higher Secondary Education (Commerce)",
        company: "Desi High School",
        period: "2021 - 2022",
        location: "Thimphu, Bhutan",
        description: "Completed higher secondary education with a focus on commerce and business-related subjects, building foundational knowledge in finance, economics, analytical thinking, and business studies.",
        tags: ["Accountancy", "Economics", "Business Mathematics"]
      }
    ],
    achievements: [
      {
        title: "Best Project Award – First Year",
        company: "Gyalpozhing College of Information Technology",
        period: "2024",
        location: "Thimphu, Bhutan",
        description: "Received the Best Project Award for developing an innovative and user-centered academic project during the first year of study, recognized for creativity, problem-solving, and overall project execution.",
        tags: ["Project Excellence", "Creative Problem Solving", "Team Collaboration", "User-Centered Design"]
      },
      {
        title: "National Rank 6 – BHSEC Examination",
        company: "Bhutan Council for School Examinations and Assessment",
        period: "2022",
        location: "Thimphu, Bhutan",
        description: "Achieved National Rank 6 in the Bhutan Higher Secondary Education Certificate (BHSEC) Examination, reflecting outstanding academic performance and dedication across higher secondary studies.",
        tags: ["Academic Excellence", "National-Level Achievement", "Critical Thinking", "Consistent Performance"]
      }
    ],
    certifications: [
      {
        title: "Introduction to Cybersecurity - Cisco Netwrok Academy",
        company: "Cisco Networking Academy",
        period: "April 2025",
        location: "Online",
        description: "Gained foundational knowledge of cybersecurity, including threats, data protection, and safe online practices.",
        tags: ["Cybersecurity", "Data Protection", "Network Security"]
      },
      {
        title: "IELTS Certification",
        company: "IDP Education",
        period: "May 2023",
        location: "Thimphu, Bhutan",
        description: "Demonstrated strong English proficiency and communication skills.",
        tags: ["English Proficiency", "Communication"]
      }
    ]
  };

  const skillsData: any = {
    Design: ["UI/UX Design", "Wireframing & Prototyping", "Interaction Design", "Visual Design"],
    Development: ["Front-End Development", "Responsive Web Applications", "Back-End Development", "API Integration"],
    Tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "VS Code"],
    "Soft Skills": ["Communication", "Collaboration", "Problem-Solving", "Adaptability"]
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 mt-[5px]"
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
            <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-4 uppercase">ABOUT ME</p>
            
            <div className="text-white leading-relaxed font-sans text-sm md:text-base max-w-3xl mb-6 space-y-4">
              <p>
                Hi, I’m Pema Seldyen, a UI/UX designer focused on creating intuitive and research-driven digital experiences for beauty and e-commerce brands. I’m passionate about simplifying online shopping journeys by reducing confusion, improving clarity, and helping users make confident decisions through thoughtful design.
              </p>
              <p>
                With a background in Interactive Design and Development, I combine visual design principles with front-end understanding to create experiences that are both functional and engaging. My work often centers around user behavior, interface clarity, interaction design, and building seamless digital flows that feel effortless to navigate.
              </p>
              <p>
                I enjoy transforming complex ideas into clean, user-centered experiences that balance aesthetics, usability, and business goals.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 mb-4 uppercase">MY APPROACH</p>
                <div className="space-y-2">
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
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-1 h-1 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                      <p className="text-xs md:text-sm font-medium text-white uppercase tracking-wider">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a href="/PEMA_SELDYEN_CV.pdf" download="PEMA_SELDYEN_CV.pdf" className="inline-block">
                  <GlassButton 
                    className="px-6 py-2.5 text-[10px] tracking-widest font-sans font-semibold flex items-center"
                  >
                    <Download size={14} className="flex-shrink-0 mr-6" />
                    <span>Download CV</span>
                  </GlassButton>
                </a>
              </div>
            </div>
        </motion.div>
      </div>

      {/* Categorized Technical Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="mt-32 pt-20 border-t border-white/5"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display tracking-tight text-white mb-4 uppercase">SKILLS & EXPERTISE</h2>
        </div>
        
        {/* Skill Tab Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-5xl mx-auto bg-white/[0.02] p-2 rounded-2xl border border-white/5">
          {[
            { id: "Design", icon: Palette },
            { id: "Development", icon: Code2 },
            { id: "Tools", icon: Wrench },
            { id: "Soft Skills", icon: Sparkles }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveSkillTab(tab.id)}
              className={`relative flex-1 min-w-[200px] px-8 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 ${
                activeSkillTab === tab.id ? "text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{tab.id}</span>
              {activeSkillTab === tab.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Skill Tab Content */}
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap lg:flex-nowrap justify-center gap-3 md:gap-4"
            >
              {skillsData[activeSkillTab].map((skill: string) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.03] text-[10px] md:text-xs tracking-widest text-gray-300 uppercase hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 cursor-default whitespace-nowrap text-center"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-40 pt-20 border-t border-white/5"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display tracking-tight text-white mb-4">MY EXPERIENCE</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-5xl mx-auto bg-white/[0.02] p-2 rounded-2xl border border-white/5">
          {[
            { id: "work", label: "Work Experience", icon: Briefcase },
            { id: "education", label: "Education", icon: GraduationCap },
            { id: "achievements", label: "Achievements", icon: Award },
            { id: "certifications", label: "Certifications", icon: CheckCircle2 }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 min-w-[200px] px-8 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 ${
                activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {experienceData[activeTab].map((item: any, index: number) => (
                <div key={index} className="group relative pl-8 border-l border-white/5 py-4">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-6 w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-orange-500 transition-colors duration-300" />
                  
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-display text-white mb-2">{item.title}</h3>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg inline-block">
                          <p className="text-orange-500 text-[10px] tracking-widest font-bold uppercase">{item.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-3 text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="flex-shrink-0" />
                          <span className="text-[10px] tracking-wider uppercase font-medium">{item.period}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span className="text-[10px] tracking-wider uppercase font-medium">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-sans">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] tracking-widest text-gray-400 uppercase font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
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
