"use client"
import { Search ,Bookmarks} from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useWatchlist } from "@/app/watchlist/FavContext";

export default function Header(){
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const {watchlistItems} = useWatchlist();


  // ${open ? "bg-transparent border-none   backdrop-blur-none px-5" : ""}
    return(
    // <header className="fixed top-4 z-50 left-0 right-0  max-w-[1600px] mx-auto    ">

    <nav className={`  fixed top-0 z-50 left-0 right-0  mx-auto  px-5 md:px-10 py-5 transition-all   text-white duration-300 ease-in-out
      ${scrolled ? 'bg-black backdrop-blur-md border border-white/10 shadow-lg px-5 text-black' : 'bg-transparent text-whte border border-transparent'}
      `}>
      <div className="flex items-center justify-between">
        {/* Logo / Brand */}
        {/* <div class="fixed top-8 left-8 z-50"> */}
        <Link href="/" className="ojuju flex items-center justify-center font-display font-black text-3xl tracking-tighter  ">
            Arecnime
        </Link>
        {/* </div> */}

        {/* Desktop Links
        <div className="hidden md:flex items-center opacity-0 gap-8 uppercase font-bold">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#experience">Education</NavLink>
        </div> */}

        {/* CTA Button */}
        <div className="flex gap-3 items-center">

        <Link
          href="/search" 
          className=" block      text-sm font-semibold transition"
          >
          <Search/>
        </Link>
        <Link href="/watchlist" className="block p-2 rounded-full transition relative">
          <Bookmarks />
          <div className="absolute top-0">
            {/* {cartItems.length > 0 && ( */}
            <span>
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {watchlistItems.length || 0}
              </span>
            </span>
            {/* )} */}
          </div>
        </Link>
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
         
      </div>
    </nav>
    // </header>
    );
};
const NavLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-sm  text-gray-300 font-bold tracking-widest transition hover:text-white transition"
  >
    {children}
  </a>
);