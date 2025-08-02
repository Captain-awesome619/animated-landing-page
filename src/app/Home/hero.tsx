"use client";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BackgroundHero from "./bgHero";

import small from "../../../public/images/Small.svg";
import big from "../../../public/images/Big.svg";
import content from "../../../public/images/content.svg";
import afri from "../../../public/images/african-american2.png";

gsap.registerPlugin(ScrollTrigger);

type HeroSectionProps = {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  videoText?: string;
  num: number;
  imageAlt: string;
  imageClassName?: string;
  imgHeight?: number;
  imgWidth?: number;
  bgColor?: string;
  colSet?: string;
  layoutVariant?: "split" | "centered";
  imgColset?: string;
  animationType?: "scroll-merge" | "zoom-in";
};

const Hero = ({
  title,
  description,
  ctaText = "Download",
  ctaLink = "#",
  videoText = "Watch our video",
  num,
  imageAlt = "Xtrempay App",
  bgColor = "bg-gray-100",
  imgColset,
}: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const bigImgRef = useRef<HTMLImageElement>(null);
  const smallImgRef = useRef<HTMLDivElement>(null);
  const contentImgRef = useRef<HTMLImageElement>(null);
  const landscapeImgRef = useRef<HTMLImageElement>(null);
  const bgHeroRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
const xtrempayRef = useRef<HTMLDivElement | null>(null);
const statsRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (
      !bigImgRef.current ||
      !smallImgRef.current ||
      !contentImgRef.current ||
      !landscapeImgRef.current ||
      !bgHeroRef.current ||
      !textContentRef.current ||
      num !== 1
    )
      return;



    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom+=200% top",
          scrub: true,
          pin: true,
        },
      });

      // Step 1: Move big image up
      tl.to(bigImgRef.current, {
        y: "-150%",
        ease: "power1.out",
        duration: 1,
      }, "start");

      // Step 2: Move phone case (smallImgRef)
      tl.to(smallImgRef.current, {
        x: "-75%",
        y: "-75%",
        ease: "power2.out",
        duration: 1,
      }, "start+=0.2");

      // Step 3: Rotate phone and transition content to landscape
      tl.to(smallImgRef.current, {
        rotateZ: -90,
        transformOrigin: "center center",
        ease: "power1.inOut",
        duration: 1,
      }, "+=0.2");

      tl.to(contentImgRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      }, "<");

      tl.to(landscapeImgRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }, "<");

      // Step 4: Zoom and fade out phone
      tl.to(smallImgRef.current, {
        scale: 2,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "+=0.2");

      // Step 5: Fade out left text content
      tl.to(textContentRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      }, "<");
tl.to(bgHeroRef.current, {
  opacity: 1,
  duration: 1.2,
  ease: "power2.inOut",
  onComplete: () => {
   gsap.fromTo(xtrempayRef.current,
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: bgHeroRef.current,
      start: "top center",
      once: true,
      scrub: true,
      pin: false, // Already inside a pinned section
    },
  }
);
  }
}, "<");
  tl.fromTo(statsRef.current,
    { yPercent: 50, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
    },
    "+=0.5" // 👈 user must scroll again
  );
    }, heroRef);

    return () => ctx.revert();
  }, [num]);

  return (
    <section
      className={`${bgColor} h-screen px-4 lg:px-8 hero z-0 relative`}
      ref={heroRef}
    >
      <div className="max-w-7xl h-screen flex mx-auto w-full font-medium">
        <div className="flex flex-col lg:flex-row items-end justify-between h-full">
          {/* Left Side */}
          <div
            ref={textContentRef}
            className="text-center lg:text-left lg:w-1/3 mt-12 lg:mt-0 mb-8"
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
                className="bg-[#4257D0] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition md:text-lg lg:text-lg text-sm sm:text-sm md:mb-[0]"
              >
                {ctaText}
              </Link>
              <div
                className="flex cursor-pointer lg:ms-3 items-center justify-center lg:mt-1"
                onClick={() => window.open("https://example.com/video", "_blank")}
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
                <span className="text-[#151515] mt-1.5 text-sm sm:text-[12px] md:text-lg lg:text-lg ps-2">
                  {videoText}
                </span>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className={`flex justify-center lg:justify-end relative ${imgColset || "w-full lg:w-2/3"}`}>
            <div className="flex right-[-5%]">
              <Image
                ref={bigImgRef}
                src={big}
                alt={imageAlt}
                width={450}
                height={150}
                className="relative top-[40%]"
                priority
              />
              {/* Rotating phone case */}
              <div
                className="flex items-center inset-2  justify-center mt-[90%] ml-[-40%] bg-[url('/images/phonecase.svg')] bg-no-repeat bg-cover w-[100%] h-[100%] relative"
                ref={smallImgRef}
              >
                <div className="w-[100%] z-0 h-[100%] relative flex items-center justify-center">
                  <Image
                    ref={contentImgRef}
                    src={content}
                    alt="Content"
                    className="absolute z-0 w-[90%] h-[90%]"
                    width={450}
                    height={150}
                    priority
                  />
                  <Image
                    ref={landscapeImgRef}
                    src={afri}
                    alt="Afri"
                    className="absolute rounded-3xl w-[75.2%] h-[89%] opacity-0"
                    width={450}
                    height={150}
                    priority
                  />
                </div>
              </div>

              <div className="mt-[80%] ml-[-20%] w-[120px] h-[100px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* BackgroundHero wrapper - initially hidden */}
      <div
        ref={bgHeroRef}
        className="opacity-0 absolute top-0 left-0 h- w-screen  z-[-1]"
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
    </section>
  );
};

export default Hero;
