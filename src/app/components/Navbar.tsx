"use client"; // Required for client-side state and interactivity
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
 const [isColored, setIsColored] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change 100 to the scroll position where you want the color to change
      setIsColored(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isColored]);
  return (
    <nav className={`fixed w-full z-100 shadow p-4 md:px-9 lg:px-20 border-gray-300 glassmorphism transition-colors duration-300 ${
        isColored ?  "bg-transparent backdrop-blur" : "bg-transparent"
      }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Xtrempay Logo"
            width={152}
            height={40}
          />
        </div>

        {/* Navigation Links For Desktop View */}
        <div className="hidden md:flex md:space-x-8 lg:space-x-9 md:items-center">
          <Link
            href="/"
            className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${
              pathname === "/" ? "active" : "inactive"
            }`}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${
              pathname === "/features" ? "active" : "inactive"
            }`}
          >
            Features
          </Link>
          <Link
            href="/reviews"
            className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${
              pathname === "/reviews" ? "active" : "inactive"
            }`}
          >
            Reviews
          </Link>
          <Link
            href="/contact"
            className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${
              pathname === "/contact" ? "active" : "inactive"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${
              pathname === "/faq" ? "active" : "inactive"
            }`}
          >
            FAQ
          </Link>
        </div>

        {/* Download Button and Hamburger Icon */}
        <div className="flex items-center sticky  inset-0 top-[72px] z-350">
          <button className="bg-[#4257D0] text-white px-8 py-2 rounded-full hover:bg-blue-700 md:block hidden transition-all outline-0">
            Download
          </button>
          {/* Hamburger Icon On Mobile View */}
          <button
            className="border-none md:hidden text-black focus:outline-none ml-4 z-50 bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glassmorphism fixed inset-0 top-[72px] bg-[#F8F9FF] shadow-xl z-350">
          <div className="p-2 flex flex-col space-y-1 max-w-md mx-auto bg-gradient-to-b from-[#F8F9FF] to-[#EEF1F6]">
            {[
              { href: "/", label: "Home" },
              { href: "/features", label: "Features" },
              { href: "/reviews", label: "Reviews" },
              { href: "/contact", label: "Contact" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-800 hover:text-[#4257D0] py-2 text-sm font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-[#4257D0] text-white px-6 py-3 rounded-full hover:bg-blue-700 w-full mt-4 font-medium transition-all duration-200">
              Download
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
