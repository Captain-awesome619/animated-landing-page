"use client";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface SavingsData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  howItWorks: { title: string; text: string; items: string[] };
  whyItBangs: string[];
  imageSrc: string;
  imageAlt: string;
}

interface SavingsSectionProps {
  bgColor?: string;
}

const SavingsSection = ({ bgColor = "bg-[#1F2526]" }: SavingsSectionProps) => {
  // Data array for different savings sections
  const savingsData: SavingsData[] = [
    {
      id: 1,
      title: "Trivia",
      subTitle: "Savings",
      description: `Save Weekly  Answer Smart Win Cash. Trivia Savings makes saving fun, you save money, answer trivia, and stand a chance to win cool cash!`,
      howItWorks: {
        title: "How it works:",
        text: "Save ₦3000/week = Entry unlocked Play our weekly trivia quiz",
        items: [
          "Get answers right! Boost your chance",
          "Winners get picked and rewarded with real cash!",
        ],
      },
      whyItBangs: [
        "Fun + saving in one",
        "Real rewards for being smart",
        "For sharp minds & goal-getters",
        "Don't just save. Outsmart. Outwin. Trivia Saving only on Xtrempay.",
      ],
      imageSrc: "/images/phone2.png",
      imageAlt: "Trivia Savings App",
    },
    {
      id: 2,
      title: "Spin & Win",
      subTitle: "Savings",
      description:
        "Spin & Win - Save. Spin. Win Big. With Spin & Win Savings, every token you spin gives a chance to win instant rewards, fun, fast, and built for the bold.",
      howItWorks: {
        title: "How it works:",
        text: "Save ₦500 = 1 spin token",
        items: [
          "Use your token to spin the wheel",
          "Could you win airtime, saving boosts, or even real cash",
        ],
      },
      whyItBangs: [
        "Every spin is a shot at winning instant rewards",
        "Fun, fast, and built for the bold",
        "Only on Xtrempay where saving gets exciting!",
      ],
      imageSrc: "/images/phone2_spin.png",
      imageAlt: "Spin & Win Savings App",
    },
    {
      id: 3,
      title: "Raffle",
      subTitle: "Savings",
      description:
        "Raffle Savings on Xtrempay rewards you with cash prizes just for saving, no interest, no stress.",
      howItWorks: {
        title: "How it works:",
        text: "Save ₦1000 = 1 ticket",
        items: [
          "More savings = more tickets = Higher chances",
          "We draw winners weekly/monthly and yes, it's real cash",
        ],
      },
      whyItBangs: [
        "No boring interest",
        "Real wins, made for hustlers & dreamers like you",
        "Stack your savings. Stack your chances. Join the Raffle.",
      ],
      imageSrc: "/images/phone2_raffle.png",
      imageAlt: "Raffle Savings App",
    },
    {
      id: 4,
      title: "Send Money. ",
      subTitle: "Pay Bills",
      description:
        "Raffle Savings on Xtrempay rewards you with cash prizes just for saving, no interest, no stress.",
      howItWorks: {
        title: "How it works:",
        text: "Save ₦1000 = 1 ticket",
        items: [
          "More savings = more tickets = Higher chances",
          "We draw winners weekly/monthly and yes, it's real cash",
        ],
      },
      whyItBangs: [
        "No boring interest",
        "Real wins, made for hustlers & dreamers like you",
        "Stack your savings. Stack your chances. Join the Raffle.",
      ],
      imageSrc: "/images/savemoney.png",
      imageAlt: "Raffle Savings App",
    },
  ];

  // State to manage the active section and animation state
  const [activeSection, setActiveSection] = useState(savingsData[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for animation targets
  const contentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Function to handle section change with smooth transition
  const handleSectionChange = (newSectionId: number) => {
    if (newSectionId === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Create timeline for content transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSection(newSectionId);
        setIsTransitioning(false);
      }
    });

    // Animate out current content
    tl.to([contentRef.current, phoneRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.inOut",
      stagger: 0.1
    })
    // Animate in new content
    .to([contentRef.current, phoneRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.1
    }, "+=0.1");
    

    // Special animation for titles
    if (titleRef.current) {
      tl.to(".hero__title2", {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.2,
        ease: "power2.inOut"
      }, 0)
      .to(".hero__title2", {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, 0.4);
    }
  };

  // Enhanced scroll animations
  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    // Initial page load animations
    const tlInitial = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Navigation fade in
    tlInitial.from(".nav-item", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Title animations with more dynamic effects
    const tlTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero__title2",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tlTitle
      .from(".hero__title2:first-child", {
        x: "-100%",
        opacity: 0,
        rotation: -5,
        duration: 1,
        ease: "back.out(1.7)",
      })
      .from(
        ".hero__title2:last-child",
        {
          x: "100%",
          opacity: 0,
          rotation: 5,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<0.3"
      );

    // Content sections with staggered animations
    const tlContent = gsap.timeline({
      scrollTrigger: {
        trigger: ".content-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tlContent.from(".content-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Enhanced phone animation with floating effect
    gsap.from(".phone-image", {
      y: "100%",
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // Continuous floating animation for phone
    gsap.to(".phone-image", {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5
    });

    // Parallax effect for background elements
    gsap.to(".hero", {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
 gsap.to(phoneRef.current, {
      y: -15,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: phoneRef.current,
        start: 'top 10%',
        toggleActions: 'play none none reverse',
      }
    });
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Get the active data based on state
  const activeData = savingsData.find((data) => data.id === activeSection);

  return (
    <section
      className={`${bgColor} min-h-screen relative overflow-hidden text-white py-12 lg:py-20 px-4 lg:px-8 hero`}
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Navigation */}
        <nav className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <ul className="space-y-4">
            {savingsData.map((data) => (
              <li
                key={data.id}
                className={`nav-item border-s-4 ps-3 transition-all duration-300 hover:translate-x-2 ${
                  activeSection === data.id
                    ? "border-[#4257D0]"
                    : "border-transparent hover:border-[#4257D0]/50"
                }`}
              >
                <a
                  href="#"
                  className={`text-[#ffffff] transition-all duration-300 block py-2 ${
                    activeSection === data.id 
                      ? "font-bold text-[#4257D0]" 
                      : "hover:text-blue-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionChange(data.id);
                  }}
                >
                  {data.title} {data.subTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div 
          ref={contentRef}
          className="w-full lg:w-2/3 transform lg:-translate-x-1/4 content-section"
        >
          <div ref={titleRef}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2 transition-all duration-500">
              {activeData?.title}
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2 pl-14 transition-all duration-500">
              {activeData?.subTitle}
            </h1>
          </div>
          
          <div className="space-y-6">
            <div className="content-item">
              <p className="text-sm sm:text-base md:text-[1rem] lg:text-lg transition-all duration-500">
                {(() => {
                  const desc = activeData?.description || "";
                  const parts = desc.split(",");

                  const chunks = [];
                  for (let i = 0; i < parts.length; i += 3) {
                    chunks.push(parts.slice(i, i + 1).join(","));
                  }

                  return chunks.map((chunk, idx) => (
                    <span key={idx}>
                      {chunk}
                      {idx < chunks.length - 1 && <br />}
                    </span>
                  ));
                })()}
              </p>
            </div>
            
            <div className="content-item">
              <div className="mb-2">
                <b className="text-base md:text-xl font-semibold">
                  {activeData?.howItWorks.title}
                </b>{" "}
                <span>{activeData?.howItWorks.text}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg lg:text-lg">
                {activeData?.howItWorks.items.map((item, index) => (
                  <div key={index} className="flex items-start transition-all duration-300 hover:translate-x-2">
                    <Image
                      src="/images/bullet2.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-2 mt-1 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </ul>
            </div>
            
            <div className="content-item">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Why it bangs:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-[1rem]">
                {activeData?.whyItBangs.map((item, index) => (
                  <div 
                    key={index} 
                    className="transition-all duration-300 hover:translate-x-2 hover:text-blue-300"
                  >
                    {item}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Smartphone Mockup */}
        <div 
          ref={phoneRef}
          className="hidden lg:block absolute lg:top-1/8 transform lg:-translate-x-[-1/3] lg:translate-y-0 lg:right-0 phone-image transition-all duration-500"
        >
          <Image
            src={activeData?.imageSrc || "/images/phone2.png"}
            alt={activeData?.imageAlt || "Savings App"}
            width={300}
            height={600}
            className="object-contain transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;