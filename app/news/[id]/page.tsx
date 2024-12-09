import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import React from "react";

// Define Article type
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

// Server Component (Data fetching happens directly inside the component)
const NewsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params; // Get the `id` from params

  // Fetch all news data (server-side)
  const getAllData = await getAllNews();
  const selectedData = getAllData?.find(
    (item: Article) => item.id === parseInt(id)
  );

  // Handle case where no article is found
  if (!selectedData) {
    return <div>No article found.</div>;
  }

  return (
    <div className="mt-8">
      <p className="text-center text-xl font-bold text-md md:leading-8 xl:leading-loose tracking-wide mx-auto w-full px-3 sm:p-0 sm:w-2/3">
        {selectedData.title}
      </p>
      <p className="text-pink-500 text-center text-sm">
        Source: {selectedData.source.name}
      </p>
      <div className="flex justify-center p-3">
        <Image
          className="w-full rounded-md md:w-2/3 xl:w-1/3 h-64"
          src={selectedData?.urlToImage || "/path/to/placeholder-image.jpg"} // Fallback to placeholder if the image URL is invalid
          alt={selectedData?.title || "Image not available"} // Use title or a default alt text
          width={500} // Define the width for the image
          height={300} // Define the height for the image
        />
      </div>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {selectedData.description}
      </p>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {selectedData.content}
      </p>
      <p className="text-center text-[14px] underline text-pink-400">
        <a target="_blank" rel="noopener noreferrer" href={selectedData.url}>
          Read More Here{" "}
        </a>
      </p>
    </div>
  );
};

export default NewsPage;
