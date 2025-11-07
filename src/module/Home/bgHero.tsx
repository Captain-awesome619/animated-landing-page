'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Afri from '../../../public/images/afri.png'
import { useLayoutEffect } from 'react'
import { forwardRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface BackgroundHeroProps {
  title: string
  description: string
  backgroundImageSrc: string
  backgroundImageAlt: string
  imageClassName?: string
  bgColor?: string
  statsRef?: React.RefObject<HTMLDivElement | null>
}

const BackgroundHero = forwardRef<HTMLDivElement, BackgroundHeroProps>(
  (
    {
      title,
      description,
      backgroundImageSrc = '/images/african-man.png',
      backgroundImageAlt = 'Xtrempay Background',
      imageClassName,
      bgColor = 'bg-[#e6a69b]',
      statsRef, // 👈 Add here too
    },
    ref
  ) => {
    return (
      <section className="h-screen" ref={ref}>
        {/* Background Image with enhanced effects */}

        {/* Overlay for better text readability */}
        <div className="h-screen w-screen overflow-hidden  bg-[url('/images/afri.png')]   bg-no-repeat bg-cover bg-center">
          {/* Container */}
          <div className="container relative z-10 lg:h-screen flex items-center justify-between py-12 lg:py-10">
            {/* Enhanced Card with Glassmorphism and 3D effects */}

            <div
              className="reason-info relative bg-black/40 lg:mt-0 mt-20 opacity-0 -translate-x-[150%] backdrop-blur-lg lg:mb-25 text-white p-4 rounded-2xl w-3/1 lg:w-[30%] shadow-2xl border border-white/20 transform-gpu hover:bg-black/50"
              style={{
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-3 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent transform">
                Why Xtrempay?
              </h2>

              <div className="text-sm md:text-base space-y-2">
                <div className="flex gap-x-2.5 items-start transform hover:translate-x-2 transition-transform duration-300 px-2 rounded hover:bg-white/10">
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-3 shrink-0 transition-transform duration-300 hover:scale-125"
                  />

                  <p className="text-sm">
                    All-in-One Wallet <br />
                    <span className="text-blue-200">
                      Send money, buy airtime, pay bills, and save—all in one
                      app.
                    </span>
                  </p>
                </div>

                <div className="flex gap-x-2.5 items-start transform hover:translate-x-2 transition-transform duration-300 px-2 rounded hover:bg-white/10">
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-3 hrink-0 transition-transform duration-300 hover:scale-125"
                  />
                  <p className="text-sm">
                    Incentive-Based Savings <br />
                    <span className="text-blue-200">
                      Save money and unlock raffle draws, trivia contests &
                      entertainment perks.
                    </span>
                  </p>
                </div>

                <div className="flex gap-x-2.5 items-start transform hover:translate-x-2 transition-transform duration-300 px-2 rounded hover:bg-white/10">
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-3 shrink-0 transition-transform duration-300 hover:scale-125"
                  />
                  <p className="text-sm">
                    Made for Nigerians <br />
                    <span className="text-blue-200">
                      Localized features, naira-first UX, and real-time support
                    </span>
                  </p>
                </div>

                <div className="flex gap-x-2.5 items-start transform hover:translate-x-2 transition-transform duration-300 px-2 rounded hover:bg-white/10">
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-3 shrink-0 transition-transform duration-300 hover:scale-125"
                  />
                  <p className="text-sm">
                    Bank-Level Security <br />
                    <span className="text-blue-200">
                      End-to-end encryption, secure login, and fraud alerts.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Numbers Overlay with 3D effects */}
            <div className="stat opacity-0 translate-y-[150%] absolute inset-0 flex items-center justify-around text-white text-center z-10 w-full lg:w-full mt-[170%] lg:mt-[45%] transform">
              {/* 10M (Odd, up) */}
              <div className="transform mt-40 -translate-y-16 text-2xl md:text-8xl font-bold border-s px-4 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
                <div className="bg-linear-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-400 transition-all duration-500">
                  10M
                </div>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  To be won every week
                </p>
              </div>

              {/* 100K (Even, down) */}
              <div className="transform translate-y-16 text-2xl md:text-8xl font-bold border-s px-4 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
                <div className="bg-linear-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-400 transition-all duration-500">
                  100K
                </div>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  Active users
                </p>
              </div>

              {/* 24/7 (Odd, up) */}
              <div className="transform -translate-y-16 text-2xl md:text-8xl font-bold border-s px-4 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
                <div className="bg-linear-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-500">
                  24/7
                </div>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  Customer Support
                </p>
              </div>

              {/* 100M (Even, down) */}
              <div className="transform translate-y-16 text-2xl md:text-8xl font-bold border-s px-4 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
                <div className="bg-linear-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500">
                  100M
                </div>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  Weekly savings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

export default BackgroundHero
