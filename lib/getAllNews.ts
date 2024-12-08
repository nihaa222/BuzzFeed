const api = "0cd77f140b1c4accb8832493e5c794be";

interface Article {
  description: string;
  content: string;
  author: number;
  urlToImage: string;
  source: { name: string };
  title: string;
  id: number;
}
export default async function getAllNews() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`
    );

    const newData = await res.json();
    const selectedData = newData.articles.filter(
      (data: Article) =>
        data.description !== null &&
        data.description !== "[Removed]" &&
        data.content !== null &&
        data.content
    );
    const updatedData = selectedData.map((item: Article, index: number) => {
      item.id = index + 1;
      return item;
    });
    return updatedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
