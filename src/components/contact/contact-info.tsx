"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: "Our Address",
      details: ["Plot no 684, Haladipada,", "Khorda, Pin- 752056"],
      action: {
        text: "Get Directions",
        url: "https://maps.google.com/?q=Aryavart+Ancient+Academy+Khorda",
        icon: <ExternalLink className="w-4 h-4 ml-1" />,
      },
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: "Phone Number",
      details: ["9124654094", "9178387717"],
      action: {
        text: "Call Now",
        url: "tel:9124654094",
        icon: <Phone className="w-4 h-4 ml-1" />,
      },
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email Address",
      details: [
        "aryavartaa.krd@gmail.com",
        "principal@aryavartancientacademy.in",
      ],
      action: {
        text: "Send Email",
        url: "mailto:aryavartaa.krd@gmail.com",
        icon: <Mail className="w-4 h-4 ml-1" />,
      },
      color: "from-[#a52a2a] to-[#8b1a1a]",
    },
    {
      icon: <Clock className="w-5 h-5 text-white" />,
      title: "Office Hours",
      details: ["Monday - Saturday: 8:00 AM - 4:00 PM", "Sunday: Closed"],
      action: {
        text: "View Schedule",
        url: "#",
        icon: <ExternalLink className="w-4 h-4 ml-1" />,
      },
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
  ];

  const socialMedia = [
    { icon: <Facebook className="w-5 h-5" />, url: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, url: "#", name: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, url: "#", name: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, url: "#", name: "YouTube" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="p-8 md:p-10">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-4 border-[#f0e6d2]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aaa-CpIW78OZFZG6FBpF9os3cxpWu7bmcN.png"
              alt="Aryavart Ancient Academy Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#8b1a1a]">
              Aryavart Ancient Academy
            </h3>
            <p className="text-[#5a3e36]">CBSE Affiliated School (1530380)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="rounded-xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${item.color} p-4`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                </div>
              </div>
              <div className="bg-[#f8f3e9] p-4">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-[#5a3e36] text-sm mb-1">
                    {detail}
                  </p>
                ))}
                <a
                  href={item.action.url}
                  className="inline-flex items-center text-[#8b1a1a] text-sm font-medium mt-2 hover:underline"
                >
                  {item.action.text}
                  {item.action.icon}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-[#8b1a1a] mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {socialMedia.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-[#f8f3e9] flex items-center justify-center text-[#8b1a1a] hover:bg-[#8b1a1a] hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
