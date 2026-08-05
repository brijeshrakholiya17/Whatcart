import { products } from "./products";

export function filterProducts({ category, brand, maxPrice, search }) {
    return products.filter((p) => {
        if (category && category !== "All" && p.category !== category) return false;
        if (brand && brand !== "All" && p.brand !== brand) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        if (search) {
            const query = search.toLowerCase().trim();
            const matchesTitle = p.title.toLowerCase().includes(query);
            const matchesBrand = p.brand?.toLowerCase().includes(query);
            const matchesCategory = p.category?.toLowerCase().includes(query);
            const matchesDescription = p.description?.toLowerCase().includes(query);
            if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesDescription) return false;
        }
        return true;
    });
}