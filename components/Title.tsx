"use client";

import { GiCrossedBones } from "react-icons/gi";
import { RiMenu2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import pinkball from "@/public/pink ball.png";
import Search from "./Search";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
export const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});

const Title: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedMenuState = localStorage.getItem("isMenuOpen");
    if (savedMenuState) {
      setIsMenuOpen(JSON.parse(savedMenuState));
    }
  }, []);
  const toggleIcon = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isMenuOpen", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }),
    [isMenuOpen];

  return (
    <>
      <div className="relative   ">
        {isMenuOpen && (
          <div className="absolute top-0 z-20 left-0 h-screen w-full bg-black bg-opacity-20 backdrop-blur-[2px] rounded-lg"></div>
        )}
        <div className="relative z-50 flex justify-between items-center gap-3 mt-2 bg-white p-3 ">
          <div className="flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 1.5 }}
              className="md:hidden  relative  "
              onClick={toggleIcon}
            >
              {isMenuOpen ? <GiCrossedBones /> : <RiMenu2Line />}
            </motion.div>
            <div className="flex items-center gap-12  ">
              <Link href="/">
                <p
                  className={`${dancing_script.className} font-bold text-2xl shadow-sm backdrop-blur-sm bg-pink-600 rounded-2xl p-2 bg-opacity-5`}
                >
                  BuzzFeed
                </p>
              </Link>

              {!isMenuOpen && (
                <div className="font-semi-bold hidden md:block mt-1  cursor-pointer  ">
                  <ul className="flex gap-6 text-[16px]">
                    <Link href="/">
                      {" "}
                      <li className=" hover:text-pink-300">Home</li>
                    </Link>
                    <Link href={"/about"}>
                      <li className=" hover:text-pink-300">About</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <motion.div
              animate={{ y: [0, -10, 10, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Image alt="ball" className="h-8 w-8" src={pinkball}></Image>
            </motion.div>
            <button className="px-4 py-2 bg-black text-white font-mono rounded-2xl">
              Like
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100px" }}
          animate={{ x: "0" }}
          transition={{
            type: "spring", // Use spring physics for the bounce
            stiffness: 500, // Controls the stiffness (higher is less bouncy)
            damping: 25, // Controls how quickly it slows down (higher is less bouncy)
            duration: 2, // Optional: total duration, but spring is based on stiffness and damping
          }}
          className=" absolute z-50 w-full"
        >
          <div className="font-bold p-6  border-2 bg-white   shadow-xl cursor-pointer  ">
            <ul className="flex flex-col gap-2">
              <Link href={"/"}>
                <li className=" hover:text-pink-300">Home</li>
              </Link>
              <Link href={"/about"}>
                <li className=" hover:text-pink-300">About</li>
              </Link>
            </ul>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Title;
