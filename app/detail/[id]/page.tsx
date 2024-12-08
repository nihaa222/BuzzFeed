"use client";
import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface DetailsPageProps {
  params: {
    id: string;
  };
}
interface Article {
  description: string;
  content: string;
  author: number;
  urlToImage: string;
  source: { name: string };
  title: string;
  id: number;
  url: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ params }) => {
  const searchParams = useParams();
  const id = searchParams.id;

  console.log(id);
  const [data, setData] = useState<Article[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("searchResults");
    if (storedData) {
      try {
        const parsedData: Article[] = JSON.parse(storedData); // Parse JSON string
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const finalData = id
    ? data.find((item: Article) => item.id === parseInt(id))
    : null;
  console.log(finalData);
  // console.log(selectedData);
  return (
    <div className="mt-8">
      <p className="text-center text-xl font-bold text-md md:leading-8  xl:leading-loose tracking-wide  mx-auto w-full px-3 sm:p-0 sm:w-2/3">
        {finalData?.title}
      </p>
      <p className="text-pink-500 text-center text-sm">
        Source: {finalData?.source.name}
      </p>
      <div className="flex justify-center p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <Image
          className="w-full rounded-md md:w-2/3 xl:w-1/3 h-64"
          src={finalData?.urlToImage || "/path/to/placeholder-image.jpg"} // Fallback to placeholder if the image URL is invalid
          alt={finalData?.title || "Image not available"} // Use title or a default alt text
          width={500} // Define the width for the image
          height={300} // Define the height for the image
        />
      </div>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {finalData?.description}
      </p>
      <p className="text-startw-full md:w-2/3 xl:w-1/3 mx-auto">
        {finalData?.content}
      </p>
      <p className="text-center text-[14px] underline text-pink-400">
        <a target="_blank" rel="noopener noreferrer" href={finalData?.url}>
          Read More Here{" "}
        </a>
      </p>
    </div>
  );
};

export default DetailsPage;
