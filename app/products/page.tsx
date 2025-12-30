import { loadProducts } from "@/lib/products-data";
import ProductsCatalog from "@/components/products-catalog";

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await loadProducts();

  return <ProductsCatalog initialProducts={products} />;
}
