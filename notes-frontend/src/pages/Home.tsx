export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-parchment bg-cover bg-center px-6">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-cinzel font-semibold text-wood mb-4 tracking-wide">
        📜 Welcome to <span className="text-gold">Notes of Antiquity</span>
      </h1>

      {/* Subheading */}
      <p className="text-base md:text-lg text-gray-700 max-w-2xl mb-6 leading-relaxed font-serif">
        Step into the archives — a quiet vault to preserve your thoughts, 
        ideas, and memories, kept safe for the ages.
      </p>

      {/* Call to Action */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/signup"
          className="bg-gold text-white px-5 py-2.5 rounded-lg font-cinzel text-base shadow-sm hover:scale-105 transition transform"
        >
          ✨ Begin Your Journey
        </a>
        <a
          href="/notes"
          className="bg-wood text-parchment px-5 py-2.5 rounded-lg font-cinzel text-base shadow-sm hover:scale-105 transition transform"
        >
          🔑 Enter the Archive
        </a>
      </div>

      {/* Decorative line */}
      <div className="mt-10 w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full"></div>

      {/* Footer line */}
      <p className="mt-4 text-sm text-gray-600 italic font-serif">
        “What is written on parchment, lives forever.”
      </p>
    </div>
  );
}
