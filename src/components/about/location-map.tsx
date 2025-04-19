"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";

export default function LocationMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-[#5a3e36] to-[#3d2a25] relative overflow-hidden">
      {/* Temple-inspired decorative top border */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-6 h-8 bg-white/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
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
            <div className="absolute inset-0 bg-[#f0c808]/30 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f0c808]/20 backdrop-blur-sm rounded-full p-3 border-2 border-[#f0c808]/50">
              <Navigation className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif"
          >
            OUR LOCATION
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-[#f0c808] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-white/90 max-w-3xl mx-auto mb-8"
          >
            Visit our campus to experience the serene learning environment
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 relative"
            >
              <div className="absolute inset-0 bg-[#8b1a1a]/5 rounded-2xl -translate-x-4 translate-y-4"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden h-[400px] shadow-xl border border-white/20">
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-t-[#f0c808] border-white/30 rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Map iframe - Replace with actual Google Maps embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.4944484761897!2d85.6152!3d20.1733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDEwJzIzLjkiTiA4NcKwMzYnNTQuNyJF!5e0!3m2!1sen!2sin!4v1650956274963!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`transition-opacity duration-500 ${
                    mapLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setMapLoaded(true)}
                ></iframe>

                {/* Map pin animation */}
                {mapLoaded && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.5,
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <MapPin className="h-10 w-10 text-[#8b1a1a]" />
                      <motion.div
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#8b1a1a] rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl h-full">
                <h3 className="text-xl font-bold text-white mb-6 font-serif">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#f0c808]/20 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-[#f0c808]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Address</h4>
                      <p className="text-white/80 text-sm">
                        Plot no 684, Haladipada,
                      </p>
                      <p className="text-white/80 text-sm">
                        Khorda, Pin- 752056
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#f0c808]/20 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-[#f0c808]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-white/80 text-sm">9124654094</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#f0c808]/20 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-[#f0c808]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <p className="text-white/80 text-sm">
                        aryavartaa.krd@gmail.com
                      </p>
                      <p className="text-white/80 text-sm">
                        care@aryavartancientacademy.in
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-[#f0c808] hover:bg-[#e3bd00] text-[#5a3e36] font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
