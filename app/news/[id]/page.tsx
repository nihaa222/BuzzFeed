import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import { Metadata } from "next";
import { FC } from "react";

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

// Define the params type for the dynamic route
interface NewsPageParams {
  id: string;
}

// Server Component (Data fetching happens directly inside the component)
const NewsPage: FC<{ params: NewsPageParams }> = async ({ params }) => {
  console.log(params);
  const { id } = params; // Get the id from params
  //y
  // Fetch all news data (server-side)
  const getAllData = await getAllNews();
  console.log(getAllData);

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
          src={selectedData?.urlToImage || "/path/to/placeholder-image.jpg"}
          alt={selectedData?.title || "Image not available"}
          width={500}
          height={300}
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
          Read More Here
        </a>
      </p>
    </div>
  );
};

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: NewsPageParams;
}): Promise<Metadata> {
  const { id } = params;

  // Fetch all news data
  const getAllData = await getAllNews();

  // Find the specific article
  const selectedData = getAllData?.find(
    (item: Article) => item.id === parseInt(id)
  );

  return {
    title: selectedData ? selectedData.title : "News Article",
    description: selectedData
      ? selectedData.description
      : "News Article Details",
  };
}

export default NewsPage;
