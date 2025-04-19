"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Send,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function SocialConnect() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const socialLinks = [
    { name: "Facebook", icon: Facebook, color: "#1877F2", link: "#" },
    { name: "Twitter", icon: Twitter, color: "#1DA1F2", link: "#" },
    { name: "Instagram", icon: Instagram, color: "#E4405F", link: "#" },
    { name: "YouTube", icon: Youtube, color: "#FF0000", link: "#" },
    { name: "LinkedIn", icon: Linkedin, color: "#0A66C2", link: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-[#f8f3e9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.png')] bg-repeat opacity-5"></div>

      {/* Konark wheel inspired decorative element */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b1a1a]">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x1 = 50 + 15 * Math.cos(angle);
            const y1 = 50 + 15 * Math.sin(angle);
            const x2 = 50 + 45 * Math.cos(angle);
            const y2 = 50 + 45 * Math.sin(angle);
            return (
              <line
                key={i}
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

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 relative"
          >
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
              <Globe className="h-8 w-8 text-[#8b1a1a]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            CONNECT WITH US
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-[#5a3e36] max-w-3xl mx-auto mb-8"
          >
            Stay updated with the latest news, events, and announcements
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-[#d4b483]/20"
            >
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-8 font-serif text-center">
                Follow Us
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -5,
                      backgroundColor: social.color,
                      color: "#FFFFFF",
                    }}
                    className="flex flex-col items-center justify-center py-4 bg-[#f8f3e9] rounded-xl shadow-md transition-all duration-300"
                  >
                    <social.icon className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              <p className="text-[#5a3e36] text-center">
                Join our growing community on social media to stay connected
                with school activities, events, and achievements.
              </p>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-[#d4b483]/20"
            >
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-8 font-serif text-center">
                Newsletter
              </h3>

              <div className="relative">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-green-800 mb-2">
                      Thank You!
                    </h4>
                    <p className="text-green-700">
                      You&apos;ve successfully subscribed to our newsletter.
                      We&apos;ll keep you updated with the latest news and
                      events.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-[#5a3e36] mb-6 text-center">
                      Subscribe to our newsletter to receive updates about
                      school events, achievements, and announcements.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#5a3e36] mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-[#8b1a1a]/50" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#f8f3e9] border border-[#d4b483]/30 text-[#5a3e36] rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                            placeholder="Your email address"
                            required
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-[#8b1a1a] hover:bg-[#8b1a1a]/90 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                      >
                        Subscribe <Send className="ml-2 h-4 w-4" />
                      </motion.button>
                    </form>
                  </>
                )}

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#d4b483]/10 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
