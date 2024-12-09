import getAllNews from "@/lib/getAllNews";
import Image from "next/image";

// Define the Article type
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

// Define the params type
interface PageParams {
  params: { id: string };
}

const NewsPage = async ({ params }: PageParams) => {
  const { id } = await params;
  //i
  console.log("PARMSSSS", id);

  const getAllData = await getAllNews();

  // Find the article by id
  const selectedData = getAllData?.find((item) => item.id === parseInt(id));

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
          src={selectedData.urlToImage || "/path/to/placeholder-image.jpg"}
          alt={selectedData.title || "Image not available"}
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

export default NewsPage;
