import React from "react";
import { Dancing_Script } from "next/font/google";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";
export const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});
function Footer() {
  return (
    <div className="px-10 mb-10 mt-5 justify-between items-center  relative flex gap-3 flex-col xl:flex-row z-50 h-20 ">
      <p
        className={`${dancing_script.className} cursor-pointer text-center inline-block font-bold text-2xl shadow-sm backdrop-blur-sm rounded-2xl  bg-opacity-5`}
      >
        BuzzFeed
      </p>
      <div className="text-[14px] cursor-pointer justify-center gap-4 flex-wrap  flex  text-center leading-none md:leading-loose">
        <p>For Readers</p>
        <p>Explore Topics</p>
        <p>Breaking News</p>
        <p>Subscribe</p>
        <p>Careers</p>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
      </div>

      <div className="flex gap-3 justify-center cursor-pointer">
        <FaSquareInstagram />
        <FaSquareFacebook />
        <RiTwitterXLine />
        <FaPinterest />
      </div>
    </div>
  );
}

export default Footer;
