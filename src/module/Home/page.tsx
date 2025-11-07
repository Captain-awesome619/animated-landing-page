'use client'

import FaqSection from './faqs'
import Hero from './hero'
import Needhelp from './needHelp'
import PosSection from './posHero'
import TestimonialSection from './testimonial'
import SavingsSection from './triviaSavings'

const HomePage = () => {
  return (
    <>
      <Hero
        num={1}
        title="Save Smart. Pay Fast. Earn Big."
        description="Whether you're saving for your future, making quick payments, or running a business. Xtrempay makes it fast, fun, and financially rewarding."
        ctaLink="/"
        ctaText="Download"
        videoText="Watch our video"
        imageAlt="Xreampay App"
        imageClassName="hero__img1"
        imgHeight={500}
        imgWidth={1100}
        bgColor="transparent"
        layoutVariant="split"
        colSet="1/3"
        animationType="scroll-merge"
      />
      <SavingsSection />

      <PosSection />

      <TestimonialSection />

      <Needhelp />

      <FaqSection />
    </>
  )
}
export default HomePage
