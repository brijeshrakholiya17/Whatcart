"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { products } from "@/lib/products";
import { useState, useEffect } from "react";

const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});

const categories = [
    { name: "All", count: products.length },
    ...Object.keys(categoryCounts).map((cat) => ({
        name: cat,
        count: categoryCounts[cat],
    })),
];

const brandCounts = products.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
}, {});

const brands = [
    { name: "All", count: products.length },
    ...Object.keys(brandCounts).map((brand) => ({
        name: brand,
        count: brandCounts[brand],
    })),
];

const maxLimit = Math.ceil(Math.max(...products.map((p) => p.price), 100) / 50) * 50;

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") || "All";
    const activeBrand = searchParams.get("brand") || "All";
    const activeMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : maxLimit;

    const [price, setPrice] = useState(activeMaxPrice);

    useEffect(() => {
        setPrice(activeMaxPrice);
    }, [activeMaxPrice]);

    function updateParam(key, value) {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "All" || value === "" || (key === "maxPrice" && Number(value) >= maxLimit)) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    // Debounce URL updates while dragging for 60fps smooth real-time dragging
    useEffect(() => {
        if (price === activeMaxPrice) return;
        const timer = setTimeout(() => {
            updateParam("maxPrice", price);
        }, 180);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [price]);

    const hasActiveFilters = activeCategory !== "All" || activeBrand !== "All" || searchParams.has("maxPrice");

    function clearAllFilters() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");
        params.delete("brand");
        params.delete("maxPrice");
        setPrice(maxLimit);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <aside className="space-y-4 w-full lg:w-64 shrink-0">
            <div className="bg-brand text-white rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-white/80 hover:text-white underline cursor-pointer"
                        >
                            Reset All
                        </button>
                    )}
                </div>

                <h3 className="font-semibold mb-2 text-sm">Category</h3>
                <div className="space-y-2 mb-5">
                    {categories.map(({ name }) => (
                        <label key={name} className="flex items-center justify-between text-sm cursor-pointer hover:opacity-90">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={activeCategory === name}
                                    onChange={() => updateParam("category", name)}
                                    className="accent-white w-4 h-4"
                                />
                                {name}
                            </div>
                        </label>
                    ))}
                </div>

                <h3 className="font-semibold mb-2 text-sm">Price</h3>
                <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    step="10"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    onMouseUp={() => updateParam("maxPrice", price)}
                    onTouchEnd={() => updateParam("maxPrice", price)}
                    className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-1 font-mono">
                    <span>$0</span>
                    <span>${price}</span>
                </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm text-gray-800">Brand</h3>
                <div className="space-y-2">
                    {brands.map(({ name, count }) => (
                        <label key={name} className="flex items-center justify-between text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={activeBrand === name}
                                    onChange={() => updateParam("brand", name)}
                                    className="accent-brand w-4 h-4"
                                />
                                {name}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}