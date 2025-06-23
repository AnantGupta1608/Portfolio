import Image from "next/image"

export default function Logo() {
  return (
    <div className="pl-4 pr-2 transform hover:scale-105 transition-transform duration-300">
      <Image
        src="/images/ag-logo.png"
        alt="AG Logo"
        width={80}
        height={40}
        className="h-8 w-auto object-contain"
        style={{
          filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))",
        }}
        priority
      />
    </div>
  )
}
