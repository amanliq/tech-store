import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui";

interface RemoveFromCartButton {
  productId: number;
}
export const RemoveFromCartButton = ({ productId }: RemoveFromCartButton) => {
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <Button variant="destructive" onClick={() => removeItem(productId)}>
      Remove
    </Button>
  );
};
