import { SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Rocket } from "lucide-react";

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
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">CareerTrack</h1>

          <p className="text-lg text-gray-600 mt-3">
            Your AI-Powered Path From Application to Offer
          </p>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Track applications, optimize your resume for ATS, and prepare smarter with
            AI-generated interview insights — all in one clean dashboard.
          </p>

          <div className="flex justify-center mt-6">
            <SignInButton mode="modal">
              <Button className="flex items-center gap-2 text-lg px-6 py-5">
                <Rocket size={20} /> Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </header>

      <section className="grow">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold mb-6">Core Features</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {Features.map((item, idx) => (
              <Card key={idx} className="shadow-sm border">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle className="text-blue-600" size={22} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Built with: Next.js • JavaScript • MongoDB • Gemini AI • Clerk
          </p>
        </div>
      </section>

      <footer className="bg-[#20263f] text-white py-6 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm opacity-80">CareerTrack © 2025 • Built by Srishanth</p>

          <div className="mt-3 flex justify-center gap-8 text-sm">
            <a href="https://github.com/TalakantiSrishanth" target="_blank" className="hover:text-gray-400 transition">GitHub</a>
            <a href="https://linkedin.com/in/talakantisrishanth" target="_blank" className="hover:text-gray-400 transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
