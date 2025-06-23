'use client';
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

type FAQ = {
  question: string;
  answer: string;
};

type FAQCategories = {
  'Saving & Rewards': FAQ[];
  'Using the App': FAQ[];
  'Community & Referral': FAQ[];
  'Reward & Savings': FAQ[];
};

// === SVG Icons ===
const PlusIcon = () => (
  <div className="border border-[#151515] bg-transparent rounded-full text-center flex items-center justify-center h-[24px] w-[24px] me-2">
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </div>
);

const MinusIcon = () => (
  <div className="border border-[#151515] bg-transparent rounded-full text-center flex items-center justify-center h-[24px] w-[24px] me-2">
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  </div>
);

const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// === Data ===
const faqData: FAQCategories = {
  'Saving & Rewards': [
    {
      question: 'What is Xtrempay?',
      answer: 'Xtrempay is a smart savings and rewards platform...',
    },
    {
      question: 'How does Raffle Saving work?',
      answer: 'Raffle Saving lets you win by saving regularly...',
    },
    {
      question: 'How does Trivia Saving work?',
      answer: 'You earn rewards by answering trivia while saving...',
    },
    {
      question: 'What’s Spin & Win?',
      answer: 'Spin & Win is a gamified reward mechanism...',
    },
    {
      question: 'Can I lose my savings if I don’t win?',
      answer: 'No, your savings are always safe...',
    },
  ],
  'Using the App': [
    {
      question: 'How do I sign up?',
      answer: 'Go to the signup page and fill in your details.',
    },
    {
      question: 'Is the app free?',
      answer: 'Yes, it’s free to download and use.',
    },
  ],
  'Community & Referral': [
    {
      question: 'How does referral work?',
      answer: 'Invite friends and earn rewards when they save.',
    },
  ],
  'Reward & Savings': [
    {
      question: 'What is Xtrempay?',
      answer: 'Xtrempay is a smart savings and rewards platform...',
    },
    {
      question: 'How does Raffle Saving work?',
      answer: 'Raffle Saving lets you win by saving regularly...',
    },
    {
      question: 'How does Trivia Saving work?',
      answer: 'You earn rewards by answering trivia while saving...',
    },
    {
      question: 'What’s Spin & Win?',
      answer: 'Spin & Win is a gamified reward mechanism...',
    },
    {
      question: 'Can I lose my savings if I don’t win?',
      answer: 'No, your savings are always safe...',
    },
  ],
};

const categories = Object.keys(faqData) as Array<keyof FAQCategories>;

// === Component ===
export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof FAQCategories>(
    categories[0]
  );
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Refs for DOM elements
  const categoriesRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([categoriesRef.current, faqsRef.current], {
        x: (index) => (index === 0 ? '-100%' : '100%'), // Categories from left, FAQs from right
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2, // Slight delay between animations
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []); // Runs once on mount

  // Scroll-based animation
  useGSAP(() => {
    // Animate Categories card swiping in from the left on scroll
    gsap.from(categoriesRef.current, {
      x: '-100%', // Swipe in from left
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: 'top 80%', // Start when 80% of the section is in view
        toggleActions: 'play none none none', // Play on enter, do nothing on leave
      },
    });

    // Animate FAQs section swiping in from the right on scroll
    gsap.from(faqsRef.current, {
      x: '100%', // Swipe in from right
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: faqsRef.current,
        start: 'top 80%', // Start when 80% of the section is in view
        toggleActions: 'play none play none', // Play on enter, do nothing on leave
      },
    });
  }, []); // Empty dependency array ensures setup runs once on mount

  return (
    <>
      <div id="faq" className="bg-[#F5F5F5] py-16 px-4 md:px-16 hero">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 md:gap-8">
          {/* Left - Heading */}
          <div className="md:w-2/1">
            <h2 className="text-2xl md:text-4xl font-bold leading-snug text-black">
              Having Questions About Us? <br />
              We Have Just The Right Answer For You.
            </h2>
          </div>

          {/* Right - Description */}
          <div className="md:w-1/1.2 text-lg sm:text-[.875rem] text-gray-600">
            <p>
              Everything you need to know about us. Can’t find the answer you’re
              looking for? Please chat with{' '}
              <a
                href="#"
                className="font-semibold text-black underline underline-offset-2"
              >
                our team here.
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Categories */}
          <div ref={categoriesRef} className="md:w-1/3 categories-card">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOpenIndexes([]); // Reset FAQ on category switch
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-left mb-4 transition ${
                    selectedCategory === cat
                      ? 'bg-[#4257D0] text-white'
                      : 'bg-[#E9E9E9] text-black'
                  }`}
                >
                  <span>{cat}</span>
                  <ChevronRightIcon />
                </button>
              ))}
            </div>
          </div>

          {/* Right - FAQs */}
          <div ref={faqsRef} className="md:w-2/3 md:px-8 faqs-section">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">FAQs</h3>
              {faqData[selectedCategory].map((faq, index: number) => (
                <div key={index} className="border-b py-3 border-[#0000001A]">
                  <button
                    className="w-full flex justify-between items-center text-left text-[#333] font-semibold text-lg"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span>{faq.question}</span>
                    {openIndexes.includes(index) ? <MinusIcon /> : <PlusIcon />}
                  </button>
                  {openIndexes.includes(index) && (
                    <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}