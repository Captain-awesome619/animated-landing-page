"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface BackgroundHeroProps {
  title: string;
  description: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  imageClassName?: string;
  bgColor?: string;
}

const BackgroundHero = ({
  title,
  description,
  backgroundImageSrc = "/images/african-man.png",
  backgroundImageAlt = "Xtrempay Background",
  imageClassName,
  bgColor = "bg-[#e6a69b]",
}: BackgroundHeroProps) => {
  
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numbersContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bulletItemsRef = useRef<HTMLDivElement[]>([]);

  // GSAP Animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Set initial states
    // Background image starts scaled up
    gsap.set(backgroundImageRef.current, {
      scale: 1.3,
      opacity: 0.7,
    });

    // Card starts off-screen to the left
    gsap.set(cardRef.current, {
      x: -400,
      opacity: 0,
      rotationY: -45,
    });

    // Numbers container starts invisible
    gsap.set(numbersContainerRef.current, {
      opacity: 0,
      y: 100,
    });

    // Title starts with clip-path for rolling effect
    gsap.set(titleRef.current, {
      y: 100,
      opacity: 0,
    });

    // Bullet items start staggered
    const bulletItems = bulletItemsRef.current.filter(Boolean);
    gsap.set(bulletItems, {
      x: -50,
      opacity: 0,
      rotationX: -90,
    });

    // Individual number items
    const numberItems = numbersContainerRef.current?.children;
    if (numberItems) {
      gsap.set(numberItems, {
        y: (index) => index % 2 === 0 ? -200 : 200,
        opacity: 0,
        scale: 0.5,
        rotation: (index) => index % 2 === 0 ? -45 : 45,
      });
    }

    // Create master timeline triggered by scroll
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Phase 1: Background image animation (scales down to normal size)
    masterTl.to(backgroundImageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    })

    // Phase 2: Card slides in with 3D effect
    .to(cardRef.current, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
    }, '-=0.8')

    // Phase 3: Title rolls in
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6')

    // Phase 4: Bullet items animate in with stagger
    .to(bulletItems, {
      x: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.15,
    }, '-=0.4')

    // Phase 5: Numbers container fades in
    .to(numbersContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3')

    // Phase 6: Individual numbers animate to their positions
    .to(numberItems ? Array.from(numberItems) : [], {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      stagger: 0.2,
    }, '-=0.4');

    // Parallax effect for background image
    gsap.to(backgroundImageRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Continuous floating animation for the card
    gsap.to(cardRef.current, {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    });

    // Numbers bobbing animation
    if (numberItems) {
      Array.from(numberItems).forEach((item, index) => {
        gsap.to(item as Element, {
          y: index % 2 === 0 ? -15 : 15,
          duration: 2 + (index * 0.3),
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }

    // Card scale effect on scroll progress
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = 1 + (progress * 0.05);
        gsap.set(cardRef.current, { scale });
      }
    });

    // Background blur effect on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const blur = progress * 2;
        gsap.set(backgroundImageRef.current, { 
          filter: `blur(${blur}px)` 
        });
      }
    });

  }, []);

  // Helper function to add refs to bullet items
  const addToBulletRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      bulletItemsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${bgColor} min-h-screen relative overflow-hidden hero z-0`}
    >
      {/* Background Image with enhanced effects */}
      <div ref={backgroundImageRef} className="absolute inset-0 z-0 transform-gpu">
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          priority
          className={`object-cover transition-all duration-1000 ${imageClassName}`}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10 lg:h-[125vh] flex items-center justify-between py-12 lg:py-10 px-4 lg:px-8">
        
        {/* Enhanced Card with Glassmorphism and 3D effects */}
        <div 
          ref={cardRef}
          className="bg-black/40 backdrop-blur-lg mb-28 text-white p-4 rounded-2xl w-3/3 lg:w-[33%] shadow-2xl border border-white/20 transform-gpu hover:bg-black/50 transition-all duration-500"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <h2 
            ref={titleRef}
            className="text-3xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transform"
          >
            Why Xtrempay?
          </h2>
          
          <div className="text-sm md:text-base space-y-2">
            <div 
              ref={(el) => addToBulletRefs(el, 0)}
              className="flex justify-between items-start transform hover:translate-x-2 transition-transform duration-300 p-2 rounded hover:bg-white/10"
            >
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
              />
              <span className="leading-relaxed">
                All-in-One Wallet <br /> 
                <span className="text-blue-200">Send money, buy airtime, pay bills, and save—all in one app.</span>
              </span>
            </div>
            
            <div 
              ref={(el) => addToBulletRefs(el, 1)}
              className="flex justify-between items-start transform hover:translate-x-2 transition-transform duration-300 p-2 rounded hover:bg-white/10"
            >
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
              />
              <span className="leading-relaxed">
                Incentive-Based Savings <br />
                <span className="text-blue-200">Save money and unlock raffle draws, trivia contests & entertainment perks.</span>
              </span>
            </div>
            
            <div 
              ref={(el) => addToBulletRefs(el, 2)}
              className="flex justify-between items-start transform hover:translate-x-2 transition-transform duration-300 p-2 rounded hover:bg-white/10"
            >
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
              />
              <span className="leading-relaxed">
                Made for Nigerians <br />
                <span className="text-blue-200">Localized features, naira-first UX, and real-time support</span>
              </span>
            </div>
            
            <div 
              ref={(el) => addToBulletRefs(el, 3)}
              className="flex justify-between items-start transform hover:translate-x-2 transition-transform duration-300 p-2 rounded hover:bg-white/10"
            >
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125"
              />
              <span className="leading-relaxed">
                Bank-Level Security <br />
                <span className="text-blue-200">End-to-end encryption, secure login, and fraud alerts.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Numbers Overlay with 3D effects */}
        <div 
          ref={numbersContainerRef}
          className="absolute inset-0 flex items-center justify-around text-white text-center z-10 w-full top-8/12 mt-15 transform"
        >
          {/* 10M (Odd, up) */}
          <div className="transform -translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
            <div className="bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-400 transition-all duration-500">
              10M
            </div>
            <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
              To be won every week
            </p>
          </div>
          
          {/* 100K (Even, down) */}
          <div className="transform translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
            <div className="bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-400 transition-all duration-500">
              100K
            </div>
            <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
              Active users
            </p>
          </div>
          
          {/* 24/7 (Odd, up) */}
          <div className="transform -translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
            <div className="bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-500">
              24/7
            </div>
            <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
              Customer Support
            </p>
          </div>
          
          {/* 100M (Even, down) */}
          <div className="transform translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50 hover:scale-110 transition-all duration-500 cursor-pointer group">
            <div className="bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500">
              100M
            </div>
            <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
              Weekly savings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundHero;