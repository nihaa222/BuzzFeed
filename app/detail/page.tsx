"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Article {
  description: string;
  content: string;
  author: number;
  urlToImage: string;
  source: { name: string };
  title: string;
  id: number;
}
function Page() {
  const [modifiedTerm, setModifiedTerm] = useState<string>("");
  const [data, setData] = useState<Article[]>([]);

  console.log("data", data);

  // Helper function to capitalize the first letter of a string
  function firstCapital(string: string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string; // Return the string as-is if it's empty or null
  }

  // Use effect to safely access localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchTerm = localStorage.getItem("searchTerm");
      const newData = localStorage.getItem("searchResults");
      if (searchTerm) {
        const updatedTerm = firstCapital(searchTerm);
        setModifiedTerm(updatedTerm); // Update state to trigger a re-render
      }
      if (newData) {
        try {
          const parsedData = JSON.parse(newData); // Parse JSON string to an array
          setData(parsedData);
        } catch (error) {
          console.error("Error parsing searchResults:", error);
        }
      }
    }
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="mt-10 flex flex-col ">
      <p className="text-center font-bold text-2xl">{modifiedTerm}</p>
      <p className="text-[14px] text-gray-500 text-center">
        Catch all the slam dunks of the latest {modifiedTerm} news right here!
      </p>
      {data.length !== 0 ? (
        <div className=" p-5 pt-10 grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
          {data?.map((newData, index) => (
            <div key={index} className="relative group">
              <Link href={`/detail/${newData.id}?id=${newData.id}`}>
                <img
                  alt="image"
                  src={newData.urlToImage}
                  className="w-full h-auto rounded-md"
                />

                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-end items-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="text-white p-4">
                    <h3 className="text-lg font-bold">{newData.source.name}</h3>
                    <p className="text-sm">{newData.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center font-semibold items-center flex-col gap-5 mt-20">
          <p>No Results Found</p>
          <Link href={"/"}>
            <button className="px-4 py-2 bg-black text-white font-mono rounded-2xl">
              Go To Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Page;
