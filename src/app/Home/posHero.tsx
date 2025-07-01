'use client';
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

interface PosSectionProps {
  bgColor?: string;
  posImageSrc?: string;
  posImageAlt?: string;
}

const PosSection = ({
  bgColor = 'bg-white',
  posImageSrc = '/images/pos-lady.png',
  posImageAlt = 'Xtrempay POS Agent',
}: PosSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      titleRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
      .fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      );
  }, []);

  return (
    <section className={`${bgColor} min-h-screen relative overflow-hidden py-12 lg:py-20 px-4 lg:px-8 hero`} id='features'>
      {/* Container */}
      <div className="text-center mx-auto">
        <h3
          className="text-blue-600 text-xl md:text-2xl mb-2"
          ref={titleRef}
        >
          Xtrempay POS?
        </h3>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Free POS for Agents & Merchants</h1>
        <p className="text-gray-600 text-base md:text-lg mb-10">
          Xtrempay gives you a POS machine at no cost, so you can grow your hustle and serve your community.
        </p>
      </div>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0" ref={imageRef}>
          <Image
            src={posImageSrc}
            alt={posImageAlt}
            width={610}
            height={600}
            className="object-contain mx-auto"
          />
        </div>
        {/* Text Content */}
        <div className="w-full lg:w-1/2 lg:pl-6 text-center lg:text-left" ref={contentRef}>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl md:text-xl font-bold mb-2">What You Get</h4>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                <div className='flex'> <Image src="/images/bullet.svg" height={20} width={20} alt='icon' className='me-2'/>Free POS device</div>
                <div className='flex'>  <Image src="/images/bullet.svg" height={20} width={20} alt='icon' className='me-2'/> Fast & secure</div>
                <div className='flex'>  <Image src="/images/bullet.svg" height={20} width={20} alt='icon' className='me-2'/> Instant settlement</div>
                <div className='flex'>  <Image src="/images/bullet.svg" height={20} width={20} alt='icon' className='me-2'/> Earn commissions on every transaction</div>
                <div className='flex'>  <Image src="/images/bullet.svg" height={20} width={20} alt='icon' className='me-2'/> 24/7 support & quick settlements</div>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-2">Who Can Apply</h4>
                <div>Small business owners</div>
                <div>Mobile money agents</div>
                <div>Anyone ready to make extra income</div>
            </div>
            <Link
              href="#"
              className="inline-block bg-[#4257D0] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-base md:text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosSection;