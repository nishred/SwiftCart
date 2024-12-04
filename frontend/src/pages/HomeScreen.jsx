import Product from "../components/Product";
import Spinner from "../components/Spinner";

import { useProducts } from "../hooks/useProducts";

const HomeScreen = () => {
  const { products, isLoading, error } = useProducts();


  if (isLoading) return <Spinner parent={"main"}/>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="uppercase tracking-widest text-3xl font-bold text-slate-600">
        Latest Products
      </h1>
      <div className="flex gap-4 flex-wrap justify-center sm:justify-start mt-8">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default HomeScreen;
