"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"
import { motion } from "framer-motion"

// Custom Discord icon component
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const ConnectSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/anantgupta1608/",
      color: "hover:text-blue-400",
      bgGradient: "hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/20",
      borderColor: "hover:border-blue-500/50",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/AnantGupta1608",
      color: "hover:text-gray-300",
      bgGradient: "hover:bg-gradient-to-br hover:from-gray-600/20 hover:to-gray-700/20",
      borderColor: "hover:border-gray-500/50",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: "https://x.com/Anant_Gupta06",
      color: "hover:text-sky-400",
      bgGradient: "hover:bg-gradient-to-br hover:from-sky-500/20 hover:to-sky-600/20",
      borderColor: "hover:border-sky-500/50",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/anant_gupta.16/",
      color: "hover:text-pink-400",
      bgGradient: "hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-pink-600/20",
      borderColor: "hover:border-pink-500/50",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      url: "https://discord.com/users/ananttuu",
      color: "hover:text-purple-400",
      bgGradient: "hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-600/20",
      borderColor: "hover:border-purple-500/50",
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:anantguptaa1608@gmail.com",
      color: "hover:text-red-400",
      bgGradient: "hover:bg-gradient-to-br hover:from-red-500/20 hover:to-red-600/20",
      borderColor: "hover:border-red-500/50",
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section ref={sectionRef} id="connect" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Ready to collaborate on exciting projects or discuss innovative ideas? Let's connect and create something
            amazing together!
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 ${social.bgGradient} ${social.borderColor} min-w-[120px]`}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`p-4 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-all duration-300 ${social.color} text-gray-400`}
                  >
                    <IconComponent />
                  </div>
                  <span className="mt-3 font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
        <div className="mt-12 flex justify-center items-center space-x-2 text-gray-400">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="#9333ea"
  >
    <path
      fillRule="evenodd"
      d="M5.05 3.05a7 7 0 019.9 9.9l-4.243 4.243a1 1 0 01-1.414 0L5.05 12.95a7 7 0 010-9.9zm4.95 1.9a3 3 0 100 6 3 3 0 000-6z"
      clipRule="evenodd"
    />
  </svg>
  <span className="text-sm">West Bengal, India</span>
</div>

      </div>
    </section>
  )
}

export default ConnectSection
