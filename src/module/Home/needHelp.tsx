'use client'
import Hero from './hero'
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import tiktok from '../../../public/images/tiktok.svg'
import x from '../../../public/images/x.svg'
import ig from '../../../public/images/ig.svg'
import facebook from '../../../public/images/facebook.svg'
import Link from 'next/link'

const Needhelp = () => {
  const helpref = useRef<HTMLDivElement>(null)
  const formpref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const helpTl = gsap.timeline({
        scrollTrigger: {
          trigger: helpref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      helpTl
        .to(helpref.current, { autoAlpha: 1, duration: 0 })
        .to(formpref.current, {
          x: 0,
          autoAlpha: 1,
          ease: 'power2.inOut',
        })
    },
    { scope: helpref }
  )

  // Refs for animation ta
  return (
    <div ref={helpref} className="z-60 opacity-0">
      <div className="min-h-screen flex gap-8 overflow-hidden justify-center pt-20 md:py-16">
        {/* Responsive wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 container items-center">
          {/* LEFT SECTION */}
          <div className="order-2 md:order-1 grid lg:gap-8 items-center justify-center">
            <div className="grid gap-2 justify-center items-center text-center md:text-left">
              <h2 className="hidden md:block font-semibold lg:text-4xl text-black ">
                Need Help? Xtrempay's Got You.
              </h2>
              <p className="font-medium text-base text-black/70">
                Whether you're saving, spinning, or making payments — we're
                always here for you.
              </p>

              {/* Talk to Us */}
              <div className="flex flex-col gap-[0.5rem]">
                <h4 className="font-[600] text-base text-black">Talk to Us</h4>
                <p className="font-[400] text-base text-black/70">
                  Call/WhatsApp:{' '}
                  <Link
                    href="tel:+2347032932410"
                    className="text-[#4257D0] hover:text-[#6d80ec] transition-colors duration-300 "
                  >
                    +234 703 293 2410
                  </Link>
                </p>
                <p className="font-[400] text-base text-black/70 pt-1">
                  Mon-Sat | 9AM-5PM
                </p>
              </div>

              {/* In-App Chat */}
              <div className="flex flex-col gap-[0.5rem]">
                <h4 className="font-[600] text-base text-black">In-App Chat</h4>
                <h4 className="font-[400] text-base text-black/70 pt-2">
                  Open Xtrempay → Tap Help → Start a Live
                </h4>
              </div>

              {/* Email Us */}
              <div className="flex flex-col gap-[0.5rem]">
                <h4 className="font-[600] text-base text-black">Email Us</h4>
                <h4 className="font-[400] text-base text-black/70">
                  General Support:{' '}
                  <Link
                    href="mailto:support@xtrempay.com"
                    className="text-[#4257D0] hover:text-[#6d80ec] transition-colors duration-300 "
                  >
                    support@xtrempay.com
                  </Link>
                </h4>
                <h4 className="font-[400] text-base text-black/70">
                  Partnerships:{' '}
                  <Link
                    href="mailto:business@xtrempay.com"
                    className="text-[#4257D0] hover:text-[#6d80ec] transition-colors duration-300 "
                  >
                    business@xtrempay.com
                  </Link>
                </h4>
              </div>
            </div>

            {/* Socials + Help Now */}
            {/* Socials + Help Now */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Socials */}
              <div className="grid gap-2">
                <h2 className="font-[400] lg:text-lg text-black">
                  Need Help? Xtrempay's Got You.
                </h2>
                <h2 className="font-[400] text-base text-black/70">
                  Follow us for tips, updates, and giveaways:
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Image src={ig} alt="ig" height={20} width={20} />
                    <h4 className="font-[400] text-base text-black/70">
                      @Xtrempayng
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={tiktok} alt="tiktok" height={20} width={20} />
                    <h4 className="font-[400] text-base text-black/70">
                      @Xtrempay
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={facebook}
                      alt="facebook"
                      height={20}
                      width={20}
                    />
                    <h4 className="font-[400] text-base text-black/70">
                      XtrempayAfrica
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={x} alt="x" height={20} width={20} />
                    <h4 className="font-[400] text-base text-black/70">
                      @Xtrempay
                    </h4>
                  </div>
                </div>
              </div>

              {/* Help Now */}
              <div className="grid gap-4">
                <h2 className="font-[400] lg:text-lg text-black">
                  Need Help Now
                </h2>
                <div className="font-[400] text-base text-black/70">
                  [ Start Chatting In-App ] <br />
                  [ FAQs - Find Instant Answers ] <br />[ Become a Merchant ]
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <section className="order-1 md:order-2">
            <div className="block md:hidden">
              <h2 className="font-semibold lg:text-4xl text-black ">
                Need Help? Xtrempay's Got You.
              </h2>
              <p className="font-medium text-base text-black/70">
                Whether you're saving, spinning, or making payments — we're
                always here for you.
              </p>
            </div>
            <div
              ref={formpref}
              className="flex flex-col gap-8 contact-form px-6 py-8 translate-x-[200%] opacity-0 lg:px-10 text-center rounded-[20px] md:text-left"
            >
              <div className="flex flex-col">
                <h2 className="font-semibold lg:text-4xl text-black">
                  Get in Touch{' '}
                </h2>
                <h2 className="font-normal lg:text-lg text-black/65">
                  You can reach us anytime
                </h2>
              </div>
              <div className="grid gap-3">
                <div className="flex justify-between gap-x-[26px]">
                  <input
                    type="text"
                    placeholder="First name"
                    className="font-normal text-sm w-full appearance-none  outline-none   focus:outline-none h-12 rounded-xl bg-[#F6F7FB] p-3 text-shadow-black placeholder:text-[#ABAFB1]  border-[#000000]/10 border-[1px]"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="font-normal text-sm w-full appearance-none  outline-none  m-0 focus:outline-none h-12 rounded-xl text-shadow-black placeholder:text-[#ABAFB1] bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Your email"
                  className="font-normal text-sm w-full appearance-none  outline-none  m-0 focus:outline-none h-12 rounded-xl text-shadow-black placeholder:text-[#ABAFB1] bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="font-normal text-sm w-full appearance-none  outline-none  m-0 focus:outline-none h-12 rounded-xl text-shadow-black placeholder:text-[#ABAFB1] bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"
                />
                <textarea
                  placeholder="How can we help?"
                  className="font-normal text-sm w-full appearance-none resize-none h-44  outline-none  m-0 focus:outline-none text-shadow-black placeholder:text-[#ABAFB1] rounded-xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"
                />
                <button className="w-full h-12 bg-[#4257D0] cursor-pointer rounded-xl text-[16px] text-white font-normal">
                  Submit
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Needhelp
