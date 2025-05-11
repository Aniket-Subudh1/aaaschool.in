"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  Award,
  Sparkles,
  Heart,
  GraduationCap,
  Globe,
  Lightbulb,
  Award as AwardIcon,
  Info,
  X,
} from "lucide-react";


// Type definition for service unit
interface ServiceUnit {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
  achievements?: string[];
}

export default function ServiceUnitsPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  // Service Units Data
  const serviceUnits: ServiceUnit[] = [
    {
      id: "ncc",
      name: "National Cadet Corps",
      shortName: "NCC",
      description: 
        "The National Cadet Corps is the youth wing of the Armed Forces with its headquarters in New Delhi. It is open to school and college students on a voluntary basis. The NCC in our school aims to develop character, comradeship, discipline, leadership, secular outlook, spirit of adventure, and ideals of selfless service among the youth of the country.",
      features: [
        "Inculcates values of discipline and patriotism",
        "Provides basic military training to students",
        "Develops leadership qualities and team spirit",
        "Opportunities to participate in camps and adventure activities",
        "Preference in military recruitment and educational institutions"
      ],
      image: "/ncc.jpg",
      icon: <Shield className="h-8 w-8" />,
      color: "#2D3E50",
      achievements: [
        "Over 50 cadets have participated in Republic Day Parade",
        "Multiple students selected for NCC National Games",
        "Consistent A grade in Certificate Examinations",
        "Winners of Inter-School NCC Competitions"
      ]
    },
    {
      id: "scout-guide",
      name: "Scout & Guide",
      shortName: "Scout & Guide",
      description: 
        "The Scouts and Guides movement helps young people develop academic skills, self-confidence, ethics, leadership skills, and citizenship skills through a variety of activities such as camping, community service, and other outdoor adventures. Our school has a vibrant Scout and Guide unit that focuses on character building and community service.",
      features: [
        "Character development through outdoor activities",
        "Community service initiatives",
        "Skill-based proficiency badges",
        "Nature conservation and environmental awareness",
        "Leadership development and team building"
      ],
      image: "/sg.jpg",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "#28A745",
      achievements: [
        "Rajya Puraskar awarded to 15 students in the last 5 years",
        "Regular participation in Jamborees at state and national level",
        "Completed over 100 community service projects",
        "Regional champions in pioneering and campcraft competitions"
      ]
    },
    {
      id: "jrc",
      name: "Junior Red Cross",
      shortName: "JRC",
      description: 
        "The Junior Red Cross (JRC) is a voluntary humanitarian organization that inspires, encourages, and initiates at all times humanitarian activities so that human suffering can be minimized. In our school, the JRC unit helps students develop a spirit of service and foster humanitarian values.",
      features: [
        "Health and hygiene awareness programs",
        "First aid training and emergency response",
        "Blood donation camps",
        "Disaster management awareness",
        "Relief work during natural calamities"
      ],
      image: "/jrc.jpg",
      icon: <Heart className="h-8 w-8" />,
      color: "#DC3545",
      achievements: [
        "Recognized for outstanding service during flood relief operations",
        "Organized 25+ successful blood donation camps",
        "Trained over 200 students in basic first aid techniques",
        "State-level recognition for hygiene awareness campaigns"
      ]
    },
    {
      id: "cub-bulbul",
      name: "Cub & Bulbul",
      shortName: "Cub-Bulbul",
      description: 
        "Cub and Bulbul is a part of the Scout movement designed for younger students. Cubs (for boys) and Bulbuls (for girls) engage in a variety of activities that help them develop physically, intellectually, emotionally, socially, and spiritually. The program emphasizes fun and friendship while introducing them to the Scouting ideals.",
      features: [
        "Age-appropriate outdoor activities",
        "Introduction to scouting values",
        "Basic skill development",
        "Environmental awareness",
        "Community helpers recognition"
      ],
      image: "/cb.jpg",
      icon: <Sparkles className="h-8 w-8" />,
      color: "#FFC107",
      achievements: [
        "Winners of regional Cub & Bulbul Utsav for three consecutive years",
        "Recognition for best community awareness programs",
        "Pioneered eco-friendly school practices through Cub-Bulbul initiatives",
        "Creative presentations winning state-level competitions"
      ]
    }
  ];

  const openUnitDetails = (unitId: string) => {
    setActiveUnit(unitId);
  };

  const closeUnitDetails = () => {
    setActiveUnit(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <main className="pb-16">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] py-16 px-4 mb-16">
          <div className="absolute inset-0 bg-[url('/service-pattern.png')] opacity-10"></div>

          <div className="container mx-auto relative z-10">
            <div className="mb-8">
              <Link
                href="/beyond"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                <span>Back to Beyond Academics</span>
              </Link>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                Service Units
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Our service units aim to develop character, discipline, leadership, and a spirit of selfless service among students. These units provide valuable life skills and instill a sense of patriotism, community service, and social responsibility.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
            <div className="flex justify-center w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="w-6 h-6 bg-white/10 mx-0.5 rounded-t-lg"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Service Units Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceUnits.map((unit) => (
              <motion.div
                key={unit.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => openUnitDetails(unit.id)}
              >
                <div className="relative h-48">
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${unit.color}` }}
                      >
                        <div className="text-white">{unit.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{unit.shortName}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">{unit.name}</h3>
                  <p className="text-[#5a3e36] text-sm line-clamp-3">{unit.description}</p>
                  <button className="mt-4 inline-flex items-center text-[#8b1a1a] font-medium text-sm">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Join Section */}
        <section className="bg-white py-16 px-4 mb-16">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block mb-2 bg-[#8b1a1a]/10 p-3 rounded-full">
                <Lightbulb className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
                Why Join Our Service Units?
              </h2>
              <p className="text-[#5a3e36]">
                Participating in our service units offers numerous benefits that extend well beyond the classroom. These programs foster holistic development and prepare students for future leadership roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f8f3e9] p-6 rounded-lg border border-[#d4b483]/20 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Shield className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Character Building</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Our service units instill values of discipline, integrity, and responsibility, helping students develop strong character and moral compass.
                </p>
              </div>

              <div className="bg-[#f8f3e9] p-6 rounded-lg border border-[#d4b483]/20 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Leadership Skills</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Students learn to lead by example, make decisions, and guide others, developing essential leadership skills that will serve them throughout life.
                </p>
              </div>

              <div className="bg-[#f8f3e9] p-6 rounded-lg border border-[#d4b483]/20 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Globe className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Social Responsibility</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Through community service and social initiatives, students develop empathy, compassion, and a sense of responsibility toward society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition & Achievements */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-[#8b1a1a]/5 p-8 rounded-lg border border-[#d4b483]/30">
            <div className="text-center mb-8">
              <div className="inline-block mb-2 bg-white p-3 rounded-full">
                <AwardIcon className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h2 className="text-3xl font-bold text-[#8b1a1a] mb-2 font-serif">
                Recognition & Achievements
              </h2>
              <p className="text-[#5a3e36] max-w-2xl mx-auto">
                Our service units have consistently achieved excellence at various levels. Here are some of our notable accomplishments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#8b1a1a] mb-4">National Recognition</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      Participation in Republic Day Parade in New Delhi
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      Rajya Puraskar awards for Scout & Guide members
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      National level recognition for disaster management initiatives
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#8b1a1a] mb-4">State & Local Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      Blood donation camps benefiting local hospitals
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      Environmental conservation projects in Khordha district
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <AwardIcon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <p className="text-[#5a3e36]">
                      Community awareness programs on health and hygiene
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Join a Unit CTA */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-lg overflow-hidden shadow-lg text-white">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4">Join a Service Unit Today</h2>
                <p className="mb-6">
                  Become part of our service units to develop valuable skills, make a difference in the community, and enhance your personal growth.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="/contact" 
                    className="px-6 py-3 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-white/90 transition-colors"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/enquiry" 
                    className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="md:w-1/3 relative hidden md:block">
                <div className="absolute inset-0 bg-black/20"></div>
                <Image 
                  src="/service.jpg" 
                  alt="Service Unit Activities" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Unit Details Modal */}
      <AnimatePresence>
        {activeUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeUnitDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {serviceUnits.find(unit => unit.id === activeUnit) && (
                <>
                  <div className="relative h-56 md:h-72">
                    <Image
                      src={serviceUnits.find(unit => unit.id === activeUnit)?.image || ""}
                      alt={serviceUnits.find(unit => unit.id === activeUnit)?.name || ""}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <motion.button
                      className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      onClick={closeUnitDetails}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-5 w-5 text-white" />
                    </motion.button>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: serviceUnits.find(unit => unit.id === activeUnit)?.color }}
                        >
                          <div>{serviceUnits.find(unit => unit.id === activeUnit)?.icon}</div>
                        </div>
                        <div>
                          <p className="text-sm text-white/80">Service Unit</p>
                          <h2 className="text-2xl font-bold">
                            {serviceUnits.find(unit => unit.id === activeUnit)?.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">About the Unit</h3>
                      <p className="text-[#5a3e36]">
                        {serviceUnits.find(unit => unit.id === activeUnit)?.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceUnits.find(unit => unit.id === activeUnit)?.features.map((feature, index) => (
                          <div key={index} className="flex items-start bg-[#f8f3e9] p-3 rounded-md">
                            <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                              <Info className="h-4 w-4 text-[#8b1a1a]" />
                            </div>
                            <p className="text-sm text-[#5a3e36]">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {serviceUnits.find(unit => unit.id === activeUnit)?.achievements && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Achievements</h3>
                        <div className="bg-[#8b1a1a]/5 p-4 rounded-lg">
                          <ul className="space-y-2">
                            {serviceUnits.find(unit => unit.id === activeUnit)?.achievements?.map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <AwardIcon className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                                <p className="text-[#5a3e36]">{achievement}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-8">
                      <a 
                        href="/enquiry" 
                        className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors"
                      >
                        Enquire to Join
                      </a>
                      <button
                        onClick={closeUnitDetails}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}