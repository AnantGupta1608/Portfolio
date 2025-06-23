import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = ""
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

const myDescription = `
I am Anant Gupta, a CSE student, AI enthusiast, and aspiring full-stack developer passionate about exploring how emerging technologies can drive impactful solutions across defense, aerospace, and sustainable innovation.

My expertise includes:

- Ethical hacking and cybersecurity fundamentals

- Full-stack development with React, TypeScript, TailwindCSS

- AI and machine learning using Python

- Web3 concepts and decentralized systems

- System-level builds with Raspberry Pi, Linux, Git, and beginner AWS skills

Current Experience:

- AI Intern at AI Wallah (2025 - Present)

- Web3 Bootcamp Participant - Kleros Web3 Essentials

- Certificate Course - IIRS Dehradun

- Hackathon Contributor - Tech and Sustainability Themes

- Active Participant in GeeksforGeeks and campus tech events

Key Projects:

- Personal NAS using Raspberry Pi and OpenMediaVault

- BlockLog - Web3 Immutable Audit Log System

- Portfolio website with chatbot, toggles, and smooth UI

- AI Assistant (JARVIS-inspired) with no prebuilt models

- This Day in History - Ongoing web application project

Academic Focus:

- Data Structures, Algorithms, OOP, Automata Theory, Computer Architecture

Contact: anantguptaa1608@gmail.com
Social: LinkedIn, GitHub, Twitter, Instagram, Discord

I'm deeply invested in building ethical, intelligent, and practical systems. I'm always open to collaboration and innovation. Let's build something great.

`

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const prompt = `User_message: ${message}. Reply naturally to the user message and if required then answer based on: ${myDescription} or just simply give friendly reply. Reply in a way that Anant Gupta is himself talking. Reply in short sentences and be conversational.`

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    // Extract the generated text from Gemini response
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that. Could you try asking something else?"

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
