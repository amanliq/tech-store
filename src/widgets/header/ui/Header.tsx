import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          TECH STORE
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-sm font-medium">Cart</span>
          </Link>

          <div className="flex items-center gap-3 border-l pl-6">
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
