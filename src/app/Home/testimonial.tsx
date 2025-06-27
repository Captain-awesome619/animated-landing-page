"use client";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react"; // Import useGSAP
import gsap from "gsap";
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
}

const TestimonialSection = ({
  bgColor = "bg-gray-100",
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Animate testimonial cards
    gsap.from(".testimonial-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate CTA banner
    gsap.from(".cta-banner", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".cta-banner",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
  const data = [
    {
      id: 4,
      heading: "Xtrempay fits my hustle. ",
      quote:
        "Between saving for rent and helping my mum’s shop with a POS, Xtrempay has become my go-to app. It’s not just a savings app, it’s a financial hack.",
      name: "Kemi O.",
      title: "Side Hustler | Abeokuta",
      imageSrc: "/images/avatar-2.png", // Placeholder
      imageAlt: "Kemi O.",
    },
    {
      id: 5,
      heading: "Free POS helped me grow my shop.",
      quote:
        " I got a free POS from Xtrempay. No rent, no stress. Now customers pay easily, and I earn commissions daily. It’s the best decision I made for my business.",
      name: "Blessing E.",
      title: "Seller | Benin City",
      imageSrc: "/images/avatar-1.png", // Placeholder
      imageAlt: "Blessing E.",
    },
  ];
  return (
    <section className={`${bgColor} py-12 lg:py-20 px-4 lg:px-8 hero`}>
      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-start mb-12">
          What they say about us
        </h1>

        {/* Testimonial Grid */}
         <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2  md:px-0 lg:grid-cols-3 gap-6 mb-6 place-items-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white p-8 rounded-lg shadow-md h-full"
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
        <div className="flex justify-center">
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mb-6 max-w-4xl w-full place-items-center">
            {data.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white p-8 rounded-lg shadow-md w-full max-w-md h-full"
              >
                <b>{testimonial.heading}</b>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.imageAlt}
                    width={50}
                    height={50}
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

        {/* CTA Banner */}
        <div className="cta-banner  bg-[#4257D0] text-white mt-15 p-6 rounded-lg text-center flex flex-col md:flex-row items-center justify-between">
          <p className="text-base md:text-lg mb-4 md:mb-0">
            Join the X-Force winning big and paying smarter every day.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="flex items-center">
              <Image
                src="/images/store-app.png" // Placeholder
                alt="App Store"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <Link href="#" className="flex items-center">
              <Image
                src="/images/playstore.svg" // Placeholder
                alt="Google Play"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default Testimonial Data
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    heading: "Saving with Xtrempay is fun and addictive!",
    quote:
      "I used to struggle with saving money. But now I look forward to it every week because I get to spin, play trivia, and win cash. Saving has never felt this rewarding.",
    name: "Olife A.",
    title: "Student | Ibadan",
    imageSrc: "/images/avatar-2.png", // Placeholder
    imageAlt: "Olife A.",
  },
  {
    id: 2,
    heading: "I won 50,000 just for saving 1000!",
    quote:
      "At first, I didn’t believe it. But when I won a raffle draw after saving just 1000, I screamed. Xtrempay is the real deal. I’m hooked now!",
    name: "Sammy B.",
    title: "Content Creator | Ibadan",
    imageSrc: "/images/avatar-1.png", // Placeholder
    imageAlt: "Sammy B.",
  },
  {
    id: 3,
    heading: "I save and earn while testing my brain!",
    quote:
      " The trivia savings is genius. I save 3000 weekly and get to answer fun questions. Got lucky a few times and won some cash. It’s like learning and earning!",
    name: "Ahmed S.",
    title: "Corp Member | Kano",
    imageSrc: "/images/avatar-2.png", // Placeholder
    imageAlt: "Ahmed S.",
  },
];

export default TestimonialSection;
