"use client";
import React, { useEffect, useState } from "react";
import pinksearch from "@/public/pinksearch.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ApiSearch {
  api: string;
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

const Search: React.FC<ApiSearch> = ({ api }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [data, setData] = useState<Article[]>([]);
  // console.log(data);

  const fetchData = async (term: string) => {
    if (term) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${term}&sortBy=popularity&apiKey=${api}`
      );
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        console.log(
          `You need to wait for ${retryAfter} seconds before retrying.`
        );
      }
      const data = await res.json();

      const newData = data.articles.filter(
        (fildata: Article) =>
          (fildata.content !== "[Removed]" &&
            fildata.description !== "[Removed]" &&
            fildata.title?.includes(term)) ||
          fildata.description?.includes(term)
      );

      const updatedData = newData.map((item: Article, index: number) => {
        item.id = index + 1;
        return item;
      });
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("searchResults", JSON.stringify(updatedData));
      router.push(`/detail`);
      setData(updatedData); // Update the data state
    }
  };

  // Fetch data on debounced term

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    fetchData(searchTerm); // Explicitly call the API with the current term
  };

  return (
    <div className="relative px-10 sm:px-20 md:px-0 md:w-1/2 xl:w-1/3 mx-auto mt-5">
      <form onSubmit={handleFormSubmit} className="relative">
        <input
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-5 py-2 rounded-3xl border bg-gray-200 focus:border-pink-400 focus:outline-none"
          type="text"
          placeholder="What are you looking for..."
        />

        <button type="submit" className="absolute h-6 w-6 top-[10px] right-2">
          <Image
            alt="search"
            src={pinksearch || null}
            className="h-full w-full"
          />
        </button>
      </form>

      {/* Render Results */}
    </div>
  );
};

export default Search;
