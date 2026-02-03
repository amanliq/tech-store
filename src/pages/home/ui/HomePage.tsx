import { ProductList } from "@/widgets/product-list";

export const HomePage = () => {
  return (
    <section className="container mx-auto my-7">
      HomePage
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Tech Products
      </h1>
      <ProductList />
    </section>
  );
};
