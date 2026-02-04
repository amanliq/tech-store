import { useProductByIdQuery } from "@/entities/product";
import { ProductDetailLoading } from "./ProductDetailLoading";
import { ProductDetailError } from "./ProductDetailError";
import { ProductGallery } from "../../gallery";
import { AddToCartButton } from "@/features/cart";

interface ProductDetailContentProps {
  productId: string;
}
export const ProductDetailContent = ({
  productId,
}: ProductDetailContentProps) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductByIdQuery(productId);

  if (isLoading) return <ProductDetailLoading />;

  if (isError)
    return (
      <ProductDetailError error={error?.message ?? "Error loading product"} />
    );

  if (!product) return null;

  return (
    <main className="container mx-auto p-6 flex flex-col md:flex-row gap-10">
      <div className="flex-1 bg-white p-4 rounded-xl border">
        <ProductGallery images={product.images} productName={product.title} />
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold mt-2">{product.title}</h1>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description}
        </p>
        <div className="text-3xl font-bold">${product.price}</div>

        <div className="max-w-xs">
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
};
