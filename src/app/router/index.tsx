import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
