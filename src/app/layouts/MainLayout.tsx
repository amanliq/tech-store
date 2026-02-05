import { Header } from "@/widgets";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow px-4">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-gray-400 border-t bg-white">
        © 2026 Tech Store.
      </footer>
    </div>
  );
};
