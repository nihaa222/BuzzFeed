"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // No need for useSearchParams or useRouter in this case

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

const DetailsPage: React.FC = () => {
  // Correctly handle id to always be a string
  const { id } = useParams();
  const idAsString = Array.isArray(id) ? id[0] : id; // Ensure `id` is a string

  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("searchResults");
    if (storedData) {
      try {
        const parsedData: Article[] = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Find the article matching the `id`
  const finalData = idAsString
    ? data.find((item: Article) => item.id === parseInt(idAsString))
    : null;

  return (
    <div className="mt-8">
      {finalData ? (
        <>
          <p className="text-center text-xl font-bold text-md md:leading-8 xl:leading-loose tracking-wide mx-auto w-full px-3 sm:p-0 sm:w-2/3">
            {finalData?.title}
          </p>
          <p className="text-pink-500 text-center text-sm">
            Source: {finalData?.source.name}
          </p>
          <div className="flex justify-center p-3">
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
          <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
            {finalData?.content}
          </p>
          <p className="text-center text-[14px] underline text-pink-400">
            <a target="_blank" rel="noopener noreferrer" href={finalData?.url}>
              Read More Here
            </a>
          </p>
        </>
      ) : (
        <p className="text-center">Article not found</p>
      )}
    </div>
  );
};

export default DetailsPage;
