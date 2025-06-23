import Image from "next/image"

export default function LogoLarge() {
  return (
    <div className="transform hover:scale-105 transition-transform duration-300">
      <Image
        src="/images/ag-logo.png"
        alt="AG Logo"
        width={120}
        height={64}
        className="h-16 w-auto object-contain"
        style={{
          filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))",
        }}
      />
    </div>
  )
}
