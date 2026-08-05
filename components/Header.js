"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");
    const [isFocused, setIsFocused] = useState(false);
    const totalItems = useCartStore((s) => s.totalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) params.set("search", query);
            else params.delete("search");
            router.push(`/?${params.toString()}`);
        }, 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const isSearchActive = isFocused || query.length > 0;

    return (
        <header className="bg-brand text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="text-3xl font-bold shrink-0">Logo</Link>

                <div className="hidden md:flex flex-1 max-w-xl relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isSearchActive ? "text-white/60" : "text-white/60"}`} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for products..."
                        className={`w-full pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none transition-colors border ${isSearchActive
                            ? "bg-transparent border-white/60 text-white placeholder-white"
                            : "bg-transparent border-white/60 text-white placeholder-white"
                            }`}
                    />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <Link
                        href="/cart"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#062547] text-white rounded-xl hover:bg-[#062547]/80 transition-colors"
                        aria-label="View cart"
                    >
                        <div className="relative inline-flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5 shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <span className="font-bold text-[15px]">Cart</span>
                    </Link>

                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isSearchActive ? "text-black" : "text-white/60"}`} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for products..."
                        className={`w-full pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none transition-colors border ${isSearchActive
                            ? "bg-white/60 border-white/60 text-black placeholder-black/60"
                            : "bg-transparent border-white/60 text-white/60 placeholder-white/60"
                            }`}
                    />
                </div>
            </div>
        </header>
    );
}