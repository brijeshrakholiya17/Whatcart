export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white mb-3">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.title}</h3>
            <p className="font-bold text-gray-900 mb-2">${product.price}</p>
            <button className="bg-brand hover:bg-brand/90 text-white text-sm font-medium py-2 rounded-md transition">
                Add to Cart
            </button>
        </div>
    );
}