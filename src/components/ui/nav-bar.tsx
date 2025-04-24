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
  { name: "ABOUT US", href: "/about", icon: null },
  { name: "DISCLOSURE", href: "/disclosure", icon: null },
  {
    name: "ACADEMICS",
    href: "#",
    icon: BookOpen,
    submenu: [
      { name: "Curriculum", href: "#" },
      { name: "Faculty", href: "#" },
      { name: "Examination", href: "#" },
    ],
  },
  { name: "BEYOND ACADEMICS", href: "#", icon: null },
  { name: "ACHIEVEMENTS", href: "#", icon: Trophy },
  { name: "INFRASTRUCTURE", href: "#", icon: Building },
  {
    name: "GALLERY",
    href: "#",
    icon: ImageIcon,
    submenu: [
      { name: "Gallery", href: "/gallery" },
      { name: "Photos", href: "/gallery/photo" },
      { name: "Videos", href: "/gallery/video" },
      { name: "News Bulletin", href: "/gallery/news-bulletin" },
    ],
  },
  { name: "CONTACT", href: "#", icon: Phone },
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
    <div className="w-full h-[20px] fixed top-0 left-0 right-0 z-50">
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
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="justify-between  flex items-center py-2">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="relative flex flex-col items-center justify-center text-[#8b1a1a]">
                <div className="absolute items-center justify-center inset-0 bg-[#8b1a1a]/10 rounded-full blur-sm"></div>
                <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0">
                  <Image
                    src="/aaalogo.png"
                    alt="Aryavart Ancient Academy Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-shrink">
                <h2 className="text-md font-bold text-[#8b1a1a] font-serif leading-tight">
                  Aryavart Ancient Academy
                </h2>
                <p className="text-xs md:text-xs text-[#8b1a1a]/80">
                  Affiliated to CBSE (1530380)
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 xl:space-x-2">
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
                      className="flex items-center px-1 xl:px-2 py-1 text-2xs xl:text-xs font-medium text-[#5a3e36] hover:text-[#8b1a1a] transition-colors rounded-md hover:bg-[#d4b483]/10 group whitespace-nowrap"
                    >
                      {item.icon && (
                        <item.icon className="mr-1 h-3 w-3 xl:h-4 xl:w-4 flex-shrink-0" />
                      )}
                      {item.name}
                      {item.submenu && (
                        <ChevronDown className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
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
                            className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-[#d4b483]/30 z-50 overflow-hidden"
                          >
                            <div className="py-1">
                              {item.submenu.map((subitem) => (
                                <a
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-3 py-1 text-2xs xl:text-xs text-[#5a3e36] hover:bg-[#d4b483]/10 hover:text-[#8b1a1a] whitespace-nowrap"
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
              className="lg:hidden bg-[#f8f3e9] border-t border-[#d4b483]/30 py-2 absolute w-full z-50 shadow-lg overflow-hidden"
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
                      <div className="flexitems-center">
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
