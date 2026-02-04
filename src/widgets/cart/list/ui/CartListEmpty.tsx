import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const CartListEmpty = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      Your cart is empty
      <Link to="/">
        <Button>Go shopping</Button>
      </Link>
    </div>
  );
};
