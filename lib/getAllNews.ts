const api = "0cd77f140b1c4accb8832493e5c794be";

interface Article {
  description: string;
  content: string;
  author: string;
  urlToImage: string;
  source: { name: string };
  title: string;
  id: number;
  url: string;
}

// Validate if a URL points to an image
function isValidImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
}

// Check if the image URL is accessible
async function isImageValid(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const contentType = res.headers.get("Content-Type");
    return (res.ok && contentType?.startsWith("image/")) || false;
  } catch (error) {
    console.error("Error validating image:", error);
    return false;
  }
}

// Fetch and filter news articles
export default async function getAllNews(): Promise<Article[]> {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const newData = await res.json();

    // Filter articles
    const filteredArticles = await Promise.all(
      newData.articles.map(async (article: Article) => {
        const isValidImage =
          article.urlToImage &&
          isValidImageUrl(article.urlToImage) &&
          (await isImageValid(article.urlToImage));

        if (
          article.description &&
          article.description !== "[Removed]" &&
          article.content &&
          isValidImage
        ) {
          return article;
        }
        return null;
      })
    );

    // Remove null entries and assign unique IDs
    return filteredArticles
      .filter((article): article is Article => article !== null)
      .map((article, index) => ({
        ...article,
        id: index + 1,
      }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return []; // Return an empty array in case of failure
  }
}
