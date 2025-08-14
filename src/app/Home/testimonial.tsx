"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
}

interface TestimonialSectionProps {
  bgColor?: string;
  testimonials?: Testimonial[];
    cardsgroup?: React.RefObject<HTMLDivElement | null>;
    text? : React.RefObject<HTMLDivElement | null>
}

const TestimonialSection = ({
  bgColor = "bg-gray-100",
  testimonials = defaultTestimonials,
  cardsgroup,
  text
}: TestimonialSectionProps) => {


  const data = [
  
  ];

  return (
    <section 
      
      className={`${bgColor} py-12 lg:py-20 px-4 lg:px-8 hero h-screen`} 
      id="reviews"
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto relative  ">
        {/* Heading */}
        <div ref={text} className="pt-[1rem]">
        <h1 className="text-3xl md:text-5xl font-bold  text-gray-900 text-start " >
          What they say about us
        </h1>
</div>
         <div ref={cardsgroup} className="mt-[-2rem]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:px-0 lg:grid-cols-3 gap-6   place-items-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="card bg-white p-8 rounded-lg shadow-md h-full cursor-pointer hover:shadow-xl  hover:-translate-y-2 hover:scale-105"
                style={{
                  zIndex: testimonials.length - index,
                }}
              >
                <b>{testimonial.heading}</b>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.imageAlt}
                    width={50}
                    height={50}
                    priority
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
</div>


        {/* CTA Banner */}
        
      </div>
    </section>
  );
};

// Default Testimonial Data
export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    heading: "Saving with Xtrempay is fun and addictive!",
    quote:
      "I used to struggle with saving money. But now I look forward to it every week because I get to spin, play trivia, and win cash. Saving has never felt this rewarding.",
    name: "Olife A.",
    title: "Student | Ibadan",
    imageSrc: "/images/avatar-2.png",
    imageAlt: "Olife A.",
  },
  {
    id: 2,
    heading: "I won 50,000 just for saving 1000!",
    quote:
      "At first, I didn't believe it. But when I won a raffle draw after saving just 1000, I screamed. Xtrempay is the real deal. I'm hooked now!",
    name: "Sammy B.",
    title: "Content Creator | Ibadan",
    imageSrc: "/images/avatar-1.png",
    imageAlt: "Sammy B.",
  },
  {
    id: 3,
    heading: "I save and earn while testing my brain!",
    quote:
      " The trivia savings is genius. I save 3000 weekly and get to answer fun questions. Got lucky a few times and won some cash. It's like learning and earning!",
    name: "Ahmed S.",
    title: "Corp Member | Kano",
    imageSrc: "/images/avatar-2.png",
    imageAlt: "Ahmed S.",
  },
    {
      id: 4,
      heading: "Xtrempay fits my hustle. ",
      quote:
        "Between saving for rent and helping my mum's shop with a POS, Xtrempay has become my go-to app. It's not just a savings app, it's a financial hack.",
      name: "Kemi O.",
      title: "Side Hustler | Abeokuta",
      imageSrc: "/images/avatar-2.png",
      imageAlt: "Kemi O.",
    },
    {
      id: 5,
      heading: "Free POS helped me grow my shop.",
      quote:
        " I got a free POS from Xtrempay. No rent, no stress. Now customers pay easily, and I earn commissions daily. It's the best decision I made for my business.",
      name: "Blessing E.",
      title: "Seller | Benin City",
      imageSrc: "/images/avatar-1.png",
      imageAlt: "Blessing E.",
    },
];

export default TestimonialSection;