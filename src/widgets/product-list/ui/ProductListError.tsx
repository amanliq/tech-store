interface ProductListError {
  error: string;
}
const ProductListError = ({ error }: ProductListError) => {
  return <div className="p-10 text-red-500">{error}</div>;
};

export default ProductListError;
