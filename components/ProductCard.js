"use client";

import Link from "next/link";
import { Star, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
    const items = useCartStore((s) => s.items);
    const addItem = useCartStore((s) => s.addItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const cartItem = mounted ? items.find((i) => i.id === product.id) : null;
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <div className="flex flex-col h-full justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div>
                <Link href={`/product/${product.id}`} className="block group">
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-50 mb-3">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    {product.brand && (
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                            {product.brand}
                        </span>
                    )}
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-brand transition line-clamp-1">
                        {product.title}
                    </h3>
                </Link>
                {product.rating && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium mb-2">
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${star <= Math.round(product.rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-600 font-semibold">{product.rating}</span>
                    </div>
                )}
                <p className="font-bold text-gray-900 mb-3">${Number(product.price).toFixed(2)}</p>
            </div>

            <div>
                {quantityInCart > 0 ? (
                    <div className="w-full bg-brand text-white text-sm font-medium py-2 px-3 rounded-md transition flex items-center justify-between">
                        <span className="font-medium">Quantity</span>
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                                className="p-1 hover:bg-white/20 rounded transition text-white flex items-center justify-center"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold min-w-[16px] text-center">{quantityInCart}</span>
                            <button
                                type="button"
                                onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                                className="p-1 hover:bg-white/20 rounded transition text-white flex items-center justify-center"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="w-full bg-brand hover:bg-brand/90 text-white text-sm font-medium py-2 rounded-md transition"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}