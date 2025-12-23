'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'

import { savingsData } from './triviaSavings'
import BackgroundHero from './bgHero'
import SavingsSection from './triviaSavings'
import small from '../../../public/images/Small.svg'
import PosSection from './posHero'
import TestimonialSection, { defaultTestimonials } from './testimonial'
import Needhelp from './needHelp'
import FaqSection from './faqs'

import big from '../../../public/images/Home-portrait.png'
import content from '../../../public/images/Savings-portrait.png'
import afriPhone from '../../../public/images/black-american.png'
import afri from '../../../public/images/african-american.png'
import { useSetActiveLink } from '@/hooks/useSetActiveLink'
import { useSmallDevice } from '@/hooks/useSmallDevice'

type HeroSectionProps = {
  title: string
  description: string
  ctaText?: string
  ctaLink?: string
  videoText?: string
  num: number
  imageAlt: string
  imageClassName?: string
  imgHeight?: number
  imgWidth?: number
  bgColor?: string
  colSet?: string
  layoutVariant?: 'split' | 'centered'
  imgColset?: string
  animationType?: 'scroll-merge' | 'zoom-in'
}

const Hero = ({
  title,
  description,
  ctaText = 'Download',
  ctaLink = '#',
  videoText = 'Watch our video',
  num,
  imageAlt = 'Xtrempay App',
  bgColor = 'bg-gray-100',
  imgColset,
}: HeroSectionProps) => {
  const [deviceHeight, setDeviceHeight] = useState(100)

  const heroRef = useRef<HTMLDivElement>(null)
  const bigImgRef = useRef<HTMLImageElement>(null)
  const smallImgRef = useRef<HTMLDivElement>(null)
  const contentImgRef = useRef<HTMLImageElement>(null)
  const landscapeImgRef = useRef<HTMLImageElement>(null)
  const bgHeroRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const xtrempayRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const savingsRef = useRef<HTMLDivElement>(null) // 👈 NEW

  const scrollTlRef = useRef<GSAPTimeline | null>(null)

  const { setActive } = useSetActiveLink()
  const isSmallDevice = useSmallDevice()

  gsap.registerPlugin(ScrollTrigger)

  const isSmallRef = useRef(isSmallDevice)

  const translateVal =
    deviceHeight > 750
      ? 'translate-y-[25%] md:translate-y-[50%] lg:translate-y-[40%]'
      : 'translate-y-[50%]  md:translate-y-[50%] lg:translate-y-[40%]'

  useEffect(() => {
    if (window) setDeviceHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    isSmallRef.current = isSmallDevice

    ScrollTrigger.update()
  }, [isSmallDevice])

  useGSAP(
    () => {
      const africanManSelector = smallImgRef.current?.querySelector('.african')
      const secondSection = gsap.utils.selector(xtrempayRef.current)

      const heroTl = gsap.timeline({
        defaults: {
          duration: 0.5,
        },
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: `bottom  top`,
          // anticipatePin: 1,
          toggleActions: 'play none none reverse',
          onEnter: () => setActive('home'),
          onEnterBack: () => setActive('home'),
        },
      })

      heroTl
        .to(bigImgRef.current, {
          y: '-250%',
          autoAlpha: 0,
          ease: 'none',
          duration: 1,
        })
        .to(
          smallImgRef.current,
          {
            x: () => (isSmallRef.current ? '0%' : '-50%'),
            y: '-35%',
            ease: 'none',
          },
          '<'
        )
        .to(smallImgRef.current, {
          rotateZ: -90,
          transformOrigin: 'center center',
          ease: 'none',
        })
        .to(contentImgRef.current, { opacity: 0, ease: 'none' }, '<')
        .to(landscapeImgRef.current, { opacity: 1, ease: 'none' }, '<')
        .to(smallImgRef.current, {
          scale: 2.5,
          autoAlpha: 0,
          ease: 'back.out',
          duration: 1,
        })
        .to(textContentRef.current, { opacity: 0, ease: 'none' }, '<')
        .to(bgHeroRef.current, { opacity: 1, ease: 'none' }, '<')
        .to(
          secondSection('.reason-info'),
          { x: 0, autoAlpha: 1, zIndex: 2 },
          '<'
        )
        .to(
          secondSection('.stat'),
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out',
          },
          '<'
        )
    },
    { scope: heroRef }
  )

  return (
    <section>
      <div className={`${bgColor} hero z-0 relative`} ref={heroRef} id="home">
        <div className="container h-screen flex overflow-hidden w-full font-medium">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-[10%] justify-between h-screen">
            <div
              ref={textContentRef}
              className="text-center lg:text-left lg:w-1/3 mt-16 lg:mt-0 mb-8"
            >
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight hero__title">
                {title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-[#151515]">
                {description}
              </p>
              <div className="flex justify-start gap-4 lg:justify-start md:justify-center lg:text-start">
                <Link
                  href={ctaLink}
                  className="bg-[#4257D0] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-0"
                >
                  {ctaText}
                </Link>
                <div
                  className="flex cursor-pointer lg:ms-3 items-center justify-center lg:mt-1"
                
                  }
                >
                  <div className="border-2 border-[#151515] bg-transparent rounded-full text-center p-2 flex items-center justify-center h-[38px] w-[38px] lg:me-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
                      <path d="M8 5.14v14.72a1 1 0 001.55.832l11.98-7.36a1 1 0 000-1.664L9.55 4.308A1 1 0 008 5.14z" />
                    </svg>
                  </div>
                  <span className="text-[#151515] mt-1.5 text-sm sm:text-[12px] md:text-lg lg:text-lg ps-2">
                    {videoText}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`flex justify-center ${imgColset || 'w-full lg:w-2/3'}`}
            >
              <div className="flex right-[-5%]">
                <Image
                  ref={bigImgRef}
                  src={big}
                  alt={imageAlt}
                  width={450}
                  height={150}
                  className="relative md:top-[30%] w-[300px] h-[650px] md:w-[400px] object-contain"
                  priority
                />
                <div
                  className={`flex items-center justify-center w-[300px] md:w-[350px] h-[60%] absolute bottom-0 left-1/2 -translate-x-1/2 ${translateVal} lg:translate-x-[70%] origin-center`}
                  ref={smallImgRef}
                >
                  <div className="w-full z-0 h-full relative flex items-center justify-center">
                    <Image
                      ref={contentImgRef}
                      src={content}
                      alt="Content"
                      className="absolute z-0 w-[80%] object-contain lg:w-full h-[650px]"
                      width={450}
                      height={150}
                      priority
                    />
                    <Image
                      ref={landscapeImgRef}
                      src={afriPhone}
                      alt="African american within iphone 13 frame"
                      className="absolute rounded-3xl w-[80%] lg:w-full h-[650px] object-contain opacity-0"
                      width={450}
                      height={150}
                      priority
                    />
                    <Image
                      src={afri}
                      alt="African american"
                      className="african absolute rounded-3xl w-[80%] lg:w-full h-[650px] object-contain opacity-0"
                      width={450}
                      height={150}
                      priority
                    />
                  </div>
                </div>
                {/* <div className="mt-[80%] ml-[-20%] w-[120px] h-[100px]"></div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          ref={bgHeroRef}
          className="opacity-0 absolute top-0 left-0 h-full w-screen z-[-1]"
        >
          <BackgroundHero
            statsRef={statsRef}
            backgroundImageAlt="African Man"
            imageClassName=""
            backgroundImageSrc="/images/african-american.png"
            title=""
            description=""
            ref={xtrempayRef}
          />
        </div>
      </div>
    </section>
  )
}
export default Hero
