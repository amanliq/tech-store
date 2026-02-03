import { useProductByIdQuery } from "@/entities/product";
import { ProductDetailLoading } from "./ProductDetailLoading";
import { ProductDetailError } from "./ProductDetailError";

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                className="w-full h-48 md:h-72 object-contain rounded-lg border"
              />
            ))
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-contain rounded-lg border"
            />
          )}
        </div>
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
      </div>
    </main>
  );
};
