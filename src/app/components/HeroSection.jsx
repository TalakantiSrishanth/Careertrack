import { SignInButton } from "@clerk/nextjs";

const HeroSection = () => {
  const Features = [
    "AI Interview Preparation",
    "ATS Resume Score + Keyword Match",
    "Kanban Board with Drag-and-Drop",
    "Progress Analytics & Conversion Metrics",
    "Smart Follow-ups & Reminders",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            CareerTrack
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your AI-Powered Path From Application to Offer
          </p>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Track applications, optimize your resume for ATS, and prepare smarter with AI-generated
            interview insights — all in one clean dashboard.
          </p>
          <SignInButton mode="modal">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition">
            🚀 Get Started
          </button></SignInButton>
        </div>
      </header>
      <section className="grow">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-semibold mb-4">⭐ Core Features</h2>

          <ul className="grid md:grid-cols-2 gap-4">
            {Features.map((item, idx) => (
              <li
                key={idx}
                className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-3"
              >
                <span className="text-blue-600 text-xl">✔</span>
                <span className="text-gray-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm text-gray-500 mt-8">
            🔧 Built with: Next.js • JavaScript • MongoDB • Gemini AI • Clerk
          </h3>
        </div>
      </section>
      <footer className="bg-[#20263f] text-white py-6 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm opacity-80">CareerTrack © 2025 • Built by Srishanth</p>

          <div className="mt-3 flex justify-center gap-8 text-sm">
            <a
              href="https://github.com/TalakantiSrishanth"
              className="hover:text-gray-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/talakantisrishanth"
              className="hover:text-gray-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HeroSection;
