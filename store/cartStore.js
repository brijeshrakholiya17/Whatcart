import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [], // { id, title, price, image, quantity }

            addItem: (product, quantity = 1) => {
                if (!product || !product.id) return;
                const items = get().items || [];
                const qtyToAdd = Math.max(1, Number(quantity) || 1);
                const existing = items.find((i) => i.id === product.id);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.id === product.id ? { ...i, quantity: i.quantity + qtyToAdd } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: qtyToAdd }] });
                }
            },

            removeItem: (id) => {
                set({ items: (get().items || []).filter((i) => i.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                const qty = Number(quantity);
                if (isNaN(qty) || qty <= 0) {
                    set({ items: (get().items || []).filter((i) => i.id !== id) });
                    return;
                }
                set({
                    items: (get().items || []).map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
                });
            },

            clearCart: () => set({ items: [] }),

            totalItems: () => (get().items || []).reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
            totalPrice: () =>
                (get().items || []).reduce(
                    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
                    0
                ),
        }),
        { name: "whatbytes-cart" }
    )
);