"use client";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { savingsData } from "./triviaSavings";
import BackgroundHero from "./bgHero";
import SavingsSection from "./triviaSavings";
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
  const savingsRef = useRef<HTMLDivElement>(null); // 👈 NEW
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const image3Ref = useRef<HTMLImageElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
const subtitleRefs = useRef<HTMLHeadingElement[]>([]);
const descriptRefs = useRef<HTMLDivElement[]>([]);
const navItemRefs = useRef<HTMLLIElement[]>([]);
const navTitleRefs = useRef<HTMLHeadingElement[]>([]);
const navSubtitleRefs =useRef<HTMLHeadingElement[]>([]);

descriptRefs.current = [];
titleRefs.current = [];
subtitleRefs.current = [];

 const [activeIndex, setActiveIndex] = useState();
function Active(act : any) {
  setActiveIndex(act);
}

const AddNavTitleRefs = (el:  HTMLHeadingElement) => {
  if (el && !navTitleRefs.current.includes(el)) navTitleRefs.current.push(el);
};
const addToNavItemRefs = (el: HTMLLIElement) => {
  if (el && !navItemRefs.current.includes(el)) navItemRefs.current.push(el);
};
const addNavSubtitleRefs = (el: HTMLHeadingElement) => {
  if (el && !navSubtitleRefs.current.includes(el)) navSubtitleRefs.current.push(el);
};


const addToDescriptRefs = (el: HTMLDivElement) => {
  if (el && !descriptRefs.current.includes(el)) descriptRefs.current.push(el);
};
const addToTitleRefs = (el: HTMLHeadingElement) => {
  if (el && !titleRefs.current.includes(el)) titleRefs.current.push(el);
};
const addToSubtitleRefs = (el: HTMLHeadingElement) => {
  if (el && !subtitleRefs.current.includes(el)) subtitleRefs.current.push(el);
};
  useLayoutEffect(() => {
    if (
      !bigImgRef.current ||
      !smallImgRef.current ||
      !contentImgRef.current ||
      !landscapeImgRef.current ||
      !bgHeroRef.current ||
      !textContentRef.current ||
      !savingsRef.current ||
     
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

      tl.to(bigImgRef.current, {
        y: "-350%",
        ease: "power1.out",
        duration: 2,
      }, "start");

      tl.to(smallImgRef.current, {
        x: "-75%",
        y: "-75%",
        ease: "power2.out",
        duration: 2,
      }, "start+=0.2");

      tl.to(smallImgRef.current, {
        rotateZ: -90,
        transformOrigin: "center center",
        ease: "power1.inOut",
        duration: 2,
      }, "+=0.2");

      tl.to(contentImgRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
      }, "<");

      tl.to(landscapeImgRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }, "<");

      tl.to(smallImgRef.current, {
        scale: 2,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "+=0.2");

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
            { x: -200, opacity: 0 },
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
                pin: false,
              },
            }
          );
        },
      }, "<");

      tl.fromTo(statsRef.current,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power1.out",
        },
        "+=0.5"
      );
      tl.to(savingsRef.current, {
        top: 0,
        duration: 1.5,
        ease: "power2.out",
      }, "+=0.5");
for (let i = 0; i < 3; i++) {
  const slideLabel = `slide${i}`;
  const imgRef = [image1Ref, image2Ref, image3Ref][i];
  const currentTitle = titleRefs.current[i];
  const nextTitle = titleRefs.current[i + 1];
  const currentSubtitle = subtitleRefs.current[i];
  const nextSubtitle = subtitleRefs.current[i + 1];
const currentDescript = descriptRefs.current[i];
 const nextDescript = descriptRefs.current[i + 1];
 const currentNavItem = navItemRefs.current[i];
const nextNavItem = navItemRefs.current[i + 1];
 const currentnavTitle = navTitleRefs.current[i];
const nextnavTitle = navTitleRefs.current[i + 1];
 const currentnavSubtitle = navSubtitleRefs.current[i];
const nextnavSubtitle = navSubtitleRefs.current[i + 1];
  tl.add(slideLabel, `+=1`);
  tl.fromTo(
    imgRef.current,
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
    slideLabel
  );
  if (nextTitle && nextSubtitle) {
    tl.fromTo(
      currentTitle,
      { opacity: 1, x: 0 },
      { opacity: 0, x: -200, duration: 2 },
      slideLabel
    ).fromTo(
      nextTitle,
      { opacity: 0, x: 200 },
      { opacity: 1, x: 0, duration: 2 },
      slideLabel
    ).fromTo(
      currentSubtitle,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 200, duration: 2 },
      slideLabel
    ).fromTo(
      nextSubtitle,
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 2 },
      slideLabel
    );
  }

