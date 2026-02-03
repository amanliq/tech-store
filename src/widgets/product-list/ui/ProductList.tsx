import {
  ProductCard,
  useProductsQuery,
  type Category,
} from "@/entities/product";
import { Link } from "react-router-dom";

interface ProductListProps {
  category?: Category;
}
export const ProductList = ({ category }: ProductListProps) => {
  const { data: products } = useProductsQuery(category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="transition-transform hover:scale-[1.02]"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};
