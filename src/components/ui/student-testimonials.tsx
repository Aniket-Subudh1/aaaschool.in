"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Sparkles,
  GraduationCap,
} from "lucide-react"

interface Testimonial {
  id: string
  name: string
  stream: string
  class: string
  image: string
  text: string
}

export default function StudentTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // All testimonials data
  const testimonials: Testimonial[] = [
    {
      id: "jijnasa",
      name: "JIJNASA PATRA",
      stream: "SCIENCE",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rRTpPICcipUhMAldjLYJGvugK5G1xE.png",
      text: "AAA illuminates the path to success, instills the fundamental morals of life and molds us into more exemplary individuals. Since my very first day here, never once have I ever felt alienated. This school and it's community have become like a second home to me, a close-knit family that provides a sense of belonging and warmth. The schools environment fosters a compelling ambience that inspires us to diligently pursue our studies and relentlessly strive to achieve our goals.",
    },
    {
      id: "payal",
      name: "PAYAL PRADHAN",
      stream: "SCIENCE",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rRTpPICcipUhMAldjLYJGvugK5G1xE.png",
      text: "AAA stands as a paragon excellence among Educational institutions. I wish to extend my gratitude to the school administration for their unwavering dedication and tireless endeavors. Here, teachers are considerate, understanding, and commendable. It excuses a comforting ambience akin to a second home. In addition to academics, it empowers every student to discover their latent potential through a diverse array of extra curricular activities. Discipline is the characteristic feature of AAA.",
    },
    {
      id: "sahana",
      name: "SAHANA JAGYONSENI BARIK",
      stream: "SCIENCE",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1k1Zv8qTH8LfP3W3weVX2Y68X7Psqf.png",
      text: "AAA has profoundly transformed my life. The institution offers an environment conducive to both academic and extracurricular growth. In just 2 months, my experience at AAA has already surpassed my expectations. The school boosts and shapes us in a way to tackle the hurdles. I once was afraid to take any competitive exams, but now my outlook has completely changed. Thanks to the dedicated teachers who provide supplementary coaching beyond regular coursework. Thank you AAA.",
    },
    {
      id: "atulya",
      name: "ATULYA BALIARSINGH",
      stream: "",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: 'Settled in the vibrant community of Khordha, AAA includes a spirit of inclusivity and excellence. For the moment, I stepped through its doors, I felt welcomed and supported by the teachers and the head of the school I.e the Principal too, nurturing each students potential. At AAA learning extends beyond textbooks. Through interactive classes and Co curricular I have discovered my strength and interests. "Everyone calls AAA is Aryavart Ancient Academy.',
    },
    {
      id: "sagun",
      name: "SAGUN AGARWAL",
      stream: "COMMERCE",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: "Aryavart Ancient Academy the place where students poised on the precipice of triumph. My stay at this school heightened the depth of my experiential journey. It enabled me to enhance proficiency not only in academics but also in sports and extra curricular activities, thereby broadening my horizons. The faculty members of this school exhibit remarkable determination and experience. I find all the excursions here to be exceptional. The school inspires us comprehensively fostering a vibrant campus",
    },
    {
      id: "deepika",
      name: "DEEPIKA RAJAK",
      stream: "COMMERCE",
      class: "11th Class",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: "I am deeply delighted and honored to be a member of AAA. AAA stands for Awesome Adorable, and Affordable. Aryavart has created an environment where students cab uncover and cultivate their innate qualities. Over the past three months, my experience at this institution has been both gratifying and extraordinary. The school not only emphasizes academic excellence but also places a strong focus on co-curricular activities. AAA provided me with teachers who acted like parents, friends and mentors.",
    },
  ]

  // Fixed decorative particles to avoid hydration issues
  const decorativeParticles = [
    { top: "40.97%", left: "70.09%", duration: "2.09s", delay: "1.01s" },
    { top: "41.85%", left: "9.65%", duration: "4.75s", delay: "1.28s" },
    { top: "26.94%", left: "19.93%", duration: "3.96s", delay: "0.12s" },
    { top: "50.56%", left: "98.61%", duration: "4.36s", delay: "0.89s" },
    { top: "44.20%", left: "76.85%", duration: "4.89s", delay: "1.13s" },
  ]

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || !isClient) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    
    return () => clearInterval(interval)
  }, [autoplay, activeIndex, isClient])

  const nextSlide = () => {
    setDirection(1)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const prevSlide = () => {
    setDirection(-1)
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const getVisibleTestimonials = () => {
    if (!isClient) return []
    
    if (isMobile) {
      return [testimonials[activeIndex]]
    }
    
    const result = []
    const total = testimonials.length
    
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(activeIndex + i) % total])
    }
    
    return result
  }

  // Variants for card animations
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // If not client-side yet, return empty div to prevent hydration mismatch
  if (!isClient) {
    return <div className="py-16 relative overflow-hidden bg-gradient-to-b from-[#f8f3e9] via-[#f0e6d2] to-[#f8f3e9]"></div>
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#f8f3e9] via-[#f0e6d2] to-[#f8f3e9]">
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`top-${i}`} className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg" />
          ))}
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#f0c808]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#8b1a1a]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <GraduationCap className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-[#d4b483] mx-auto mb-4"></div>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Hear from our students about their experiences at Aryavart Ancient Academy and how our education has transformed their lives.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="absolute top-1/2 -left-4 md:left-4 z-20 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:right-4 z-20 transform -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-hidden py-12">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {visibleTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.id}-${index}`}
                      custom={direction}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative"
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-[#d4b483]/20 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative pb-12 mt-16"> {/* Added pb-12 for bottom space */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f0c808] via-[#8b1a1a] to-[#f0c808]"></div>

                        <div className="flex justify-center -mt-16">
                          <div className="relative group cursor-pointer" style={{ transform: "translateZ(0)" }}>
                            <div className="absolute inset-0 rounded-full bg-[#f0c808] transform transition-all duration-500 group-hover:scale-110 -m-2"></div>

                            <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white overflow-hidden transform transition-all duration-500 group-hover:scale-105">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                                style={{ objectPosition: 'center' }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                            </div>

                            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                              {decorativeParticles.map((particle, i) => (
                                <div
                                  key={`particle-${i}`}
                                  className="absolute w-1.5 h-1.5 rounded-full bg-[#f0c808]"
                                  style={{
                                    top: particle.top,
                                    left: particle.left,
                                    animation: `float ${particle.duration} ease-in-out ${particle.delay} infinite alternate`,
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-12 right-4 text-[#f0c808]/20 transform rotate-12">
                          <Quote className="h-10 w-10" />
                        </div>

                        <div className="p-6 pt-12">
                          <div className="flex justify-center mb-4 space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 text-[#f0c808] fill-[#f0c808]" />
                            ))}
                          </div>
                          <div className="relative">
                            <div className="absolute -left-2 -top-2 text-[#8b1a1a]/10 transform -scale-y-100">
                              <Quote className="h-6 w-6" />
                            </div>
                            <p className="text-[#5a3e36] text-sm mb-6 leading-relaxed px-2">
                              {testimonial.text}
                            </p>
                            <div className="absolute -right-2 -bottom-2 text-[#8b1a1a]/10">
                              <Quote className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="text-center relative">
                            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b483]/30 to-transparent"></div>
                            <div className="pt-4">
                              <h3 className="font-bold text-[#8b1a1a]">{testimonial.name}</h3>
                              <div className="flex items-center justify-center space-x-2 text-xs text-[#5a3e36]/80">
                                {testimonial.stream && <span>{testimonial.stream}</span>}
                                {testimonial.stream && testimonial.class && <span>•</span>}
                                {testimonial.class && <span>{testimonial.class}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Sparkles className="h-4 w-4 text-[#f0c808]/60" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#8b1a1a] w-6" : "bg-[#8b1a1a]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          100% { transform: translateY(-10px) translateX(5px) rotate(10deg); }
        }
      `}</style>
    </section>
  )
}