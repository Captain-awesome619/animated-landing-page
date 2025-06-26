import BackgroundHero from "./bgHero";
import FaqSection from "./faqs";
import Hero from "./hero";
import PosSection from "./posHero";
import Section from "./section";
import TestimonialSection from "./testimonial";
import TriviaSavings from "./triviaSavings";

const HomePage = () => {
  return (
    <>
   
      <Hero title="Save Smart. Pay Fast. Earn Big." description="Whether you're saving for your future, making quick payments, or running a business. Xtrempay makes it fast, fun, and financially rewarding." ctaLink="/" ctaText="Download" videoText="Watch our video" imageAlt="Xreampay App" imageSrc="/images/Xtrempay.png" imageClassName="hero__img1" imgHeight={500} imgWidth={1100} bgColor="transparent" layoutVariant="split" colSet="1/3"/>
            <Hero title="Save Smart. Pay Fast. Earn Big." description="Whether you're saving for your future, making quick payments, or running a business. Xtrempay makes it fast, fun, and financially rewarding." ctaLink="/" ctaText="Download" videoText="Watch our video" imageAlt="Xreampay App" imageSrc="/images/phone.png" imageClassName="hero__img mb-5" imgHeight={833} imgWidth={456.94} bgColor="bg-[#EEF1F6]" colSet="1/3" layoutVariant="split" imgColset="2/3"/>
            <Hero title="Save Smart. Pay Fast. Earn Big." description="Whether you're saving for your future, making quick payments, or running a business. Xtrempay makes it fast, fun, and financially rewarding." ctaLink="/" ctaText="Download" videoText="Watch our video" imageAlt="Xreampay App" imageSrc="/images/landscape.png" imageClassName="hero__img3 mb-5" imgHeight={456.94} imgWidth={833} bgColor="" colSet="1/3" layoutVariant="centered" imgColset="2/3"/>
      <BackgroundHero
        backgroundImageAlt="African Man"
        imageClassName=""
        backgroundImageSrc="/images/african-american.png"
        title=""
        description=""
      />
      <TriviaSavings />
      <PosSection />
      <TestimonialSection />
      <FaqSection />
    </>
  );
};
export default HomePage;
