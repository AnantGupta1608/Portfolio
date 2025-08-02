"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ExternalLink, Github } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"
import Chatbot from "@/components/chatbot"
import Logo from "@/components/logo"
import LogoLarge from "@/components/logo-large"
import ConnectSection from "@/components/connect-section"

// Throttle function for performance optimization
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)

  // Page loader with faster timing
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const sections = ["home", "about", "career", "projects", "skills", "connect"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current && current !== activeSection) {
        setActiveSection(current)
      }
    }, 16), // ~60fps
    [activeSection],
  )

  // Scroll spy with passive listeners for better performance
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
    setMobileMenuOpen(false)
  }, [])

  // Memoized static data
  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "career", label: "Career" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "connect", label: "Let's Connect" },
    ],
    [],
  )

 const projects = useMemo(
  () => [
    {
      title: "Weather App",
      description:
        "An AI powered weather application that provides real-time weather updates, forecasts, and alerts. Features include location-based weather tracking, interactive maps, and personalized notifications.",
      tech: ["HTML","Javascript", "CSS",],
      github: "https://github.com/AnantGupta1608/weather_app", // replace with actual
      demo: "https://ai-weather-app06.vercel.app/", // replace with actual
      image: "/images/Weather.png", // update this with actual image path
    },
    {
      title: "SmartPaisa",
      description:
        "A financial fraud detection tool designed to track suspicious digital activities and promote secure online transactions. Features real-time alerts, pattern recognition, and privacy-first architecture.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/your-username/smartpaisa", // replace with actual
      demo: "https://smartpaisa.vercel.app", // replace with actual
      image: "/images/SmartPaisa.png", // update this with actual image path
    },
  ],
  [],
);


  const skills = useMemo(
    () => [
      { name: "Linux Scripting", level: 90 },
      { name: "JavaScript/TypeScript", level: 55 },
      { name: "Next.js", level: 40 },
      { name: "Machine Learning", level: 35 },
      { name: "React", level: 55 },
      { name: "Node.js", level: 80 },
      { name: "AWS/Cloud", level: 75 },
      { name: "Windows Scripting", level: 70 },
    ],
    [],
  )

  // Optimized animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            style={{ willChange: "transform" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-lg font-semibold text-white"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-300 dark">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-40 border-b border-gray-700"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center"
              style={{ willChange: "transform" }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    activeSection === item.id
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:text-blue-400 hover:bg-gray-800/50"
                  }`}
                  style={{ willChange: "transform" }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-gray-900 border-t border-gray-700"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Anant Gupta
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              AI Researcher & Full-Stack Developer crafting secure, scalable, and intuitive systems. Merging intelligent design, ethical engineering, and real-world impact through code
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform" }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-72 h-72 bg-gray-900 rounded-full flex items-center justify-center">
                  <LogoLarge />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a Computer Science Engineering student with a strong interest in artificial intelligence, 
                full-stack development, and ethical system design. Passionate about building secure, intelligent, 
                and scalable applications using technologies like React, TypeScript, TailwindCSS, and Python. 
                Experienced with Linux systems, beginner-level AWS, and foundational concepts in Web3. 
                Actively explores the intersection of AI, cybersecurity, and modern web development through 
                hands-on projects and open collaboration.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently working as an AI intern, with experience participating in the Kleros Web3 Bootcamp 
                and contributing to hackathons focused on technology and sustainability. Notable projects include 
                a Raspberry Pi-based NAS, a Web3 immutable audit system (BlockLog), and a cyberpunk-themed 
                portfolio with integrated chatbot. Academically focused on data structures, OOP, automata theory,
                and computer architecture. Always open to collaborating on impactful projects that blend innovation, 
                security, and real-world problem-solving.
              </p>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {["AI/ML", "Web Development", "Open Source", "Cybersecurity", "AWS"].map((interest, index) => (
                  <motion.span
                    key={interest}
                    variants={fadeInUp}
                    className="px-4 py-2 bg-blue-900 text-blue-200 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
                  >
                    {interest}
                  </motion.span>
                ))}
              </motion.div>
              <motion.button
                onClick={() => {
                  // Create a download link for the resume
                  const link = document.createElement("a")
                  link.href = "/Anant Gupta Resume.pdf" // You'll need to add your resume PDF to the public folder
                  link.download = "Anant Gupta Resume.pdf"
                  link.click()
                }}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ willChange: "transform" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Resume</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {[
              {
                title: "AI Intern",
                company: "AI Wallah",
                period: "June 2025 - Present",
                description:
                  "Working on real-world generative AI projects involving prompt engineering, fine-tuning open-source models, and deploying intelligent assistant features into production-ready systems.",
              },
              {
                title: "Capture the Flag Finalist",
                company: "Phantom Breach CTF",
                period: "April 2025",
                description:
                  "Secured 3rd place in Phantom Breach CTF event by solving complex cryptography, reverse engineering, and web security challenges with a focus on real-world threat simulation.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-blue-400 font-semibold mb-2">{job.company}</p>
                    <p className="text-sm text-gray-400 mb-3">{job.period}</p>
                    <p className="text-gray-300">{job.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-gray-900"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700 group hover:border-blue-500 transition-all duration-300"
                style={{ willChange: "transform" }}
              >
              <div className="h-48 relative overflow-hidden">
                <img
                 src={project.image}
                 alt={`${project.title} preview`}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                </div>
             </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium hover:bg-gray-600 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 transform hover:scale-105"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section - Now using the separate component */}
      <ConnectSection />

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Anant Gupta. All rights reserved.</p>
        </div>
      </footer>

      {/* Add the components */}
      <ScrollToTop />
      <Chatbot />
    </div>
  )
}
