import Navbar from "./components/Navbar";
import Providers from "./Providers";
import "./globals.css";
export const metadata = {
  title: "CarrerTrack",
  description: "Track ur carrer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <Providers>
            {children}  
            </Providers></div>
      </body>
    </html>
  );
}
