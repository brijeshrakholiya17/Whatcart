"use client";

import { useState } from "react";
import { Star, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailClient({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const addItem = useCartStore((s) => s.addItem);

    function handleAddToCart() {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white">
                <img src={product.image} alt={product.title} priority className="w-full h-full object-cover" />
            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-2xl font-bold text-brand mb-3">${product.price}</p>

                <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`w-4 h-4 ${n <= Math.round(product.rating) ? "fill-brand text-brand" : "text-gray-300"}`} />
                    ))}
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mb-6">
                    <p>Brand: <span className="font-medium text-gray-800">{product.brand}</span></p>
                    <p>Category: <span className="font-medium text-gray-800">{product.category}</span></p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-gray-700">Quantity</span>
                    <div className="flex items-center border rounded-md">
                        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 text-sm font-medium">{quantity}</span>
                        <button onClick={() => setQuantity((q) => q + 1)} className="p-2 hover:bg-gray-100">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full md:w-auto bg-brand hover:bg-brand/90 text-white font-medium px-8 py-3 rounded-md transition"
                >
                    {added ? "Added ✓" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}