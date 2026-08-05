import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = products.find((p) => p.id === Number(id));

    if (!product) notFound();

    return <ProductDetailClient product={product} />;
}