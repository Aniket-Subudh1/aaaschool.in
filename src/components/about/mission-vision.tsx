"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  Compass,
  Target,
  BookOpen,
  GraduationCap,
  Globe,
  Briefcase,
  Users,
  Heart,
  Lightbulb,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const MissionVision = () => {
  // State management
  const [activeTab, setActiveTab] = useState("mission");
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Refs and animations
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Values to showcase
  const values = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#8b1a1a]" />,
      title: "Academic Excellence",
      description:
        "Fostering intellectual growth through rigorous academic programs",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#8b1a1a]" />,
      title: "Cultural Heritage",
      description:
        "Preserving and celebrating our rich Indian traditions and values",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#8b1a1a]" />,
      title: "Global Mindset",
      description: "Preparing students to thrive in an interconnected world",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#8b1a1a]" />,
      title: "Character Building",
      description: "Nurturing integrity, empathy, and ethical leadership",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#8b1a1a]" />,
      title: "Innovation",
      description: "Embracing creativity and forward-thinking approaches",
    },
  ];

  // Mission specific sections with expandable content
  const missionSections = [
    {
      id: "academic",
      title: "Academic Excellence",
      icon: <BookOpen className="w-6 h-6" />,
      content:
        "We foster academic excellence through a comprehensive curriculum that balances traditional knowledge with modern subjects. Our approach encourages critical thinking, problem-solving, and a lifelong love for learning.",
    },
    {
      id: "cultural",
      title: "Cultural Heritage",
      icon: <Award className="w-6 h-6" />,
      content:
        "Absorb and live by the universal and eternal values of life as enunciated by ancient and modern thinkers and rooted in India's spiritual heritage, culture and traditions. Students learn to respect diversity while maintaining their cultural identity.",
    },
    {
      id: "holistic",
      title: "Holistic Development",
      icon: <Users className="w-6 h-6" />,
      content:
        "Develop a scientific temperament and an attitude for excellence and learning throughout life. Our program integrates academic, physical, social, emotional, and spiritual aspects for complete student development.",
    },
  ];

  // Vision pillars
  const visionPillars = [
    {
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      title: "Educational Excellence",
      description: "Creating future-ready learners",
    },
    {
      icon: <Globe className="w-12 h-12 text-white" />,
      title: "Global Citizens",
      description: "With strong Indian roots",
    },
    {
      icon: <Heart className="w-12 h-12 text-white" />,
      title: "Value-Based",
      description: "Character formation",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-white" />,
      title: "Future Leaders",
      description: "For a better world",
    },
  ];

  // Value rotation effect
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentValue((prev) => (prev + 1) % values.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovering, values.length]);

  // Animation effect when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Reset expanded section when tab changes
  useEffect(() => {
    setExpandedSection(null);
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Toggle section expansion with explicit function
  const handleToggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#f8f3e9] to-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-5"></div>
      <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-[#8b1a1a]/5 rounded-bl-full"></div>
      <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-[#d4b483]/5 rounded-tr-full"></div>

      {/* Decorative circles */}
      <div className="absolute -left-16 top-1/4 w-32 h-32 border border-[#8b1a1a]/20 rounded-full"></div>
      <div className="absolute -right-16 bottom-1/4 w-32 h-32 border border-[#d4b483]/20 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#8b1a1a] mb-3 font-serif">
            Our Purpose
          </h2>
          <div className="h-1 w-20 bg-[#d4b483] mx-auto mb-6"></div>
          <p className="text-[#5a3e36] max-w-2xl mx-auto text-lg">
            Discover what drives us to provide exceptional education and how
            we&apos;re shaping the future
          </p>
        </motion.div>

        {/* Interactive Values Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h3 className="text-2xl font-semibold text-[#8b1a1a] mb-6 text-center">
              Our Core Values
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg p-4 flex flex-col items-center text-center transition-all duration-300 ${
                    currentValue === index
                      ? "bg-gradient-to-br from-[#8b1a1a]/10 to-[#d4b483]/10 scale-105 shadow-md"
                      : "hover:bg-[#f8f3e9] hover:scale-105"
                  }`}
                  onClick={() => setCurrentValue(index)}
                >
                  <div className="mb-3">{value.icon}</div>
                  <h4 className="font-semibold text-[#5a3e36] mb-1">
                    {value.title}
                  </h4>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentValue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 bg-[#f8f3e9] p-6 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    {values[currentValue].icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#8b1a1a] mb-2">
                      {values[currentValue].title}
                    </h4>
                    <p className="text-[#5a3e36]">
                      {values[currentValue].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tab navigation - Fixed with absolute positioning to ensure it's clickable */}
        <div className="flex justify-center mb-12 relative z-20">
          <div className="bg-white rounded-full p-1.5 shadow-lg border border-[#d4b483]/20 mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => handleTabChange("mission")}
                type="button"
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-[#8b1a1a] text-white shadow-md"
                    : "bg-transparent text-[#5a3e36] hover:bg-[#f8f3e9]"
                }`}
              >
                <Compass className="h-5 w-5" />
                <span>Mission</span>
              </button>
              <button
                onClick={() => handleTabChange("vision")}
                type="button"
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                  activeTab === "vision"
                    ? "bg-[#8b1a1a] text-white shadow-md"
                    : "bg-transparent text-[#5a3e36] hover:bg-[#f8f3e9]"
                }`}
              >
                <Target className="h-5 w-5" />
                <span>Vision</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content area - Fixed positioning issues */}
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "mission" ? (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8 md:p-10 border-b border-[#d4b483]/20">
                    <h3 className="text-3xl font-bold text-[#8b1a1a] mb-6 font-serif">
                      Our Mission
                    </h3>
                    <p className="text-[#5a3e36] text-lg leading-relaxed mb-6">
                      At AAA, our mission is to provide a transformative
                      educational experience that nurtures intellectual growth,
                      cultural awareness, and character development in each
                      student. We aim to create an environment where students:
                    </p>

                    {/* Interactive accordion for mission sections - Fixed buttons */}
                    <div className="space-y-4 mt-8">
                      {missionSections.map((section) => (
                        <div
                          key={section.id}
                          className={`border border-[#d4b483]/20 rounded-lg overflow-hidden transition-all duration-300 ${
                            expandedSection === section.id ? "shadow-md" : ""
                          }`}
                        >
                          <button
                            onClick={() => handleToggleSection(section.id)}
                            type="button"
                            className={`w-full p-4 text-left flex items-center justify-between ${
                              expandedSection === section.id
                                ? "bg-gradient-to-r from-[#8b1a1a]/10 to-transparent"
                                : "hover:bg-[#f8f3e9]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  expandedSection === section.id
                                    ? "bg-[#8b1a1a]/10"
                                    : "bg-[#f8f3e9]"
                                }`}
                              >
                                {section.icon}
                              </div>
                              <span className="font-semibold text-[#5a3e36]">
                                {section.title}
                              </span>
                            </div>
                            {expandedSection === section.id ? (
                              <ChevronUp className="w-5 h-5 text-[#8b1a1a] flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#8b1a1a] flex-shrink-0" />
                            )}
                          </button>

                          {expandedSection === section.id && (
                            <div className="p-4 bg-[#f8f3e9]/50">
                              <p className="text-[#5a3e36]">
                                {section.content}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div
                    className="relative overflow-hidden bg-cover bg-center h-64 md:h-80"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3')",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8b1a1a]/90 to-[#8b1a1a]/70"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                        Our Vision
                      </h3>
                      <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
                        To establish a one-of-its-kind educational institution
                        based on Indian Culture and Vedic Ethos for children
                        from all over India, so they can realize their full
                        potential.
                      </p>
                    </div>
                  </div>

                  {/* Vision pillars */}
                  <div className="p-8 md:p-10">
                    <h4 className="text-2xl font-semibold text-[#8b1a1a] mb-8 text-center">
                      The Four Pillars of Our Vision
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      {visionPillars.map((pillar, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-[#8b1a1a] to-[#5a3e36] rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                            {pillar.icon}
                          </div>
                          <h5 className="text-white font-bold mb-2">
                            {pillar.title}
                          </h5>
                          <p className="text-white/80 text-sm">
                            {pillar.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 bg-[#f8f3e9] p-6 rounded-lg border-l-4 border-[#d4b483]">
                      <p className="text-[#5a3e36] text-lg italic">
                        &quot;Our vision is to nurture global citizens rooted in
                        Indian values and equipped with 21st century
                        skills.&quot;
                      </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <a
                        href="#learn-more"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b1a1a] text-white rounded-full hover:bg-[#7a1717] transition-colors duration-300 shadow-md group"
                      >
                        <span>Explore Our Vision Further</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
