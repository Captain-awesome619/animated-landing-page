'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  videoText?: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  imgHeight?: number;
  imgWidth?: number;
  bgColor?: string; // Should be a Tailwind color class or CSS variable
  colSet?: string; // e.g., 'lg:w-1/3 lg:w-2/3' for custom column widths
  layoutVariant?: 'split' | 'centered';
  imgColset?: string; // e.g., 'lg:w-1/3 lg:w-2/3' for custom column widths
}

const Hero = ({
  title,
  description,
  ctaText = 'Download',
  ctaLink = '#',
  videoText = 'Watch our video',
  imageSrc = '/images/Xtrempay.png',
  imageAlt = 'Xtrempay App',
  imageClassName,
  imgHeight = 500,
  imgWidth = 300,
  bgColor = 'bg-gray-100',
  colSet,
  imgColset,
  layoutVariant = 'split',
}: HeroSectionProps) => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Use useGSAP for animations
  useGSAP(() => {
    if (layoutVariant === 'split') {
      // Split Layout Animation
      // Animate content (text section) swiping in from the left
      gsap.from('.hero__content', {
        x: '-100%', // Swipe in from left
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero__content',
          start: 'top 80%', // Start when 80% of the section is in view
          toggleActions: 'play none none reverse', // Play on enter, reverse on leave
          onLeaveBack: () => gsap.set('.hero__content', { x: 0, opacity: 1 }), // Reset on leave
        },
      });

      // Animate image swiping up from the bottom
      gsap.from('.hero__image', {
        y: '100%', // Swipe up from bottom
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero__image',
          start: 'top 80%', // Start when 80% of the section is in view
          toggleActions: 'play none none none', // Plnoneay on enter, reverse on leave
          onLeaveBack: () => gsap.set('.hero__image', { y: 0, opacity: 1 }), // Reset on leave
        },
      });
    } else {
      // Centered Layout Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero__centered',
          start: 'top 80%', // Start when 80% of the section is in view
          toggleActions: 'play none none none', // Play on enter, reverse on leave
          onLeaveBack: () =>
            tl.revert(), // Revert timeline to initial state on leave
        },
      });

      tl.from('.hero__centered .hero__title', {
        rotationX: 90, // Rotate along X-axis
        opacity: 0,
        duration: 1.2,
        ease: 'back.in(1.7)', // Bounce effect
        transformOrigin: 'center center',
      })
        .from(
          '.hero__centered .hero__description',
          {
            rotationX: 90,
            opacity: 0,
            duration: 1.2,
            ease: 'back.in(1.7)',
            transformOrigin: 'center center',
          },
          '-=0.8'
        ) // Overlap with title animation
        .from(
          '.hero__centered .hero__cta',
          {
            rotationX: 90,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
            transformOrigin: 'center center',
          },
          '-=0.6'
        ) // Overlap with description animation
        .from(
          '.hero__centered .hero__image',
          {
            rotationX: 90,
            opacity: 0,
            duration: 1.2,
            ease: 'back.in(1.7)',
            transformOrigin: 'center center',
          },
          '-=0.4'
        ); // Overlap with CTA animation
    }
  }, [layoutVariant]); // Re-run animations if layoutVariant changes

  return (
    <section
      className={`${bgColor} sm:py-0 lg:pt-40 lg:pb-6.5 px-4 lg:px-8 items-center justify-center p sm:px-6 hero z-0`}
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full font-medium">
        {layoutVariant === 'split' ? (
          <div
            className={`flex flex-col lg:flex-row items-end justify-between ${
              colSet || 'lg:w-1/2'
            }`}
          >
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/3 mt-12 lg:mt-0 mb-8 hero__content">
              <h1 className="text-2xl md:text-5xl font-medium text-gray-900 mb-4 leading-tight hero__title">
                {title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-[#151515] hero__description">
                {description}
              </p>
              <div className="flex justify-start gap-4 hero__cta">
                <Link
                  href={ctaLink}
                  className="bg-[#4257D0] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-[0]"
                >
                  {ctaText}
                </Link>
                <div
                  className="flex cursor-pointer lg:ms-3 items-center justify-center lg:mt-1"
                  onClick={() =>
                    window.open('https://example.com/video', '_blank')
                  }
                >
                  <div className="border-2 border-[#151515] bg-transparent rounded-full text-center p-2 flex items-center justify-center h-[38px] w-[38px] lg:me-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <path d="M8 5.14v14.72a1 1 0 001.55.832l11.98-7.36a1 1 0 000-1.664L9.55 4.308A1 1 0 008 5.14z" />
                    </svg>
                  </div>
                  <span className="text-[#151515] mt-1.5 text-sm sm:text-[10px] md:text-lg lg:text-lg">
                    {videoText}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div
              className={`flex justify-center lg:justify-end relative ${
                imgColset || 'w-full lg:w-2/3'
              }`}
            >
              <div className="relative z-1 hero__image">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className={imageClassName}
                  width={imgWidth}
                  height={imgHeight}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start text-start justify-start mb-6 hero__centered">
            <div className="mb-12 hero__image">
              <Image
                src={imageSrc}
                alt={imageAlt}
                className={imageClassName}
                width={imgWidth}
                height={imgHeight}
              />
            </div>
            <div className="lg:w-1/3">
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight hero__title">
                {title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-[#151515] hero__description">
                {description}
              </p>
              <div className="flex justify-start gap-4 hero__cta">
                <Link
                  href={ctaLink}
                  className="bg-[#4257D0] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-[0]"
                >
                  {ctaText}
                </Link>
                <div
                  className="flex cursor-pointer ms-3"
                  onClick={() =>
                    window.open('https://example.com/video', '_blank')
                  }
                >
                  <div className="border-2 border-[#151515] bg-transparent rounded-full text-center p-2 flex items-center justify-center h-[38px] w-[38px] me-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <path d="M8 5.14v14.72a1 1 0 001.55.832l11.98-7.36a1 1 0 000-1.664L9.55 4.308A1 1 0 008 5.14z" />
                    </svg>
                  </div>
                  <span className="text-[#151515] mt-1.5 text-sm sm:text-sm md:text-lg lg:text-lg">
                    {videoText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;