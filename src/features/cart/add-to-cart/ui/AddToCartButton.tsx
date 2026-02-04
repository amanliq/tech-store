import { useCartStore } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { Button } from "@/shared/ui";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
};
