'use client';
import Image from 'next/image';
import Link from 'next/link';

interface PosSectionProps {
  bgColor?: string;
  posImageSrc?: string;
  posImageAlt?: string;
}

const PosSection = ({
  bgColor = 'bg-white',
  posImageSrc = '/images/pos-lady.png', // Placeholder for POS image
  posImageAlt = 'Xtrempay POS Agent',
}: PosSectionProps) => {
  return (
    <section className={`${bgColor} min-h-screen relative overflow-hidden py-12 lg:py-20 px-4 lg:px-8 hero`}>
      {/* Container */}
    <div className="text-center mx-auto">
          <h3 className="text-blue-600 text-xl md:text-2xl mb-2">Xtrempay POS?</h3>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Free POS for Agents & Merchants</h1>
          <p className="text-gray-600 text-base md:text-lg mb-10">
            Xtrempay gives you a POS machine at no cost, so you can grow your hustle and serve your community.
          </p>
    </div>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src={posImageSrc}
            alt={posImageAlt}
            width={610}
            height={600}
            className="object-contain mx-auto"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 lg:pl-6 text-center lg:text-left">
          
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
              {/* <ul className="list-disc list-inside space-y-2 text-base md:text-lg"> */}
                <div>Small business owners</div>
                <div>Mobile money agents</div>
                <div>Anyone ready to make extra income</div>
              {/* </ul> */}
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