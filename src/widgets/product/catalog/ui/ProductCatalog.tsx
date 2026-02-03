import { useState } from "react";
import { ProductList } from "../../list";
import { FilterByCategory } from "@/features/product";
import type { CategoryOption } from "@/entities/product/model/constants";

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption>("all");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <FilterByCategory
          currentCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <ProductList category={selectedCategory} />
    </div>
  );
};
