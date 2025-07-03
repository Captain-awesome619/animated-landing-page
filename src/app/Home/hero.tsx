"use client";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade-in" | "slide-up" | "zoom-in" | "scroll-merge";

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
  layoutVariant?: "split" | "centered";
  imgColset?: string; // e.g., 'lg:w-1/3 lg:w-2/3' for custom column widths
  animationType?: AnimationType; // Type for animation options
}

const Hero = ({
  title,
  description,
  ctaText = "Download",
  ctaLink = "#",
  videoText = "Watch our video",
  imageSrc = "/images/Xtrempay.png",
  imageAlt = "Xtrempay App",
  imageClassName,
  imgHeight = 500,
  imgWidth = 300, // Reduced to a more reasonable width
  bgColor = "bg-gray-100", // Default to a valid Tailwind color
  colSet,
  imgColset,
  layoutVariant = "split",
  animationType = "fade-in", // Default animation type
}: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);
  
  // Store animation instances for cleanup
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const img = imgRef.current;
    if (!img) return;

    // Clear previous animations
    animationsRef.current.forEach(tween => {
      if (tween && tween.kill) {
        tween.kill();
      }
    });
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    animationsRef.current = [];
    scrollTriggersRef.current = [];

    function startAnimation() {
      if (animationType === "fade-in") {
        const fadeInTween = gsap.fromTo(
          heroRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" }
        );
        animationsRef.current.push(fadeInTween);

        const floatTween = gsap.to(imgRef.current, {
          y: -15,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
        
        if (floatTween.scrollTrigger) {
          scrollTriggersRef.current.push(floatTween.scrollTrigger);
        }
        animationsRef.current.push(floatTween);

      } else if (animationType === "slide-up") {
        const slideUpTween = gsap.fromTo(
          heroRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
        );
        animationsRef.current.push(slideUpTween);

      } else if (animationType === "zoom-in") {
        const zoomInTween = gsap.fromTo(
          img,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power4.out" }
        );
        animationsRef.current.push(zoomInTween);

        const floatTween = gsap.to(imgRef.current, {
          y: -15,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
        
        if (floatTween.scrollTrigger) {
          scrollTriggersRef.current.push(floatTween.scrollTrigger);
        }
        animationsRef.current.push(floatTween);

      } else {
        // default or scroll-merge
        const heroTween = gsap.fromTo(
          heroRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: "power4.out" }
        );
        animationsRef.current.push(heroTween);

        const imgTween = gsap.fromTo(
          img,
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power4.out",
            delay: 0.3,
          }
        );
        animationsRef.current.push(imgTween);

        const floatTween = gsap.to(imgRef.current, {
          y: -15,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
        
        if (floatTween.scrollTrigger) {
          scrollTriggersRef.current.push(floatTween.scrollTrigger);
        }
        animationsRef.current.push(floatTween);
      }
    }

    if (img.complete) {
      startAnimation();
    } else {
      img.onload = startAnimation;
    }

    // Cleanup function
    return () => {
      // Kill all animations
      animationsRef.current.forEach(tween => {
        if (tween && tween.kill) {
          tween.kill();
        }
      });

      // Kill all ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });

      // Clear any remaining ScrollTriggers on these elements
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === heroRef.current || 
            trigger.trigger === imgRef.current || 
            trigger.trigger === textRef.current) {
          trigger.kill();
        }
      });

      // Clear arrays
      animationsRef.current = [];
      scrollTriggersRef.current = [];
    };
  }, [animationType]);

  // Use the custom hook with proper cleanup handling
  useHeroAnimation({
    heroRef,
    imgRef,
    textRef,
    animationType: animationType,
    enableScrollAnimation: true,
    customOptions: {
      duration: 1.2,
      scrollDistance: 300,
      ease: "power4.out",
    },
  });

  return (
    <>
      <section
        className={`${bgColor} sm:py-0 pt-6 lg:pt-40 lg:pb-6.5 px-4 lg:px-8 items-center justify-center p sm:px-6 hero z-0`}
        ref={heroRef}
      >
        {/* Container */}
        <div className="max-w-7xl mx-auto w-full font-medium" ref={textRef}>
          {layoutVariant === "split" ? (
            <div
              className={`flex flex-col lg:flex-row items-end justify-between ${
                colSet || "lg:w-1/2"
              }`}
            >
              {/* Text Section */}
              <div className="text-center lg:text-left lg:w-1/3 mt-12 lg:mt-0 mb-8">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight hero__title">
                  {title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-[#151515]">
                  {description}
                </p>
                <div className="flex justify-start gap-4 lg:justify-start md:justify-center lg:text-start">
                  <Link
                    href={ctaLink}
                    className="bg-[#4257D0] text-white px-8  py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-[0]"
                  >
                    {ctaText}
                  </Link>
                  <div
                    className="flex cursor-pointer lg:ms-3 items-center justify-center lg:mt-1"
                    onClick={() =>
                      window.open("https://example.com/video", "_blank")
                    } //
                  >
                    <div className="border-2 border-[#151515] bg-transparent rounded-full text-center p-2 flex items-center justify-center h-[38px] w-[38px] lg:me-2 ">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <path d="M8 5.14v14.72a1 1 0 001.55.832l11.98-7.36a1 1 0 000-1.664L9.55 4.308A1 1 0 008 5.14z" />
                      </svg>
                    </div>
                    <span className="text-[#151515] mt-1.5 text-sm sm:text-[12px] md:text-lg lg:text-lg ps-2">
                      {videoText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div
                className={`flex justify-center lg:justify-end relative ${
                  imgColset || "w-full lg:w-2/3"
                }`}
              >
                <div className="relative ">
                  <Image
                    ref={imgRef}
                    src={imageSrc}
                    alt={imageAlt}
                    className={imageClassName}
                    width={imgWidth}
                    height={imgHeight}
                    priority
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start text-start justify-start mb-6">
              <div className="mb-12 ">
                <Image
                  ref={imgRef}
                  src={imageSrc}
                  alt={imageAlt}
                  className={imageClassName}
                  width={imgWidth}
                  height={imgHeight}
                  priority
                />
              </div>
              <div className="lg:w-1/3 ">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight hero__title">
                  {title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-[#151515]">
                  {description}
                </p>
                <div className="flex justify-center md:mx-0 sm:mx-auto md:text-center items-center gap-4 lg:justify-start md:justify-center lg:text-start">
                  <Link
                    href={ctaLink}
                    className="bg-[#4257D0] text-white px-8  py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-[0]"
                  >
                    {ctaText}
                  </Link>
                  <div
                    className="flex cursor-pointer ms-3 "
                    onClick={() =>
                      window.open("https://example.com/video", "_blank")
                    } //
                  >
                    <div className="border-2 border-[#151515] bg-transparent rounded-full text-center p-2 flex items-center justify-center h-[38px] w-[38px] me-2 ">
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
    </>
  );
};

export default Hero;