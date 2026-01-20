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
export default async function AnimePage({ params }) {
    const {id} = await params;
    const data = await getAnime(id);
    return <AnimeDetails anime={data.data} />;
}