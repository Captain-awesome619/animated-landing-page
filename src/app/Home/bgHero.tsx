"use client";
import Image from "next/image";

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
  return (
    <section
      className={`${bgColor} min-h-screen relative overflow-hidden hero`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          className={`object-contain ${imageClassName}`}
          style={{ zIndex: -1 }}
        />
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center justify-between py-12 lg:py-20 px-4 lg:px-8">
        {/* Card on the Left with Glassmorphism */}
        <div className="bg-black/30 backdrop-blur-md mb-28 text-white p-6 rounded-lg w-full lg:w-1/3 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Why Xtrempay?</h2>
          <div className="text-sm md:text-base space-y-2">
            <div className="flex justify-between items-start">
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-2"
              />{" "}
              <span>
                {" "}
                All-in-One Wallet <br /> Send money, buy airtime, pay bills, and
                save—all in one app.
              </span>
            </div>
            <div className="flex justify-between items-start">
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-2"
              />{" "}
              <span>
                Incentive-Based Savings Save money and unlock raffle draws,
                trivia contests & entertainment perks.
              </span>
            </div>
            <div className="flex justify-between items-start">
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-2"
              />{" "}
              <span>
                Made for Nigerians Localized features, naira-first UX, and
                real-time support
              </span>
            </div>
            <div className="flex justify-between items-start">
              <Image
                src="/images/bullet2.svg"
                height={20}
                width={20}
                alt="icon"
                className="me-2"
              />
              <span>
                Bank-Level Security End-to-end encryption, secure login, and
                fraud alerts.
              </span>
            </div>
          </div>
        </div>

        {/* Numbers Overlay */}
        <div className="absolute inset-0 flex items-center justify-around text-white text-center z-10 w-full top-11/12 mt-15">
          {/* 10M (Odd, up) */}
          <div className="transform -translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50">
            10M
            <p className="text-sm md:text-base">To be won every week</p>
          </div>
          {/* 100K (Even, down) */}
          <div className="transform translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50">
            100K
            <p className="text-sm md:text-base">Active users</p>
          </div>
          {/* 100M (Odd, up) */}
          <div className="transform -translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50">
            100M
            <p className="text-sm md:text-base">Weekly savings</p>
          </div>
          {/* 24/7 (Even, down) */}
          <div className="transform translate-y-16 text-4xl md:text-8xl font-bold border-s px-8 h-50">
            24/7
            <p className="text-sm md:text-base">Customer Support</p>
          </div>
        </div>

        {/* Text at the Bottom */}
        {/* <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-5.5 text-white">{description}</p>
        </div> */}
      </div>
    </section>
  );
};

export default BackgroundHero;
