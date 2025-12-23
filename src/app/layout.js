import Navbar from "./components/Navbar";
import "./globals.css";
export const metadata = {
  title: "CarrerTrack",
  description: "Track ur carrer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
