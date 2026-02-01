// "use client"
import Image from "next/image";
import Link from "next/link";
import { Search } from "@mui/icons-material";
import AnimeCard from "@/components/AnimeCard";
import HeroCarousel from "@/components/HeroCarousel";
// import { useEffect,useState } from "react";
 
export default  async function Home() {
  // const [animeList,setAnimeList] = useState([]);

  // useEffect(() => {
  // fetch("https://api.jikan.moe/v4/top/anime")
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data.data);
  //     setAnimeList(data.data);
  //   });
    
  // }, []);
  const res = await fetch("https://api.jikan.moe/v4/top/anime");
  const data = await res.json();
  const animeList = data.data;
  // console.log(animeList);
  
   

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black ">
      <HeroCarousel animeList={animeList}/>
      <main className="max-w-9xl min-h-screen w-full    items-center justify-between py-32 px-5 md:px-16  sm:items-start">
         <h2 className="text-4xl md:text-5xl  mb-7 font-black tracking-tight flex items-center gap-4 text-white">
            Top {animeList.length} Anime <span className="text-xs md:text-base font-bold text-white/50 tracking-widest uppercase mt-2">/ 01</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"> 
          {animeList.map((anime) =>(
                    
            <AnimeCard   key={anime.mal_id} anime={anime}/>
          ))}
        </div>
            
      </main>
    </div>
  );
}
