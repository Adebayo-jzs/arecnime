import AnimeDetails from "./AnimeDetails";

async function getAnime(id) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`,{
        next:{revalidate : 3600}, 
    });
    if (!res.ok) {
        throw new Error("Failed to fetch anime data");
    }
    return res.json();
}
async function getAnimeStreaming(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/streaming`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { data: [] };
  return res.json();
}
async function getAnimeNews(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { data: [] };
  return res.json();
}
export default async function AnimePage({ params }) {
    const {id} = await params;
    const data = await getAnime(id);
    const streamingData = await getAnimeStreaming(id);
    const newsData = await getAnimeNews(id);
    // console.log(newsData);
    return <AnimeDetails anime={data.data} streaming={streamingData.data} animenews={newsData.data}/>;
}