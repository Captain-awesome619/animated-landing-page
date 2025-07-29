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