if (currentDescript && nextDescript) {
  tl.fromTo(
    currentDescript,
    { opacity: 1 },
    { opacity: 0, duration: 2 },
    slideLabel
  ).fromTo(
    nextDescript,
    { opacity: 0 },
    { opacity: 1, duration: 2 },
    slideLabel
  );
}
// First, set ALL items to gray and low opacity except the first one
navItemRefs.current.forEach((item, i) => {
  gsap.set(item, { borderColor: "#ffffff" });
});
navTitleRefs.current.forEach((title, i) => {
  gsap.set(title, { opacity: 0.5, color: "#9ca3af" }); // gray
});
navSubtitleRefs.current.forEach((subtitle, i) => {
  gsap.set(subtitle, { opacity: 0.5, color: "#9ca3af" });
});

// Highlight the first item by default
gsap.set(navItemRefs.current[0], { borderColor: "#4257D0" });
gsap.set(navTitleRefs.current[0], { opacity: 1, color: "#ffffff" });
gsap.set(navSubtitleRefs.current[0], { opacity: 1, color: "#ffffff" });

// Animation when scrolling between items
tl.to(currentNavItem, {
  borderColor: "#ffffff",
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);

tl.to(nextNavItem, {
  borderColor: "#4257D0",
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);

// Title color & opacity change
tl.to(currentnavTitle, {
  opacity: 0.5,
  color: "#9ca3af", // gray
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);

tl.to(nextnavTitle, {
  opacity: 1,
  color: "#ffffff",
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);

// Subtitle color & opacity change
tl.to(currentnavSubtitle, {
  opacity: 0.5,
  color: "#9ca3af",
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);

tl.to(nextnavSubtitle, {
  opacity: 1,
  color: "#ffffff",
  duration: 2,
  ease: "power2.inOut",
}, slideLabel);


}
    }, heroRef);

    return () => ctx.revert();
  }, [num]);

  return (
    <section
      className={`${bgColor} h-screen px-4 lg:px-8 hero z-0 relative`}
      ref={heroRef}
    >
      <div className="max-w-7xl h-screen flex mx-auto w-full font-medium">
        <div className="flex flex-col lg:flex-row items-end justify-between h-screen">
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
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
                    <path d="M8 5.14v14.72a1 1 0 001.55.832l11.98-7.36a1 1 0 000-1.664L9.55 4.308A1 1 0 008 5.14z" />
                  </svg>
                </div>
                <span className="text-[#151515] mt-1.5 text-sm sm:text-[12px] md:text-lg lg:text-lg ps-2">
                  {videoText}
                </span>
              </div>
            </div>
          </div>

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
              <div
                className="flex items-center inset-2 justify-center mt-[90%] ml-[-40%] bg-[url('/images/phonecase.svg')] bg-no-repeat bg-cover w-[100%] h-[100%] relative"
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
        className="opacity-0 absolute top-0 left-0 h-full w-screen z-[-1]"
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

      {/* SavingsSection overlay */}
      <div
        ref={savingsRef}
        className="fixed top-full left-0 w-full h-screen bg-white z-50"
      >
        <SavingsSection
          image1Ref={image1Ref}
  image2Ref={image2Ref}
  image3Ref={image3Ref}
  titleRefss={addToTitleRefs}
  subtitleRefss={addToSubtitleRefs}
            descriptRefss={addToDescriptRefs}
              NavSideRef={addToNavItemRefs}
  Navtitle = {AddNavTitleRefs}
  Navsubtitle= {addNavSubtitleRefs}
  func={Active}
  activeIndex={activeIndex}
        />
      </div>
    </section>
  );
};

export default Hero;
