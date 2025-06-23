"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm Anant's AI assistant. I can help you learn about his projects, skills, experience, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    "Tell me about his projects",
    "What are his skills?",
    "How to contact him?",
    "His AI experience?",
    "Education background?",
    "Work experience?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "🚀 Anant has built some amazing projects! Here are the highlights:\n\n• AI-Driven Portfolio Chatbot - Intelligent conversational AI with NLP capabilities\n• Code Review AI - Automates feedback and bug detection using ML\n• Smart Task Management App - AI-enhanced productivity with pattern learning\n• Secure Audit Log System (BlockLog) - Immutable digital log tracker using Web3 principles\n\nEach project reflects a balance of design, engineering, and problem-solving. Which project interests you most?"
    }

    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return "💻 Anant's technical expertise spans multiple domains:\n\nLanguages & Frameworks:\n• JavaScript / TypeScript\n• React / Next.js\n• Node.js\n• Python\n\nSpecialties:\n• Full-Stack Development\n• AI and Machine Learning\n• Web3 and Decentralized Apps\n• Ethical Hacking and Cybersecurity\n\nA strong believer in learning by building and shipping."
    }

    if (
      message.includes("contact") ||
      message.includes("reach") ||
      message.includes("email") ||
      message.includes("phone")
    ) {
      return "📞 Here's how you can reach Anant:\n\n• Email:anantguptaa1608@gmail.com\n• Phone: +91 8240479245\n• Location: West Bengal, India, CA\n\nSocial Media:\n• LinkedIn, GitHub, Twitter, Instagram, Discord\n\nYou can also scroll down to the 'Let's Connect' section for direct links to all his social profiles!"
    }

    if (
      message.includes("ai") ||
      message.includes("artificial intelligence") ||
      message.includes("machine learning") ||
      message.includes("ml")
    ) {
      return "🤖 Anant has extensive AI/ML experience:\n\n• Actively exploring AI applications:\n\n• Created intelligent assistants and automation tools\n• Built ML pipelines for real-world use cases\n• Familiar with NLP, TensorFlow, Scikit-learn, OpenCV\n\nPassionate about blending AI with problem-solving in defense, sustainability, and education."

    }

    if (
      message.includes("education") ||
      message.includes("study") ||
      message.includes("degree") ||
      message.includes("university")
    ) {
      return "🎓 Anant is Pursuing a degree in Computer Science & Engineering with focused interest in Artificial Intelligence, System Design, and Cybersecurity. Currently engaged in hands-on learning, internships, and open-source projects."

    }

    if (
      message.includes("experience") ||
      message.includes("career") ||
      message.includes("job") ||
      message.includes("work history")
    ) {
      return "💼 Anant is a dedicated full-stack developer with expertise.\n\n• Gaining experience through internships, research projects, and independent development work. Involved in building full-stack applications and AI systems. Strong foundation in software architecture, backend systems, and UI design with real-world exposure."
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "👋 Hello! Nice to meet you. I'm here to help you learn more about Anant Gupta - his projects, skills, and experience. What would you like to know? You can ask me anything or use the quick reply buttons below!"
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "😊 You're very welcome! I'm glad I could help. Let me know if you want to explore more about the work or skills!"
    }

    // Default response
    return "🤔 That's an interesting question! I'd love to help you learn more about Anant. You can ask about:\n\n• Projects and portfolio\n• Technical skills\n• AI/ML work\n• Contact details\n• Education background\n• Career journey\n\nWhat would you like to explore?"
  }

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputMessage.trim()
    if (!messageText) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot typing and response
    simulateTyping(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div> */}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${isMinimized ? "h-16" : "h-[500px]"}`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
          <div className="flex items-center">
            <div className="relative">
              <Bot className="h-8 w-8 mr-3" />
            </div>
            <div>
              <h3 className="font-semibold">Anant's AI Assistant</h3>
              <div className="text-xs opacity-90 flex items-center gap-1">
  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
  <span>Online • Ready to help</span>
</div>

            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 p-4 h-56 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`flex max-w-xs lg:max-w-md ${message.isBot ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-shrink-0 ${message.isBot ? "mr-2" : "ml-2"}`}>
                      {message.isBot ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                        message.isBot
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <div className="mr-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-2xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-5 pb-3 pt-3 bg-white dark:bg-gray-900">
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto pr-1">

                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Anant..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
