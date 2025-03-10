"use client"

import { useState } from "react"
import { Star } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    setIsOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Way</span>
                <span className="text-blue-300">Gen</span>
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-300 hover:text-blue-300 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-blue-300 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-300 hover:text-blue-300 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-300 hover:text-blue-300 transition-colors"
            >
              Team
            </button>
            <a
              href="https://github.com/ArshTiwari2004/Waygen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-blue-300 transition-colors"
            >
              <Star className="h-4 w-4 mr-1" />
              Star Repo
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 shadow-lg shadow-blue-500/20"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-gray-300 hover:text-blue-300 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left py-2 text-gray-300 hover:text-blue-300 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left py-2 text-gray-300 hover:text-blue-300 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left py-2 text-gray-300 hover:text-blue-300 transition-colors"
            >
              Team
            </button>
            <a
              href="https://github.com/yourusername/waygen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-gray-300 hover:text-blue-300 transition-colors"
            >
              <Star className="h-4 w-4 mr-1" />
              Star Repo
            </a>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 shadow-lg shadow-blue-500/20"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

