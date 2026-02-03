import { ProductDetailContent } from "@/widgets/product";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <div>
      <ProductDetailContent productId={id} />
    </div>
  );
};
