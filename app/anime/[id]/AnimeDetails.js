"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookmarkBorderOutlined, Bookmark ,BookmarkAdd,BookmarkRemove } from "@mui/icons-material";
import { useWatchlist } from "@/app/watchlist/FavContext";

export default function AnimeDetails({ anime,streaming,animenews }) {
  const { watchlistItems, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = watchlistItems.some((p) => p.id === anime.mal_id);
    
  const handleWatchlistClick = () => {
    if (isInWatchlist) {
        removeFromWatchlist(anime.mal_id);
    } else {
        // the context expects an object with `id` matching anime.mal_id
        addToWatchlist({ id: anime.mal_id, ...anime });
    }
  };

  const ref = useRef(null);
  
  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="relative min-h-screen w-full bg-black text-white selection:bg-pink-500/30">
      
      {/* 1. PARALLAX BACKDROP */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 h-[60vh] w-full z-0"
      >
        <img
          src={anime.images.jpg.large_image_url}
          alt="Background"
          className="h-full w-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      </motion.div>

      {/* 2. MAIN CONTENT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr]">
          
          {/* LEFT COLUMN: Poster & Stats */}
          <div className="flex flex-col gap-6">
            <motion.div 
              variants={itemVariants}
              className="relative aspect-[2/3] overflow-hidden   border border-white/10 shadow-2xl"
            >
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4  bg-black/70 px-3 py-1 text-sm font-bold backdrop-blur-md border border-white/10">
                #{anime.rank ? `Ranked #${anime.rank}` : "Unranked"}
              </div>
              <div className="absolute top-4 right-4">
                <button
                    className="text-white hover:scale-110 transition-transform"
                    onClick={handleWatchlistClick}
                    aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                >
                    {isInWatchlist ? <Bookmark fontSize="large"  className="text-pink-400"/> : <BookmarkBorderOutlined fontSize="large"/>}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <StatBox label="Score" value={anime.score || "N/A"} star />
              <StatBox label="Popularity" value={`#${anime.popularity}`} />
              <StatBox label="Members" value={anime.members?.toLocaleString()} />
              <StatBox label="Episodes" value={anime.episodes || "?"} />
            </motion.div>
            <button
              className=" py-3 px-6 border-2 border-white text-xs hover:text-white hover:bg-transparent font-black uppercase flex items-center gap-2 tracking-widest
                    bg-white text-left  text-black transition-all"
              onClick={handleWatchlistClick}
              aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              <span> {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}</span>
              <span>{isInWatchlist ? <BookmarkRemove fontSize="small"  className="text-pnk-400"/> : <BookmarkAdd fontSize="small"/>}</span>
            </button>
            <a
                href={anime.url}
                target="_blank"
                className="inline-block py-3 px-6 border-2 border-white text-xs hover:text-white hover:bg-transparent font-black uppercase tracking-widest
                    bg-white   text-black transition-all"
                >
            View on AnimeList
            </a>
            <a
            href={`https://aniwatchtv.to/search?keyword=${encodeURIComponent(anime.title)}`}
            // href={`https://www.crunchyroll.com/search?from=search&q=${encodeURIComponent(anime.title)}`}
            target="_blank"
            className="inline-block  py-3 px-6 border-2 border-white text-xs hover:text-white hover:bg-transparent font-black uppercase tracking-widest
                bg-white text-black transition-all"
            >
            Aniwatch
            </a>
            <div className="flex flex-wrap gap-3">
                {streaming.map((service, index) => (
                  <a
                    key={index}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2   border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400"
                  >
                    {service.name}
                    <svg className="h-4 w-4 hidden transition-all group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
          </div>

          {/* RIGHT COLUMN: Info & Trailer */}
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
                {anime.title_english || anime.title}
              </h1>
              <h2 className="mt-2 text-xl text-white/50">{anime.title_japanese}</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {anime.genres?.map((g) => (
                <span key={g.mal_id} className="bg-white/10 px-4 py-1.5 text-sm font-medium hover:bg-white/20 transition-colors cursor-default">
                  {g.name}
                </span>
              ))}
              <span className="border border-white/20 px-4 py-1.5 text-sm font-medium text-white/60">
                {anime.rating}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
              <p className="text-lg leading-relaxed text-white/70">{anime.synopsis}</p>
            </motion.div>

            {anime.trailer?.embed_url && (
              <motion.div variants={itemVariants} className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Trailer</h3>
                <div className="aspect-video w-full overflow-hidden  border border-white/10 shadow-2xl">
                  <iframe
                    src={`${anime.trailer.embed_url}?autoplay=0`}
                    className="h-full w-full"
                    allowFullScreen
                    title="Anime Trailer"
                  />
                </div>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-2xl font-bold mb-4">News</h3>
              <div className="flex flex-col gap-4 gap-5">
               
              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-5"> */}
                {animenews.slice(0,5).map((news,index)=>{
                   const date = new Date(news.date).toLocaleDateString("en-US", {
                      year: 'numeric', month: 'long', day: 'numeric'
                })
                  return(
                  <a
                        key={news.mal_id}
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-pink-500/50"
                      >
                        <div className="flex gap-4">
                          {/* Optional Thumbnail if API provides it */}
                          {news.images?.jpg?.image_url ? (
                             <img 
                               src={news.images.jpg.image_url} 
                               alt="News" 
                               className="h-20 w-20 flex-shrink-0 rounded-lg object-cover opacity-80 group-hover:opacity-100"
                             />
                          ) : (
                             // Fallback Placeholder Icon
                             <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
                               <span className="text-2xl">📰</span>
                             </div>
                          )}
                          
                          <div className="flex flex-col justify-center">
                            <h4 className="text-lg font-bold leading-tight text-white group-hover:text-pink-400 transition-colors">
                              {news.title}
                            </h4>
                            <p className="mt-1 text-xs font-medium text-white/40">
                              {date} • by {news.author_username}
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm text-white/60 group-hover:text-white/80">
                              {news.excerpt}
                            </p>
                          </div>
                        </div>
                      </a>
                  // <div key={index} className="bg-[#0d0d0d] font-black tracking-widest   p-5 border border-white/20">
                  //   <h2>{news.title}</h2>
                  //   {/* <p>{news.excerpt}</p> */}
                  // </div>
                ); 
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Simple internal component for styling stats
function StatBox({ label, value, star }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1  border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors">
      <span className="text-xs font-bold uppercase tracking-wider text-white/40">{label}</span>
      <span className="flex items-center gap-1 text-xl font-black">
        {value}
        {star && <span className="text-yellow-400 text-sm">★</span>}
      </span>
    </div>
  );
}