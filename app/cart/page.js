"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Loader2, PackageCheck, Sparkles, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartPage() {
    const items = useCartStore((s) => s.items) || [];
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeItem);
    const clearCart = useCartStore((s) => s.clearCart);
    const totalPrice = useCartStore((s) => s.totalPrice());

    const [mounted, setMounted] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState("idle"); // "idle" | "processing" | "success"
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => setMounted(true), []);

    function handleCheckout() {
        if (items.length === 0) return;

        const orderId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
        const summary = {
            id: orderId,
            total: totalPrice,
            itemsCount: items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0),
        };

        setOrderInfo(summary);
        setCheckoutStatus("processing");

        setTimeout(() => {
            clearCart();
            setCheckoutStatus("success");
        }, 1500);
    }

    if (!mounted) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
                    <div className="h-8 w-48 bg-gray-200 rounded"></div>
                    <div className="h-32 w-full bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (items.length === 0 && checkoutStatus === "idle") {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 bg-blue-50 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
                    <p className="text-sm text-gray-500">{items.length} {items.length === 1 ? "item" : "items"} in cart</p>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-xs text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 font-medium"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => {
                        const itemPrice = Number(item.price) || 0;
                        const itemQty = Number(item.quantity) || 1;
                        const itemSubtotal = itemPrice * itemQty;

                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition hover:shadow-md"
                            >
                                <img
                                    src={item.image || "/placeholder.png"}
                                    alt={item.title || "Product Image"}
                                    className="w-20 h-20 rounded-lg object-cover bg-gray-50 shrink-0"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300";
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <Link href={`/product/${item.id}`} className="font-semibold text-gray-900 text-sm hover:text-brand line-clamp-1">
                                        {item.title}
                                    </Link>
                                    <p className="text-brand font-bold text-sm mt-1">${itemPrice.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                    <button
                                        onClick={() => updateQuantity(item.id, itemQty - 1)}
                                        className="p-2 hover:bg-gray-200 text-gray-600 transition"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-3 text-sm font-semibold text-gray-800 min-w-[28px] text-center">
                                        {itemQty}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, itemQty + 1)}
                                        className="p-2 hover:bg-gray-200 text-gray-600 transition"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="font-bold text-gray-900 text-sm">${itemSubtotal.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition mt-1"
                                        title="Remove item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pt-2">
                        <Link href="/" className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Back to Store
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-3 text-sm text-gray-600 pb-4 border-b border-gray-100">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">${(Number(totalPrice) || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-base font-bold text-gray-900 py-4">
                            <span>Total</span>
                            <span className="text-brand">${(Number(totalPrice) || 0).toFixed(2)}</span>
                        </div>
                        <button
                            disabled={checkoutStatus !== "idle" || items.length === 0}
                            onClick={handleCheckout}
                            className="w-full bg-brand hover:bg-brand/90 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {checkoutStatus === "processing" ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Checkout"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Checkout Modal / Animation Overlay */}
            {checkoutStatus !== "idle" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300">
                    {checkoutStatus === "processing" && (
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-pop-in border border-gray-100">
                            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-brand/10 animate-ping opacity-75"></div>
                                <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center relative z-10">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Processing Your Order</h3>
                                <p className="text-sm text-gray-500 mt-1">Please wait while we confirm your payment and reserve items...</p>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-brand h-full rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
                            </div>
                        </div>
                    )}

                    {checkoutStatus === "success" && (
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-pop-in relative overflow-hidden border border-gray-100">
                            {/* Floating celebratory particles */}
                            <div className="absolute top-6 left-10 text-amber-400 animate-particle-1 pointer-events-none">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="absolute top-10 right-12 text-brand animate-particle-2 pointer-events-none">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="absolute top-16 left-1/2 text-green-500 animate-particle-3 pointer-events-none">
                                <Sparkles className="w-4 h-4" />
                            </div>

                            {/* Animated Green Checkmark Badge */}
                            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse-glow"></div>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white flex items-center justify-center shadow-lg shadow-green-500/30 relative z-10">
                                    <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" className="animate-check-draw" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full mb-2">
                                    <PackageCheck className="w-3.5 h-3.5" /> Order Confirmed
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900">Thank You for Your Order!</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Your order has been placed successfully and is being prepared for dispatch.
                                </p>
                            </div>

                            {/* Order Details Summary Card */}
                            {orderInfo && (
                                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2.5 text-xs text-gray-600 border border-gray-100">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                                        <span className="text-gray-500">Order Reference</span>
                                        <span className="font-mono font-bold text-gray-900 text-sm">{orderInfo.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Total Paid</span>
                                        <span className="font-bold text-brand text-sm">${(Number(orderInfo.total) || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Items Count</span>
                                        <span className="font-medium text-gray-800">{orderInfo.itemsCount} {orderInfo.itemsCount === 1 ? "item" : "items"}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-gray-500">Estimated Delivery</span>
                                        <span className="font-medium text-emerald-700">3 - 5 Business Days</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-2.5 pt-2">
                                <Link
                                    href="/"
                                    onClick={() => setCheckoutStatus("idle")}
                                    className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Continue Shopping <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
