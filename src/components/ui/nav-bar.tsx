"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  BookOpen,
  Trophy,
  Building,
  ImageIcon,
  Phone,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "HOME", href: "#", icon: null },
  {
    name: "ADMISSION",
    href: "#",
    icon: Users,
    submenu: [
      { name: "Admission Process", href: "#" },
      { name: "Fee Structure", href: "#" },
      { name: "Apply Online", href: "#" },
    ],
  },
  { name: "ABOUT US", href: "#", icon: null },
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
  { name: "GALLERY", href: "#", icon: ImageIcon },
  { name: "CONTACT", href: "#", icon: Phone },
  { name: "DOWNLOAD", href: "#", icon: Download },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <nav className="bg-gradient-to-r from-[#f8f3e9] to-[#f0e6d2] border-b border-[#d4b483]/30 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-sm"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aaa-CpIW78OZFZG6FBpF9os3cxpWu7bmcN.png"
                alt="Aryavart Ancient Academy Logo"
                width={80}
                height={60}
                className="relative z-10h-16 w-18 transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#8b1a1a] font-serif">
                Aryavart Ancient Academy
              </h2>
              <p className="text-xs text-[#8b1a1a]/80 font-medium">
                Affiliated to CBSE New Delhi (1530380)
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-[#5a3e36] hover:text-[#8b1a1a] transition-colors rounded-md hover:bg-[#d4b483]/10 group"
                    onClick={
                      item.submenu
                        ? (e) => {
                            e.preventDefault();
                            toggleSubmenu(item.name);
                          }
                        : undefined
                    }
                  >
                    {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8b1a1a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>

                  {item.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-[#d4b483]/30 z-50 overflow-hidden"
                        >
                          <div className="py-1">
                            {item.submenu.map((subitem) => (
                              <a
                                key={subitem.name}
                                href={subitem.href}
                                className="block px-4 py-2 text-sm text-[#5a3e36] hover:bg-[#d4b483]/10 hover:text-[#8b1a1a]"
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
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
                    className="flex items-center justify-between py-3 text-sm font-medium text-[#5a3e36] hover:text-[#8b1a1a]"
                    onClick={
                      item.submenu
                        ? (e) => {
                            e.preventDefault();
                            toggleSubmenu(item.name);
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#8b1a1a] rounded-full mr-3"></span>
                      <span>{item.name}</span>
                    </div>
                    {item.submenu && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
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
                          className="ml-5 pl-3 border-l-2 border-[#d4b483]/30 mb-2"
                        >
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.name}
                              href={subitem.href}
                              className="block py-2 text-sm text-[#5a3e36] hover:text-[#8b1a1a]"
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
  );
}
