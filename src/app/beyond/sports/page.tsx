"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Target,
  Flag,
  Users,
  Calendar,
  Clock,
  Dumbbell,
  Flame,
  Dribbble,
  X,
  BarChart2,
  MapPin,
  User,
  Award,
  ArrowRight,
} from "lucide-react";


// Type definition for sport
interface Sport {
  id: string;
  name: string;
  description: string;
  schedule: string;
  coaches: string[];
  facilities: string[];
  achievements: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
  ageGroups?: string[];
  tournaments?: string[];
}

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sports Data
  const sports: Sport[] = [
    {
      id: "basketball",
      name: "Basketball",
      description: 
        "Our basketball program focuses on developing skills, strategy, teamwork, and sportsmanship. Students learn the fundamentals of dribbling, passing, shooting, and defensive techniques while fostering a competitive spirit and team unity. Regular practice sessions, friendly matches, and participation in tournaments help players enhance their abilities and understand the importance of collaboration.",
      schedule: "Monday, Wednesday, Friday: 3:30 PM - 5:00 PM",
      coaches: ["Coach Rajiv Kumar (Former state player)", "Coach Meena Patnaik (National level coach)"],
      facilities: [
        "Full-sized indoor basketball court",
        "Outdoor practice courts",
        "Professional-grade equipment",
        "Video analysis setup for technique improvement",
        "Strength training equipment"
      ],
      achievements: [
        "District Champions (U-14 Boys) - 2023",
        "State Runner-up (U-17 Girls) - 2024",
        "CBSE National Tournament Participation - 2023",
        "All-India School Games - Top 8 finish"
      ],
      image: "/basketball.jpg",
      icon: <Dribbble className="h-8 w-8" />,
      color: "#E65100",
      ageGroups: ["Under-14", "Under-17", "Under-19"],
      tournaments: ["CBSE Cluster", "District Championships", "State School Games", "Friendly matches with local schools"]
    },
    {
      id: "volleyball",
      name: "Volleyball",
      description: 
        "Our volleyball program develops agility, coordination, and teamwork. Players master serving, passing, setting, and spiking techniques through focused training sessions. The sport encourages quick decision-making, communication, and synchronized team effort. Students participate in regular practice, skill drills, and competitive matches to improve their abilities and game understanding.",
      schedule: "Tuesday, Thursday: 3:30 PM - 5:00 PM, Saturday: 9:30 AM - 11:30 AM",
      coaches: ["Coach Sameer Panda (State coach certification)", "Coach Priya Mishra (Former national player)"],
      facilities: [
        "Indoor volleyball court with specialized flooring",
        "Outdoor courts for practice",
        "Professional-grade nets and equipment",
        "Height-adjustable nets for different age groups",
        "Ball machines for practice"
      ],
      achievements: [
        "State Champions (Boys) - 2023",
        "District Champions (Girls) - 2024",
        "CBSE East Zone Winners - 2022",
        "Multiple players selected for state teams"
      ],
      image: "/volleyball.jpg",
      icon: <Dribbble className="h-8 w-8" />,
      color: "#5D4037",
      ageGroups: ["Under-14", "Under-17", "Under-19"],
      tournaments: ["CBSE Regional and National", "District Championships", "State School Games", "Interschool tournaments"]
    },
    {
      id: "tennisball",
      name: "Tennis Ball Cricket",
      description: 
        "Tennis Ball Cricket is a modified version of cricket played with a tennis ball instead of a traditional cricket ball. This adaptation makes the game safer and more accessible to students across age groups. Our program focuses on batting techniques, bowling skills, fielding, and game strategy. The sport helps develop hand-eye coordination, reflexes, and tactical thinking.",
      schedule: "Monday, Wednesday: 3:30 PM - 5:30 PM, Saturday: 8:00 AM - 10:00 AM",
      coaches: ["Coach Vikram Singh (Former Ranji player)", "Coach Anand Sharma (Cricket certification)"],
      facilities: [
        "Multiple cricket nets for practice",
        "Dedicated field with proper pitch",
        "Batting cages for focused practice",
        "Bowling machines",
        "High-quality tennis balls and cricket equipment"
      ],
      achievements: [
        "Interschool Tennis Ball Cricket Champions - 3 consecutive years",
        "District Tournament Winners - 2024",
        "Regional School Cricket Festival - Champions",
        "Several students selected for district cricket training"
      ],
      image: "/cricket.jpg",
      icon: <Dribbble className="h-8 w-8" />,
      color: "#1B5E20",
      ageGroups: ["Under-12", "Under-14", "Under-17", "Open category"],
      tournaments: ["Interschool tournaments", "District level competitions", "Cricket festivals", "Annual school cricket league"]
    },
    {
      id: "taekwondo",
      name: "Taekwondo",
      description: 
        "Our Taekwondo program focuses on this Korean martial art that emphasizes high, fast kicks and punching techniques. Beyond physical skills, Taekwondo instills discipline, respect, self-control, and confidence. Students progress through belt rankings while developing strength, flexibility, coordination, and mental focus. The program includes forms (patterns), sparring, and board breaking.",
      schedule: "Tuesday, Thursday: 3:30 PM - 5:00 PM, Saturday: 10:00 AM - 12:00 PM",
      coaches: ["Master Kim Sung (4th Dan Black Belt)", "Coach Ritika Mohanty (3rd Dan Black Belt)"],
      facilities: [
        "Dedicated dojang (training hall) with specialized mats",
        "Training equipment including pads, shields, and targets",
        "Electronic scoring systems for competitions",
        "Protective gear for safe sparring",
        "Strength and conditioning area"
      ],
      achievements: [
        "State Championship - 12 gold medals across categories",
        "National Taekwondo Championship - 3 silver medals",
        "CBSE National Martial Arts Meet - 5 medalists",
        "Over 45 students achieved Black Belt status"
      ],
      image: "/taekwondo.jpg",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "#0D47A1",
      ageGroups: ["6-9 years", "10-13 years", "14-17 years", "18+ years"],
      tournaments: ["State Championships", "National Taekwondo Federation tournaments", "CBSE Martial Arts Meet", "Open invitational competitions"]
    },
    {
      id: "cricket",
      name: "Cricket",
      description: 
        "Our cricket program develops batting, bowling, and fielding skills along with strategic game understanding. Students train in all aspects of this popular sport while learning the values of teamwork, fair play, and resilience. The program includes net practice, fielding drills, match simulations, and competitive games to prepare players for various formats of cricket.",
      schedule: "Tuesday, Friday: 3:30 PM - 5:30 PM, Sunday: 8:00 AM - 11:00 AM",
      coaches: ["Coach Rajesh Patel (Former Ranji Trophy player)", "Coach Shikha Dey (BCCI Level 1 certification)"],
      facilities: [
        "Cricket field with standard pitch",
        "Multiple practice nets",
        "Bowling machines",
        "Video analysis equipment",
        "Complete match and practice equipment"
      ],
      achievements: [
        "CBSE Cluster Cricket Champions - 2023",
        "State School Cricket Tournament - Runners Up",
        "District Champions - 3 consecutive years",
        "5 students selected for state cricket academy"
      ],
      image: "/cricket-hard.jpg",
      icon: <Dribbble className="h-8 w-8" />,
      color: "#00796B",
      ageGroups: ["Under-14", "Under-17", "Under-19"],
      tournaments: ["CBSE Cricket Tournaments", "State School Games", "District League", "Friendly matches with cricket academies"]
    },
    {
      id: "kho-kho",
      name: "Kho Kho",
      description: 
        "Kho Kho is an indigenous Indian sport that develops speed, agility, and team strategy. Our program focuses on techniques for chasing, dodging, and tactical play. This traditional sport fosters quick thinking, spatial awareness, and team coordination. Students learn pole turns, diving skills, and strategic formations while developing physical fitness and competitive spirit.",
      schedule: "Monday, Wednesday: 3:30 PM - 5:00 PM, Saturday: 9:00 AM - 11:00 AM",
      coaches: ["Coach Sunil Kumar (National Kho Kho player)", "Coach Anjali Sahu (State team coach)"],
      facilities: [
        "Regulation Kho Kho field with proper markings",
        "Training equipment for agility and speed",
        "Soft surface for diving practice",
        "Fitness equipment for strength training",
        "Specialized shoes for players"
      ],
      achievements: [
        "National School Kho Kho Tournament - Top 4 finish",
        "State Champions (Girls) - 2023 & 2024",
        "District Champions (Boys) - 4 consecutive years",
        "Multiple students selected for state Kho Kho team"
      ],
      image: "/kho-kho.jpg",
      icon: <Flame className="h-8 w-8" />,
      color: "#C62828",
      ageGroups: ["Under-14", "Under-17", "Under-19"],
      tournaments: ["State School Games", "District Championships", "Traditional Sports Meet", "Inter-school competitions"]
    },
    {
      id: "kabaddi",
      name: "Kabaddi",
      description: 
        "Our Kabaddi program focuses on this traditional Indian contact sport that requires strength, agility, tactical awareness, and breath control. Players learn raiding and defending techniques while developing physical fitness and mental toughness. The program emphasizes teamwork, strategy, and quick decision-making while building strength and endurance.",
      schedule: "Tuesday, Thursday: 3:30 PM - 5:00 PM, Saturday: 9:00 AM - 11:00 AM",
      coaches: ["Coach Deepak Nayak (Former state player)", "Coach Sunita Behera (National championship experience)"],
      facilities: [
        "Regulation Kabaddi court with proper surface",
        "Training mats for safe practice",
        "Strength training equipment",
        "Protective gear for players",
        "Audio-visual aids for strategy sessions"
      ],
      achievements: [
        "State School Games - Gold Medal (Boys team)",
        "District Champions - Girls (2023) and Boys (2024)",
        "School Games Federation Tournament - Top 8 finish",
        "Three students selected for state Kabaddi academy"
      ],
      image: "/kabaddi.jpg",
      icon: <Flame className="h-8 w-8" />,
      color: "#7B1FA2",
      ageGroups: ["Under-14", "Under-17", "Under-19"],
      tournaments: ["School Games Federation competitions", "District and State tournaments", "Traditional Sports Meet", "Friendly matches with local clubs"]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "team", name: "Team Sports", sports: ["basketball", "volleyball", "cricket"] },
    { id: "indigenous", name: "Indigenous Sports", sports: ["kho-kho", "kabaddi", "tennisball"] },
    { id: "martial", name: "Martial Arts", sports: ["taekwondo"] }
  ];

  const openSportDetails = (sportId: string) => {
    setActiveSport(sportId);
  };

  const closeSportDetails = () => {
    setActiveSport(null);
  };

  const filterSportsByCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Filter sports based on selected category
  const filteredSports = selectedCategory 
    ? sports.filter(sport => {
        const category = categories.find(c => c.id === selectedCategory);
        return category ? category.sports.includes(sport.id) : true;
      })
    : sports;

  // Get upcoming tournament data
  const upcomingTournaments = [
    {
      name: "District Basketball Championship",
      date: "June 15-18, 2025",
      venue: "District Sports Complex, Khordha",
      categories: "U-14, U-17, U-19 (Boys & Girls)"
    },
    {
      name: "CBSE East Zone Cricket Tournament",
      date: "July 10-15, 2025",
      venue: "Regional Sports Stadium",
      categories: "U-17, U-19 (Boys)"
    },
    {
      name: "State Level Taekwondo Championship",
      date: "August 5-7, 2025",
      venue: "State Sports Academy, Bhubaneswar",
      categories: "All Weight Categories & Age Groups"
    },
    {
      name: "Inter-School Indigenous Sports Meet",
      date: "September 12-14, 2025",
      venue: "Aryavart Ancient Academy",
      categories: "Kho Kho, Kabaddi, Traditional Games"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <main className="pb-16">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] py-16 px-4 mb-16">
          <div className="absolute inset-0 bg-[url('/sports-pattern.png')] opacity-10"></div>

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
                Sports Programs
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Our comprehensive sports programs foster physical fitness, teamwork, and competitive spirit. Students can explore various sports disciplines, develop their skills, and represent the school in competitions at different levels.
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

        {/* Filter Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border border-[#d4b483]/20">
            <h2 className="text-2xl font-bold text-[#8b1a1a] mb-4">Explore Our Sports Programs</h2>
            <p className="text-[#5a3e36] mb-6">Filter sports by category to discover the perfect fit for your athletic interests.</p>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => filterSportsByCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null 
                    ? "bg-[#8b1a1a] text-white" 
                    : "bg-[#f0e6d2] text-[#5a3e36] hover:bg-[#d4b483]/30"
                }`}
              >
                All Sports
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => filterSportsByCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id 
                      ? "bg-[#8b1a1a] text-white" 
                      : "bg-[#f0e6d2] text-[#5a3e36] hover:bg-[#d4b483]/30"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sports Grid Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSports.map((sport) => (
              <motion.div
                key={sport.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => openSportDetails(sport.id)}
              >
                <div className="relative h-48">
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: sport.color }}
                    >
                      <div className="text-white">{sport.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{sport.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-[#5a3e36] mb-3">
                    <Clock className="h-4 w-4 mr-2 text-[#8b1a1a]" />
                    {sport.schedule.split(',')[0]}...
                  </div>
                  <p className="text-[#5a3e36] text-sm line-clamp-3">{sport.description}</p>
                  <button className="mt-4 inline-flex items-center text-[#8b1a1a] font-medium text-sm">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements Showcase */}
        <section className="bg-[#f0e6d2] py-16 px-4 mb-16">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block mb-2 bg-white p-3 rounded-full">
                <Trophy className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
                Sports Achievements
              </h2>
              <p className="text-[#5a3e36]">
                Our students have excelled in various sports competitions, bringing laurels to the school.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                  <Medal className="h-6 w-6 mr-2 text-yellow-500" />
                  National Level Accomplishments
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">CBSE National Sports Meet</h4>
                      <p className="text-sm text-[#5a3e36]">Multiple medals in Taekwondo and Basketball</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">School Games Federation of India</h4>
                      <p className="text-sm text-[#5a3e36]">Top 8 finish in Cricket and Kabaddi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">All India Traditional Sports Competition</h4>
                      <p className="text-sm text-[#5a3e36]">Gold medals in Kho Kho (U-17 Girls)</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                  <Medal className="h-6 w-6 mr-2 text-[#8b1a1a]" />
                  State & Regional Achievements
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">State School Games</h4>
                      <p className="text-sm text-[#5a3e36]">Champions in Basketball, Volleyball, and Kabaddi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">District Championships</h4>
                      <p className="text-sm text-[#5a3e36]">Multiple gold medals across various sports</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5a3e36]">CBSE East Zone Tournaments</h4>
                      <p className="text-sm text-[#5a3e36]">Winners in multiple categories and age groups</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Upcoming Tournaments
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Stay informed about the forthcoming sports events and competitions where our teams will participate.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-[#8b1a1a] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Tournament</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Venue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Categories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingTournaments.map((tournament, index) => (
                  <tr key={index} className="hover:bg-[#f8f3e9]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-[#5a3e36] font-medium">
                      {tournament.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#5a3e36]">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#8b1a1a] mr-2" />
                        {tournament.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#5a3e36]">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-[#8b1a1a] mr-2" />
                        {tournament.venue}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#5a3e36]">
                      {tournament.categories}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Benefits of Sports */}
        <section className="bg-white py-16 px-4 mb-16">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block mb-2 bg-[#8b1a1a]/10 p-3 rounded-full">
                <Dumbbell className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
                Benefits of Sports
              </h2>
              <p className="text-[#5a3e36]">
                Participation in sports contributes significantly to a student's overall development in various dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Dumbbell className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Physical Fitness</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Regular sports participation improves cardiovascular health, enhances strength and flexibility, and helps maintain a healthy weight and overall physical well-being.
                </p>
              </div>

              <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Team Spirit</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Sports teach valuable lessons in teamwork, cooperation, and understanding team dynamics. Students learn to work together towards common goals and support each other.
                </p>
              </div>

              <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <BarChart2 className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Mental Resilience</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Participating in sports builds mental toughness, emotional control, and the ability to handle pressure situations, which transfers positively to academic and personal challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Student Success Stories
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Meet some of our outstanding student athletes who have excelled in their respective sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image 
                    src="/athlete1.jpg" 
                    alt="Student Athlete" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-2">Aditya Patel</h3>
                  <p className="text-sm text-[#5a3e36] mb-4">Basketball Team Captain, Class 12</p>
                  <p className="text-[#5a3e36] mb-4">
                    "Basketball has taught me more than just sport skills - it's shaped my character and leadership abilities. The coaching and support at our school helped me secure a sports scholarship for my higher education."
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-full text-xs font-medium">
                      State Team Selection
                    </span>
                    <span className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-full text-xs font-medium">
                      Sports Scholarship
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image 
                    src="/athlete2.jpg" 
                    alt="Student Athlete" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-2">Meera Sharma</h3>
                  <p className="text-sm text-[#5a3e36] mb-4">Taekwondo Champion, Class 10</p>
                  <p className="text-[#5a3e36] mb-4">
                    "The discipline and focus I've gained through Taekwondo have positively impacted all areas of my life. I'm grateful for the opportunity to represent my school at the national level."
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-full text-xs font-medium">
                      National Gold Medalist
                    </span>
                    <span className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-full text-xs font-medium">
                      Black Belt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Sports Programs CTA */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-lg overflow-hidden shadow-lg text-white">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4">Join Our Sports Programs</h2>
                <p className="mb-6">
                  Whether you're a beginner or an experienced player, our sports programs offer something for everyone. Develop your skills, stay fit, and represent your school in competitions!
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="/contact" 
                    className="px-6 py-3 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-white/90 transition-colors flex items-center"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
                  src="/sports-cta.jpg" 
                  alt="Sports Activities" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sport Details Modal */}
      <AnimatePresence>
        {activeSport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeSportDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {sports.find(sport => sport.id === activeSport) && (
                <>
                  <div className="relative h-56 md:h-72">
                    <Image
                      src={sports.find(sport => sport.id === activeSport)?.image || ""}
                      alt={sports.find(sport => sport.id === activeSport)?.name || ""}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <motion.button
                      className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      onClick={closeSportDetails}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-5 w-5 text-white" />
                    </motion.button>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: sports.find(sport => sport.id === activeSport)?.color }}
                        >
                          <div>{sports.find(sport => sport.id === activeSport)?.icon}</div>
                        </div>
                        <div>
                          <p className="text-sm text-white/80">Sport</p>
                          <h2 className="text-2xl font-bold">
                            {sports.find(sport => sport.id === activeSport)?.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">About the Sport</h3>
                      <p className="text-[#5a3e36]">
                        {sports.find(sport => sport.id === activeSport)?.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Practice Schedule</h3>
                      <div className="bg-[#f8f3e9] p-4 rounded-lg">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-[#5a3e36]">
                            {sports.find(sport => sport.id === activeSport)?.schedule}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Coaches</h3>
                        <ul className="space-y-2">
                          {sports.find(sport => sport.id === activeSport)?.coaches.map((coach, index) => (
                            <li key={index} className="flex items-start">
                              <User className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                              <p className="text-[#5a3e36]">{coach}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Age Groups</h3>
                        <ul className="space-y-2">
                          {sports.find(sport => sport.id === activeSport)?.ageGroups?.map((group, index) => (
                            <li key={index} className="flex items-start">
                              <Users className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                              <p className="text-[#5a3e36]">{group}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Facilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sports.find(sport => sport.id === activeSport)?.facilities.map((facility, index) => (
                          <div key={index} className="flex items-start bg-[#f8f3e9] p-3 rounded-md">
                            <CheckCircle className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                            <p className="text-[#5a3e36]">{facility}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Tournaments & Competitions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sports.find(sport => sport.id === activeSport)?.tournaments?.map((tournament, index) => (
                          <div key={index} className="flex items-start">
                            <Trophy className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                            <p className="text-[#5a3e36]">{tournament}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Recent Achievements</h3>
                      <div className="bg-[#8b1a1a]/5 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {sports.find(sport => sport.id === activeSport)?.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <Medal className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                              <p className="text-[#5a3e36]">{achievement}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <a 
                        href="/enquiry" 
                        className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors"
                      >
                        Join This Sport
                      </a>
                      <button
                        onClick={closeSportDetails}
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

// Helper Component for CheckCircle icon
function CheckCircle({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// Helper Component for Quote icon
function Quote({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}