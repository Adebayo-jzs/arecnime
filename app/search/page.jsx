// import Link from "next/link";
// import SearchInput from "@/components/SearchInput";

// export default function SearchPage(){
//     return(
//         <div className="flex flex-col min-h-screen items-center justify-center bg-black font-sans  ">
//             <main className="max-w-9xl min-h-screen w-full items-center justify-between py-32 px-5 md:px-16  sm:items-start">
//                 <h2 className="text-4xl md:text-5xl  mb-7 font-black tracking-tight flex items-center gap-4 text-white">
//                     Search Results
//                 </h2>
//             </main>
//         </div>
//     );
// }
"use client"

import { useState } from "react";
import AnimeCard from "@/components/AnimeCard";
export default function Searchpage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    setResults(data.data || []);
    console.log(results);
    setLoading(false);
  }
  return(
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-sans  ">
        <main className="max-w-9xl min-h-screen w-full items-center justify-between py-32 px-5 md:px-16  sm:items-start">
            <h2 className="text-4xl md:text-5xl  mb-7 font-black tracking-tight flex items-center gap-4 text-white">
                {/* Search Results  */}
                {query?`Search results for ${query}`:"Search"}
            </h2>
            <form onSubmit={handleSearch} className="mb-15">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full  bg-neutral-900 px-5 py-4 text-white text-lg outline-none focus:ring-2 focus:ring-white/20"
        />
      </form>
      {loading && (
        <p className="mt-10 text-center text-white/50">Searching...</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

      {results.map((anime) =>(
          
          <AnimeCard   key={anime.mal_id} anime={anime}/>
        ))}
    </div>
      {/* RESULTS */}
      {/* <section className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((anime) => (
          <div
            key={anime.mal_id}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-800">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-3 text-sm font-semibold line-clamp-2">
              {anime.title}
            </h3>
          </div>
        ))}
      </section> */}
        </main>
    </div>
  );

}