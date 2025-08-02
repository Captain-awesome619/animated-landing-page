import BackgroundHero from "./bgHero";
import FaqSection from "./faqs";
import Hero from "./hero";
import PosSection from "./posHero";
import Section from "./section";
import TestimonialSection from "./testimonial";
import TriviaSavings from "./triviaSavings";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";
const HomePage = () => {
  return (
    <>
   
      <Hero num={1} title="Save Smart. Pay Fast. Earn Big." description="Whether you're saving for your future, making quick payments, or running a business. Xtrempay makes it fast, fun, and financially rewarding." ctaLink="/" ctaText="Download" videoText="Watch our video" imageAlt="Xreampay App"  imageClassName="hero__img1" imgHeight={500} imgWidth={1100} bgColor="transparent" layoutVariant="split" colSet="1/3" animationType="scroll-merge"/>
          
     
      <TriviaSavings />
      <PosSection />
      <TestimonialSection />
      <FaqSection />
    </>
  );
};
export default HomePage;
