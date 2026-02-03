export const TECH_CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
] as const;

export const CATEGORY_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Smartphones", value: "smartphones" },
  { label: "Laptops", value: "laptops" },
  { label: "Tablets", value: "tablets" },
  { label: "Mobile Accessories", value: "mobile-accessories" },
] as const;

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number]["value"];
