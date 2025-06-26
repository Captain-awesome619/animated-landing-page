"use client";
import { useState, useEffect } from "react";
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
        "Don’t just save. Outsmart. Outwin. Trivia Saving only on Xtrempay.",
      ],
      imageSrc: "/images/phone2.png", // Placeholder
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
      imageSrc: "/images/phone2_spin.png", // Placeholder
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
          "We draw winners weekly/monthly and yes, it’s real cash",
        ],
      },
      whyItBangs: [
        "No boring interest",
        "Real wins, made for hustlers & dreamers like you",
        "Stack your savings. Stack your chances. Join the Raffle.",
      ],
      imageSrc: "/images/phone2_raffle.png", // Placeholder
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
          "We draw winners weekly/monthly and yes, it’s real cash",
        ],
      },
      whyItBangs: [
        "No boring interest",
        "Real wins, made for hustlers & dreamers like you",
        "Stack your savings. Stack your chances. Join the Raffle.",
      ],
      imageSrc: "/images/savemoney.png", // Placeholder
      imageAlt: "Raffle Savings App",
    },
  ];

  // State to manage the active section
  const [activeSection, setActiveSection] = useState(savingsData[0].id);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Use useGSAP for animations
  useGSAP(() => {
    const activeData = savingsData.find((data) => data.id === activeSection);

    // Animate title parts swiping in from left and right
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
        duration: 1,
        ease: "power2.out",
      })
      .from(
        ".hero__title2:last-child",
        {
          x: "100%",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<0.5"
      );

    // Animate text content sliding in from the right
    const tlText = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tlText.from(".hero > div:nth-child(2) > div", {
      x: "100%",
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power2.out",
    });

    // Animate phone image rising from the bottom
    gsap.from(".phone-image", {
      y: "100%",
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, [activeSection]); // Re-run animations when activeSection changes

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
                className={`border-s-4 ps-3 ${
                  activeSection === data.id
                    ? "border-[#4257D0]"
                    : "border-transparent"
                }`}
              >
                <a
                  href="#"
                  className={`text-[#ffffff] hover:text-blue-300 ${
                    activeSection === data.id ? "font-bold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(data.id);
                  }}
                >
                  {data.title} {data.subTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 transform lg:-translate-x-1/4 hero">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2">
            {activeData?.title}
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2 pl-14">
            {activeData?.subTitle}
          </h1>
          <div className="space-y-6 ">
            <div>
              <p className="text-sm sm:text-base md:text-[1rem] lg:text-lg">
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
            <div>
              <div className="mb-2">
                <b className="text-base md:text-xl font-semibold">
                  {activeData?.howItWorks.title}
                </b>{" "}
                <span>{activeData?.howItWorks.text}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg lg:text-lg">
                {activeData?.howItWorks.items.map((item, index) => (
                  <div key={index} className="flex">
                    <Image
                      src="/images/bullet2.svg"
                      height={20}
                      width={20}
                      alt="icon"
                      className="me-2"
                    />
                    {item}
                  </div>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Why it bangs:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-[1rem]">
                {activeData?.whyItBangs.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Smartphone Mockup */}
        <div className="hidden lg:block absolute lg:top-1/8 transform lg:-translate-x-[-1/3] lg:translate-y-0 lg:right-0 phone-image">
          <Image
            src={activeData?.imageSrc || "/images/phone2.png"}
            alt={activeData?.imageAlt || "Savings App"}
            width={300}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;
