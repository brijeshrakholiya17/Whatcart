import { products } from "./products";

export function filterProducts({ category, brand, maxPrice, search }) {
    return products.filter((p) => {
        if (category && category !== "All" && p.category !== category) return false;
        if (brand && brand !== "All" && p.brand !== brand) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });
}
