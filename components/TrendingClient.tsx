import getAllNews from "@/lib/getAllNews";
import Image from "next/image";
import Link from "next/link";

interface TrendingProps {
  apis: string;
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

const TrendingClient: React.FC<TrendingProps> = async ({ apis }) => {
  // const [data, setData] = useState<Article[]>([]);
  const data: Article[] = await getAllNews();
  // const [loading, setLoading] = useState<boolean>(true); // Add loading state
  // console.log(data);

  return (
    <div className="p-10">
      {/* {loading ? (
        // Loader
        <div className="flex justify-center items-center h-screen -mt-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : ( */}

      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
        {data.map((newData, index) => (
          <div key={index} className="relative group">
            {/* Image */}
            <Link href={`/news/${newData.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}

              <Image
                alt="image"
                src={newData.urlToImage} // Ensure newData.urlToImage is a valid URL string
                className="w-full h-auto rounded-md"
                width={500} // You must specify width and height for Next.js Image component
                height={300} // You can adjust the values to match your image aspect ratio
              />
              {/* Hover Overlay */}
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
      {/* )} */}
    </div>
  );
};

export default TrendingClient;
