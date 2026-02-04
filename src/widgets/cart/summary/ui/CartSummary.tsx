import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui";

export const CartSummary = () => {
  const { totalPrice, totalCount } = useCartStore();
  if (!totalCount) {
    return null;
  }
  return (
    <div className="border p-6 rounded-lg ">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Items ({totalCount})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button> Checkout</Button>
    </div>
  );
};
