import { CATEGORY_OPTIONS } from "@/entities/product";
import type { CategoryOption } from "@/entities/product/model/constants";
import { Button } from "@/shared/ui";

interface Props {
  currentCategory: CategoryOption;
  onCategoryChange: (category: CategoryOption) => void;
}

export const FilterByCategory = ({
  currentCategory,
  onCategoryChange,
}: Props) => {
  return (
    <div className="flex gap-4 mb-8">
      {CATEGORY_OPTIONS.map((cat) => (
        <Button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          variant={currentCategory === cat.value ? "default" : "secondary"}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
};
