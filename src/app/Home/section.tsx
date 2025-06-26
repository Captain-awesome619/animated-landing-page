// components/Section.tsx
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  title: string;
  content: string;
  image?: string;
}

export default function Section({ title, content, image }: SectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    const anim = gsap.fromTo(
      el,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      }
    );
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        }
      );
    }
    return () => anim.scrollTrigger?.kill();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[60vh] px-8 py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-6">{content}</p>
      {image && <img ref={imageRef} src={image} alt={title} className="w-full max-w-2xl mx-auto rounded-lg shadow-md" />}
    </section>
  );
}
