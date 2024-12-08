import { GetServerSideProps } from "next";
import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import React from "react";

interface NewsPageProps {
  params: {
    id: string;
  };
  article: Article | null;
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

const NewsPage: React.FC<NewsPageProps> = ({ params, article }) => {
  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <div className="mt-8">
      <p className="text-center text-xl font-bold text-md md:leading-8 xl:leading-loose tracking-wide mx-auto w-full px-3 sm:p-0 sm:w-2/3">
        {article.title}
      </p>
      <p className="text-pink-500 text-center text-sm">
        Source: {article.source.name}
      </p>
      <div className="flex justify-center p-3">
        <Image
          className="w-full rounded-md md:w-2/3 xl:w-1/3 h-64"
          src={article?.urlToImage || "/path/to/placeholder-image.jpg"} // Fallback to placeholder if the image URL is invalid
          alt={article?.title || "Image not available"} // Use title or a default alt text
          width={500} // Define the width for the image
          height={300} // Define the height for the image
        />
      </div>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {article.description}
      </p>
      <p className="text-start w-full md:w-2/3 xl:w-1/3 mx-auto">
        {article.content}
      </p>
      <p className="text-center text-[14px] underline text-pink-400">
        <a target="_blank" rel="noopener noreferrer" href={article.url}>
          Read More Here{" "}
        </a>
      </p>
    </div>
  );
};

// Using GetServerSideProps to fetch the article data
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const getAllData = await getAllNews();

  const selectedData = getAllData?.find(
    (item: Article) => item.id === parseInt(id)
  );

  return {
    props: {
      params,
      article: selectedData || null, // If no article found, pass null
    },
  };
};

export default NewsPage;
