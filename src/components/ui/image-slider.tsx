"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderImage {
  src: string
  alt: string
  title: string
  description: string
}

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Sample images - replace with actual school images
  const images: SliderImage[] = [
    { 
      src: "/placeholder.svg?height=400&width=600", 
      alt: "School campus", 
      title: "Our Beautiful Campus",
      description: "35 acres of lush green environment designed for holistic learning"
    },
    { 
      src: "/placeholder.svg?height=400&width=600", 
      alt: "Students in classroom", 
      title: "Interactive Learning",
      description: "Modern classrooms equipped with smart technology for enhanced learning"
    },
    { 
      src: "/placeholder.svg?height=400&width=600", 
      alt: "School activities", 
      title: "Extracurricular Excellence",
      description: "A wide range of activities to nurture talents beyond academics"
    },
    { 
      src: "/placeholder.svg?height=400&width=600", 
      alt: "Sports day", 
      title: "Sports & Athletics",
      description: "State-of-the-art facilities for physical development and sportsmanship"
    },
    { 
      src: "/placeholder.svg?height=400&width=600", 
      alt: "Cultural event", 
      title: "Cultural Celebrations",
      description: "Preserving traditions while embracing diversity through cultural events"
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoplay, images.length])

  // Calculate visible indices
  const getVisibleIndices = () => {
    const indices = []
    const totalImages = images.length
    
    // Current image
    indices.push(currentIndex)
    
    // Next 2 images
    for (let i = 1; i <= 2; i++) {
      indices.push((currentIndex + i) % totalImages)
    }
    
    return indices
  }

  const visibleIndices = getVisibleIndices()

  return (
    <section className="py-12 bg-[#f8f3e9] relative overflow-hidden">
      {/* Temple-inspired decorative top border */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`top-${i}`} className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">Campus Highlights</h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Explore our vibrant campus life through these glimpses of our facilities, activities, and events.
          </p>
        </div>

        <div className="relative" ref={sliderRef}>
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Card slider */}
          <div className="overflow-hidden py-8">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleIndices.map((index, i) => (
                    <motion.div
                      key={`${index}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: 0
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className={`relative ${i === 0 ? 'md:col-span-1' : ''}`}
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#d4b483]/20 h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="relative h-48 md:h-56 lg:h-64">
                          <Image
                            src={images[index].src || "/placeholder.svg"}
                            alt={images[index].alt}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#8b1a1a]/70 to-transparent opacity-60"></div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">{images[index].title}</h3>
                          <p className="text-sm text-[#5a3e36]">{images[index].description}</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-[#8b1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 5000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  visibleIndices.includes(index) ? "bg-[#8b1a1a] w-6" : "bg-[#8b1a1a]/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
