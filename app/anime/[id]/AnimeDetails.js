"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimeDetails({ anime }) {
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
    <div ref={ref} className="relative min-h-screen w-full bg-black text-white selection:bg-red-500/30">
      
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
              className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-lg bg-black/70 px-3 py-1 text-sm font-bold backdrop-blur-md border border-white/10">
                #{anime.rank ? `Ranked #${anime.rank}` : "Unranked"}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <StatBox label="Score" value={anime.score || "N/A"} star />
              <StatBox label="Popularity" value={`#${anime.popularity}`} />
              <StatBox label="Members" value={anime.members?.toLocaleString()} />
              <StatBox label="Episodes" value={anime.episodes || "?"} />
            </motion.div>
            <a
                href={anime.url}
                target="_blank"
                className="inline-block py-3 px-6 border-2 border-white text-xs hover:text-white hover:bg-transparent font-black uppercase tracking-widest
                    bg-white  rounded-lg text-black transition-all"
                >
            View on AnimeList
            </a>
            <a
            href={`https://aniwatchtv.to/search?keyword=${encodeURIComponent(anime.title)}`}
            // href={`https://www.crunchyroll.com/search?from=search&q=${encodeURIComponent(anime.title)}`}
            target="_blank"
            className="inline-block rounded-lg py-3 px-6 border-2 border-white text-xs hover:text-white hover:bg-transparent font-black uppercase tracking-widest
                bg-white text-black transition-all"
            >
            watch
            </a>
          </div>

          {/* RIGHT COLUMN: Info & Trailer */}
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
                {anime.title}
              </h1>
              <h2 className="mt-2 text-xl text-white/50">{anime.title_japanese}</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {anime.genres?.map((g) => (
                <span key={g.mal_id} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium hover:bg-white/20 transition-colors cursor-default">
                  {g.name}
                </span>
              ))}
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/60">
                {anime.rating}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">Synopsis</h3>
              <p className="text-lg leading-relaxed text-white/70">{anime.synopsis}</p>
            </motion.div>

            {anime.trailer?.embed_url && (
              <motion.div variants={itemVariants} className="mt-8">
                <h3 className="text-xl font-bold mb-4">Trailer</h3>
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <iframe
                    src={`${anime.trailer.embed_url}?autoplay=0`}
                    className="h-full w-full"
                    allowFullScreen
                    title="Anime Trailer"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Simple internal component for styling stats
function StatBox({ label, value, star }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors">
      <span className="text-xs font-bold uppercase tracking-wider text-white/40">{label}</span>
      <span className="flex items-center gap-1 text-xl font-black">
        {value}
        {star && <span className="text-yellow-400 text-sm">★</span>}
      </span>
    </div>
  );
}