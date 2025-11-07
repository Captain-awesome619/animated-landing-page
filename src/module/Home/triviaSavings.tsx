'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLenis } from 'lenis/react'

import screen1 from '../../../public/images/screen1.svg'
import screen2 from '../../../public/images/screen2.svg'
import screen3 from '../../../public/images/screen3.svg'
import screen4 from '../../../public/images/screen3.svg'
import { useSetActiveLink } from '@/hooks/useSetActiveLink'

export const savingsData: SavingsData[] = [
  {
    id: 1,
    title: 'Trivia',
    subTitle: 'Savings',
    description: `Save Weekly  Answer Smart Win Cash. Trivia Savings makes saving fun, you save money, answer trivia, and stand a chance to win cool cash!`,
    howItWorks: {
      title: 'How it works:',
      text: 'Save ₦3000/week = Entry unlocked Play our weekly trivia quiz',
      items: [
        'Get answers right! Boost your chance',
        'Winners get picked and rewarded with real cash!',
      ],
    },
    whyItBangs: [
      'Fun + saving in one',
      'Real rewards for being smart',
      'For sharp minds & goal-getters',
      "Don't just save. Outsmart. Outwin. Trivia Saving only on Xtrempay.",
    ],
    imageSrc: '/images/phone2.png',
    imageAlt: 'Trivia Savings App',
  },
  {
    id: 2,
    title: 'Spin & Win',
    subTitle: 'Savings',
    description:
      'Spin & Win - Save. Spin. Win Big. With Spin & Win Savings, every token you spin gives a chance to win instant rewards, fun, fast, and built for the bold.',
    howItWorks: {
      title: 'How it works:',
      text: 'Save ₦500 = 1 spin token',
      items: [
        'Use your token to spin the wheel',
        'Could you win airtime, saving boosts, or even real cash',
      ],
    },
    whyItBangs: [
      'Every spin is a shot at winning instant rewards',
      'Fun, fast, and built for the bold',
      'Only on Xtrempay where saving gets exciting!',
    ],
    imageSrc: '/images/phone2_spin.png',
    imageAlt: 'Spin & Win Savings App',
  },
  {
    id: 3,
    title: 'Raffle',
    subTitle: 'Savings',
    description:
      'Raffle Savings on Xtrempay rewards you with cash prizes just for saving, no interest, no stress.',
    howItWorks: {
      title: 'How it works:',
      text: 'Save ₦1000 = 1 ticket',
      items: [
        'More savings = more tickets = Higher chances',
        "We draw winners weekly/monthly and yes, it's real cash",
      ],
    },
    whyItBangs: [
      'No boring interest',
      'Real wins, made for hustlers & dreamers like you',
      'Stack your savings. Stack your chances. Join the Raffle.',
    ],
    imageSrc: '/images/phone2_raffle.png',
    imageAlt: 'Raffle Savings App',
  },
  {
    id: 4,
    title: 'Send Money. ',
    subTitle: 'Pay Bills',
    description:
      'Raffle Savings on Xtrempay rewards you with cash prizes just for saving, no interest, no stress.',
    howItWorks: {
      title: 'How it works:',
      text: 'Save ₦1000 = 1 ticket',
      items: [
        'More savings = more tickets = Higher chances',
        "We draw winners weekly/monthly and yes, it's real cash",
      ],
    },
    whyItBangs: [
      'No boring interest',
      'Real wins, made for hustlers & dreamers like you',
      'Stack your savings. Stack your chances. Join the Raffle.',
    ],
    imageSrc: '/images/savemoney.png',
    imageAlt: 'Raffle Savings App',
  },
]

const phoneScreens = [screen1, screen2, screen3, screen4]

interface SavingsData {
  id: number
  title: string
  subTitle: string
  description: string
  howItWorks: { title: string; text: string; items: string[] }
  whyItBangs: string[]
  imageSrc: string
  imageAlt: string
}

interface SavingsSectionProps {
  bgColor?: string
  innerDiv?: HTMLDivElement
  // func: (act: any) => void
  // activeIndex?: any
}

