import { GetServerSideProps } from "next";
import Image from "next/image";
import getAllNews from "@/lib/getAllNews"; // Assuming this is your API call to fetch the news

// Define the Article type (you already have this)
interface Article {
  description: string;
  content: string;
  author: number;
  urlToImage: string;
  source: { name: string };
  title: string;
  id: number;
  url: string; // Assuming the article has a `url` property
}

// Define the props for the page
interface NewsPageProps {
  selectedData: Article | null; // This will hold the selected article
}

const NewsPage: React.FC<NewsPageProps> = ({ selectedData }) => {
  // If no article data was found, display a fallback UI
  if (!selectedData) {
    return <div>Article not found.</div>;
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
          Read More Here
        </a>
      </p>
    </div>
  );
};

// Server-side function to fetch the article data before rendering the page
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }; // Ensure that `id` is typed as a string
  const getAllData = await getAllNews(); // Fetch all articles

  // Find the selected article by ID (parse it to an integer for comparison)
  const selectedArticle = getAllData?.find(
    (item: Article) => item.id === parseInt(id)
  );

  // Return the article data as props to the page component
  return {
    props: {
      selectedData: selectedArticle || null, // If no article is found, pass `null`
    },
  };
};

export default NewsPage;
