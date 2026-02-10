import Navbar from "./components/Navbar";
import Providers from "./Providers";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import HeroSection from "./components/HeroSection";
export const metadata = {
  title: "CarrerTrack",
  description: "Track ur carrer",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="min-h-screen flex flex-col overflow-x-hidden">
          <SignedIn>
            <Navbar />
            <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden">
              <Providers>{children}</Providers>
            </div>
          </SignedIn>

          <SignedOut>
            <HeroSection />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}

