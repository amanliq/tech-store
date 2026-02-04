import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui";

interface ControlQuantityProps {
  productId: number;
  currentQuantity: number;
}

export const ControlQuantity = ({
  productId,
  currentQuantity,
}: ControlQuantityProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="flex items-center gap-2 border rounded-lg">
      <Button onClick={() => updateQuantity(productId, currentQuantity - 1)}>
        -
      </Button>
      <span className="px-4 font-semibold">{currentQuantity}</span>
      <Button onClick={() => updateQuantity(productId, currentQuantity + 1)}>
        +
      </Button>
    </div>
  );
};
