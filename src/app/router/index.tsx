import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "@/pages/home";
import { ProductDetailPage } from "@/pages/product";
import { LoginPage } from "@/pages/login";
import { CartPage } from "@/pages/cart";
import { AuthGuard } from "./guards/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
