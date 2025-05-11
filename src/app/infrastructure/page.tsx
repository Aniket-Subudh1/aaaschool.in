"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  ChevronRight, 
  Building, 
  Microscope, 
  Music, 
  BookOpen, 
  TreePine, 
  Dumbbell, 
  Server, 
  PaintBucket, 
  ChevronDown, 
  ArrowRight,
  X,
  MapPin,
  Sparkles,
  Globe,
  ArrowUpRight,
  Info,
  Play,
  Images,
  Flower,
  Lightbulb,
  Wifi,
  Shield
} from "lucide-react";

// Custom dot pattern component for backgrounds
const DotPattern = ({ className = "" }) => (
  <div className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}>
    <div className="absolute inset-0" style={{ 
      backgroundImage: 'radial-gradient(#8b1a1a 1px, transparent 1px)', 
      backgroundSize: '30px 30px' 
    }}></div>
  </div>
);

// Temple-inspired decorative border component
const TempleBorder = ({ className = "", opacity = "opacity-10" }) => (
  <div className={`absolute top-0 left-0 right-0 h-8 overflow-hidden pointer-events-none ${opacity} ${className}`}>
    <div className="flex justify-center w-full">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`temple-border-${i}`}
          className="w-6 h-8 bg-[#8b1a1a] mx-0.5 rounded-b-lg"
        />
      ))}
    </div>
  </div>
);

