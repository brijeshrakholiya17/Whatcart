"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const categories = ["All", "Electronics", "Clothing", "Home"];
const brands = ["All", "Nova", "PixelPro", "Stridewell", "HomeCraft"];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") || "All";
    const activeBrand = searchParams.get("brand") || "All";
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

    function updateParam(key, value) {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "All" || value === "") params.delete(key);
        else params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <aside className="space-y-4 w-full lg:w-64 shrink-0">
            <div className="bg-brand text-white rounded-lg p-5">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                <h3 className="font-semibold mb-2 text-sm">Category</h3>
                <div className="space-y-2 mb-5">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={activeCategory === cat}
                                onChange={() => updateParam("category", cat)}
                                className="accent-white w-4 h-4"
                            />
                            {cat}
                        </label>
                    ))}
                </div>

                <h3 className="font-semibold mb-2 text-sm">Price</h3>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => updateParam("maxPrice", e.target.value)}
                    className="w-full accent-white"
                />
                <div className="flex justify-between text-xs mt-1">
                    <span>0</span>
                    <span>{maxPrice}</span>
                </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm text-gray-800">Brand</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
                            <input
                                type="radio"
                                name="brand"
                                checked={activeBrand === brand}
                                onChange={() => updateParam("brand", brand)}
                                className="accent-brand w-4 h-4"
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}