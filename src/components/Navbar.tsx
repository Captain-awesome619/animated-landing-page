'use client' // Required for client-side state and interactivity
import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { ScrollToOptions } from 'lenis'

const navLinks = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
  },
  {
    id: 'features',
    title: 'Features',
    href: '#features',
  },
  {
    id: 'reviews',
    title: 'Reviews',
    href: '#reviews',
  },
  {
    id: 'faq',
    title: 'FAQ',
    href: '#faq',
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isColored, setIsColored] = useState(false)

  const lenis = useLenis()

  const handleNavClick = (e: MouseEvent, id: string) => {
    e.preventDefault()

    const target = document.querySelector(`#${id}`) as HTMLElement

    const scrollOpt: ScrollToOptions = {
      offset: id === 'reviews' ? 80 : id === 'faq' ? 35 : 0,
      duration: 1.2,
      onComplete: () => {
        setTimeout(() => {
          ScrollTrigger.refresh()
          ScrollTrigger.update()
        }, 50)
      },
    }

    if (target && lenis) {
      lenis.scrollTo(id === 'home' ? 0 : target, scrollOpt)
    }
  }

  return (
    <nav
      className={`sticky top-0 w-full z-100 shadow py-4 border-gray-300 glassmorphism transition-colors duration-300 ${
        isColored ? 'bg-transparent backdrop-blur' : 'bg-transparent'
      }`}
    >
      <section className="container overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Xtrempay Logo"
                width={152}
                height={40}
              />
            </Link>
          </div>

          {/* Navigation Links For Desktop View */}
          <div className="hidden md:flex md:space-x-8 lg:space-x-9 md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-[#000000B2] hover:text-[#4257D0] nav-link underline-custom ${pathname === link.href ? 'active' : ''}`}
                data-link={link.id}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.title}
              </Link>
            ))}
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
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden  top-[72px] bg-transparent z-350">
            <div className="p-2 flex flex-col space-y-1 max-w-md mx-auto bg-gradient-to-b from-[transparent] to-[transparent]">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  data-link={link.id}
                  className="block text-gray-800 hover:text-[#4257D0] py-2 text-sm nav-link font-medium transition-colors duration-200"
                  onClick={(e) => {
                    handleNavClick(e, link.id)
                    setIsOpen(false)
                  }}
                  scroll={true} // Prevent scroll for FAQ link
                >
                  {link.title}
                </Link>
              ))}
              <button className="bg-[#4257D0] text-white px-6 py-3 rounded-full hover:bg-blue-700 w-full mt-4 font-medium transition-all duration-200">
                Download
              </button>
            </div>
          </div>
        )}
      </section>
    </nav>
  )
}
