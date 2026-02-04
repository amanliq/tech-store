import type { Product } from "@/entities/product";
import type { Cart } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState extends Cart {
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotalPrice: () => void;
  setTotalCount: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalCount: 0,
      addItem: (product) => {
        const items = get().items;

        const hasProduct = items.find((item) => item.product.id === product.id);

        if (hasProduct) {
          get().updateQuantity(product.id, hasProduct.quantity + 1);
        } else {
          set({ items: [...items, { product, quantity: 1 }] });

          get().calculateTotalPrice();
          get().setTotalCount();
        }
      },
      removeItem: (productId) => {
        const items = get().items;

        const newItems = items.filter((item) => item.product.id !== productId);

        set({ items: newItems });
        get().calculateTotalPrice();
        get().setTotalCount();
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = get().items.map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ items: newItems });

        get().calculateTotalPrice();
        get().setTotalCount();
      },
      clearCart: () => {
        set({ items: [], totalPrice: 0, totalCount: 0 });
      },

      calculateTotalPrice: () => {
        const items = get().items;

        const totalPrice = items.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0,
        );

        set({ totalPrice });
      },

      setTotalCount: () => {
        const items = get().items;

        const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

        set({ totalCount });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        totalPrice: state.totalPrice,
        totalCount: state.totalCount,
      }),
    },
  ),
);
