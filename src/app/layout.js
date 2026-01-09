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
      
      <body className="h-screen flex flex-col">
        <SignedIn>
        <Navbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <Providers>
            {children}  
            </Providers></div>
     </SignedIn>
     <SignedOut>
      <HeroSection/>
      </SignedOut> 
      </body>
      
    </html></ClerkProvider>
  );
}
