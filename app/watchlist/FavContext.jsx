"use client"
import { createContext, useState, useContext, useEffect } from "react";

const WatchlistContext = createContext();
const initialWatchlist = [

];

export const WatchlistProvider = ({ children }) => { 
    const [watchlistItems, setWatchlistItems] = useState(() => {
        if (typeof window === 'undefined') return [];
        try {
            const savedWatchlist = localStorage.getItem("watchlist");
            return savedWatchlist ? JSON.parse(savedWatchlist) : [];
        } catch (error) {
            console.error("Error parsing Watchlistourites from localStorage:", error);
            return [];
        }
    });

    // Save Watchlist on every change
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlistItems));
    }, [watchlistItems]);

    const addToWatchlist = (anime) => {
        setWatchlistItems((prevAnime) => {
            const existingItem = prevAnime.find((item) => item.id === anime.id);
            if (existingItem) {
                return prevAnime.map((item) =>
                    item.id === anime.id ? { ...item} : item
                );
            } else {
                return [...prevAnime, {
                    ...anime,
                }];
            }
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlistItems((prevAnime) => prevAnime.filter((item) => item.id !== id));
    };
    const clearWatchlist = (id) => {
        setWatchlistItems([]);
    };

    return (
        <WatchlistContext.Provider value={{ watchlistItems, addToWatchlist, removeFromWatchlist,clearWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
