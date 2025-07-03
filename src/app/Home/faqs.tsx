'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleQuestion = useCallback((index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  // Memoize category change handler
  const handleCategoryChange = useCallback((cat: keyof FAQCategories) => {
    setSelectedCategory(cat);
    setOpenIndexes([]); // Reset FAQ on category switch
  }, []);

  // Refs for DOM elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  
  // Store GSAP context and timeline refs for cleanup
  const contextRef = useRef<gsap.Context | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP Animations with proper cleanup
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create GSAP context for better cleanup
    contextRef.current = gsap.context(() => {
      // Set initial states (hidden)
      gsap.set([headingRef.current, descriptionRef.current], {
        y: -50,
        opacity: 0,
      });

      gsap.set(categoriesRef.current, {
        x: 100,
        opacity: 0,
      });

      gsap.set(faqsRef.current, {
        x: -100,
        opacity: 0,
      });

      // Create timeline for sequential animations
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          // Add id for easier cleanup
          id: 'faq-section-trigger',
        }
      });

      // Animate title and description from top
      timelineRef.current.to([headingRef.current, descriptionRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
      })
      // Animate categories from right
      .to(categoriesRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      // Animate FAQs from left
      .to(faqsRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6');

    }, sectionRef.current);

    // Cleanup function
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
        contextRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      // Kill all ScrollTriggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'faq-section-trigger') {
          trigger.kill();
        }
      });
    };
  }, []);

  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure all GSAP instances are cleaned up
      if (contextRef.current) {
        contextRef.current.revert();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // Kill any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'faq-section-trigger') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={sectionRef}
        id="faq" 
        className="bg-[#F5F5F5] py-16 px-4 md:px-16 hero"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 md:gap-8">
          {/* Left - Heading */}
          <div ref={headingRef} className="md:w-2/1">
            <h2 className="text-2xl md:text-4xl font-bold leading-snug text-black">
              Having Questions About Us? <br />
              We Have Just The Right Answer For You.
            </h2>
          </div>

          {/* Right - Description */}
          <div 
            ref={descriptionRef}
            className="md:w-1/1.2 text-lg sm:text-[.875rem] text-gray-600"
          >
            <p>
              Everything you need to know about us. Can't find the answer you're
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
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-left mb-4 transition-all duration-300 hover:transform hover:scale-105 ${
                    selectedCategory === cat
                      ? 'bg-[#4257D0] text-white shadow-md'
                      : 'bg-[#E9E9E9] text-black hover:bg-gray-200'
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
                <div key={`${selectedCategory}-${index}`} className="border-b py-3 border-[#0000001A]">
                  <button
                    className="w-full flex justify-between items-center text-left text-[#333] font-semibold text-lg hover:text-[#4257D0] transition-colors duration-200"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span>{faq.question}</span>
                    <div className="transition-transform duration-200 ease-in-out">
                      {openIndexes.includes(index) ? <MinusIcon /> : <PlusIcon />}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndexes.includes(index) 
                        ? 'max-h-96 opacity-100 mt-2' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-gray-600 pb-2">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}