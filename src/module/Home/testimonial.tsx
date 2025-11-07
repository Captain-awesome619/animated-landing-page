'use client'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useSetActiveLink } from '@/hooks/useSetActiveLink'
import { useSmallDevice } from '@/hooks/useSmallDevice'

interface Testimonial {
  id: number
  quote: string
  name: string
  title: string
  imageSrc: string
  imageAlt: string
  heading: string
}

interface TestimonialSectionProps {
  bgColor?: string
  testimonials?: Testimonial[]
}

const TestimonialSection = ({
  bgColor = 'bg-gray-100',
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) => {
  const tesimonialref = useRef<HTMLDivElement>(null)
  const cardsgroupRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const { setActive } = useSetActiveLink()

  const data = []

  const isSmallDevice = useSmallDevice()

  gsap.registerPlugin(ScrollTrigger)

  const isSmallRef = useRef(isSmallDevice)

  useEffect(() => {
    isSmallRef.current = isSmallDevice

    ScrollTrigger.update()
  }, [isSmallDevice])

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card')

    const testiTl = gsap.timeline({
      scrollTrigger: {
        trigger: tesimonialref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        markers: true,
        onEnter: () => setActive('reviews'),
        onEnterBack: () => setActive('reviews'),
      },
    })

    testiTl
      .to(cards, {
        autoAlpha: 1,
        y: 0,
        ease: 'power3.in',
      })
      .to(cards, { rotation: 0, duration: 1, ease: 'power3.inOut' })
      .fromTo(
        textRef.current,
        { xPercent: -150, opacity: 0 },
        { xPercent: 0, opacity: 1 },
        '<'
      )
      .fromTo(
        ctaRef.current,
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1 },
        '+=0.5'
      )
      .to(
        cards,
        {
          y: () => (isSmallRef.current ? '0' : '750%'),
          rotate: (i) => (isSmallRef.current ? 0 : (i + 1) * 75),
          duration: () => (isSmallRef.current ? 0 : 2),
          ease: 'power3.in',
        },
        '+=1'
      )
  }, [])

  const afterCenter = Math.floor(defaultTestimonials.length / 2)

  return (
    <div ref={tesimonialref}>
      <section
        className={`${bgColor} py-20 hero min-h-screen flex flex-col justify-around`}
        id="reviews"
      >
        {/* Container */}
        <div className="container relative grid gap-10">
          {/* Heading */}
          <div ref={textRef} className="py-2 ">
            <h1 className="text-3xl md:text-5xl font-bold  text-gray-900 text-start ">
              What they say about us
            </h1>
          </div>
          <div ref={cardsgroupRef} className="-mt-4">
            <div className="flex justify-center">
              <div className="flex flex-wrap overflow-hidden md:px-0 gap-4 justify-center">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`card bg-white p-4 rounded-lg shadow-md cursor-pointer opacity-0 translate-y-[300%] md:basis-[48.5%] lg:basis-[32.05%] hover:shadow-xl  hover:-translate-y-2 hover:scale-105`}
                    style={{
                      zIndex: testimonials.length - index,
                      rotate: `${(index + 1) * 75}deg`,
                    }}
                  >
                    <b>{testimonial.heading}</b>
                    <p className="text-gray-600 mb-2">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.imageAlt}
                        width={50}
                        height={50}
                        priority
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="  relative top-[22%] " ref={ctaRef}>
            <div className="cta-banner bg-[#4257D0] text-white p-4 rounded-lg text-center flex flex-col md:flex-row items-center justify-between">
              <p className="text-base md:text-lg mb-4 md:mb-0">
                Join the X-Force winning big and paying smarter every day.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Image
                    src="/images/store-app.png"
                    alt="App Store"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </Link>
                <Link
                  href="#"
                  className="flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Image
                    src="/images/playstore.svg"
                    alt="Google Play"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Default Testimonial Data
export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    heading: 'Saving with Xtrempay is fun and addictive!',
    quote:
      'I used to struggle with saving money. But now I look forward to it every week because I get to spin, play trivia, and win cash. Saving has never felt this rewarding.',
    name: 'Olife A.',
    title: 'Student | Ibadan',
    imageSrc: '/images/avatar-2.png',
    imageAlt: 'Olife A.',
  },
  {
    id: 2,
    heading: 'I won 50,000 just for saving 1000!',
    quote:
      "At first, I didn't believe it. But when I won a raffle draw after saving just 1000, I screamed. Xtrempay is the real deal. I'm hooked now!",
    name: 'Sammy B.',
    title: 'Content Creator | Ibadan',
    imageSrc: '/images/avatar-1.png',
    imageAlt: 'Sammy B.',
  },
  {
    id: 3,
    heading: 'I save and earn while testing my brain!',
    quote:
      " The trivia savings is genius. I save 3000 weekly and get to answer fun questions. Got lucky a few times and won some cash. It's like learning and earning!",
    name: 'Ahmed S.',
    title: 'Corp Member | Kano',
    imageSrc: '/images/avatar-2.png',
    imageAlt: 'Ahmed S.',
  },
  {
    id: 4,
    heading: 'Xtrempay fits my hustle. ',
    quote:
      "Between saving for rent and helping my mum's shop with a POS, Xtrempay has become my go-to app. It's not just a savings app, it's a financial hack.",
    name: 'Kemi O.',
    title: 'Side Hustler | Abeokuta',
    imageSrc: '/images/avatar-2.png',
    imageAlt: 'Kemi O.',
  },
  {
    id: 5,
    heading: 'Free POS helped me grow my shop.',
    quote:
      " I got a free POS from Xtrempay. No rent, no stress. Now customers pay easily, and I earn commissions daily. It's the best decision I made for my business.",
    name: 'Blessing E.',
    title: 'Seller | Benin City',
    imageSrc: '/images/avatar-1.png',
    imageAlt: 'Blessing E.',
  },
]

export default TestimonialSection
