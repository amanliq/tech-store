import { useCartStore } from "@/entities/cart";
import { useUserStore } from "@/entities/user";
import { LogoutButton } from "@/features/auth/login";
import { Badge, Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const Header = () => {
  const totalCount = useCartStore((s) => s.totalCount);

  const isLoggedIn = useUserStore((s) => !!s.token);
  const user = useUserStore((s) => s.user);

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
            {totalCount > 0 && (
              <Badge className="absolute -top-1 -right-1">{totalCount}</Badge>
            )}
          </Link>

          <div className="flex items-center gap-3 border-l pl-6">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-500">{user?.username}</span>
                <LogoutButton />
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
