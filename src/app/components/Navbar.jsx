import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Briefcase, BarChart3, CheckCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <Link href="/" className="text-xl font-bold tracking-tight">
        CareerTrack
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/applications"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Briefcase size={18} />
          Applications
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <BarChart3 size={18} />
          Analytics
        </Link>

        <Link
          href="/atscheck"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <CheckCircle size={18} />
          ATS Check
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
