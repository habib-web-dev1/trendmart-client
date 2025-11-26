import ProductDetailsClient from "@/app/components/ProductDetailsClient";

export default async function ProductDetailsServerPage({ params }) {
  const { id } = params;

  return <ProductDetailsClient key={id} productId={id} />;
}
