// hooks/useHeroAnimation.ts
import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type AnimationType = 'default' | 'slide-in' | 'scroll-merge' | 'fade-up' | 'zoom-in' | 'none' |'fade-in' | 'slide-up'; // Extend with more types as needed

interface UseHeroAnimationProps {
  heroRef: RefObject<HTMLElement>;
  imgRef: RefObject<HTMLImageElement>;
  textRef?: RefObject<HTMLDivElement>;
  animationType: AnimationType;
  enableScrollAnimation?: boolean;
  customOptions?: {
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    scrollDistance?: number;
  };
}

export const useHeroAnimation = ({
  heroRef,
  imgRef,
  textRef,
  animationType,
  enableScrollAnimation = false,
  customOptions = {}
}: UseHeroAnimationProps) => {
  
  const defaultOptions = {
    duration: 0.8,
    delay: 0,
    ease: "power3.out",
    stagger: 0.2,
    scrollDistance: 200,
    ...customOptions
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const animations = {
      default: () => {
        const img = imgRef.current;
        if (!img) return;

        const startAnimation = () => {
          gsap.fromTo(
            heroRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: "power4.out" }
          );

          gsap.fromTo(
            img,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "power4.out", delay: 0.3 }
          );
        };

        if (img.complete) {
          startAnimation();
        } else {
          img.onload = startAnimation;
        }
      },

      'slide-in': () => {
        const tl = gsap.timeline();
        
        if (textRef?.current) {
          tl.fromTo(
            textRef.current,
            { x: -100, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              duration: defaultOptions.duration, 
              ease: defaultOptions.ease 
            }
          );
        }
        
        if (imgRef.current) {
          tl.fromTo(
            imgRef.current,
            { x: 100, opacity: 0, scale: 0.8 },
            { 
              x: 0, 
              opacity: 1, 
              scale: 1, 
              duration: defaultOptions.duration, 
              ease: defaultOptions.ease 
            },
            `-=${defaultOptions.stagger}`
          );
        }
      },

      'scroll-merge': () => {
        // Initial load animation
        const tl = gsap.timeline();
        
        if (textRef?.current) {
          tl.fromTo(
            textRef.current,
            { x: -100, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              duration: defaultOptions.duration, 
              ease: defaultOptions.ease 
            }
          );
        }
        
        if (imgRef.current) {
          tl.fromTo(
            imgRef.current,
            { x: 100, opacity: 0, scale: 0.8 },
            { 
              x: 0, 
              opacity: 1, 
              scale: 1, 
              duration: defaultOptions.duration, 
              ease: defaultOptions.ease 
            },
            `-=${defaultOptions.stagger}`
          );
        }

        // Scroll-based animations
        if (enableScrollAnimation && heroRef.current) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              
              if (textRef?.current) {
                gsap.to(textRef.current, {
                  x: -defaultOptions.scrollDistance * progress,
                  duration: 0.1,
                  ease: "none"
                });
              }
              
              if (imgRef.current) {
                gsap.to(imgRef.current, {
                  x: defaultOptions.scrollDistance * progress,
                  duration: 0.1,
                  ease: "none"
                });
              }
            }
          });
        }
      },

      'fade-up': () => {
        const elements = [textRef?.current, imgRef.current].filter(Boolean);
        
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: defaultOptions.duration, 
            ease: defaultOptions.ease,
            stagger: defaultOptions.stagger,
            delay: defaultOptions.delay
          }
        );
      },

      'zoom-in': () => {
        const tl = gsap.timeline();
        
        if (textRef?.current) {
          tl.fromTo(
            textRef.current,
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: defaultOptions.duration, 
              ease: "back.out(1.7)" 
            }
          );
        }
        
        if (imgRef.current) {
          tl.fromTo(
            imgRef.current,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { 
              scale: 1, 
              opacity: 1, 
              rotation: 0, 
              duration: defaultOptions.duration, 
              ease: "back.out(1.7)" 
            },
            `-=${defaultOptions.stagger}`
          );
        }
      },

      none: () => {
        // No animations
      },
      'fade-in': () => {
        const elements = [textRef?.current, imgRef.current].filter(Boolean);
        gsap.fromTo(
          elements,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: defaultOptions.duration, 
            ease: defaultOptions.ease,
            stagger: defaultOptions.stagger,
            delay: defaultOptions.delay
          }
        );
      },
      'slide-up': () => {
        const elements = [textRef?.current, imgRef.current].filter(Boolean);
        gsap.fromTo(
          elements,
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: defaultOptions.duration, 
            ease: defaultOptions.ease,
            stagger: defaultOptions.stagger,
            delay: defaultOptions.delay
          }
        );
      }
    };

    // Execute animation
    if (animations[animationType]) {
      animations[animationType]();
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, enableScrollAnimation, heroRef, imgRef, textRef, defaultOptions]);
};

// Utility function to create animation configs
export const createAnimationConfig = (type: AnimationType, options?: any) => ({
  animationType: type,
  ...options
});