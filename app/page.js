// "use client"
import Image from "next/image";
import Link from "next/link";
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
  console.log(animeList);
  
   

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-sans  ">
      <HeroCarousel animeList={animeList}/>
      <main className="max-w-9xl min-h-screen w-full   items-center justify-between py-32 px-5 md:px-16  sm:items-start">
         <h2 className="text-4xl md:text-5xl  mb-7 font-black tracking-tight flex items-center gap-4 text-white">
            Top {animeList.length} Anime <span className="text-xs md:text-base font-bold text-white/50 tracking-widest uppercase mt-2">/ 01</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"> 
          {animeList.map(anime => (
            // <div key={anime.mal_id} className="w-full bg-[#1c2029]">
            //   <img src={anime.images.jpg.large_image_url}  />
            //   <h2 className="font-bold text-2xl">{anime.title}</h2>
            //   {/* <p>{anime.synopsis}</p> */}

            // </div>
            // <div className="w-full snap-center" key={anime.mal_id}>
             
              <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900 group mb-6 border border-white/10 rounded-sm" key={anime.mal_id}>
                
                {/* Image */}
                <img
                  alt={anime.title}
                  className="w-full h-full object-cover opacity-70
                    group-hover:scale-105 transition-transform duration-700"
                  src={anime.images.jpg.image_url}
                  loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none group-hover:opacity-80 group-hover:backdrop-blur-sm" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pr-6 transition-all">
                  
                  <h2 className="text-3xl transition-all md:text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    {anime.title}
                  </h2>
                  <p className="
                      translate-y-8 group-hover:translate-y-0
                      transition-transform duration-500 text-[#939393]
                      text-sm md:text-base line-clamp-5 leading-relaxed my-6 max-w-md 
                      opacity-0 group-hover:opacity-100 absolute group-hover:relative">
                      {anime.synopsis}
                  </p>
                  <div className="flex gap-4 mt-4">
                      <a
                        href={`/anime/${anime.mal_id}`}
                        target="_blank"
                        className="inline-block py-3 px-6 border-2 border-white text-xs text-white font-black uppercase tracking-widest
                          hover:bg-white hover:text-black transition-all"
                      >
                        details
                      </a>
                      {/* <a
                        href={anime.url}
                        target="_blank"
                        className="inline-block py-3 px-6 border-2 border-white text-xs text-white font-black uppercase tracking-widest
                          hover:bg-white hover:text-black transition-all"
                      >
                        View on AnimeList
                      </a> */}
                      {/* <a
                        href={`https://aniwatchtv.to/search?keyword=${encodeURIComponent(anime.title)}`}
                        // href={`https://www.crunchyroll.com/search?from=search&q=${encodeURIComponent(anime.title)}`}
                        target="_blank"
                        className="inline-block py-3 px-6 border-2 border-white text-xs text-white font-black uppercase tracking-widest
                          hover:bg-white hover:text-black transition-all"
                      >
                        watch
                      </a> */}

                      {/* {code && (
                        <a
                          href={code}
                          target="_blank"
                          className="inline-block py-3 px-6 border border-white/40 text-xs font-black uppercase tracking-widest
                            hover:border-white transition-all text-white/80"
                        >
                          Code
                        </a>
                      )} */}
                    </div>
                </div>
              </div> 
          // </div>
          ))}
        </div>
            
      </main>
    </div>
  );
}
