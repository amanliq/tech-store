import type { Product } from "@/entities/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}
