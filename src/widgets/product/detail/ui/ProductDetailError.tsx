interface ProductDetailErrorProps {
  error: string;
}
export const ProductDetailError = ({ error }: ProductDetailErrorProps) => {
  return <div className="p-10 text-red-500">{error}</div>;
};
