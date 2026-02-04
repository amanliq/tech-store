import type { Product } from "@/entities/product";
import { Button } from "@/shared/ui";
import { useAddToCart } from "../model/useAddToCart";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { handleAddToCart } = useAddToCart(product);

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
};
