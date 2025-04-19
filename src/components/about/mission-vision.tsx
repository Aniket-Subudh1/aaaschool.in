"use client";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Target } from "lucide-react";
import { RotatingWheel } from "@/components/ui/RotatingWheel";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

// Define types
type ContentProps = {
  onVisible: () => void;
};

// Memoized components to prevent unnecessary re-renders
const MissionContent = memo(({ onVisible }: ContentProps) => (
  <>
    <h3 className="text-2xl font-bold text-[#8b1a1a] mb-6 font-serif relative z-10">
      Our Mission
    </h3>

    <div className="space-y-6 relative z-10">
      <div className="rounded-lg overflow-hidden mb-6 max-w-md mx-auto">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Mission"
            className="object-cover w-full h-full rounded-lg"
            loading="lazy" // For better performance
          />
        </AspectRatio>
      </div>

      <p className="text-[#5a3e36] leading-relaxed">
        Scientific attitude, a spirit of enquiry. At AAA, qualities like
        leadership and sportsmanship are closely interwoven in the school&apos;s
        curriculum. Our aim is that we enable and equip our students to:
      </p>

      <ul className="space-y-4">
        {[
          "Absorb and live by the universal and eternal values of life as enunciated by ancient and modern thinkers and rooted in India's spiritual heritage, culture and traditions.",
          "Develop a scientific temperament and an attitude for excellence and learning throughout life.",
          "Keep abreast of time without giving in to unreasoned temptations to succumb or forsaking the proven values of life",
        ].map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex items-start gap-4"
            onAnimationComplete={index === 2 ? onVisible : undefined}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#8b1a1a] to-[#d4b483] mt-1"></span>
            <span className="text-[#5a3e36]">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </>
));

MissionContent.displayName = "MissionContent";

const VisionContent = memo(({ onVisible }: ContentProps) => (
  <>
    <h3 className="text-2xl font-bold text-[#8b1a1a] mb-6 font-serif relative z-10">
      Our Vision
    </h3>

    <div className="space-y-6 relative z-10">
      <div className="rounded-lg overflow-hidden mb-6 max-w-md mx-auto">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <video
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata" // Load metadata only initially for performance
          >
            <source
              src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eba4aa19019e7c8888fbde3effdf5f3b24fed&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[#5a3e36] text-lg leading-relaxed"
      >
        To establish a one-of-its-kind educational institution based on Indian
        Culture and Vedic Ethos for children from all over India, so that they
        can realize their physical, intellectual, social, mental, and spiritual
        potential for their balanced all-round development.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        onAnimationComplete={onVisible}
        className="p-6 bg-gradient-to-br from-[#f8f3e9] to-white rounded-lg border-l-4 border-[#8b1a1a] shadow-lg"
      >
        <p className="text-[#5a3e36] italic text-lg">
          &ldquo;Our vision is to nurture global citizens rooted in Indian
          values and equipped with 21st century skills.&rdquo;
        </p>
      </motion.div>
    </div>
  </>
));

VisionContent.displayName = "VisionContent";

// Minimalistic, performance-optimized background patterns
const BackgroundPatterns = memo(() => (
  <>
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="h-full w-full bg-[url('/images/testimonial-pattern.png')] bg-repeat bg-[length:200px_200px]"></div>
    </div>
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#8b1a1a]/5 to-transparent pointer-events-none"></div>
  </>
));

BackgroundPatterns.displayName = "BackgroundPatterns";

// Performance-optimized corner elements
type CornerElementProps = {
  position: string;
};

const CornerElement = memo(({ position }: CornerElementProps) => (
  <div
    className={`absolute -top-16 ${position}-16 w-32 h-32 opacity-10 transform ${
      position === "-right" ? "scale-x-[-1]" : ""
    } pointer-events-none`}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b1a1a]">
      {[45, 35, 25, 15].map((radius, idx) => (
        <circle
          key={idx}
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  </div>
));

CornerElement.displayName = "CornerElement";

export default function MissionVision(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const [rotation, setRotation] = useState<number>(0);
  useEffect(() => {
    setRotation(activeTab === "mission" ? 0 : 180);
  }, [activeTab]);

  const toggleTab = (): void => {
    setActiveTab(activeTab === "mission" ? "vision" : "mission");
  };

  const handleContentVisible = (): void => {
    // Content is now visible
    console.log(`${activeTab} content is now visible`);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8f3e9] to-white relative overflow-hidden">
      {/* Performance-optimized background elements */}
      <BackgroundPatterns />
      <CornerElement position="-left" />
      <CornerElement position="-right" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading - simplified animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] font-serif">
            Our Mission & Vision
          </h2>
          <div className="w-24 h-1 bg-[#d4b483] mx-auto mt-4"></div>
          <p className="text-[#5a3e36] mt-4 max-w-2xl mx-auto">
            Guided by our mission and vision, we strive to create a learning
            environment that fosters academic excellence and holistic
            development.
          </p>
        </motion.div>

        {/* Toggle Buttons - simplified animation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1.5 shadow-lg border border-[#8b1a1a]/10">
            <div className="flex gap-2">
              {[
                { id: "mission" as const, icon: Compass },
                { id: "vision" as const, icon: Target },
              ].map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    px-4 py-2.5 md:px-6 md:py-3 rounded-full font-medium transition-all duration-200
                    flex items-center gap-2 text-xs md:text-sm
                    ${
                      activeTab === id
                        ? "bg-[#8b1a1a] text-white shadow-md"
                        : "bg-transparent text-[#5a3e36] hover:bg-[#f0e6d2]"
                    }
                  `}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Rotating Wheel - wrapped in a div with fixed dimensions */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-[250px]">
              <RotatingWheel
                rotation={rotation}
                activeTab={activeTab}
                onToggle={toggleTab}
              />
            </div>
          </div>

          {/* Content Area - optimized animations */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "mission" ? (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#8b1a1a] relative overflow-hidden"
                >
                  <MissionContent onVisible={handleContentVisible} />
                </motion.div>
              ) : (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#d4b483] relative overflow-hidden"
                >
                  <VisionContent onVisible={handleContentVisible} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
