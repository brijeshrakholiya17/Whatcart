"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");

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

    return (
        <header className="bg-brand text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="text-xl font-bold shrink-0">Logo</Link>
                <div className="hidden md:flex flex-1 max-w-xl relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent text-white border border-white placeholder-white/70 text-sm focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <Link href="/cart" className="relative flex items-center gap-2 bg-black/80 hover:bg-black px-4 py-2 rounded-md text-sm transition">
                        <ShoppingCart className="w-4 h-4" />
                        Cart
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent text-white border border-white placeholder-white/70 text-sm focus:outline-none"
                    />
                </div>
            </div>
        </header>
    );
}