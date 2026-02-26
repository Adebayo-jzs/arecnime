"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce"; // You might need to install: npm i use-debounce

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize with the URL query if it exists
  const [text, setText] = useState(searchParams.get("q") || "");
  const [query] = useDebounce(text, 500); // Wait 500ms after typing stops

  // Sync state with URL when debounced query changes
  useEffect(() => {
    if (!query) {
      router.push("/search");
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for anime..."
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-white/40 backdrop-blur-md transition-all focus:border-pink-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-pink-500/50"
      />
    </div>
  );
}