import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "@/pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
