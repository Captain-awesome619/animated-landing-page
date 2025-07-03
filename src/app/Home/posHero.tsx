'use client';
import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PosSectionProps {
  bgColor?: string;
  posImageSrc?: string;
  posImageAlt?: string;
}

const PosSection = ({
  bgColor = 'bg-white',
  posImageSrc = '/images/pos-lady.png',
  posImageAlt = 'Xtrempay POS Agent',
}: PosSectionProps) => {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);
  const whoCanApplyRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Store GSAP context and timeline refs for cleanup
  const contextRef = useRef<gsap.Context | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Kill all stored ScrollTriggers
    scrollTriggerRefs.current.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    scrollTriggerRefs.current = [];

    // Kill master timeline
    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
      masterTimelineRef.current = null;
    }

    // Revert GSAP context
    if (contextRef.current) {
      contextRef.current.revert();
      contextRef.current = null;
    }

    // Kill all ScrollTriggers with specific IDs
    ['pos-section-main', 'pos-section-parallax', 'pos-section-float', 'pos-section-bg'].forEach(id => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === id) {
          trigger.kill();
        }
      });
    });
  }, []);

  // GSAP Animations with proper cleanup
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create GSAP context for better cleanup
    contextRef.current = gsap.context(() => {
      // Set initial states
      gsap.set([h3Ref.current, h1Ref.current, pRef.current], {
        y: -60,
        opacity: 0,
      });

      gsap.set(imageRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(contentRef.current, {
        x: 100,
        opacity: 0,
      });

      // Set initial states for individual benefit items
      const benefitItems = benefitsRef.current?.querySelectorAll('li');
      if (benefitItems) {
        gsap.set(benefitItems, {
          x: 50,
          opacity: 0,
        });
      }

      // Set initial states for "Who Can Apply" items
      const whoCanApplyItems = whoCanApplyRef.current?.querySelectorAll('div > div');
      if (whoCanApplyItems) {
        gsap.set(whoCanApplyItems, {
          y: 30,
          opacity: 0,
        });
      }

      gsap.set(ctaButtonRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
      });

      // Create master timeline
      masterTimelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          id: 'pos-section-main',
        }
      });

      // Store the main ScrollTrigger
      const mainTrigger = ScrollTrigger.getAll().find(t => t.vars.id === 'pos-section-main');
      if (mainTrigger) {
        scrollTriggerRefs.current.push(mainTrigger);
      }

      // Title animation with enhanced position switching
      const titleTl = gsap.timeline();
      
      titleTl.to([h3Ref.current, h1Ref.current], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15,
      })
      .to({}, { duration: 0.2 })
      // Enhanced position switching with rotation
      .to(h3Ref.current, {
        y: 60,
        rotation: 5,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 'switch')
      .to(h1Ref.current, {
        y: -30,
        rotation: -5,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 'switch')
      // Return to correct positions with bounce
      .to([h3Ref.current, h1Ref.current], {
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.1,
      })
      // Animate paragraph with typewriter effect
      .to(pRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3');

      masterTimelineRef.current.add(titleTl);

      // Enhanced image animation with floating effect
      masterTimelineRef.current.to(imageRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
      }, '-=0.5')
      
      // Content container slides in
      .to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      
      // Staggered benefit items animation
      .add(() => {
        if (benefitItems) {
          gsap.to(benefitItems, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1,
          });
        }
      }, '-=0.4')
      
      // "Who Can Apply" items with bounce
      .add(() => {
        if (whoCanApplyItems) {
          gsap.to(whoCanApplyItems, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'bounce.out',
            stagger: 0.15,
          });
        }
      }, '-=0.3')
      
      // CTA button with dramatic entrance
      .to(ctaButtonRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(2)',
      }, '-=0.2');

      // Parallax effect for the entire section
      const parallaxTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        id: 'pos-section-parallax',
        animation: gsap.to(containerRef.current, {
          yPercent: -10,
          ease: 'none',
        })
      });
      scrollTriggerRefs.current.push(parallaxTrigger);

      // Floating animation for the image
      const floatTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
        id: 'pos-section-float',
        animation: gsap.to(imageRef.current, {
          y: -15,
          duration: 2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        })
      });
      scrollTriggerRefs.current.push(floatTrigger);

      // Individual benefit items hover-like animation on scroll
      if (benefitItems) {
        benefitItems.forEach((item, index) => {
          const benefitTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
            id: `pos-section-benefit-${index}`,
            animation: gsap.to(item, {
              x: 10,
              duration: 0.3,
              ease: 'power2.out',
              delay: index * 0.1,
            })
          });
          scrollTriggerRefs.current.push(benefitTrigger);
        });
      }

      // Progressive reveal effect for content sections
      const contentSections = contentRef.current?.children;
      if (contentSections) {
        Array.from(contentSections).forEach((section, index) => {
          const contentTrigger = ScrollTrigger.create({
            trigger: section as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            id: `pos-section-content-${index}`,
            animation: gsap.fromTo(section as Element, 
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: index * 0.2,
              }
            )
          });
          scrollTriggerRefs.current.push(contentTrigger);
        });
      }

      // Background color transition effect
      const bgTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        id: 'pos-section-bg',
        onEnter: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#f8fafc',
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onLeave: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#ffffff',
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onEnterBack: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#f8fafc',
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: () => {
          gsap.to(sectionRef.current, {
            backgroundColor: '#ffffff',
            duration: 1,
            ease: 'power2.inOut',
          });
        },
      });
      scrollTriggerRefs.current.push(bgTrigger);

    }, sectionRef.current);

    // Cleanup function
    return cleanup;
  }, [cleanup]);

  // Additional cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <section 
      ref={sectionRef}
      className={`${bgColor} min-h-screen relative overflow-hidden py-12 lg:py-20 px-4 lg:px-8 hero transition-colors duration-1000`} 
      id='features'
    >
      {/* Container with parallax effect */}
      <div ref={containerRef} className="text-center mx-auto">
        <h3 
          ref={h3Ref}
          className="text-blue-600 text-xl md:text-2xl mb-2 transform"
        >
          Xtrempay POS?
        </h3>
        <h1 
          ref={h1Ref}
          className="text-3xl md:text-5xl font-bold mb-4 transform"
        >
          Free POS for Agents & Merchants
        </h1>
        <p 
          ref={pRef}
          className="text-gray-600 text-base md:text-lg mb-10 transform"
        >
          Xtrempay gives you a POS machine at no cost, so you can grow your hustle and serve your community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
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
            className="object-contain mx-auto transition-all duration-500 hover:scale-110 hover:rotate-2"
          />
        </div>

        {/* Text Content with enhanced structure */}
        <div 
          ref={contentRef}
          className="w-full lg:w-1/2 lg:pl-6 text-center lg:text-left transform"
        >
          <div className="space-y-8">
            <div>
              <h4 className="text-xl md:text-xl font-bold mb-4 text-gray-800">What You Get</h4>
              <ul ref={benefitsRef} className="space-y-2 text-base md:text-lg">
                <li className='flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform'>
                  <Image 
                    src="/images/bullet.svg" 
                    height={20} 
                    width={20} 
                    alt='icon' 
                    className='me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125'
                  />
                  <span>Free POS device</span>
                </li>
                <li className='flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform'>
                  <Image 
                    src="/images/bullet.svg" 
                    height={20} 
                    width={20} 
                    alt='icon' 
                    className='me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125'
                  />
                  <span>Fast & secure</span>
                </li>
                <li className='flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform'>
                  <Image 
                    src="/images/bullet.svg" 
                    height={20} 
                    width={20} 
                    alt='icon' 
                    className='me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125'
                  />
                  <span>Instant settlement</span>
                </li>
                <li className='flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform'>
                  <Image 
                    src="/images/bullet.svg" 
                    height={20} 
                    width={20} 
                    alt='icon' 
                    className='me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125'
                  />
                  <span>Earn commissions on every transaction</span>
                </li>
                <li className='flex items-center transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform'>
                  <Image 
                    src="/images/bullet.svg" 
                    height={20} 
                    width={20} 
                    alt='icon' 
                    className='me-3 flex-shrink-0 transition-transform duration-300 hover:scale-125'
                  />
                  <span>24/7 support & quick settlements</span>
                </li>
              </ul>
            </div>
            
            <div ref={whoCanApplyRef}>
              <h4 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Who Can Apply</h4>
              <div className="space-y-1 text-base md:text-lg">
                <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">Small business owners</div>
                <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">Mobile money agents</div>
                <div className="transition-all duration-300 hover:translate-x-4 hover:text-blue-600 cursor-pointer transform p-1 rounded hover:bg-blue-50">Anyone ready to make extra income</div>
              </div>
            </div>
            
            <Link
              ref={ctaButtonRef}
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
  );
};

export default PosSection;