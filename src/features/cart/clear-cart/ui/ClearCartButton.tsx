import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui";

export const ClearCartButton = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  return (
    <Button variant="destructive" onClick={() => clearCart()}>
      Clear cart
    </Button>
  );
};
