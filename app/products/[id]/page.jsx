import ProductDetailsClient from "@/app/components/ProductDetailsClient";

export default async function ProductDetailsServerPage({ params }) {
  const { id } = await params;

  return <ProductDetailsClient key={id} productId={id} />;
}

export async function generateStaticParams() {
  const res = await fetch("https://trendmart-server-six.vercel.app/products");
  const products = await res.json();

  if (!Array.isArray(products)) {
    console.error("generateStaticParams failed: products is not an array");
    return [];
  }

  return products
    .map((p) => {
      if (!p._id) return null;
      return {
        id: p._id.toString(),
      };
    })
    .filter(Boolean);
}
export const dynamicParams = true;
