import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#5a3e36] text-white relative overflow-hidden">
      {/* Temple-inspired decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={`top-${i}`} className="w-6 h-8 bg-white/10 mx-0.5 rounded-b-lg" />
          ))}
        </div>
      </div>

      {/* Konark wheel inspired decorative element */}
      <div className="absolute -top-16 -right-16 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8
            const x1 = 50 + 15 * Math.cos(angle)
            const y1 = 50 + 15 * Math.sin(angle)
            const x2 = 50 + 45 * Math.cos(angle)
            const y2 = 50 + 45 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" />
          })}
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative mr-3">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-sm"></div>
                <Image
                  src="./aaa.png"
                  alt="Aryavart Ancient Academy Logo"
                  width={60}
                  height={60}
                  className="relative z-10"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">Aryavart Ancient Academy</h3>
                <p className="text-sm text-white/80">Affiliated to CBSE New Delhi (1530380)</p>
              </div>
            </div>

            <p className="text-white/80 mb-6">
              Cultivating excellence through a blend of traditional values and modern education since 1995.
            </p>

            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#d4b483] mr-3 mt-1" />
                <p className="text-white/80">Khordha, Odisha, India</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-[#d4b483] mr-3 mt-1" />
                <p className="text-white/80">9124654094</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-[#d4b483] mr-3 mt-1" />
                <p className="text-white/80">aryavartaa.krd@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d4b483]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Admission
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Academics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Beyond Academics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative">
              Programs
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d4b483]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Elementary School
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Junior School
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Middle School
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Secondary School
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Admission Process
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Fee Structure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d4b483]"></span>
            </h4>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="bg-white/10 hover:bg-[#d4b483]/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#d4b483]/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#d4b483]/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#d4b483]/20 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <h5 className="font-medium mb-3">Subscribe to Newsletter</h5>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-[#d4b483]"
              />
              <button
                type="submit"
                className="bg-[#d4b483] hover:bg-[#c19a6b] text-[#5a3e36] font-medium px-4 rounded-r-lg transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Aryavart Ancient Academy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
