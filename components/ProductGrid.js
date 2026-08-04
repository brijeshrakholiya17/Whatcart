import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try adjusting your filters or search term.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}