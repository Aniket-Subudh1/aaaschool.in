"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Users,
  ArrowRight,
  Star,
  ChevronRight,
  Dumbbell,
  PenTool,
  Heart,
  Sparkles,
  Target,
  Medal,
  GraduationCap,
  MessageSquare,
  Music,
  Camera,
  Palette,
  Code,
  Map,
  Shield,
  Award
} from "lucide-react";

export default function BeyondAcademicsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Main category cards data
  const mainCategories = [
    {
      id: "clubs",
      title: "Clubs & Activities",
      description: "Explore various clubs that cater to diverse interests and talents, from arts to technology",
      icon: <BookOpen size={32} className="text-white" />,
      color: "from-[#1E88E5]/90 to-[#0D47A1]/90",
      stats: [
        { icon: <PenTool size={12} />, text: "9+ Different Clubs" },
        { icon: <Star size={12} />, text: "Skill Development" },
      ],
      href: "/beyond/clubs",
      image: "/clubs-bg.jpg"
    },
    {
      id: "sports",
      title: "Sports Programs",
      description: "Develop physical fitness, teamwork, and competitive spirit through various sports disciplines",
      icon: <Trophy size={32} className="text-white" />,
      color: "from-[#43A047]/90 to-[#1B5E20]/90",
      stats: [
        { icon: <Dumbbell size={12} />, text: "7+ Sports Options" },
        { icon: <MedalIcon size={12} />, text: "State & National Competitions" },
      ],
      href: "/beyond/sports",
      image: "/sports-bg.jpg"
    },
    {
      id: "service",
      title: "Service Units",
      description: "Join units that instill discipline, leadership, and a sense of social responsibility",
      icon: <Users size={32} className="text-white" />,
      color: "from-[#8b1a1a]/90 to-[#a52a2a]/90",
      stats: [
        { icon: <Heart size={12} />, text: "Character Building" },
        { icon: <Target size={12} />, text: "Leadership Development" },
      ],
      href: "/beyond/service-units",
      image: "/service-bg.jpg"
    }
  ];

  // Activities & clubs showcase data
  const activities = [
    {
      id: "ncc",
      name: "NCC",
      icon: <Shield className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Service Unit"
    },
    {
      id: "scout-guide",
      name: "Scout & Guide",
      icon: <GraduationCap className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Service Unit"
    },
    {
      id: "jrc",
      name: "Junior Red Cross",
      icon: <Heart className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Service Unit"
    },
    {
      id: "basketball",
      name: "Basketball",
      icon: <Dumbbell className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Sports"
    },
    {
      id: "cricket",
      name: "Cricket",
      icon: <Dumbbell className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Sports"
    },
    {
      id: "taekwondo",
      name: "Taekwondo",
      icon: <Dumbbell className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Sports"
    },
    {
      id: "book-club",
      name: "Book Club",
      icon: <BookOpen className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    },
    {
      id: "chess-club",
      name: "Chess Club",
      icon: <Award className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    },
    {
      id: "photography-club",
      name: "Photography Club",
      icon: <Camera className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    },
    {
      id: "art-club",
      name: "Art Club",
      icon: <Palette className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    },
    {
      id: "music-club",
      name: "Music Club",
      icon: <Music className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    },
    {
      id: "coding-club",
      name: "Coding Club",
      icon: <Code className="h-8 w-8 text-[#8b1a1a]" />,
      category: "Club"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Ananya Patel",
      role: "Class 11, Photography Club",
      quote: "Being part of the Photography Club has transformed my perspective on the world around me. I've not only learned technical skills but also how to tell stories through images.",
      image: "/student1.jpg"
    },
    {
      id: 2,
      name: "Arjun Singh",
      role: "Class 9, NCC Cadet",
      quote: "NCC has instilled a sense of discipline and patriotism in me. The various camps and training programs have helped me develop leadership skills and build my character.",
      image: "/student2.jpg"
    },
    {
      id: 3,
      name: "Meera Sharma",
      role: "Class 10, Basketball Team",
      quote: "Being part of the basketball team has taught me the importance of teamwork and perseverance. The coaching and facilities provided by the school are excellent.",
      image: "/student3.jpg"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] py-20 px-4">
        <div className="absolute inset-0 bg-[url('/beyond-pattern.png')] opacity-10"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Beyond Academics
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              At Aryavart Ancient Academy, education extends beyond the classroom. Our comprehensive Beyond Academics programs nurture talents, build character, and develop well-rounded individuals ready to face the challenges of the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#main-categories"
                className="px-6 py-3 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Explore Programs
              </Link>
              <Link
                href="/enquiry"
                className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Make an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section id="main-categories" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                  <Sparkles className="h-8 w-8 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Explore Our Programs
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Discover the diverse range of extracurricular opportunities that help students develop their interests, talents, and character beyond traditional academics.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {mainCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 h-96"
              >
                {/* Background with image and gradient */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-white/10 rounded-full"></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {category.icon}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {category.title}
                  </h3>
                  <p className="text-white/90 mb-6 flex-grow">
                    {category.description}
                  </p>

                  {/* Stats badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white flex items-center"
                      >
                        {stat.icon}
                        <span className="ml-1.5">{stat.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={category.href}
                    className="inline-flex items-center text-white font-medium mt-auto group"
                  >
                    Explore{" "}
                    <ArrowRight
                      size={16}
                      className={`ml-2 transition-transform duration-300 ${
                        hoveredCard === category.id ? "translate-x-1" : ""
                      }`}
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Beyond Academics Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Why Beyond Academics?
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Participating in extracurricular activities contributes significantly to a student&apos;s overall development in various dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm border border-[#d4b483]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                  <BookOpen className="h-6 w-6 text-[#8b1a1a]" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Holistic Development</h3>
              </div>
              <p className="text-[#5a3e36]">
                Beyond Academics programs foster intellectual, physical, social, and emotional growth, leading to well-rounded individuals.
              </p>
            </div>

            <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm border border-[#d4b483]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                  <Target className="h-6 w-6 text-[#8b1a1a]" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Skill Enhancement</h3>
              </div>
              <p className="text-[#5a3e36]">
                Students develop essential skills like teamwork, leadership, communication, and problem-solving that complement academic learning.
              </p>
            </div>

            <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm border border-[#d4b483]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                  <Heart className="h-6 w-6 text-[#8b1a1a]" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Character Building</h3>
              </div>
              <p className="text-[#5a3e36]">
                Extracurricular involvement builds character traits like discipline, perseverance, responsibility, and integrity that shape future citizens.
              </p>
            </div>

            <div className="bg-[#f8f3e9] p-6 rounded-lg shadow-sm border border-[#d4b483]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                  <Star className="h-6 w-6 text-[#8b1a1a]" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Talent Discovery</h3>
              </div>
              <p className="text-[#5a3e36]">
                Students explore various activities to discover and nurture their unique talents, interests, and passions beyond academic subjects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Showcase Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Our Activities & Clubs
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Explore the wide range of extracurricular options available for students to pursue their interests and develop their talents.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-[#d4b483]/20 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="bg-[#f8f3e9] p-3 rounded-full mb-3">
                  {activity.icon}
                </div>
                <h3 className="font-bold text-[#8b1a1a] mb-1">{activity.name}</h3>
                <p className="text-xs text-[#5a3e36]">{activity.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#5a3e36] mb-4">
              Discover more about our extensive range of activities and clubs in each category.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/beyond/clubs"
                className="px-5 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors inline-flex items-center"
              >
                Explore Clubs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/beyond/sports"
                className="px-5 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors inline-flex items-center"
              >
                Explore Sports <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/beyond/service-units"
                className="px-5 py-2 bg-[#8b1a1a] text-white rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors inline-flex items-center"
              >
                Explore Service Units <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#f0e6d2] to-[#f8f3e9]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                <div className="relative z-10 bg-white border-2 border-[#8b1a1a]/20 rounded-full p-3">
                  <MessageSquare className="h-8 w-8 text-[#8b1a1a]" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Student Testimonials
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Hear from our students about their experiences in Beyond Academics programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#8b1a1a]">{testimonial.name}</h3>
                      <p className="text-sm text-[#5a3e36]">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-1 -top-1 text-[#8b1a1a]/10 transform -scale-y-100">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                    <p className="text-[#5a3e36] text-sm italic py-1">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -right-1 -bottom-1 text-[#8b1a1a]/10">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Recent Achievements
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Our students have excelled in various extracurricular activities, bringing laurels to the school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f8f3e9] rounded-lg shadow-md p-6 border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Sports</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">CBSE National Sports Meet</p>
                    <p className="text-sm text-[#5a3e36]">Multiple medals in Taekwondo and Basketball</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">State School Games</p>
                    <p className="text-sm text-[#5a3e36]">Champions in Basketball, Volleyball, and Kabaddi</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">All India Traditional Sports</p>
                    <p className="text-sm text-[#5a3e36]">Gold medals in Kho Kho (U-17 Girls)</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#f8f3e9] rounded-lg shadow-md p-6 border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Service Units</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">Republic Day Parade</p>
                    <p className="text-sm text-[#5a3e36]">NCC cadets participated in the parade in New Delhi</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">Rajya Puraskar</p>
                    <p className="text-sm text-[#5a3e36]">15 Scout & Guide members received the prestigious award</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">Disaster Management</p>
                    <p className="text-sm text-[#5a3e36]">Recognition for relief work during natural calamities</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#f8f3e9] rounded-lg shadow-md p-6 border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <PenTool className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a]">Clubs & Activities</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">National Photography Exhibition</p>
                    <p className="text-sm text-[#5a3e36]">Students' work selected for prestigious showcase</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">State Chess Championship</p>
                    <p className="text-sm text-[#5a3e36]">Multiple winners in different age categories</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#8b1a1a] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#5a3e36]">National Coding Competition</p>
                    <p className="text-sm text-[#5a3e36]">Top 10 finish in the prestigious hackathon</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Spotlight Section */}
      <section className="py-16 px-4 bg-[#f8f3e9]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Meet Our Program Leaders
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Our dedicated teachers and coaches bring expertise and passion to guide students in their extracurricular journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image 
                  src="/coach1.jpg" 
                  alt="Program Leader"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#8b1a1a] text-lg">Mr. Rajiv Kumar</h3>
                <p className="text-sm text-[#5a3e36] mb-2">Sports Coordinator</p>
                <p className="text-xs text-[#5a3e36]">Former state player with over 15 years of coaching experience in basketball and cricket.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image 
                  src="/coach2.jpg" 
                  alt="Program Leader"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#8b1a1a] text-lg">Ms. Priya Mishra</h3>
                <p className="text-sm text-[#5a3e36] mb-2">Arts & Culture Lead</p>
                <p className="text-xs text-[#5a3e36]">Accomplished artist and performer who guides the art, music, and dance clubs with passion.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image 
                  src="/coach3.jpg" 
                  alt="Program Leader"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#8b1a1a] text-lg">Capt. Sunil Panda</h3>
                <p className="text-sm text-[#5a3e36] mb-2">NCC Officer</p>
                <p className="text-xs text-[#5a3e36]">Retired army captain who leads the NCC unit with discipline and dedication to national service.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4b483]/20 hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image 
                  src="/coach4.jpg" 
                  alt="Program Leader"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#8b1a1a] text-lg">Mr. Amit Sharma</h3>
                <p className="text-sm text-[#5a3e36] mb-2">Technology Mentor</p>
                <p className="text-xs text-[#5a3e36]">Computer science expert who guides the coding and robotics clubs with innovative approaches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5a3e36] max-w-2xl mx-auto">
              Find answers to common questions about our Beyond Academics programs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-[#f8f3e9] rounded-lg p-6 border border-[#d4b483]/20">
                <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">How can my child join a club or activity?</h3>
                <p className="text-[#5a3e36]">
                  Students can join clubs at the beginning of each academic session by completing a registration form. Some clubs have specific eligibility criteria or limited seats, so early registration is recommended. For more details, contact the respective club coordinator or the Beyond Academics office.
                </p>
              </div>

              <div className="bg-[#f8f3e9] rounded-lg p-6 border border-[#d4b483]/20">
                <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Are there additional fees for joining extracurricular activities?</h3>
                <p className="text-[#5a3e36]">
                  Most clubs and activities are included in the regular school fees. However, some specialized activities or those requiring specific equipment or external coaching may have additional nominal charges. Detailed fee structures are provided during the registration process.
                </p>
              </div>

              <div className="bg-[#f8f3e9] rounded-lg p-6 border border-[#d4b483]/20">
                <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">How much time commitment is required for these activities?</h3>
                <p className="text-[#5a3e36]">
                  Most clubs meet 1-2 times per week for 1-2 hours each session. Sports teams and certain service units may require additional practice time, especially before competitions or events. The school ensures a balance between academic and extracurricular activities.
                </p>
              </div>

              <div className="bg-[#f8f3e9] rounded-lg p-6 border border-[#d4b483]/20">
                <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Can a student participate in multiple activities?</h3>
                <p className="text-[#5a3e36]">
                  Yes, students are encouraged to explore various interests. However, we recommend limiting participation to 2-3 activities to ensure quality involvement and to maintain academic performance. The school counselors can help students choose activities that align with their interests and schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Ready to Go Beyond Academics?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Discover your talents, develop new skills, and create memorable experiences by joining our diverse range of Beyond Academics programs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/enquiry"
                className="px-8 py-3 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Make an Enquiry
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MedalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
      <path d="M15.477 6.11 12 8l-3.477-1.89A2 2 0 0 1 7.5 4.5h9a2 2 0 0 1-1.023 1.61Z" />
    </svg>
  );
}