const SavingsSection = forwardRef<HTMLDivElement, SavingsSectionProps>(
  ({ bgColor = 'bg-[#1F2526]' }, ref) => {
    const savingsRef = useRef<HTMLDivElement | null>(null)
    const titleRefs = useRef<HTMLHeadingElement[]>([])
    const subtitleRefs = useRef<HTMLHeadingElement[]>([])
    const descriptRefs = useRef<HTMLDivElement[]>([])
    const navItemRefs = useRef<HTMLLIElement[]>([])
    const navTitleRefs = useRef<HTMLHeadingElement[]>([])
    const navSubtitleRefs = useRef<HTMLHeadingElement[]>([])
    const slidesRef = useRef<HTMLImageElement[]>([])

    const [activeIndex, setActiveIndex] = useState()

    const { setActive } = useSetActiveLink()

    gsap.registerPlugin(ScrollTrigger)

    function Active(act: any) {
      setActiveIndex(act)
    }

    const AddNavTitleRefs = (el: HTMLHeadingElement) => {
      if (el && !navTitleRefs.current.includes(el))
        navTitleRefs.current.push(el)
    }
    const addToNavItemRefs = (el: HTMLLIElement) => {
      if (el && !navItemRefs.current.includes(el)) navItemRefs.current.push(el)
    }
    const addNavSubtitleRefs = (el: HTMLHeadingElement) => {
      if (el && !navSubtitleRefs.current.includes(el))
        navSubtitleRefs.current.push(el)
    }
    const addToDescriptRefs = (el: HTMLDivElement) => {
      if (el && !descriptRefs.current.includes(el))
        descriptRefs.current.push(el)
    }
    const addToTitleRefs = (el: HTMLHeadingElement) => {
      if (el && !titleRefs.current.includes(el)) titleRefs.current.push(el)
    }
    const addToSubtitleRefs = (el: HTMLHeadingElement) => {
      if (el && !subtitleRefs.current.includes(el))
        subtitleRefs.current.push(el)
    }

    descriptRefs.current = []
    titleRefs.current = []
    subtitleRefs.current = []

    useGSAP(
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: savingsRef.current,
            start: 'top top',
            end: `+=${(savingsData.length - 1) * window.innerHeight}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onEnter: () => setActive('features'),
            onEnterBack: () => setActive('features'),
          },
        })

        const slides = slidesRef.current
        const titles = titleRefs.current
        const subtitles = subtitleRefs.current
        const descriptions = descriptRefs.current
        const navTitles = navTitleRefs.current
        const navSubtitles = navSubtitleRefs.current
        const navItems = navItemRefs.current

        gsap.set(navItems[0], { borderColor: '#4257D0' })
        gsap.set([navTitles[0], navSubtitles[0]], { opacity: 1, color: '#fff' })

        savingsData.forEach((_, i) => {
          const next = slides[i + 1]
          const nextTitle = titles[i + 1]
          const nextSubtitle = subtitles[i + 1]
          const nextDesc = descriptions[i + 1]

          if (!next) return

          const label = `slide${i}`
          tl.addLabel(`slide${i}`, '+=1')
            .fromTo(
              slides[i],
              { yPercent: 100 },
              { yPercent: 0, opacity: 1, duration: 1 },
              label
            )
            .fromTo(titles[i], { opacity: 1 }, { opacity: 0, x: -200 }, label)
            .fromTo(
              nextTitle,
              { opacity: 0, x: 200 },
              { opacity: 1, x: 0 },
              label
            )
            .fromTo(subtitles[i], { opacity: 1 }, { opacity: 0, x: 200 }, label)
            .fromTo(
              nextSubtitle,
              { opacity: 0, x: -200 },
              { opacity: 1, x: 0 },
              label
            )
            .fromTo(descriptions[i], { opacity: 1 }, { opacity: 0 }, label)
            .fromTo(nextDesc, { opacity: 0 }, { opacity: 1 }, label)
            // nav highlight transitions
            .to(navItems[i], { borderColor: '#fff' }, label)
            .to(navItems[i + 1], { borderColor: '#4257D0' }, label)
            .to(
              [navTitles[i], navSubtitles[i]],
              { opacity: 0.5, color: '#9ca3af' },
              label
            )
            .to(
              [navTitles[i + 1], navSubtitles[i + 1]],
              { opacity: 1, color: '#fff' },
              label
            )
        })

        // tl.to(savingsRef.current, { height: 0, duration: 1 }, '+=1')
      },
      { scope: savingsRef }
    )

    return (
      <div ref={savingsRef} className={`${bgColor} relative  w-full`}>
        <section
          className="container relative min-h-screen text-white pt-20 pb-12 px-4 lg:px-8 lg:py-24 hero"
          id="features"
        >
          <div className="flex lg:px-[1.5rem] px-[0.2rem] h-screen w-full pt-[1.7rem] lg:pt-[0rem]">
            {/* Left Navigation */}
            <div className="flex gap-4 w-full lg:gap-[40px] lg:items-start ">
              <nav>
                <ul className="space-y-4 lg:w-[150px]">
                  {savingsData.map((data, index) => (
                    <li
                      key={data.id}
                      className="nav-item w-full border-s-4 ps-3"
                      ref={addToNavItemRefs}
                    >
                      <button className="text-[#ffffff] flex flex-col py-2 w-full text-left">
                        <h2 ref={AddNavTitleRefs} className="">
                          {data.title}
                        </h2>
                        <p ref={addNavSubtitleRefs} className="">
                          {data.subTitle}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Main Content */}
              <div className="relative basis-[62%] h-full flex flex-col items-center justify-center">
                {savingsData.map((data, index) => (
                  <div
                    key={data.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-start"
                  >
                    <div
                      key={index}
                      className="gap-[0.5rem] lg:gap-[1.5rem] left-0 w-full h-[100px] lg:h-[180px] flex flex-col max-w-[650px] overflow-hidden"
                    >
                      <h4
                        className=" text-white text-[20px] lg:text-[40px] font-normal opacity-0"
                        ref={addToTitleRefs}
                      >
                        {data.title}
                      </h4>
                      <h4
                        className="text-white text-[20px] lg:text-[40px] relative opacity-0 lg:pl-[15%] font-normal"
                        ref={addToSubtitleRefs}
                      >
                        {data.subTitle}
                      </h4>
                    </div>

                    <div
                      ref={addToDescriptRefs}
                      className="gap-[0.5rem] opacity-0 w-full h-full lg:pr-0 pr-[0.3rem] flex flex-col lg:gap-1.5"
                    >
                      <p className="text-[14px] lg:text-[18px] font-[400]">
                        {' '}
                        {data.description}
                      </p>

                      <div className="flex flex-col lg:gap-3">
                        <div className="grid lg:flex  lg:flex-row lg:gap-[0.5rem]  pr-[0.3rem] items-baseline">
                          <h4 className="w-28 font-bold text-[14px] lg:text-lg">
                            {data.howItWorks.title}
                          </h4>
                          <p>{data.howItWorks.text}</p>
                        </div>
                        <ul className="list-disc lg:not-visited:pl-5">
                          {data.howItWorks.items.map((item, idx) => (
                            <li
                              className="text-[14px] lg:text-[16px]"
                              key={idx}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col lg:gap-[0.3rem]">
                          <h4 className="text-[14px] lg:text-[18px] font-[600]">
                            Why it bangs:
                          </h4>
                          <ul className="list-disc lg:pl-5">
                            {data.whyItBangs.map((item, idx) => (
                              <li
                                className="text-[14px] lg:text-[16px]"
                                key={idx}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smartphone Mockup */}
            <section className="hidden w-[344px] lg:flex justify-center">
              <div className="relative lg:flex items-center justify-center w-[200px] h-[350px] lg:w-[250px] lg:h-[550px]  bg-[url('/images/phonecover.svg')] bg-no-repeat bg-cover bg-ri overflow-hidden">
                {phoneScreens.map((data, i) => (
                  <Image
                    key={`phone_screen_${i}`}
                    ref={(el) => {
                      if (el) slidesRef.current[i] = el
                    }}
                    src={data}
                    width={100}
                    height={100}
                    alt=""
                    className="absolute top-0 left-2 opacity-0 lg:h-[96%] h-[100%] lg:w-[98%] z-10"
                  />
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    )
  }
)

export default SavingsSection
