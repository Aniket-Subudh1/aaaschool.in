"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Camera,
  Palette,
  Music,
  Code,
  Map,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Sparkles,
  Award,
  X,
  Clock,
  Check,
  Trophy,
  FlaskConical,
} from "lucide-react";


interface Club {
  id: string;
  name: string;
  description: string;
  meetingSchedule: string;
  eligibility: string;
  activities: string[];
  teachers: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
  achievements?: string[];
}

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const clubs: Club[] = [
    {
      id: "dance-club",
      name: "Dance Club",
      description: 
        "The Dance Club provides a platform for students to express themselves through various dance forms and rhythmic movements. Members learn classical, folk, and contemporary dance styles under the guidance of trained instructors. The club helps students develop physical coordination, rhythm, and artistic expression while building confidence through performances.",
      meetingSchedule: "Classes 1-4: Every Wednesday, 3:20 PM - 4:00 PM | Classes 5-10: Every Friday, 3:20 PM - 4:00 PM",
      eligibility: "Open to all students from Class 1 to 10",
      activities: [
        "Training in classical dance forms (Odissi, Bharatanatyam)",
        "Folk dance workshops (regional and international)",
        "Contemporary and western dance training",
        "Choreography workshops and creative sessions",
        "Cultural events and competition preparation",
        "Annual dance recitals and performances"
      ],
      teachers: ["Mohit Sir", "Sunayana Miss", "Roma Miss"],
      image: "/cul.jpg",
      icon: <Music className="h-8 w-8" />,
      color: "#66BB6A",
      achievements: [
        "State and national level dance competition winners",
        "Performance at cultural festivals across the state",
        "Choreographed original production showcasing local culture",
        "Conducted outreach dance programs in the community"
      ]
    },
    {
      id: "music-club",
      name: "Music Club",
      description: 
        "The Music Club nurtures musical talent and appreciation among students. Members learn vocal and instrumental music across various genres including classical, folk, and contemporary styles. The club provides opportunities for students to develop their musical abilities, perform before audiences, and appreciate diverse musical traditions.",
      meetingSchedule: "Classes 1-4: Every Thursday, 3:20 PM - 4:00 PM | Classes 5-10: Every Monday, 3:20 PM - 4:00 PM",
      eligibility: "Open to all students from Class 1 to 10",
      activities: [
        "Vocal music training (classical and contemporary)",
        "Instrumental music sessions",
        "Music theory and composition workshops",
        "Choir and ensemble practice",
        "School event performances and competitions",
        "Annual music concert and recitals"
      ],
      teachers: ["Jomesh Sir", "Shouvik Sir"],
      image: "/ms.jpg",
      icon: <Music className="h-8 w-8" />,
      color: "#F06292",
      achievements: [
        "Regular performances at district and state cultural events",
        "Published album of original student compositions",
        "Winners in national school music competitions",
        "Organized successful music festival with professional artists"
      ]
    },
    {
      id: "robotics-club",
      name: "Robotics Club",
      description: 
        "The Robotics Club provides hands-on experience in designing, building, and programming robots. Members learn the fundamentals of robotics, electronics, and mechanical engineering through practical projects and competitions. The club nurtures innovation, problem-solving, and teamwork while introducing students to STEM concepts in an engaging way.",
      meetingSchedule: "Classes 5-10: Every Saturday, 10:00 AM - 12:00 PM",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Robot design and construction",
        "Programming and coding for robotics",
        "Electronics and circuit building",
        "Robotics competitions and challenges",
        "Tech exhibitions and demonstrations",
        "Collaborative problem-solving projects"
      ],
      teachers: ["Swadhin Sir", "Satyanarayan Sir", "Bindhani Sir"],
      image: "/robotics-club.jpg",
      icon: <Code className="h-8 w-8" />,
      color: "#5C6BC0",
      achievements: [
        "Regional champions in robotics competition",
        "Built functional robots for school applications",
        "Represented school at national robotics festival",
        "Conducted workshops for younger students"
      ]
    },
    {
      id: "science-club",
      name: "Science Club",
      description: 
        "The Science Club encourages scientific inquiry and exploration among students. Members engage in hands-on experiments, scientific projects, and research activities across various fields of science. The club fosters curiosity, analytical thinking, and a deep appreciation for the natural world through practical learning experiences.",
      meetingSchedule: "Junior (Classes 1-4): Friday, 9:00 AM - 9:40 AM | Senior (Classes 5-10): Tuesday, 3:20 PM - 4:00 PM",
      eligibility: "Open to all students from Class 1 to 10",
      activities: [
        "Laboratory experiments and demonstrations",
        "Science project development and research",
        "Science fair participation and exhibitions",
        "Field trips to science centers and museums",
        "Guest lectures by scientists and researchers",
        "Environmental awareness and conservation projects"
      ],
      teachers: ["Dibakar Sir", "Jalaj Sir (Classes 5-10)", "Abanti Miss (Classes 1-4)"],
      image: "/science-club.jpg",
      icon: <FlaskConical className="h-8 w-8" />,
      color: "#4CAF50",
      achievements: [
        "Multiple winners in state science competitions",
        "Published research papers in school science journal",
        "Organized successful science exhibition for community",
        "Students selected for national science olympiad"
      ]
    },
    {
      id: "sports-club",
      name: "Sports Club",
      description: 
        "The Sports Club promotes physical fitness, sportsmanship, and healthy competition among students. Members participate in various indoor and outdoor sports, learn game strategies, and develop teamwork skills. The club encourages active lifestyle and helps students excel in their chosen sports disciplines.",
      meetingSchedule: "Classes 5-10: Daily practice sessions, 6:00 AM - 7:00 AM and 3:30 PM - 5:00 PM",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Training in various sports disciplines",
        "Inter-house and inter-school competitions",
        "Physical fitness and conditioning programs",
        "Sports tournaments and championships",
        "Yoga and meditation sessions",
        "Sports leadership and coaching workshops"
      ],
      teachers: ["Nrusingh Sir", "Pratap Majhi Sir", "Sunita Miss", "Namita Miss"],
      image: "/sports.jpg",
      icon: <Trophy className="h-8 w-8" />,
      color: "#FF9800",
      achievements: [
        "District champions in multiple sports categories",
        "State level representation in athletics",
        "Organized successful inter-school sports meet",
        "Students selected for state sports teams"
      ]
    },
    {
      id: "art-club",
      name: "Art & Craft Club",
      description: 
        "The Art & Craft Club fosters creativity and artistic expression among students through various visual arts mediums. Members explore drawing, painting, sketching, pottery, sculpture, and various craft forms under the guidance of experienced art teachers. The club provides a space for students to express themselves artistically and develop their talents.",
      meetingSchedule: "Classes 1-4: Every Tuesday, 3:20 PM - 4:00 PM | Classes 5-10: Every Thursday, 3:20 PM - 4:00 PM",
      eligibility: "Open to all students from Class 1 to 10",
      activities: [
        "Drawing and painting sessions",
        "Pottery and clay modeling",
        "Craft workshops and DIY projects",
        "Art exhibitions and competitions",
        "Mural painting and school beautification",
        "Art appreciation and history discussions"
      ],
      teachers: ["Swadhin Sir", "Zullu Sir (Classes 5-10)", "Sunita Miss", "Partha Sir (Classes 1-4)"],
      image: "/art-club.jpg",
      icon: <Palette className="h-8 w-8" />,
      color: "#EC407A",
      achievements: [
        "Regular participation in national art competitions",
        "Created murals for public spaces in the community",
        "Selected for special art exhibitions at state galleries",
        "Collaboration with professional artists for workshops"
      ]
    },
    {
      id: "tourism-club",
      name: "Tourism Club",
      description: 
        "The Tourism Club encourages students to explore and appreciate local and national heritage, geography, and culture. Members learn about various tourist destinations, cultural practices, and environmental conservation while participating in educational trips and excursions. The club fosters a sense of appreciation for diversity, history, and natural beauty.",
      meetingSchedule: "Classes 5-10: Every Friday, 3:30 PM - 4:30 PM and scheduled field trips",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Study of tourist destinations and heritage sites",
        "Local history and culture documentation",
        "Educational field trips and excursions",
        "Travel writing and photography",
        "Map reading and navigation skills",
        "Eco-tourism and sustainable travel practices"
      ],
      teachers: ["Jyotirmayee Devi Sir", "Shantilata Miss", "Pradeep Sir"],
      image: "/tourism-club.jpg",
      icon: <Map className="h-8 w-8" />,
      color: "#FF7043",
      achievements: [
        "Created digital guide to local historical sites",
        "Organized heritage walks for the community",
        "Published travel journal featuring student experiences",
        "Collaboration with state tourism department for projects"
      ]
    },
    {
      id: "photography-club",
      name: "Photography Club",
      description: 
        "The Photography Club helps students explore the art and science of photography. Members learn about camera techniques, composition, lighting, and digital editing to capture compelling images. The club provides hands-on experience and professional guidance to help students develop their photographic skills and creative vision.",
      meetingSchedule: "Classes 5-10: Every Monday, 3:30 PM - 5:00 PM",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Photography workshops and skill sessions",
        "Photo walks and outdoor shoots",
        "Digital editing and post-processing classes",
        "Photo exhibitions and competitions",
        "Yearbook and school event coverage",
        "Guest lectures by professional photographers"
      ],
      teachers: ["Lalit Sir", "Swati Miss"],
      image: "/photography-club.jpg",
      icon: <Camera className="h-8 w-8" />,
      color: "#8E24AA",
      achievements: [
        "Multiple winners in state-level photography competitions",
        "Annual photography exhibition with public viewings",
        "Published photography books showcasing student work",
        "Documentary project on local cultural heritage"
      ]
    },
    {
      id: "book-club",
      name: "Book Club",
      description: 
        "The Book Club at Aryavart Ancient Academy provides a platform for students to explore the world of literature, enhance their reading habits, and engage in meaningful discussions about books. Members read selected books, participate in literary discussions, and engage in various activities that promote a love for reading and critical thinking.",
      meetingSchedule: "Classes 5-10: Every Friday, 3:30 PM - 4:30 PM",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Book discussions and debates",
        "Author studies and literary analysis",
        "Creative writing workshops",
        "Book reviews and recommendations",
        "Annual book fair organization",
        "Literary quizzes and competitions"
      ],
      teachers: ["Bhagyalaxmi Miss", "Sarita Miss", "Anayana Miss"],
      image: "/LIB.jpg",
      icon: <BookOpen className="h-8 w-8" />,
      color: "#1E88E5",
      achievements: [
        "Published an anthology of student writings",
        "Organized successful inter-school literature festival",
        "Established a student-run library corner",
        "Conducted author visits and book signing events"
      ]
    },
    {
      id: "chess-club",
      name: "Chess Club",
      description: 
        "The Chess Club promotes strategic thinking, concentration, and sportsmanship through the game of chess. Members learn chess strategies, opening moves, and endgame techniques, and participate in regular practice sessions and tournaments. The club helps develop analytical skills, foresight, and patience while fostering healthy competition.",
      meetingSchedule: "Classes 5-10: Every Monday and Thursday, 3:30 PM - 4:30 PM",
      eligibility: "Open to students from Class 5 to 10",
      activities: [
        "Chess theory and strategy sessions",
        "Practice matches and simultaneous exhibitions",
        "Tactics training and problem-solving",
        "Intra-school tournaments and ladder competitions",
        "Inter-school chess tournaments",
        "Analysis of famous games and championship matches"
      ],
      teachers: ["Subodh Sir", "Avinash Sir"],
      image: "/chess-club.jpg",
      icon: <Award className="h-8 w-8" />,
      color: "#FFA000",
      achievements: [
        "District and state chess championship winners",
        "Hosted regional school chess tournament",
        "Multiple students achieving FIDE ratings",
        "Organized chess exhibition with Grandmaster visit"
      ]
    }
  ];

  // Updated Categories for filtering
  const categories = [
    { id: "arts", name: "Arts & Culture", clubs: ["book-club", "art-club", "music-club", "dance-club"] },
    { id: "tech", name: "Technology & STEM", clubs: ["robotics-club", "science-club"] },
    { id: "creative", name: "Creative Expression", clubs: ["photography-club", "art-club"] },
    { id: "sports", name: "Sports & Games", clubs: ["chess-club", "sports-club"] },
    { id: "exploration", name: "Exploration", clubs: ["tourism-club"] }
  ];

  const openClubDetails = (clubId: string) => {
    setActiveClub(clubId);
  };

  const closeClubDetails = () => {
    setActiveClub(null);
  };

  const filterClubsByCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Filter clubs based on selected category
  const filteredClubs = selectedCategory 
    ? clubs.filter(club => {
        const category = categories.find(c => c.id === selectedCategory);
        return category ? category.clubs.includes(club.id) : true;
      })
    : clubs;

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <main className=" pb-16">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] py-16 px-4 mb-16">
          <div className="absolute inset-0 bg-[url('/club-pattern.png')] opacity-10"></div>

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
                Clubs & Activities
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                Our diverse range of clubs offers students the opportunity to explore their interests, develop new skills, and nurture their talents beyond the academic curriculum. From arts to technology, our clubs provide a platform for students to pursue their passions.
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
            <h2 className="text-2xl font-bold text-[#8b1a1a] mb-4">Explore Our Clubs</h2>
            <p className="text-[#5a3e36] mb-6">Filter clubs by category to find the perfect match for your interests and passions.</p>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => filterClubsByCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null 
                    ? "bg-[#8b1a1a] text-white" 
                    : "bg-[#f0e6d2] text-[#5a3e36] hover:bg-[#d4b483]/30"
                }`}
              >
                All Clubs
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => filterClubsByCategory(category.id)}
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

        {/* Clubs Grid Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
              <motion.div
                key={club.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => openClubDetails(club.id)}
              >
                <div className="relative h-48">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: club.color }}
                    >
                      <div className="text-white">{club.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{club.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-[#5a3e36] mb-3">
                    <Clock className="h-4 w-4 mr-2 text-[#8b1a1a]" />
                    <span className="line-clamp-2">{club.meetingSchedule}</span>
                  </div>
                  <p className="text-[#5a3e36] text-sm line-clamp-3">{club.description}</p>
                  <div className="mt-3 mb-4">
                    <p className="text-xs text-[#8b1a1a] font-medium">Teachers:</p>
                    <p className="text-xs text-[#5a3e36]">{club.teachers.join(", ")}</p>
                  </div>
                  <button className="mt-4 inline-flex items-center text-[#8b1a1a] font-medium text-sm">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-[#f0e6d2] py-16 px-4 mb-16">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block mb-2 bg-white p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
                Benefits of Joining Clubs
              </h2>
              <p className="text-[#5a3e36]">
                Club activities offer numerous advantages that complement academic learning and contribute to holistic development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Social Skills</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Clubs provide an environment for students to interact with peers who share similar interests, helping develop communication, teamwork, and collaboration skills.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Award className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Skill Development</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Students acquire specialized skills related to their chosen activities, from technical abilities to creative expression, problem-solving, and critical thinking.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Calendar className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">Time Management</h3>
                </div>
                <p className="text-[#5a3e36]">
                  Balancing club activities with academic responsibilities helps students develop effective time management, organization, and prioritization skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join a Club CTA */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-lg overflow-hidden shadow-lg text-white">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4">Join a Club Today</h2>
                <p className="mb-6">
                  Explore your interests, develop new skills, and connect with like-minded peers by joining one of our many clubs. There&apos;s something for everyone!
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
                  src="/club-activities.jpg" 
                  alt="Club Activities" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

     <AnimatePresence>
  {activeClub && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={closeClubDetails}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {clubs.find(club => club.id === activeClub) && (
          <>
            {/* Header Image - Fixed Height */}
            <div className="relative h-48 md:h-56 flex-shrink-0">
              <Image
                src={clubs.find(club => club.id === activeClub)?.image || ""}
                alt={clubs.find(club => club.id === activeClub)?.name || ""}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <motion.button
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                onClick={closeClubDetails}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: clubs.find(club => club.id === activeClub)?.color }}
                  >
                    <div>{clubs.find(club => club.id === activeClub)?.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Club</p>
                    <h2 className="text-2xl font-bold">
                      {clubs.find(club => club.id === activeClub)?.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">About the Club</h3>
                  <p className="text-[#5a3e36]">
                    {clubs.find(club => club.id === activeClub)?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Club Schedule</h3>
                    <div className="flex items-start bg-[#f8f3e9] p-3 rounded-md">
                      <Clock className="h-5 w-5 text-[#8b1a1a] mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-[#5a3e36] text-sm">
                        {clubs.find(club => club.id === activeClub)?.meetingSchedule}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Eligibility</h3>
                    <div className="flex items-center bg-[#f8f3e9] p-3 rounded-md">
                      <Users className="h-5 w-5 text-[#8b1a1a] mr-3" />
                      <p className="text-[#5a3e36]">
                        {clubs.find(club => club.id === activeClub)?.eligibility}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Club Teachers</h3>
                  <div className="bg-[#f8f3e9] p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {clubs.find(club => club.id === activeClub)?.teachers.map((teacher, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[#8b1a1a] text-white text-sm rounded-full"
                        >
                          {teacher}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Club Activities</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {clubs.find(club => club.id === activeClub)?.activities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-[#5a3e36]">{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {clubs.find(club => club.id === activeClub)?.achievements && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#8b1a1a] mb-3">Achievements</h3>
                    <div className="bg-[#8b1a1a]/5 p-4 rounded-lg">
                      <ul className="space-y-3">
                        {clubs.find(club => club.id === activeClub)?.achievements?.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0 mt-0.5" />
                            <p className="text-[#5a3e36]">{achievement}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between items-center">
                <a 
                  href="/enquiry" 
                  className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors"
                >
                  Enquire to Join
                </a>
                <button
                  onClick={closeClubDetails}
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