"use client";
import { BookmarkBorderOutlined, Bookmark } from "@mui/icons-material";
import { useWatchlist } from "@/app/watchlist/FavContext";
export default function AnimeCard({ anime }) {
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

    return (

    
    <div className="relative overflow-hidden aspect-[4/6] xl:aspect-[4/5] bg-neutral-900 group mb-6  border border-white/10 " key={anime.mal_id}>
                
                 
        <img
            alt={anime.title}
            className="w-full h-full object-cover opacity-70
            group-hover:scale-105 transition-transform duration-700"
            src={anime.images.jpg.image_url}
            loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none group-hover:opacity-80 group-hover:backdrop-blur-sm" />
        <div className="absolute bottom-6 left-4 md:left-6 md:bottom-10 pr-6 transition-all">
            
            <h2 className="text-3xl transition-all md:text-4xl font-black text-white uppercase tracking-tighter leading-none">
            {anime.title_english || anime.title}
            </h2>
            <p className="
                translate-y-8 group-hover:translate-y-0
                transition-transform duration-500 text-[#939393]
                text-sm md:text-base line-clamp-5 leading-relaxed my-6 max-w-md 
                opacity-0 group-hover:opacity-100 absolute group-hover:relative">
                {anime.synopsis}
            </p>
            <div className="flex justify-between mt-4">
                <a
                href={`/anime/${anime.mal_id}`}
                target="_blank"
                className="inline-block py-3 px-6 border-2 border-white text-xs text-white font-black uppercase tracking-widest
                    hover:bg-white hover:text-black transition-all"
                >
                details
                </a>
                <button
                    className="text-white hover:scale-110 transition-transform"
                    onClick={handleWatchlistClick}
                    aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                >
                    {isInWatchlist ? <Bookmark fontSize="large"  className="text-pink-400"/> : <BookmarkBorderOutlined fontSize="large"/>}
                </button>
            </div>
        </div>
    </div> 
    );
}