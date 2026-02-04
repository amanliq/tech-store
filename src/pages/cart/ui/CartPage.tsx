import { CartList, CartSummary } from "@/widgets/cart";

export const CartPage = () => {
  return (
    <div className="my-7">
      <div className="container mx-auto">
        <div className="flex w-full gap-4">
          <div className="flex-1">
            <CartList />
          </div>
          <div className="w-md ">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};
