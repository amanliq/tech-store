import type { TECH_CATEGORIES } from "./constants";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  thumbnail: string;
  images: string[];
}

export type Category = (typeof TECH_CATEGORIES)[number];