// Konark wheel component for decorative elements
const KonarkWheel = ({ className = "", size = "w-12 h-12", color = "text-[#8b1a1a]" }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className={`${size} ${color} animate-spin-slow`}>
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI) / 8;
        const x1 = 50 + 15 * Math.cos(angle);
        const y1 = 50 + 15 * Math.sin(angle);
        const x2 = 50 + 45 * Math.cos(angle);
        const y2 = 50 + 45 * Math.sin(angle);
        return (
          <line
            key={`wheel-line-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  </div>
);

// Card hover effect component
const HoverCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const InfrastructurePage = () => {
  const [activeSection, setActiveSection] = useState("campus");
  const [activeFacility, setActiveFacility] = useState(null);
  const [showModal, setShowModal] = useState(false);
  interface FacilityType {
    id: string;
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    features: string[];
    mapPosition: { top: string; left: string };
    category?: string;
  }
  
  const [modalContent, setModalContent] = useState<FacilityType | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const facilities = {
    campus: [
      {
        id: "main-building",
        title: "Main Academic Building",
        description: "Our state-of-the-art academic building houses modern classrooms, administrative offices, and student support services. Designed with both functionality and aesthetics in mind, the building provides an inspiring environment for learning.",
        image: "/sch.jpeg",
        icon: <Building />,
        features: [
          "24 modern classrooms equipped with smart boards",
          "Administrative wing with offices for principal and staff",
          "Student counseling center",
          "Spacious and naturally lit corridors",
          "Wheelchair accessible with ramps and elevators"
        ],
        mapPosition: { top: "30%", left: "40%" }
      },
      {
        id: "auditorium",
        title: "Multipurpose Auditorium",
        description: "A 500-seat auditorium equipped with advanced audio-visual systems for assemblies, cultural programs, special events, and performances. The acoustically designed space enhances every sound and creates an immersive experience.",
        image: "/cul.jpg",
        icon: <Images />,
        features: [
          "Seating capacity for 500 persons",
          "Advanced acoustic treatments",
          "Professional lighting and sound systems",
          "Spacious stage with backstage area",
          "Green rooms for performers",
          "Climate controlled environment"
        ],
        mapPosition: { top: "60%", left: "30%" }
      },
      {
        id: "gardens",
        title: "Meditation Gardens",
        description: "Beautifully landscaped gardens that provide a serene environment for meditation and connecting with nature. The gardens feature native plants, walking paths, and quiet seating areas for reflection and mindfulness practices.",
        image: "/hs.jpg",
        icon: <Flower />,
        features: [
          "Designed following principles of Vastu and sacred geometry",
          "Water features with natural soundscapes",
          "Dedicated yoga and meditation pavilion",
          "Herb garden with traditional Ayurvedic plants",
          "Seasonal flowering plants for year-round beauty"
        ],
        mapPosition: { top: "45%", left: "65%" }
      }
    ],
    laboratories: [
      {
        id: "physics-lab",
        title: "Physics Laboratory",
        description: "Fully equipped physics lab with modern apparatus for conducting experiments on mechanics, optics, electricity, and more. Our physics lab is designed to spark curiosity and facilitate hands-on learning of physical principles.",
        image: "/il.jpg",
        icon: <Lightbulb />,
        features: [
          "Workstations for 30 students simultaneously",
          "Digital and analog measurement devices",
          "Mechanics, optics, and electricity experiment setups",
          "Computer simulation stations",
          "Interactive learning displays"
        ],
        mapPosition: { top: "25%", left: "55%" }
      },
      {
        id: "chemistry-lab",
        title: "Chemistry Laboratory",
        description: "Well-ventilated chemistry laboratory with safety equipment and materials for practical demonstrations and experiments. Our chemistry lab adheres to the highest safety standards while providing a comprehensive learning experience.",
        image: "/sp.jpg",
        icon: <Microscope />,
        features: [
          "Chemical storage with proper segregation and labeling",
          "Fume hoods and ventilation systems",
          "Emergency shower and eyewash stations",
          "Chemical-resistant workbenches",
          "Digital analytical balances and instruments"
        ],
        mapPosition: { top: "35%", left: "52%" }
      },
      {
        id: "biology-lab",
        title: "Biology Laboratory",
        description: "Biology lab with specimens, microscopes, and tools for exploring the wonders of life sciences. Students engage with biological concepts through hands-on exploration of specimens and microorganisms.",
        image: "/tr.jpg",
        icon: <Microscope />,
        features: [
          "Advanced binocular and digital microscopes",
          "Specimen preservation and display units",
          "Anatomical models and charts",
          "Plant growing station with controlled lighting",
          "Bio-safe waste disposal systems"
        ],
        mapPosition: { top: "40%", left: "48%" }
      },
      {
        id: "computer-lab",
        title: "Computer Laboratory",
        description: "Modern computer lab with high-speed internet access and the latest software for teaching computer science and digital skills. Our computer lab provides a technology-rich environment for developing 21st-century skills.",
        image: "/lb.jpg",
        icon: <Server />,
        features: [
          "50 workstations with the latest hardware configurations",
          "High-speed internet connectivity",
          "Programming and design software suites",
          "Interactive learning platforms",
          "Digital presentation capabilities"
        ],
        mapPosition: { top: "30%", left: "45%" }
      }
    ],
    playground: [
      {
        id: "sports-field",
        title: "Sports Field",
        description: "Expansive sports field for cricket, football, and athletic events, surrounded by a 400-meter track. Our well-maintained field supports a variety of sports activities and promotes physical fitness among students.",
        image: "/sp.jpg",
        icon: <Dumbbell />,
        features: [
          "Professional-grade cricket pitch",
          "Regulation size football field",
          "400-meter athletic track with proper markings",
          "Spectator seating area",
          "Floodlights for evening sports activities"
        ],
        mapPosition: { top: "75%", left: "60%" }
      },
      {
        id: "basketball-court",
        title: "Basketball & Volleyball Courts",
        description: "Well-maintained courts for basketball and volleyball with proper marking and equipment. These multipurpose courts foster teamwork and competitive spirit among students.",
        image: "/sc.jpg",
        icon: <Dumbbell />,
        features: [
          "Standard NBA dimensions for basketball court",
          "Regulation volleyball court with adjustable net",
          "Non-slip surface treatment",
          "Proper drainage system",
          "Courtside benches and scoreboards"
        ],
        mapPosition: { top: "65%", left: "55%" }
      },
      {
        id: "indoor-sports",
        title: "Indoor Sports Complex",
        description: "Indoor facility for table tennis, chess, carrom, and other indoor games. The climate-controlled environment allows for year-round enjoyment of indoor sports and recreational activities.",
        image: "/dr.jpg",
        icon: <Dumbbell />,
        features: [
          "Four tournament-grade table tennis tables",
          "Chess and carrom board stations",
          "Badminton courts with proper lighting",
          "Gymnastics and yoga area",
          "Sports equipment storage and lending system"
        ],
        mapPosition: { top: "55%", left: "40%" }
      }
    ],
    facilities: [
      {
        id: "library",
        title: "Central Library",
        description: "Our extensive library houses over 10,000 books, journals, and digital resources to support academic excellence. The library serves as a hub for research, quiet study, and literary exploration in a comfortable and inviting space.",
        image: "/LIB.jpg",
        icon: <BookOpen />,
        features: [
          "Collection of over 10,000 books across subjects",
          "Digital catalog and resource management system",
          "Quiet reading areas and group study rooms",
          "E-library with computer access stations",
          "Regular book exhibitions and reading events"
        ],
        mapPosition: { top: "20%", left: "35%" }
      },
      {
        id: "music-room",
        title: "Music Room",
        description: "Dedicated space for music education with various instruments and audio equipment for students to explore their musical talents. The acoustically designed room enhances the learning experience for budding musicians.",
        image: "/cul.jpg",
        icon: <Music />,
        features: [
          "Acoustic treatment for optimal sound quality",
          "Traditional Indian and Western instruments",
          "Digital recording and playback equipment",
          "Practice cubicles for individual sessions",
          "Performance space for small recitals"
        ],
        mapPosition: { top: "25%", left: "25%" }
      },
      {
        id: "art-studio",
        title: "Art Studio",
        description: "Creative space equipped with materials and tools for drawing, painting, pottery, and other visual arts. Natural lighting and ample space encourage artistic expression and skill development.",
        image: "/sc.jpg",
        icon: <PaintBucket />,
        features: [
          "Naturally lit space with north-facing windows",
          "Pottery wheels and kiln",
          "Easels and drawing tables",
          "Wide range of art supplies and materials",
          "Gallery space for student exhibitions"
        ],
        mapPosition: { top: "35%", left: "30%" }
      },
      {
        id: "smart-classrooms",
        title: "Smart Classrooms",
        description: "Technology-enhanced learning spaces equipped with interactive displays, digital learning tools, and multimedia capabilities to enrich the educational experience and accommodate diverse learning styles.",
        image: "/il.jpg",
        icon: <Wifi />,
        features: [
          "Interactive smart boards in every classroom",
          "Digital projectors and visualizers",
          "Student response systems",
          "Integrated audio systems",
          "Ergonomic furniture for comfort during long sessions"
        ],
        mapPosition: { top: "30%", left: "38%" }
      }
    ]
  };

  const openModal = (facility: FacilityType) => {
    setModalContent(facility);
    setShowModal(true);
  };
  
  const mapBuildings = [
    ...facilities.campus.map(item => ({ ...item, category: 'campus' })),
  ];

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const scrollToTimeline = () => {
    if (timelineRef.current instanceof HTMLElement) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const activeFacilities = facilities[activeSection] || [];

  const getCategoryIcon = (category) => {
    switch(category) {
      case "campus": return <Building className="h-8 w-8" />;
      case "laboratories": return <Microscope className="h-8 w-8" />;
      case "playground": return <Dumbbell className="h-8 w-8" />;
      case "facilities": return <BookOpen className="h-8 w-8" />;
      default: return <Building className="h-8 w-8" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "campus": return "bg-indigo-100 text-indigo-600";
      case "laboratories": return "bg-purple-100 text-purple-600";
      case "playground": return "bg-emerald-100 text-emerald-600";
      case "facilities": return "bg-amber-100 text-amber-600";
      default: return "bg-[#8b1a1a]/10 text-[#8b1a1a]";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ 
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#8b1a1a]/90"></div>
          <Image
            src="/sc.jpg"
            alt="Infrastructure background"
            fill
            className="object-cover mix-blend-multiply"
            priority
          />
        </div>

        <TempleBorder />
        <DotPattern />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-sm mb-4 text-white/80">
            <a href="/ " className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight size={14} className="mx-1" />
            <span>Infrastructure</span>
          </div>

          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif"
            >
              World-Class <span className="text-[#f0c808]">Infrastructure</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/90 mb-8 max-w-3xl"
            >
              Explore our meticulously designed campus that seamlessly blends traditional values with modern facilities. Our infrastructure nurtures both academic excellence and holistic development in a serene environment.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={scrollToTimeline}
                className="flex items-center px-6 py-3 bg-white text-[#8b1a1a] rounded-full hover:bg-[#f0e6d2] transition-colors shadow-lg group"
              >
                <span className="font-medium">Explore Facilities</span>
                <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={scrollToMap}
                className="flex items-center px-6 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors group"
              >
                <MapPin className="mr-2 h-5 w-5" />
                <span className="font-medium">View Interactive Map</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Animated decoration elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <circle
                  key={i}
                  cx={40 + i * 35}
                  cy="50"
                  r="5"
                  fill="white"
                />
              ))}
            </motion.g>
          </svg>
        </div>

        {/* Animated Konark Wheel */}
        <div className="absolute top-10 right-10 opacity-20">
          <KonarkWheel size="w-32 h-32" color="text-white" />
        </div>
      </motion.section>

      {/* Timeline Navigation Section */}
      <section 
        ref={timelineRef}
        className="py-16 bg-gradient-to-b from-[#f0e6d2] to-[#f8f3e9] relative"
      >
        <TempleBorder opacity="opacity-5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                  <Building className="h-8 w-8 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Infrastructure <span className="text-[#a52a2a]">Journey</span>
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Click on any section to explore our facilities and experience a virtual tour of our campus
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4 md:relative">
              {Object.keys(facilities).map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative z-10"
                >
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`relative flex flex-col items-center group ${
                      activeSection === section
                        ? "scale-110"
                        : "opacity-70 hover:opacity-100"
                    } transition-all duration-300`}
                  >
                    <div 
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg ${
                        activeSection === section
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-white text-[#8b1a1a] group-hover:bg-[#8b1a1a]/10"
                      } transition-colors duration-300`}
                    >
                      {getCategoryIcon(section)}
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className={`font-medium capitalize ${
                        activeSection === section
                          ? "text-[#8b1a1a]"
                          : "text-[#5a3e36]"
                      }`}>
                        {section}
                      </h3>
                      <span className="text-xs text-[#5a3e36]/70">
                        {facilities[section].length} items
                      </span>
                    </div>
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#8b1a1a] rotate-45"
                      />
                    )}
                  </button>
                </motion.div>
              ))}
              
              {/* Desktop timeline line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#d4b483]/30 -translate-y-1/2 z-0"></div>
            </div>
          </div>

          {/* Active Section Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {activeFacilities.map((facility, index) => (
                  <HoverCard key={facility.id}>
                    <div
                      className="relative h-full bg-white rounded-xl overflow-hidden shadow-md border border-[#d4b483]/20 cursor-pointer"
                      onClick={() => openModal(facility)}
                    >
                      <div className="relative h-48">
                        <Image
                          src={facility.image}
                          alt={facility.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#8b1a1a]/70 to-transparent opacity-70"></div>
                        
                        {/* Floating animation badge */}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md"
                        >
                          <span className="text-xs font-medium text-[#8b1a1a] flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </span>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                            <div className="text-[#8b1a1a]">{facility.icon}</div>
                          </div>
                          <h3 className="text-xl font-bold text-[#8b1a1a]">
                            {facility.title}
                          </h3>
                        </div>
                        <p className="text-[#5a3e36] line-clamp-3 mb-4">{facility.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-[#8b1a1a] text-sm font-medium hover:underline group">
                            <span>View Details</span>
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                          
                          <div className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(activeSection)}`}>
                            {activeSection}
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
              
              {/* 3D Effect Border */}
              <div className="absolute -inset-4 border border-[#d4b483]/20 rounded-2xl -z-10 bg-[#f0e6d2]/50 blur-sm"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Map Section */}
        <div ref={mapRef} className="mt-32 mb-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                  <Globe className="h-8 w-8 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Interactive <span className="text-[#a52a2a]">Campus Map</span>
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Explore our campus virtually and discover the location of our various facilities
            </p>
          </div>

          <HoverCard>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#d4b483]/30 relative">
              <div className="relative w-full h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#8b1a1a]/5 to-transparent"></div>
                
                {/* Map container */}
                <div className="relative w-full h-full">
                  <Image
                    src="/sc.jpg"
                    alt="Campus map"
                    fill
                    className="object-cover transition-all duration-500"
                    style={{ 
                      transform: isMapExpanded ? "scale(1.2)" : "scale(1)" 
                    }}
                  />
                  
                  {/* Map overlay with grid */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none">
                    <svg width="100%" height="100%" className="opacity-20">
                      <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8b1a1a" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Map Building Markers */}
                  {mapBuildings.map((building) => (
                    <motion.div
                      key={`map-${building.id}`}
                      className="absolute cursor-pointer z-10"
                      style={building.mapPosition}
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: hoveredBuilding === building.id ? 1.2 : 1,
                        y: hoveredBuilding === building.id ? -5 : 0
                      }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      onHoverStart={() => setHoveredBuilding(building.id)}
                      onHoverEnd={() => setHoveredBuilding(null)}
                      onClick={() => openModal(building)}
                    >
                      <div className={`relative p-2 rounded-full shadow-lg transition-all duration-300 ${
                        building.category === activeSection 
                          ? "bg-[#8b1a1a] text-white" 
                          : "bg-white/90 text-[#8b1a1a] backdrop-blur-sm"
                      }`}>
                        {building.icon}
                        
                        {/* Pulse effect */}
                        <div className={`absolute inset-0 rounded-full ${
                          building.category === activeSection 
                            ? "bg-[#8b1a1a]/30" 
                            : "bg-white/30"
                        } animate-ping`}></div>
                      </div>
                      
                      {/* Building name tooltip */}
                      {hoveredBuilding === building.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm"
                        >
                          {building.title}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Compass Rose */}
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-lg">
                    <svg width="40" height="40" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#8b1a1a" strokeWidth="2" />
                      <polygon points="50,10 55,50 50,90 45,50" fill="#8b1a1a" />
                      <polygon points="10,50 50,45 90,50 50,55" fill="#5a3e36" />
                      <circle cx="50" cy="50" r="5" fill="#8b1a1a" />
                      <text x="50" y="25" textAnchor="middle" fill="#8b1a1a" fontSize="12" fontWeight="bold">N</text>
                      <text x="75" y="50" textAnchor="middle" fill="#5a3e36" fontSize="12" fontWeight="bold">E</text>
                      <text x="50" y="80" textAnchor="middle" fill="#5a3e36" fontSize="12" fontWeight="bold">S</text>
                      <text x="25" y="50" textAnchor="middle" fill="#5a3e36" fontSize="12" fontWeight="bold">W</text>
                    </svg>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/80 p-3 rounded-lg backdrop-blur-sm shadow-lg max-w-xs">
                    <h4 className="text-xs font-bold text-[#8b1a1a] mb-2">MAP LEGEND</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(facilities).map((category) => (
                        <div 
                          key={`legend-${category}`}
                          className="flex items-center cursor-pointer"
                          onClick={() => setActiveSection(category)}
                        >
                          <div className={`w-3 h-3 rounded-full mr-1.5 ${
                            activeSection === category 
                              ? "bg-[#8b1a1a]" 
                              : "bg-[#5a3e36]"
                          }`}></div>
                          <span className="text-xs capitalize">{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Map Overlay Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <button 
                    className="bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-lg text-[#8b1a1a] hover:bg-white transition-colors"
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                  >
                    {isMapExpanded ? <ChevronDown /> : <ArrowUpRight />}
                  </button>
                  <button 
                    className="bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-lg text-[#8b1a1a] hover:bg-white transition-colors"
                  >
                    <Info />
                  </button>
                </div>
              </div>
              
              {/* Map Information Panel */}
              <div className="bg-white border-t border-[#d4b483]/20 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#8b1a1a]">Campus Map Overview</h3>
                    <p className="text-[#5a3e36] text-sm">Click on any marker to explore the facility</p>
                  </div>
                
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(facilities).map((category) => (
                    <div 
                      key={`stat-${category}`}
                      className="bg-[#f8f3e9] rounded-lg p-3 text-center cursor-pointer hover:bg-[#f0e6d2] transition-colors"
                      onClick={() => setActiveSection(category)}
                    >
                      <div className="flex justify-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activeSection === category 
                            ? "bg-[#8b1a1a] text-white" 
                            : "bg-white text-[#8b1a1a]"
                        }`}>
                          {getCategoryIcon(category)}
                        </div>
                      </div>
                      <h4 className="text-sm font-medium capitalize">{category}</h4>
                      <p className="text-xs text-[#5a3e36]">{facilities[category].length} facilities</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HoverCard>
        </div>
        
        {/* Infrastructure Statistics */}
        <div className="my-20 max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#d4b483]/20">
            <div className="md:flex">
              <div className="md:w-1/3 bg-[#8b1a1a] text-white p-8 relative overflow-hidden">
                <KonarkWheel className="absolute -bottom-10 -right-10 opacity-20" size="w-32 h-32" color="text-white" />
                
                <h3 className="text-2xl font-bold mb-3 font-serif relative z-10">Our Infrastructure Excellence</h3>
                <p className="text-white/80 mb-4 relative z-10">
                  Modern facilities combined with traditional architecture to create an inspiring learning environment.
                </p>
                
                <div className="relative z-10">
                  <a href="#" className="inline-flex items-center text-white hover:underline">
                    Learn about our expansion plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">35</div>
                    <div className="text-sm text-[#5a3e36]">Acres Campus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">24</div>
                    <div className="text-sm text-[#5a3e36]">Classrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">4</div>
                    <div className="text-sm text-[#5a3e36]">Laboratories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">10K+</div>
                    <div className="text-sm text-[#5a3e36]">Library Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">500</div>
                    <div className="text-sm text-[#5a3e36]">Seat Auditorium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">15</div>
                    <div className="text-sm text-[#5a3e36]">Sports Facilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Safety & Security Section */}
      <section className="py-16 bg-gradient-to-b from-[#f8f3e9] to-[#f0e6d2] relative">
        <TempleBorder opacity="opacity-5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                  <Shield className="h-8 w-8 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Safety & <span className="text-[#a52a2a]">Security</span>
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              We prioritize the wellbeing of our students with comprehensive security measures throughout our campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <HoverCard>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#d4b483]/20 h-full">
                <div className="p-6">
                  <div className="bg-[#8b1a1a]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">24/7 Security Personnel</h3>
                  <p className="text-[#5a3e36]">
                    Trained security staff monitors the campus round-the-clock to ensure a safe environment for all students and staff.
                  </p>
                </div>
              </div>
            </HoverCard>
            
            <HoverCard>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#d4b483]/20 h-full">
                <div className="p-6">
                  <div className="bg-[#8b1a1a]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">CCTV Surveillance</h3>
                  <p className="text-[#5a3e36]">
                    Advanced surveillance systems cover all areas of the campus, providing constant monitoring and recording for safety.
                  </p>
                </div>
              </div>
            </HoverCard>
            
            <HoverCard>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#d4b483]/20 h-full">
                <div className="p-6">
                  <div className="bg-[#8b1a1a]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Fire Safety Systems</h3>
                  <p className="text-[#5a3e36]">
                    Comprehensive fire safety infrastructure including alarms, extinguishers, and regular evacuation drills.
                  </p>
                </div>
              </div>
            </HoverCard>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <AnimatePresence>
        {isScrolling && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#8b1a1a] text-white shadow-lg flex items-center justify-center z-50 hover:bg-[#a52a2a] transition-colors"
          >
            <ChevronDown className="rotate-180 h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96">
                <Image
                  src={modalContent.image}
                  alt={modalContent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(modalContent.category || activeSection)}`}>
                    {modalContent.category || activeSection}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-4">
                      {modalContent.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{modalContent.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#5a3e36] text-lg leading-relaxed">{modalContent.description}</p>
                  
                  <div className="mt-6 bg-[#f8f3e9] p-4 rounded-lg border border-[#d4b483]/20">
                    <h4 className="text-[#8b1a1a] font-medium mb-3 flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Features & Amenities
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modalContent.features && modalContent.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-2 text-[#8b1a1a]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-[#5a3e36]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Location on map section */}
                  <div className="mt-6 bg-white p-4 rounded-lg border border-[#d4b483]/20">
                    <h4 className="text-[#8b1a1a] font-medium mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Location on Campus
                    </h4>
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src="/sc.jpg"
                        alt="Facility location on campus map"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[#8b1a1a]/30"></div>
                      
                      {/* Blinking location marker */}
                      <div className="absolute" style={modalContent.mapPosition || { top: "50%", left: "50%" }}>
                        <div className="relative">
                          <div className="absolute -inset-3 rounded-full bg-[#8b1a1a]/30 animate-ping"></div>
                          <div className="relative bg-[#8b1a1a] p-1.5 rounded-full">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 right-2">
                        <button className="bg-white/80 text-[#8b1a1a] text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center">
                          <span>View on map</span>
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center">
                      <button className="flex items-center mr-4 text-[#5a3e36] hover:text-[#8b1a1a]">
                        <Play className="h-5 w-5 mr-1" />
                        <span className="text-sm">Virtual Tour</span>
                      </button>
                      
                      <button className="flex items-center text-[#5a3e36] hover:text-[#8b1a1a]">
                        <Images className="h-5 w-5 mr-1" />
                        <span className="text-sm">Photo Gallery</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfrastructurePage;