"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import screen1 from "../../../public/images/screen1.svg";
import screen2 from "../../../public/images/screen2.svg";
import screen3 from "../../../public/images/screen3.svg";



   export  const savingsData: SavingsData[] = [
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
  innerDivRef?: React.Ref<HTMLDivElement>;
  image1Ref?: React.Ref<HTMLImageElement>;
  image2Ref?: React.Ref<HTMLImageElement>;
  image3Ref?: React.Ref<HTMLImageElement>;
 titleRefss: (el: HTMLHeadingElement) => void;
  subtitleRefss: (el: HTMLHeadingElement) => void;
   descriptRefss: (el: HTMLHeadingElement) => void;
}



const SavingsSection = forwardRef<HTMLDivElement, SavingsSectionProps>(
  ({ bgColor = "bg-[#1F2526]", image1Ref, image2Ref, image3Ref,titleRefss,subtitleRefss,  descriptRefss}, ref) => {


    return (
      <section
        className={`${bgColor} h-screen relative overflow-hidden text-white py-12 lg:py-30 px-4 lg:px-8 hero`}
        ref={ref}
      >
        <div className="grid px-[1.5rem]  grid-cols-[20%_50%_30%] pt-[2rem] ">
          {/* Left Navigation */}
           <nav className="">
          <ul className="space-y-4 w-full">
            {savingsData.map((data) => (
              <li
                key={data.id}
                className={`nav-item w-full border-s-4 ps-3 transition-all duration-300 hover:translate-x-2 `}
              >
                <button
                  className={`text-[#ffffff]  flex flex-row  transition-all duration-300   py-2 w-full text-left`}

                
                >
               {data.title}
               {" "}
                   {data.subTitle}

                </button>
              </li>
            ))}
          </ul>
        </nav>


          {/* Main Content */}
          
           <div className= "relative w-full h-32 flex flex-col ">
  {savingsData.map((data, index) => (
    <div key={data.id} className="w-screen flex flex-col  ">
    <div
            key={index}
            className="absolute top-0 left-0 w-full h-full flex flex-col  "
          >
        <h4 className=" text-white text-[60px] font-[400]"
       ref={titleRefss}
       >
          {data.title}
          
        </h4>
        <h4 className=" text-white text-[60px] mt-[-4%] relative pl-[15%] font-[400]"
       ref={subtitleRefss}
        >
          {data.subTitle}
        </h4>
      </div>

      <div ref={descriptRefss}  className=" absolute top-[150%] left-0 w-full h-full flex flex-col gap-[2rem]  ">
       <h4 className="text-[20px] font-[400]" > {data.description}</h4>
      
<div className="flex flex-col gap-[1rem]">
<div className="flex flex-row gap-[0.5rem] items-center">
  <h4 className="font-bold text-lg">{data.howItWorks.title}</h4>
  <p>{data.howItWorks.text}</p>
</div>
  <ul className="list-disc pl-5">
    {data.howItWorks.items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
<div className="flex flex-col gap-[0.3rem]">
  <h4 className="text-[18px] font-[600]">Why it bangs:</h4>
  <ul className="list-disc pl-5">
    {data.whyItBangs.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
  </div>
</div>
</div>
      

    </div>
  ))}
</div>

         

          {/* Smartphone Mockup */}
          <div className="hidden lg:block absolute  right-[10%] w-[300px] h-[600px]  bg-[url('/images/phonecover.svg')] bg-no-repeat bg-cover overflow-hidden">
           <div className="w-full">
            <Image
              ref={image1Ref}
              src={screen1}
              height={100}
              width={100}
              alt="screen1"
              className="absolute top-0 left-0 h-[96%] w-full -ml-[2.8%] z-10"
            />
</div>
            <Image
              ref={image2Ref}
              src={screen2}
              height={100}
              width={100}
              alt="screen2"
              className="absolute top-0 left-0 h-[96%] w-full -ml-[2.8%] z-20"
            />
            <Image
              ref={image3Ref}
              src={screen3}
              height={100}
              width={100}
              alt="screen3"
              className="absolute top-0 left-0 h-[96%] w-full -ml-[2.8%] z-30"
            />
          </div>
        </div>
      </section>
    );
  }
);

export default SavingsSection;
