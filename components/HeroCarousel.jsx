"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HeroCarousel({ animeList }) {
  const [active, setActive] = useState(animeList[0]);

  return (
    <section className="relative h-[85vh] w-full overflow-visible bg-black px-10">
      
      {/* HERO IMAGE (The Expanded Card) */}
      {/* We remove AnimatePresence here because layoutId handles the 'morph' */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={active.mal_id}
          layoutId={`anime-${active.mal_id}`} // Matches the thumbnail ID
          src={active.images.jpg.large_image_url}
          className="h-full w-full object-cover opacity-50"
          // We use a slight opacity transition to smooth the quality change
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut" 
          }}
        />
        {/* Overlay - separate from the image so it doesn't morph */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex h-full flex-col justify-center pt-24 max-w-xl text-white">
        <AnimatePresence mode="wait">
            <motion.div
                key={active.mal_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-5xl font-black">{active.title}</h1>
                <p className="mt-4 text-white/70 line-clamp-3">
                {active.synopsis}
                </p>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      <div className="absolute bottom-10 max-w-4xl   z-20 flex gap-6 snap-x snap-mandatory overflow-x-visible overflow-y-visible px-10  overflow-x-scroll ">
        {/* We use LayoutGroup or just layout on the items to make them fill the gap */}
        {animeList.slice(0, 6).map((anime) => {
          
          // CRITICAL: Do not render the card if it is currently active.
          // This forces the layoutId to jump to the Hero Image above.
          if (anime.mal_id === active.mal_id) return null;

          return (
            <motion.div
              key={anime.mal_id}
              layoutId={`anime-${anime.mal_id}`} // Connects to the hero image
              layout // This prop makes the other cards slide over to fill the gap
              onClick={() => setActive(anime)}
              className="relative z-50 h-[140px] w-[100px] flex-shrink-0  cursor-pointer snap-center   shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={anime.images.jpg.image_url}
                className={`h-full w-full rounded-xl  object-cover `}
                alt={anime.title}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}