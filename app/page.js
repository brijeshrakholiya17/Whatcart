import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts } from "@/lib/filterProducts";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const filtered = filterProducts({
    category: params.category,
    brand: params.brand,
    maxPrice: params.maxPrice,
    search: params.search,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand mb-6">Product Listing</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <Suspense fallback={<div className="w-full lg:w-64 h-96 bg-gray-100 rounded-lg animate-pulse" />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}