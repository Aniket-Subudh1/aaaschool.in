"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Phone,
  Mail,
  BookOpen,
  Trophy,
  Building,
  ImageIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "HOME", href: "/", icon: null },
  {
    name: "ADMISSION",
    href: "#",
    icon: Users,
    submenu: [
      { name: "Admission Process", href: "/admission" },
      { name: "ATAT", href: "/admission/atat" },
    ],
  },
  {
    name: "ABOUT US",
    href: "/about",
    icon: null,
    submenu: [
      { name: "About", href: "/about" },
      { name: "Our Committiees", href: "/about/committee" },
      { name: "Our Staff", href: "/academics/faculty" },
      { name: "Our Location", href: "/about/location" },
    ],
  },
  { name: "DISCLOSURE", href: "/disclosure", icon: null },
  {
    name: "ACADEMICS",
    href: "#",
    icon: BookOpen,
    submenu: [
      { name: "Curriculum", href: "/academics/curriculum" },
      { name: "Our Staff", href: "/academics/faculty" },
      { name: "Integrated Class", href: "/academics/integrated" },
    ],
  },
  { name: "BEYOND ACADEMICS", href: "/beyond", icon: null,submenu: [
    { name: "Service Unit", href: "/beyond/service" },
    { name: "Club Culture", href: "/beyond/clubs" },
    { name: "Sports", href: "/beyond/sports" },
  ], },
  {
    name: "ACHIEVEMENTS",
    href: "/achievements",
    icon: Trophy,
    submenu: [
      { name: "Achievements", href: "/achievements" },
      { name: "Sports Achievements", href: "/achievements/sports" },
      { name: "Awards & Recognition", href: "/achievements/awards" },
      { name: "Alumni Network", href: "/achievements/alumni" },
    ],
  },
  { name: "INFRASTRUCTURE", href: "/infrastructure", icon: Building },
  {
    name: "GALLERY",
    href: "/gallery",
    icon: ImageIcon,
    submenu: [
      { name: "Photos", href: "/gallery/photo" },
      { name: "Videos", href: "/gallery/video" },
      { name: "News Bulletin", href: "/gallery/news-bulletin" },
    ],
  },
  { name: "CONTACT", href: "/contact", icon: Phone },
  { name: "DOWNLOAD", href: "/download", icon: Download },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-auto fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-[#f8f3e9] py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-1 md:space-x-2">
            <Phone size={14} className="flex-shrink-0" />
            <span className="text-xs md:text-sm whitespace-nowrap">
              9124654094
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 md:space-x-2">
            <Mail size={14} className="flex-shrink-0" />
            <span className="text-xs md:text-sm whitespace-nowrap">
              aryavartaa.krd@gmail.com
            </span>
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-4 text-xs md:text-sm">
          <a
            href="/admin-login"
            className="hover:underline transition-colors hover:text-[#f0e6d2] whitespace-nowrap"
          >
            Admin Login
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`bg-gradient-to-r from-[#f8f3e9] to-[#f0e6d2] border-b border-[#d4b483]/30 
        ${scrolled ? "shadow-xl backdrop-blur-sm bg-opacity-90" : "shadow-md"} 
        transition-all duration-300`}
      >
        <div className="container mx-auto px-1 md:px-2 lg:px-1 xl:px-2 2xl:px-4 max-w-full">
          {/* Header */}
          <div className="flex justify-between items-center py-2">
            {/* Logo Section - Reduced width on laptop screens */}
            <div className="flex items-center space-x-2 lg:w-1/5 xl:w-1/6">
              {/* Logo */}
              <div className="relative flex flex-col items-center justify-center text-[#8b1a1a]">
                <div className="absolute items-center justify-center inset-0 bg-[#8b1a1a]/10 rounded-full blur-sm"></div>
                <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 flex-shrink-0">
                  <Image
                    src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
                    alt="Aryavart Ancient Academy Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-shrink-0">
                <h2 className="text-xs md:text-sm lg:text-xs xl:text-sm font-bold text-[#8b1a1a] font-serif leading-tight">
                  Aryavart Ancient Academy
                </h2>
                <p className="text-3xs md:text-2xs lg:text-3xs xl:text-2xs text-[#8b1a1a]/80">
                  Affiliated to CBSE (1530380)
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Increased width on laptop screens */}
            <div className="hidden left-10 lg:flex items-center lg:w-4/5 xl:w-5/6 justify-end">
              <div className="flex items-center justify-end gap-x-1 lg:gap-x-1.5 xl:gap-x-2 2xl:gap-x-4">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() =>
                      item.submenu && setActiveSubmenu(item.name)
                    }
                    onMouseLeave={() => item.submenu && setActiveSubmenu(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center px-0.5 lg:px-1 xl:px-1.5 py-1 text-2xs lg:text-3xs xl:text-2xs 2xl:text-xs font-medium text-[#5a3e36] hover:text-[#8b1a1a] transition-colors rounded-md hover:bg-[#d4b483]/10 group whitespace-nowrap"
                    >
                      {item.icon && (
                        <item.icon className="mr-0.5 h-2.5 w-2.5 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 flex-shrink-0" />
                      )}
                      {item.name}
                      {item.submenu && (
                        <ChevronDown className="ml-0.5 h-2.5 w-2.5 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                      )}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8b1a1a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>

                    {item.submenu && (
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-[#d4b483]/30 z-50 overflow-hidden"
                          >
                            <div className="py-1">
                              {item.submenu.map((subitem) => (
                                <a
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-3 py-1 text-2xs lg:text-xs xl:text-sm text-[#5a3e36] hover:bg-[#d4b483]/10 hover:text-[#8b1a1a] whitespace-nowrap"
                                >
                                  {subitem.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="lg:hidden text-[#8b1a1a] p-2 rounded-md hover:bg-[#d4b483]/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#f8f3e9] border-t border-[#d4b483]/30 py-2 absolute w-full z-50 shadow-lg overflow-auto max-h-[80vh]"
            >
              <div className="container mx-auto px-4 flex flex-col">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-[#d4b483]/10 last:border-b-0"
                  >
                    <a
                      href={item.href}
                      className="flex items-center justify-between py-2 text-xs font-medium text-[#5a3e36] hover:text-[#8b1a1a] transition-colors"
                      onClick={
                        item.submenu
                          ? (e) => {
                              e.preventDefault();
                              setActiveSubmenu(
                                activeSubmenu === item.name ? null : item.name
                              );
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-[#8b1a1a] rounded-full mr-2 flex-shrink-0"></span>
                        <span className="whitespace-nowrap">{item.name}</span>
                      </div>
                      {item.submenu && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
                            activeSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>

                    {item.submenu && (
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 pl-2 border-l-2 border-[#d4b483]/30 mb-1"
                          >
                            {item.submenu.map((subitem) => (
                              <a
                                key={subitem.name}
                                href={subitem.href}
                                className="block py-1 text-xs text-[#5a3e36] hover:text-[#8b1a1a] whitespace-nowrap"
                              >
                                {subitem.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}