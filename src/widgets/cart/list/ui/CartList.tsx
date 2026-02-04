import { useCartStore } from "@/entities/cart";
import { ControlQuantity, RemoveFromCartButton } from "@/features/cart";
import { CartListEmpty } from "./CartListEmpty";

export const CartList = () => {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) return <CartListEmpty />;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex gap-3 border p-4 rounded-lg">
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
            className="w-24 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.product.title}</h3>
            <p className="text-gray-600">${item.product.price}</p>

            <div className="mt-2 flex items-center gap-4">
              <ControlQuantity
                productId={item.product.id}
                currentQuantity={item.quantity}
              />
              <RemoveFromCartButton productId={item.product.id} />
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg">
              $ {(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
