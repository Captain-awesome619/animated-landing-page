"use client";
import Image from "next/image";

interface TriviaSavingsProps {
  bgColor?: string;
  phoneImageSrc?: string;
  phoneImageAlt?: string;
}

const TriviaSavings = ({
  bgColor = "bg-[#1F2526]",
  phoneImageSrc = "/images/phone2.png", // Placeholder for phone mockup
  phoneImageAlt = "Trivia Savings App",
}: TriviaSavingsProps) => {
  return (
    <section
      className={`${bgColor} min-h-screen relative overflow-hidden text-white py-12 lg:py-20 px-4 lg:px-8 hero`}
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-flex justify-between">
        {/* Left Navigation */}
        <nav className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <ul className="space-y-4">
            <li className="border-s-4 ps-3 border-[#4257D0]">
              <a href="#" className="text-[#ffffff] hover:text-blue-300">
                Trivia Savings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Spin & Win Savings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Raffle Savings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Send Money. Pay Bills
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 transform lg:-translate-x-1/4 hero">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2">
            Trivia
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero__title2 pl-14">
            Savings
          </h1>
          <div className="space-y-6 ">
            <div>
              <p className="text-sm sm:text-base md:text-[1rem] lg:text-lg">
                Save Weekly. Answer Smart. Win Cash. <br /> Trivia Savings makes
                saving fun, you save money, answer trivia, and stand a chance to{" "}
                <br /> win cool cash!
              </p>
            </div>
            <div>
              <div className=" mb-2">
                <b className="text-base md:text-xl font-semibold">How it works:</b> <span> Save ₦3000/week = Entry unlocked Play our weekly trivia quiz</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg lg:text-lg">
                <div className="flex">
                  {" "}
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-2"
                  />
                 Get answers right! Boost your chance
                </div>
                <div className="flex">
                  {" "}
                  <Image
                    src="/images/bullet2.svg"
                    height={20}
                    width={20}
                    alt="icon"
                    className="me-2"
                  />{" "}
                  Winners get picked and rewarded with real cash!
                </div>
               
                
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Why it bangs:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-[1rem]">
                <div>Fun + saving in one</div>
                <div>Real rewards for being smart</div>
                <div>For sharp minds & goal-getters</div>
                <div>
                  Don’t just save. Outsmart. Outwin. Trivia Saving only on
                  Xtrempay.
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Smartphone Mockup */}
        {/* Smartphone Mockup */}
        <div className="hidden lg:block absolute lg:top-1/8 transform lg:-translate-x-[-1/3] lg:translate-y-0 lg:right-0">
          <Image
            src={phoneImageSrc}
            alt={phoneImageAlt}
            width={300}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default TriviaSavings;
