import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import React from "react";

interface NewsPageProps {
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
}

const NewsPage: React.FC<NewsPageProps> = async ({ params }) => {
  const { id } = await params;
  const getAllData = await getAllNews();
  const selectedData = getAllData.filter(
    (item: Article) => item.id === parseInt(id)
  );
  const finalData = selectedData[0];
  // console.log(selectedData);
  return (
    <div className="mt-8">
      <p className="text-center text-xl font-bold text-md md:leading-8  xl:leading-loose tracking-wide  mx-auto w-full px-3 sm:p-0 sm:w-2/3">
        {finalData.title}
      </p>
      <p className="text-pink-500 text-center text-sm">
        Source: {finalData.source.name}
      </p>
      <div className="flex justify-center p-3">
        <img
          className="w-full rounded-md md:w-2/3 xl:w-1/3 h-64 "
          src={finalData.urlToImage}
          alt="urlImage"
        ></img>
      </div>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {finalData.description}
      </p>
      <p className="text-startw-full md:w-2/3 xl:w-1/3 mx-auto">
        {finalData.content}
      </p>
      <p className="text-center text-[14px] underline text-pink-400">
        <a target="_blank" rel="noopener noreferrer" href={finalData.url}>
          Read More Here{" "}
        </a>
      </p>
    </div>
  );
};

export default NewsPage;
