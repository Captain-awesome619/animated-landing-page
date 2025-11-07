'use client'
import { useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'

interface PosSectionProps {
  bgColor?: string
  posImageSrc?: string
  posImageAlt?: string
}

const PosSection = ({
  bgColor = 'bg-white',
  posImageSrc = '/images/pos-lady.png',
  posImageAlt = 'Xtrempay POS Agent',
}: PosSectionProps) => {
  const benefitsRef = useRef<HTMLUListElement>(null)
  const posRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const posTl = gsap.timeline({
        defaults: { duration: 0.25 },
        scrollTrigger: {
          trigger: posRef.current,
          start: 'top top',
          end: 'bottom+=500px top',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      })

      const headerLabel = 'header_label'

      posTl
        .to(posRef.current, {
          autoAlpha: 1, // fade in
          duration: 0,
          ease: 'power2.inOut',
        })
        .to(
          containerRef.current,
          {
            y: 0,
            ease: 'power2.inOut',
          },
          '-=0.5'
        )
        .to(
          pRef.current,
          {
            y: 0,
            ease: 'power2.inOut',
          },
          '<'
        )
        .from(
          imageRef.current,
          {
            xPercent: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'none',
          },
          '<'
        )
        .from(
          contentRef.current,
          { xPercent: 100, opacity: 0, duration: 0.5, ease: 'none' },
          '<'
        )
    }, posRef)
    // .to(posRef.current, { autoAlpha: 0, ease: 'none' })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={posRef} className="pos-section">
      <section
        className={`${bgColor} container min-h-screen relative overflow-hidden py-25 hero`}
      >
        <div className="text-center mx-auto">
          <div className="overflow-hidden">
            <div ref={containerRef} className="flex flex-col translate-y-full">
              <h3 className="text-blue-600 text-xl md:text-2xl mb-2">
                Xtrempay POS?
              </h3>

              <h4 className="text-3xl md:text-5xl font-bold mb-4">
                Free POS for Agents & Merchants
              </h4>
            </div>
          </div>
          <div className="overflow-hidden">
            <p
              ref={pRef}
              className="text-gray-600 text-base md:text-lg mb-10 -translate-y-full"
            >
              Xtrempay gives you a POS machine at no cost, so you can grow your
              hustle and serve your community.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row items-center justify-between"
          ref={sectionRef}
        >
          {/* Image Section with enhanced effects */}
          <div
            ref={imageRef}
            className="w-full lg:w-1/2 mb-8 lg:mb-0 transform"
          >
            <Image
              src={posImageSrc}
              alt={posImageAlt}
              width={610}
              height={600}
              className="object-contain mx-auto transition-all duration-500 "
            />
          </div>

          {/* Text Content with enhanced structure */}
          <div
            ref={contentRef}
            className="w-full lg:w-1/2 lg:pl-6 text-center lg:text-left transform"
          >
            <div className="space-y-8">
              <div>
                <h4 className="text-xl md:text-xl font-bold mb-4 text-gray-800">
                  What You Get
                </h4>
                <ul
                  ref={benefitsRef}
                  className="space-y-2 text-base md:text-lg"
                >
                  <li className="flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform">
                    <Image
                      src="/images/bullet.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    />
                    <span>Free POS device</span>
                  </li>
                  <li className="flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform">
                    <Image
                      src="/images/bullet.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    />
                    <span>Fast & secure</span>
                  </li>
                  <li className="flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform">
                    <Image
                      src="/images/bullet.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    />
                    <span>Instant settlement</span>
                  </li>
                  <li className="flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform">
                    <Image
                      src="/images/bullet.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    />
                    <span>Earn commissions on every transaction</span>
                  </li>
                  <li className="flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform">
                    <Image
                      src="/images/bullet.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    />
                    <span>24/7 support & quick settlements</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                  Who Can Apply
                </h4>
                <div className="space-y-1 text-base md:text-lg">
                  <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">
                    Small business owners
                  </div>
                  <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">
                    Mobile money agents
                  </div>
                  <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">
                    Anyone ready to make extra income
                  </div>
                </div>
              </div>

              <Link
                href="#"
                className="inline-block bg-[#4257D0] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-500 hover:scale-110 hover:shadow-2xl text-base md:text-sm transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PosSection
