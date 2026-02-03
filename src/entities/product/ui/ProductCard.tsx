import type { ReactNode } from "react";
import type { Product } from "../model/types";

interface Props {
  product: Product;
  action?: ReactNode;
  onClick?: () => void;
}

export const ProductCard = ({ product, action, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        group flex flex-col h-full border p-4 rounded-xl bg-white 
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-md bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <span className="absolute top-2 left-2 px-2 py-1 text-[10px] uppercase font-bold bg-black/5 text-gray-600 rounded">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              $ {product.price}
            </span>
          </div>
        </div>
      </div>

      {action && (
        <div className="mt-4 pt-4 border-t border-gray-100">{action}</div>
      )}
    </div>
  );
};
