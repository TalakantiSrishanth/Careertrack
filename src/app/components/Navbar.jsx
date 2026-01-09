import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="flex items-center p-5 bg-gray-200">
      <div className="flex-1 font-bold text-lg">
         <Link href="/">CareerTrack</Link>
      </div>

      <div className="flex gap-5">
        <Link href="/applications">Applications</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/atscheck">ATS Check</Link>
         <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
