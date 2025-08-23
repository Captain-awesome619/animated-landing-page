'use client'
import Hero from "./hero";
import React from "react";
import Image from "next/image";
import tiktok from '../../../public/images/tiktok.svg'
import x from '../../../public/images/x.svg'
import ig from '../../../public/images/ig.svg'
import facebook from '../../../public/images/facebook.svg'



interface helpSectionProps {
  
   form? : React.RefObject<HTMLDivElement | null>
}

const Needhelp  = ({
 
  form,

}: helpSectionProps) => {
  // Refs for animation ta
  return (
    <div className="h-screen flex gap-[2rem]  justify-center ">
      {/* Responsive wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full  lg:pt-[8%]">
        
        {/* LEFT SECTION */}
        <div className="grid lg:gap-[3rem] items-center justify-center">
          <div className="grid gap-[1rem] justify-center items-center text-center md:text-left">
            <h2 className="font-[600] lg:text-[38px] text-black ">
              Need Help? Xtrempay's Got You.
            </h2>
            <h2 className="font-[500] text-[18px] text-black/70">
              Whether you're saving, spinning, or making payments — we're always here for you.
            </h2>

            {/* Talk to Us */}
            <div className="flex flex-col gap-[0.5rem]">
              <h4 className="font-[600] text-[16px] text-black">Talk to Us</h4>
              <h4 className="font-[400] text-[18px] text-black/70">
                Call/WhatsApp: <span className="text-[#4257D0]">+234 703 293 2410</span>
              </h4>
              <h4 className="font-[400] text-[18px] text-black/70 pt-1">Mon-Sat | 9AM-5PM</h4>
            </div>

            {/* In-App Chat */}
            <div className="flex flex-col gap-[0.5rem]">
              <h4 className="font-[600] text-[16px] text-black">In-App Chat</h4>
              <h4 className="font-[400] text-[18px] text-black/70 pt-2">
                Open Xtrempay → Tap Help → Start a Live
              </h4>
            </div>

            {/* Email Us */}
            <div className="flex flex-col gap-[0.5rem]">
              <h4 className="font-[600] text-[16px] text-black">Email Us</h4>
              <h4 className="font-[400] text-[18px] text-black/70">
                General Support: <span className="text-[#4257D0]">support@xtrempay.com</span>
              </h4>
              <h4 className="font-[400] text-[18px] text-black/70">
                Partnerships: <span className="text-[#4257D0]">business@xtrempay.com</span>
              </h4>
            </div>
          </div>

          {/* Socials + Help Now */}
         {/* Socials + Help Now */}
<div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
  {/* Socials */}
  <div className="grid gap-2">
    <h2 className="font-[400] lg:text-[19px] text-black">Need Help? Xtrempay's Got You.</h2>
    <h2 className="font-[400] text-[18px] text-black/70">
      Follow us for tips, updates, and giveaways:
    </h2>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Image src={ig} alt="ig" height={20} width={20} />
        <h4 className="font-[400] text-[18px] text-black/70">@Xtrempayng</h4>
      </div>
      <div className="flex items-center gap-2">
        <Image src={tiktok} alt="tiktok" height={20} width={20} />
        <h4 className="font-[400] text-[18px] text-black/70">@Xtrempay</h4>
      </div>
      <div className="flex items-center gap-2">
        <Image src={facebook} alt="facebook" height={20} width={20} />
        <h4 className="font-[400] text-[18px] text-black/70">XtrempayAfrica</h4>
      </div>
      <div className="flex items-center gap-2">
        <Image src={x} alt="x" height={20} width={20} />
        <h4 className="font-[400] text-[18px] text-black/70">@Xtrempay</h4>
      </div>
    </div>
  </div>

  {/* Help Now */}
  <div className="grid gap-6">
    <h2 className="font-[400] lg:text-[19px] text-black">Need Help Now</h2>
    <div className="font-[400] text-[17px] text-black/70">
      [ Start Chatting In-App ] <br />
      [ FAQs - Find Instant Answers ] <br />
      [ Become a Merchant ]
    </div>
   
  </div>
</div>

          
        </div>

        {/* RIGHT SECTION */}
        <div ref={form} className="flex flex-col gap-[2rem]  text-center md:text-left">
          <div className="flex flex-col mt-[1.5rem]">
            <h2 className="font-[600] lg:text-[38px] text-black">Get in Touch </h2>
            <h2 className="font-[400] lg:text-[20px] text-black/65">You can reach us anytime</h2>
          </div>
           <div className="grid gap-4">
<div className="flex justify-between">
<input  type="text" placeholder="First name" className="text-[#ABAFB1] font-[600] w-[200px] appearance-none  outline-none   focus:outline-none h-[52px] rounded-2xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"/>
<input  type="text" placeholder="Last name"  className="text-[#ABAFB1] font-[600] w-[200px] appearance-none  outline-none  m-0 focus:outline-none h-[52px] rounded-2xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"/>
</div>
<input  type="text" placeholder="Your email"  className="text-[#ABAFB1] font-[600] w-full appearance-none  outline-none  m-0 focus:outline-none h-[52px] rounded-2xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"/>
<input  type="text" placeholder="Phone number"  className="text-[#ABAFB1] font-[600] w-full appearance-none  outline-none  m-0 focus:outline-none h-[52px] rounded-2xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"/>
<textarea  placeholder="How can we help?"  className="text-[#ABAFB1] font-[600] w-full appearance-none  outline-none  m-0 focus:outline-none h-[400px] rounded-2xl bg-[#F6F7FB] p-3  border-[#000000]/10 border-[1px]"/>
    <button className="w-full h-[60px] bg-[#4257D0] cursor-pointer rounded-xl text-[16px] text-white font-[600]">Submit</button>
    </div>
        </div>

      </div>
    </div>
  )
}

export default Needhelp;
