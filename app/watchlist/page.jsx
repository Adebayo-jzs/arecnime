"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWatchlist } from "./FavContext";
import AnimeCard from "@/components/AnimeCard";

export default function Watchlist() {
    const router = useRouter();
    const { watchlistItems, removeFromWatchlist, clearWatchlist } = useWatchlist();

    return (
        <div className="min-h-screen bg-black text-white  py-20 md:py-32 px-5 md:px-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-black mb-8">My Watchlist</h1>
                
                {watchlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg mb-6">Your watchlist is empty</p>
                        <Link 
                            href="/" 
                            className="inline-block py-3 px-6 border-2 border-white text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            Browse Anime
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-gray-400">{watchlistItems.length} anime in watchlist</p>
                            <button
                                onClick={() => clearWatchlist()}
                                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase transition"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {watchlistItems.map((anime) => (
                                <div key={anime.id}>
                                    <AnimeCard anime={{...anime, mal_id: anime.id}} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}