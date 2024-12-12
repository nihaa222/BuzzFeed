import Search from "@/components/Search";
import Title from "@/components/Title";
import Image from "next/image";
import { Arvo } from "next/font/google";
import TrendingClient from "@/components/TrendingClient";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["700"], // You can use multiple weights in an array
});

export default function Home() {
  const api = "952ceea87ef04dd79e759af24c71e9b5";
  return (
    <>
      <div className="px-10 sm:px-20 md:px-0 md:w-1/2  xl:w-1/3 mx-auto mt-10">
        <p
          className={`${arvo.className} leading-10  text-2xl md:text-4xl font-bold text-center tracking-wided `}
        >
          Uncover the Stories That Matters to You
        </p>
        <p className="text-gray-700 text-[15px] text-center mt-2">
          Dive deep into the issues that are driving global conversations and
          shaping the future.
        </p>
      </div>
      <Search api={api} />
      <p className="text-center mt-5 font-serif">Trending News</p>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen -mt-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        }
      >
        <TrendingClient apis={api} />
      </Suspense>
    </>
  );
}
// https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=6f19b533d5c4449299fcdfb68240e985
