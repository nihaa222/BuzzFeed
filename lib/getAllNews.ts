const api = "0cd77f140b1c4accb8832493e5c794be";

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

function isValidImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
}

async function isImageValid(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" }); // Use HEAD request to avoid downloading the entire image
    const contentType = res.headers.get("Content-Type");
    // Check if the Content-Type header is an image type (e.g., image/jpeg, image/png)
    return contentType ? contentType.startsWith("image/") : false;
  } catch (error) {
    console.error("Error fetching image:", error);
    return false;
  }
}

// Function to fetch and filter the news
export default async function getAllNews(): Promise<Article[]> {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`
  );

  const newData = await res.json();

  // Filter articles to exclude those with invalid image URLs
  const selectedData = await Promise.all(
    newData.articles.map(async (data: Article) => {
      const isValidImage =
        data.urlToImage &&
        isValidImageUrl(data.urlToImage) &&
        (await isImageValid(data.urlToImage));

      if (
        data.description !== null &&
        data.description !== "[Removed]" &&
        data.content !== null &&
        data.content !== "" &&
        isValidImage
      ) {
        return data;
      }
      return null; // Return null for invalid articles
    })
  );

  // Remove null values from the array and assign IDs
  const updatedData = selectedData
    .filter((item): item is Article => item !== null)
    .map((item, index) => ({
      ...item,
      id: index + 1,
    }));

  return updatedData;
}
