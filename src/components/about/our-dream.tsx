"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Stethoscope,
  Palette,
  DotIcon as Dove,
  Brain,
  Star,
} from "lucide-react";

export default function OurDream() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const dreamItems = [
    {
      icon: <Leaf className="h-8 w-8 text-white" />,
      text: "Environmentalists who will work to reverse climate change",
      color: "#047857", // green
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-white" />,
      text: "Doctors who will eradicate diseases",
      color: "#0369a1", // blue
    },
    {
      icon: <Palette className="h-8 w-8 text-white" />,
      text: "Artists, musicians and diplomats",
      color: "#7c3aed", // purple
    },
    {
      icon: <Dove className="h-8 w-8 text-white" />,
      text: "Peacemakers who will strive to bring peace to this world",
      color: "#0891b2", // cyan
    },
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      text: "Thinkers empowered with the value systems of Ancient India",
      color: "#8b1a1a", // maroon
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qjGRspFrUzBnhgqO1hcLZdFWlmfSaP.png')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-[#5a3e36]/90"></div>

      <div className="relative py-20 z-10">
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
                <Star className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif"
            >
              OUR DREAM
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
              className="text-white/90 text-xl max-w-3xl mx-auto mb-12"
            >
              We hope that our children will be the:
            </motion.p>
          </div>

          <div ref={ref} className="relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {dreamItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  {/* Card with gradient overlay */}
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 h-full">
                    {/* Top color bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-2 w-full"
                      style={{ backgroundColor: item.color }}
                    ></div>

                    {/* Icon circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>

                    <p className="text-white/90 text-center">{item.text}</p>

                    {/* Bottom decorative element */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 w-full opacity-50"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-[#f0c808]/20 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-[#f0c808]/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
