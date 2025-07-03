"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
}

interface TestimonialSectionProps {
  bgColor?: string;
  testimonials?: Testimonial[];
}

const TestimonialSection = ({
  bgColor = "bg-gray-100",
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) => {

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaBannerRef = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);
  
  // Store animation references for cleanup
  const animationsRef = useRef<{
    scrollTriggers: ScrollTrigger[];
    timelines: gsap.core.Timeline[];
    timeouts: NodeJS.Timeout[];
  }>({
    scrollTriggers: [],
    timelines: [],
    timeouts: []
  });

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Clear previous animations
    animationsRef.current.scrollTriggers.forEach(trigger => trigger.kill());
    animationsRef.current.timelines.forEach(tl => tl.kill());
    animationsRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    
    // Reset arrays
    animationsRef.current = {
      scrollTriggers: [],
      timelines: [],
      timeouts: []
    };

    // Set initial states for all elements
    gsap.set([headingRef.current], {
      y: -50,
      opacity: 0,
    });

    gsap.set('.testimonial-card', {
      scale: 0.7,
      opacity: 0,
      filter: 'blur(3px)',
      rotationZ: (index) => (index - 1) * 8,
      x: (index) => -200 + (index * 15),
      y: (index) => -100 + (index * 8),
    });

    gsap.set('.testimonial-card-secondary', {
      scale: 0.7,
      opacity: 0,
      filter: 'blur(3px)',
      rotationZ: (index) => (index - 0.5) * 10,
      x: (index) => -150 + (index * 25),
      y: (index) => -80 + (index * 12),
    });

    gsap.set(ctaBannerRef.current, {
      y: 60,
      opacity: 0,
    });

    // Create main timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Store references
    animationsRef.current.timelines.push(mainTl);
    if (mainTl.scrollTrigger) {
      animationsRef.current.scrollTriggers.push(mainTl.scrollTrigger);
    }

    // Animate heading first
    mainTl.to([headingRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    // Animate first set of testimonial cards
    .to('.testimonial-card', {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      rotationZ: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.2,
    }, '-=0.2')
    // Animate second set of testimonial cards
    .to('.testimonial-card-secondary', {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      rotationZ: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.2,
    }, '-=0.4')
    // Animate CTA banner
    .to(ctaBannerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    // Cleanup function
    return () => {
      animationsRef.current.scrollTriggers.forEach(trigger => trigger.kill());
      animationsRef.current.timelines.forEach(tl => tl.kill());
      animationsRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.scrollTriggers.forEach(trigger => trigger.kill());
      animationsRef.current.timelines.forEach(tl => tl.kill());
      animationsRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const data = [
    {
      id: 4,
      heading: "Xtrempay fits my hustle. ",
      quote:
        "Between saving for rent and helping my mum's shop with a POS, Xtrempay has become my go-to app. It's not just a savings app, it's a financial hack.",
      name: "Kemi O.",
      title: "Side Hustler | Abeokuta",
      imageSrc: "/images/avatar-2.png",
      imageAlt: "Kemi O.",
    },
    {
      id: 5,
      heading: "Free POS helped me grow my shop.",
      quote:
        " I got a free POS from Xtrempay. No rent, no stress. Now customers pay easily, and I earn commissions daily. It's the best decision I made for my business.",
      name: "Blessing E.",
      title: "Seller | Benin City",
      imageSrc: "/images/avatar-1.png",
      imageAlt: "Blessing E.",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`${bgColor} py-12 lg:py-20 px-4 lg:px-8 hero`} 
      id="reviews"
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-start mb-12" ref={headingRef}>
          What they say about us
        </h1>

        {/* Testimonial Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:px-0 lg:grid-cols-3 gap-6 mb-6 place-items-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white p-8 rounded-lg shadow-md h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                style={{
                  zIndex: testimonials.length - index,
                }}
              >
                <b>{testimonial.heading}</b>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
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
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl w-full place-items-center">
            {data.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card-secondary bg-white p-8 rounded-lg shadow-md w-full max-w-md h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                style={{
                  zIndex: data.length - index + 10,
                }}
              >
                <b>{testimonial.heading}</b>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.imageAlt}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div 
          className="cta-banner bg-[#4257D0] text-white mt-15 p-6 rounded-lg text-center flex flex-col md:flex-row items-center justify-between"
          ref={ctaBannerRef}
        >
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
    </section>
  );
};

// Default Testimonial Data
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    heading: "Saving with Xtrempay is fun and addictive!",
    quote:
      "I used to struggle with saving money. But now I look forward to it every week because I get to spin, play trivia, and win cash. Saving has never felt this rewarding.",
    name: "Olife A.",
    title: "Student | Ibadan",
    imageSrc: "/images/avatar-2.png",
    imageAlt: "Olife A.",
  },
  {
    id: 2,
    heading: "I won 50,000 just for saving 1000!",
    quote:
      "At first, I didn't believe it. But when I won a raffle draw after saving just 1000, I screamed. Xtrempay is the real deal. I'm hooked now!",
    name: "Sammy B.",
    title: "Content Creator | Ibadan",
    imageSrc: "/images/avatar-1.png",
    imageAlt: "Sammy B.",
  },
  {
    id: 3,
    heading: "I save and earn while testing my brain!",
    quote:
      " The trivia savings is genius. I save 3000 weekly and get to answer fun questions. Got lucky a few times and won some cash. It's like learning and earning!",
    name: "Ahmed S.",
    title: "Corp Member | Kano",
    imageSrc: "/images/avatar-2.png",
    imageAlt: "Ahmed S.",
  },
];

export default TestimonialSection;